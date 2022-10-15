import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CloseOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import {
  CHANGE_TAB_ACTIVE,
  DAT_VE,
} from "../../redux/actions/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVeModel";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment/moment";
import { history } from "../../App";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  console.log("chiTietPhongVe: ", chiTietPhongVe);
  const dispatch = useDispatch();

  useEffect(() => {
    // gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    // dispatch function này đi
    dispatch(action);
  }, []);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";

      // kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat != -1) {
        // nếu có thì cho classGheDaDat thành gheDangDat
        classGheDaDat = "gheDangDat";
      }

      let classGheMinhDaDat = "";
      // tìm ghế nào chính mình đặt thì css màu khác biệt với phần còn lại
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheMinhDaDat = "gheMinhDaDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheMinhDaDat}`}
          >
            {ghe.daDat ? (
              classGheMinhDaDat != "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : (
              ghe.stt
            )}
          </button>

          {(index + 1) % 16 == 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  // lên localStorage lấy key là USER_LOGIN
  /**
   * nếu có: chuyển hướng vào trang checkout (Component)
   * Không có: chuyển hướng về trang login
   */
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="mt-1 grid grid-cols-12">
      <div className="col-span-9">
        <div className="flex flex-col items-center mt-5">
          <div className="bg-black" style={{ width: "80%", height: 15 }}></div>
          {/* hình thang css */}
          <div className={`${style["trapezoid"]} text-center`}>
            <h3 className="mt-3 text-black "> Màn hình</h3>
          </div>
          {/* danh sách ghế */}
          <div>{renderGhe()}</div>
        </div>
        <div className="mt-3 flex justify-center">
          <table className="divide-y divide-gray-200 w-2/3 ">
            <thead className="bg-gray-50 p-3">
              <tr>
                <th>Ghế chưa đặt</th>
                <th>Ghế đang đặt</th>
                <th>Ghế vip</th>
                <th>Ghế đã đặt</th>
                <th>Ghế mình đặt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              <tr>
                <td>
                  <button className="ghe"></button>
                </td>
                <td>
                  <button className="ghe gheDangDat"></button>
                </td>
                <td>
                  <button className="ghe gheVip "></button>
                </td>
                <td>
                  <button className="ghe gheDaDat ">
                    {" "}
                    <CloseOutlined />
                  </button>
                </td>
                <td>
                  <button className="ghe gheMinhDaDat">
                    <UserOutlined />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-span-3">
        <h3 className="text-green-400 text-center text-4xl">
          {danhSachGheDangDat
            .reduce((tongTien, ghe, index) => {
              return (tongTien += ghe.giaVe);
            }, 0)
            .toLocaleString()}
          <span>VND</span>
        </h3>
        <hr />
        {/* Load trang lần đầu tiên sẽ k có dữ liệu nên trang sẽ bị lỗi
            ---- Khắc phục
            B1 : dùng toán tử ? (k nên dùng) ---> optional chalning
            B2 : tạo lớp đối tượng cho state ở reducer, để ban đầu có giá trị mặc định (load lần đầu tiên dữ liệu mặc định ở lớp đối tương)
          */}
        <h3 className="text-2xl pt-2">
          Tên phim :
          <span className="text-green-700"> {thongTinPhim.tenPhim}</span>
        </h3>
        <hr />
        <h3 className="text-lg pt-2">
          Cụm rạp :{" "}
          <span className="text-green-700">{thongTinPhim.tenCumRap}</span>
        </h3>
        <hr />
        <h3 className="text-lg pt-2">
          Địa chỉ :
          <span className="text-green-700"> {thongTinPhim.tenRap}</span>
        </h3>
        <hr />
        <h3 className="text-lg pt-2">
          Ngày giờ chiếu :{" "}
          <span className="text-green-700">
            {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </span>
        </h3>
        <hr />
        <div className="flex flex-row my-5">
          <div className="w-4/5">
            <span className="text-red-500 text-lg">Ghế </span>
            {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDangDat, index) => {
              return (
                <span key={index} className="text-green-500 text-xl">
                  {`${gheDangDat.stt}` + ","}
                </span>
              );
            })}
          </div>
          <div className="text-right col-span-1">
            <span className="text-green-800 text-lg"></span>
          </div>
        </div>
        <hr />
        <div className="my-5">
          <i>Email</i> <br />
          {userLogin.email}
        </div>
        <div className="my-5">
          <i>Phone</i> <br />
          {userLogin.soDT}
        </div>
        <hr />
        <div className="mb-0 h-full flex flex-col items-center">
          <div
            onClick={() => {
              // thongTinDatVe có maLichChieu=id (trên thanh params --- id ở /:checkout/:id)

              // 'maLichChieu': 0.
              // 'danhSachVe' : [
              //   {
              //     'maGhe': 0,
              //     'giaVe' : 0
              //   }
              // ]

              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhSachGheDangDat;
              console.log("thongTinDatVe: ", thongTinDatVe);

              // khi đặt thì gửi thông tin về phía service và lưu trữ
              dispatch(datVeAction(thongTinDatVe));
            }}
            className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
          >
            ĐẶT VÉ
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  console.log("tabActive: ", tabActive);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin.taiKhoan) ? (
        <Fragment>
          {" "}
          <button
            onClick={() => {
              history.push("profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            {userLogin.taiKhoan}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <div className="p-5">
      {/* tabActive : cũng là state (mặc đinh di chuyển qua tab bất kì) */}
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key.toString(),
          });
        }}
      >
        <Tabs.TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
          <Checkout {...props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink to="/">
                <HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} />
              </NavLink>
            </div>
          }
          key="3"
        >
          <KetQuaDatVe />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("thongTinNguoiDung: ", thongTinNguoiDung);

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")} - Ngày
                chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>Địa điểm: {seats.tenHeThongRap}</p>
              <p>Tên rạp: {seats.tenCumRap}</p>
              <p>
                Ghế:{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="pr-1" key={index}>
                      {ghe.tenGhe}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <div className="border-solid rounded">
              <NavLink to="/">Về trang chủ</NavLink>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin thời gian và địa điểm !!!!!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
