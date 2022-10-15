import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService";

// config theo backend : dễ maintenance code

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }
  layDanhSachHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
    );
  };
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
  layThongTinHeThongRap = () => {
    // admin -> dùng useState chứ k dùng redux
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };
  layThongTinCumRapTheoHeThong = (maHeThongRap) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
