const SET_COUNTER = "SET_COUNTER";
const SET_COUNTER_STEP = "SET_COUNTER_STEP";
const SET_IMAGES = "SET_IMAGES";

export const initialState = {
  counter: 0,
  counterStep: 0,
  images: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return { ...state, images: action.data };
    case SET_COUNTER:
      return { ...state, counter: action.data };
    case SET_COUNTER_STEP:
      return { ...state, counterStep: action.data };
    default:
      throw new Error("This action is not applicable to this component.");
  }
};

export const ACTIONS = {
  SET_COUNTER,
  SET_COUNTER_STEP,
  SET_IMAGES,
};

export const getCounterStep = (state) => state.counterStep;
export const getCounter = (state) => state.counter;
