import { Progress, Rate } from "antd";
import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinchiTietPhimAction } from "../../redux/actions/QuanLyRapAction";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import moment from "moment";
import TabPane from "antd/lib/tabs/TabPane";
import { NavLink } from "react-router-dom";

export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
  console.log("filmDetail: ", filmDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    //  lấy thông tin param từ url (app.js -> /detail/:id)
    let { id } = props.match.params;
    dispatch(layThongTinchiTietPhimAction(id));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: 100, minHeight: "100vh" }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-6 col-start-3">
            <div className="grid grid-cols-3">
              <img className="col-span-1" src={filmDetail.hinhAnh} alt="123" />
              <div className="col-span-2 ml-5" style={{ marginTop: "5%" }}>
                <p>
                  Ngày chiếu:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <p className="text-3xl leading-3">{filmDetail.tenPhim}</p>
                <p>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 col-start-10">
            <h1
              style={{
                marginLeft: "10%",
                color: "yellow",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Đánh giá
            </h1>

            <h1
              style={{ marginRight: "8%" }}
              className="text-green-400 text-2xl"
            >
              <Rate
                allowHalf
                value={filmDetail.danhGia / 2}
                style={{ color: "#78ed78", fontSize: 20 }}
              />
            </h1>

            <Progress
              className="grid grid-cols-2  "
              type="circle"
              percent={filmDetail.danhGia * 10}
              format={(percent) => {
                return (
                  <span className="text-black font-medium">{percent} điểm</span>
                );
              }}
            />
          </div>
        </div>

        <div className="mt-10 w-2/3 ml-60 bg-white p-5">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
              <div>
                <Tabs tabPosition={"left"} className="bg-white ">
                  {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                    return (
                      <TabPane
                        key={index}
                        tab={
                          <div className="flex flex-row items-center justify-center">
                            <img
                              src={heThongRap.logo}
                              alt="123"
                              className="rounded-full"
                              width={50}
                            />
                            <div className="text-center ml-2">
                              {heThongRap.tenHeThongRap}
                            </div>
                          </div>
                        }
                      >
                        {heThongRap.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div className="mt-5" key={index}>
                              <div className="flex flex-row">
                                <img
                                  style={{ width: 60, height: 60 }}
                                  src={cumRap.hinhAnh}
                                  alt="123"
                                />
                                <div className="ml-2">
                                  <p
                                    // className="text-lg leading-4"
                                    style={{
                                      fontSize: "20",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p className="">{cumRap.diaChi}</p>
                                </div>
                              </div>
                              <div className="thong-tin-lich-chieu grid grid-cols-4">
                                {cumRap.lichChieuPhim
                                  ?.slice(0, 8)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        className="col-span-1 text-green-500"
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
              Thông tin
            </TabPane>
            <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
              Đánh giá
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
