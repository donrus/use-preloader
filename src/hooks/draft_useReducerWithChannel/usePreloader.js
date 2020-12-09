import { useReducer, useEffect, useRef } from "react";
import * as R from "ramda";
import { reducer, initialState, ACTIONS } from "./state";
import { runSaga, eventChannel, stdChannel, buffers, END } from "redux-saga";
import {
  delay,
  call,
  takeEvery,
  select,
  cancelled,
  take,
  race,
  fork,
  put
} from "redux-saga/effects";
import EventEmitter from "events";
import * as log from "~/services/LogService";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const emitter = new EventEmitter();
const channel = stdChannel();

emitter.on("action", channel.put);

const usePreloader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateRef = useRef(state);

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  useEffect(() => {
    const imgArray = document.querySelectorAll("img");
    if (imgArray.length > 0) {
      dispatch({
        type: ACTIONS.SET_COUNTER_STEP,
        data: Math.floor(100 / imgArray.length) + 1
      });

      function* putReceipt() {
        dispatch({
          type: ACTIONS.SET_COUNTER,
          data: stateRef.current.counter + stateRef.current.counterStep
        });
        yield take((action) => {
          return action.type === "STATE_UPDATED";
        });
      }

      function* saga() {
        const eventsChannel = yield call(getImageLoadingSagas, imgArray);

        try {
          while (true) {
            yield take(eventsChannel);

            yield call(putReceipt);
          }
        } finally {
          //channel closed
        }
      }

      runSaga(
        {
          channel,
          dispatch: () => {},
          getState: () => {}
        },
        saga
      );
    }
  }, []);

  useEffect(() => {
    stateRef.current = state;

    if (stateRef.current.counterStep != 0 && stateRef.current.counter != 0) {
      emitter.emit("action", { type: "STATE_UPDATED" });
    }

    if (counterEl) {
      stateRef.current.counter < 100
        ? (counterEl.innerHTML = `${stateRef.current.counter}%`)
        : hidePreloader(preloaderEl);
    }
  }, [state]);

  return;
};

function getImageLoadingSagas(imagesArray) {
  return eventChannel((emit) => {
    for (const img of imagesArray) {
      const imageChecker = new Image();
      let counter = 0;
      imageChecker.addEventListener("load", () => {
        emit(true);
      });
      imageChecker.addEventListener("error", () => {
        emit(true);
      });
      imageChecker.src = img.url;
    }
    setTimeout(() => {
      //закрытие канала по таймеру
      emit(END);
    }, 100000);
    return () => {
      //отписываемся от обработчиков
    };
  }, buffers.expanding(10));
}

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
