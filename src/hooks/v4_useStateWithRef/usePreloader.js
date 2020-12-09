import { useEffect, useRef, useState } from "react";

const PRELOADER_SELECTOR = ".preloader__wrapper";
const PRELOADER_COUNTER_SELECTOR = ".preloader__counter";

const usePreloader = () => {
  const [counter, setCounter] = useState(0);
  const counterStateRef = useRef(counter);
  const setCounterState = (data) => {
    counterStateRef.current = data;
    setCounter(data);
  };

  const [counterStep, setCounterStep] = useState(0);
  const counterStepStateRef = useRef(counterStep);
  const setCounterStepState = (data) => {
    counterStepStateRef.current = data;
    setCounterStep(data);
  };

  const preloaderEl = document.querySelector(PRELOADER_SELECTOR);
  const counterEl = document.querySelector(PRELOADER_COUNTER_SELECTOR);

  const updateCounter = () => {
    setCounterState(counterStateRef.current + counterStepStateRef.current);
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
      setCounterStepState(Math.floor(100 / imgArray.length) + 1);

      imgArray.forEach((img) => {
        checkImageLoading(img.src);
      });
    }
  }, []);

  useEffect(() => {
    if (counterEl) {
      counterStateRef.current < 100
        ? (counterEl.innerHTML = `${counterStateRef.current}%`)
        : hidePreloader(preloaderEl);
    }
  }, [counter, counterStep]);
  return;
};

const hidePreloader = (preloaderEl) => {
  preloaderEl.remove();
};

export default usePreloader;
