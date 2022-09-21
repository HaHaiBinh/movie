import { SET_CAROUSEL } from "../actions/types/CarouselType";

const initialState = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAROUSEL: {
      state.arrImg = action.arrImg;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
