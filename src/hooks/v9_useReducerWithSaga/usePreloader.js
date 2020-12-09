import { useReducer, useEffect, useRef } from "react";
import { reducer, initialState, ACTIONS } from "./state";
import { useReducerAndSaga } from "./useReducerAndSaga";
import { saga } from "./sagas";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const usePreloader = () => {
  const [state, dispatch] = useReducerAndSaga(reducer, initialState, saga);

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  useEffect(() => {
    const imgArray = document.querySelectorAll("img");
    if (imgArray.length > 0) {
      dispatch({
        type: ACTIONS.SET_COUNTER_STEP,
        data: Math.floor(100 / imgArray.length) + 1,
      });
      dispatch({
        type: ACTIONS.SET_IMAGES,
        data: imgArray,
      });
    }
  }, []);

  useEffect(() => {
    if (counterEl) {
      state.counter < 100
        ? (counterEl.innerHTML = `${state.counter}%`)
        : hidePreloader(preloaderEl);
    }
  }, [state.counter]);

  return;
};

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
