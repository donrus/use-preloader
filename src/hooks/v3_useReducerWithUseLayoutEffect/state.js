export const SET_COUNTER = "SET_COUNTER";
export const SET_COUNTER_STEP = "SET_COUNTER_STEP";
export const initialState = {
  counter: 0,
  counterStep: 0,
};
export const reducer = (state, action) => {
  switch (action.type) {
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
};
