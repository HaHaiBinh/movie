import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService";

// config theo backend : dễ maintenance code

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    // taiKhoan:'', matKhau:''
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa.trim() != "") {
      // != "" là ngta có truyền vô
      return this.get(
        // api layDanhSachNguoiDung cho admin tìm kiếm
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
      );
    }
    // api layDanhSachNguoiDung để show ra

    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
