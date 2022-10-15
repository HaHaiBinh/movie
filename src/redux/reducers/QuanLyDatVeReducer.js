import {
  CHANGE_TAB_ACTIVE,
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "../actions/types/QuanLyDatVeType";
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVeModel";

const initialState = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
  tabActive: "1",
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }

    case DAT_VE: {
      // console.log(action);
      // cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      // tìm vị trí : lấy ghế trên state so sánh gheDuocChon trong Checkout
      let index = danhSachGheCapNhat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === action.gheDuocChon.maGhe
      );
      if (index != -1) {
        // nếu tìm thấy gheDuocChon trong mảng có nghĩa là trước đó đã click vào rồi => remove đi
        danhSachGheCapNhat.splice(index, 1);
      } else {
        // nếu không tồn tại thì push vào mảng
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }

    case CHUYEN_TAB: {
      state.tabActive = "2";
      return { ...state };
    }

    case CHANGE_TAB_ACTIVE: {
      state.tabActive = action.tabActive;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
