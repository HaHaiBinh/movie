import React, { Fragment, useState } from "react";

import { Radio, Space, Tabs } from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function HomeMenu(props) {
  console.log("props", props);
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  const renderHeThongRap = () => {
    return props.heThongRapChieu?.map((heThongRap, index) => {
      /* Load hệ thống rap */
      return (
        <TabPane
          tab={
            <img src={heThongRap.logo} className="rounded-full" width={50} />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap.map((cumRap, index) => {
              /* Load cụm rạp */
              return (
                <TabPane
                  tab={
                    <div style={{ width: "400px" }}>
                      <div className="text-left">{cumRap.tenCumRap}</div>
                      <div className="text-left"> {cumRap.diaChi}</div>
                    </div>
                  }
                  key={index}
                >
                  {/* Load phim tương ứng */}
                  {cumRap.danhSachPhim.slice(0, 5).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-5">
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ height: 75, width: 75 }}
                              src={phim.hinhAnh}
                              alt={phim.ten}
                            />
                            <div className="ml-2">
                              <h1 className="text-2xl text-gray-500">
                                {phim.tenPhim}
                              </h1>
                              <div className="grid grid-cols-4 gap-5 ">
                                {phim.lstLichChieuTheoPhim
                                  .slice(0, 8)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className="text-2xl text-green-400 "
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        <div className="border-gray-400 border">
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </div>
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 24,
        }}
      ></Space>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
}
