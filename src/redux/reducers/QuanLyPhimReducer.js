import {
  SET_DANH_SACH_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../actions/types/QuanLyPhimType";

const initialState = {
  // arrFilms : là state đầu tiên (props của MultipleRowSlick)
  // lấy toàn bộ data từ api về lưu vào arrFilms
  // -> dùng để slice ra 12 film lúc render đầu tiên
  // kết quả sau khi filter
  arrFilms: [
    {
      maPhim: 1296,
      tenPhim: "Avengers: Infinity War ",
      biDanh: "avengers-infinity-war",
      trailer: "https://www.youtube.com/embed/DKqu9qc-5f4",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/avengers-infinity-war.jpg",
      moTa: "Biệt đội siêu anh hùng Avengers và những đồng minh sẽ phải sẵn sàng hi sinh tính mạng để chống lại siêu ác nhân hùng mạnh Thanos trước khi hắn phá huỷ mọi thứ và đặt dấu chấm hết cho vũ trụ. ",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmsDefault: [],
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilms = action.arrFilms;
      state.arrFilmsDefault = state.arrFilms;
      return { dangChieu: false, sapChieu: false, ...state };
    }
    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilms = state.arrFilmsDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilms = state.arrFilmsDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    default:
      return { ...state };
  }
};
