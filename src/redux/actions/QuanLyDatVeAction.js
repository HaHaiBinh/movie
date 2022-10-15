import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVeModel";
import { batLoadingAction, tatLoadingAction } from "./Loading_DatVeAction";
import {
  CHUYEN_TAB,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      // console.log("result: ", result);
      if (result.status == 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      dispatch(batLoadingAction);
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      console.log("result: ", result.data.content);
      //   Đặt vé thành công gọi api tại phòng vé
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_VE_HOAN_TAT });
      await dispatch(tatLoadingAction);
      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      console.log("error: ", error.response.data);
      dispatch(tatLoadingAction);
    }
  };
};
