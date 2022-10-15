import { GROUP_ID } from "../util/settings/config";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVeModel";
import { baseService } from "./baseService";

// config theo backend : dễ maintenance code

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }
  layChiTietPhongVe = (maLichChieu) => {
    return this.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };

  /* 
  ---- Tạo lớp đối tượng thongTinDatVe
  thongTinDatVe = {
    'maLichChieu': 0.
    'danhSachVe' : [
      {
        'maGhe': 0,
        'giaVe' : 0
      }
    ]
  }
  */

  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };
  taoLichChieu = (thongTinLichChieu) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
