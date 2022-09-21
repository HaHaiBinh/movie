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
  layDanhSachPhim = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
