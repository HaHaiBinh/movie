import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG,
} from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
import { message } from "antd";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      // thành công
      if (result.data.statusCode == 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        // chuyển hướng đăng nhập về trang trước đó
        history.goBack();
      }

      console.log("result: ", result);
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      // thành công
      if (result.data.statusCode == 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }

      console.log("result: ", result);
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  };
};

export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      // thành công
      if (result.data.statusCode == 200) {
        dispatch({
          type: SET_DANH_SACH_NGUOI_DUNG,
          danhSachNguoiDung: result.data.content,
        });
      }
      console.log("result: ", result);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      message.success("Xoá người dùng thành công");
      //   sau khi xóa load lại danh sách phim mới
      dispatch(layDanhSachNguoiDungAction());
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
};
