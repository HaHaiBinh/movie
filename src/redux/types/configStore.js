import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "../reducers/CarouselReducer";
import { Loading_DatVeReducer } from "../reducers/Loading_DatVeReducer";
import { QuanLyDatVeReducer } from "../reducers/QuanLyDatVeReducer";
import { QuanLyNguoiDungReducer } from "../reducers/QuanLyNguoiDungReducer";
import { QuanLyPhimReducer } from "../reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "../reducers/QuanLyRapReducer";

const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  Loading_DatVeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
