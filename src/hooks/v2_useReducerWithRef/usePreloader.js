import { useReducer, useEffect, useRef } from "react";
import { reducer, initialState, ACTIONS } from "./state";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const usePreloader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //сохраняю ссылку на state
  const stateRef = useRef(state);

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  const updateCounter = () => {
    dispatch({
      type: ACTIONS.SET_COUNTER,
      data: stateRef.current.counter + stateRef.current.counterStep //данные беру не из state, а из stateRef
    });
  };

  const checkImageLoading = (url) => {
    const imageChecker = new Image();
    imageChecker.addEventListener("load", updateCounter);
    imageChecker.addEventListener("error", updateCounter);
    imageChecker.src = url;
  };

  useEffect(() => {
    const imgArray = document.querySelectorAll("img");
    if (imgArray.length > 0) {
      dispatch({
        type: ACTIONS.SET_COUNTER_STEP,
        data: Math.floor(100 / imgArray.length) + 1
      });
      imgArray.forEach((img) => {
        checkImageLoading(img.src);
      });
    }
  }, []);

  useEffect(() => {
    stateRef.current = state; //при каждом обновлении state, записываю ссылку на обновленный state
    if (counterEl) {
      stateRef.current.counter < 100
        ? (counterEl.innerHTML = `${stateRef.current.counter}%`) //данные беру не из state, а из stateRef
        : hidePreloader(preloaderEl);
    }
  }, [state]);

  return;
};

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
