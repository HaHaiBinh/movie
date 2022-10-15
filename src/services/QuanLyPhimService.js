import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService";

// config theo backend : dễ maintenance code

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }
  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };
  /* tái sử dụng api truyền tenPhim = "" để k bị lỗi api bên user */
  layDanhSachPhim = (tenPhim = "") => {
    if (tenPhim.trim() != "") {
      // != "" là ngta có truyền vô
      return this.get(
        // api layDanhSachPhim cho admin tìm kiếm
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`
      );
    }
    // api layDanhSachPhim show cho user
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  };
  themPhimUploadHinh = (formData) => {
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  };
  layThongTinPhim = (maPhim) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };
  capNhatPhimUpload = (formData) => {
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  };
  xoaPhim = (maPhim) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
