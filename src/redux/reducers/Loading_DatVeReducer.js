import { BAT_LOADING, TAT_LOADING } from "../actions/types/Loading_DatVeType";

const initialState = {
  isLoading: false,
};

export const Loading_DatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAT_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case TAT_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
