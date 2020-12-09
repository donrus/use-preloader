import { useReducer, useEffect, useLayoutEffect, useRef } from "react";
import { reducer, initialState, ACTIONS } from "./state";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const usePreloader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateRef = useRef(state);
  const iteratorRef = useRef(null);

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  const updateCounter = () => {
    iteratorRef.current.next();
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
    }

    function* main() {
      for (let i = 0; i < imgArray.length; i++) {
        checkImageLoading(imgArray[i].src);
      }
      for (let i = 0; i < imgArray.length; i++) {
        yield true;
        dispatch({
          type: ACTIONS.SET_COUNTER,
          data: stateRef.current.counter + stateRef.current.counterStep
        });
      }
    }

    iteratorRef.current = main();
    iteratorRef.current.next();
  }, []);

  useLayoutEffect(() => {
    stateRef.current = state;

    if (counterEl) {
      stateRef.current.counter < 100
        ? (counterEl.innerHTML = `${stateRef.current.counter}%`)
        : hidePreloader(preloaderEl);
    }
  }, [state]);

  return;
};

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
