import { useReducer, useEffect } from "react";
import { reducer, initialState, ACTIONS } from "./state";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const usePreloader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  const updateCounter = () => {
    dispatch({
      type: ACTIONS.SET_COUNTER,
      data: state.counter + state.counterStep
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
    if (counterEl) {
      state.counter < 100
        ? (counterEl.innerHTML = `${state.counter}%`)
        : hidePreloader(preloaderEl);
    }
  }, [state]);

  return;
};

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
