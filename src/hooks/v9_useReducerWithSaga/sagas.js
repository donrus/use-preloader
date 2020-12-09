import { eventChannel, buffers } from "redux-saga";
import { call, select, take, put } from "redux-saga/effects";
import { ACTIONS, getCounterStep, getCounter } from "./state";

export const getImageLoadingSagas = (imagesArray) => {
  return eventChannel((emit) => {
    for (const img of imagesArray) {
      const imageChecker = new Image();
      let counter = 0;
      imageChecker.addEventListener("load", () => {
        emit(counter++);
      });
      imageChecker.addEventListener("error", () => {
        emit(counter++);
      });
      imageChecker.src = img.src;
    }
    return () => {};
  }, buffers.fixed(20));
};

function* putCounter() {
  const currentCounter = yield select(getCounter);
  const counterStep = yield select(getCounterStep);
  yield put({ type: ACTIONS.SET_COUNTER, data: currentCounter + counterStep });
  yield take((action) => {
    return action.type === "REACT_STATE_READY";
  });
}

function* launchLoadingEvents(imgArray) {
  const eventsChannel = yield call(getImageLoadingSagas, imgArray);

  while (true) {
    yield take(eventsChannel);
    yield call(putCounter);
  }
}

export function* saga() {
  while (true) {
    const { data } = yield take(ACTIONS.SET_IMAGES);
    yield call(launchLoadingEvents, data);
  }
}
