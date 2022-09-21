import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = () => {
  return async (dispatch) => {
    try {
      // sử dụng thamSo
      const result = await quanLyPhimService.layDanhSachPhim();
      console.log("result: ", result);

      // sau khi lấy dữ liệu từ api về => redux (reducer)
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilms: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
