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
}

export const quanLyRapService = new QuanLyRapService();
