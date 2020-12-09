import { useReducer, useEffect, useRef } from "react";
import { reducer, initialState, ACTIONS } from "./state";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const usePreloader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateRef = useRef(state);

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  useEffect(() => {
    async function imageLoading() {
      const imgArray = document.querySelectorAll("img");
      if (imgArray.length > 0) {
        dispatch({
          type: ACTIONS.SET_COUNTER_STEP,
          data: Math.floor(100 / imgArray.length) + 1
        });
  
        for await (const response of getImageLoading(imgArray)) {
          dispatch({
            type: ACTIONS.SET_COUNTER,
            data: stateRef.current.counter + stateRef.current.counterStep
          });
        }
      }
    }
    imageLoading();
  }, []);

  useEffect(() => {
    stateRef.current = state;

    if (counterEl) {
      stateRef.current.counter < 100
        ? (counterEl.innerHTML = `${stateRef.current.counter}%`)
        : hidePreloader(preloaderEl);
    }
  }, [state]);

  return;
};

const getImageLoading = async function* (imagesArray) {
  for (const img of imagesArray) {
    yield new Promise((resolve, reject) => {
      const imageChecker = new Image();
      imageChecker.addEventListener("load", () => resolve(true));
      imageChecker.addEventListener("error", () => resolve(true));
      imageChecker.src = img.url;
    });
  }
};

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
