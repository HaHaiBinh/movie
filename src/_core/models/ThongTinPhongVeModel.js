// lớp đối tượng ThongTinLichChieu là lớp đối tượng mặc định có sẵn
// để load trang lần đầu tiên api chưa về sẽ k bị báo lỗi, tránh dùng toán tử ?

export class ThongTinLichChieu {
  thongTinPhim = new ThongTinPhim();
  danhSachGhe = [];
}

// api là object
export class ThongTinPhim {
  diaChi = "";
  gioChieu = "";
  hinhAnh = "";
  maLichChieu = "";
  ngayChieu = "";
  tenCumRap = "";
  tenPhim = "";
  tenRap = "";
}

// api là array
export class DanhSachGhe {
  daDat = "";
  giaVe = "";
  loaiGhe = "";
  maGhe = "";
  maRap = "";
  stt = "";
  taiKhoanNguoiDat = "";
  tenGhe = "";
}
