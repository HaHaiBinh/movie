import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../App";

export default function Film_Flip(props) {
  const { item } = props;

  return (
    <div className="flip-card mt-2">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={item.hinhAnh}
            alt="Avatar"
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img
              src={item.hinhAnh}
              alt="avartar"
              style={{ width: 300, height: 300 }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer ">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      {/* onclick để vào trang detail */}
      {/* <div className=" text-center cursor-pointer py-2 bg-indigo-300 text-success-50 font-bold">
      // vấn đề phải click vào chữ đặt vé mới access qua link detail
        <NavLink to={`/detail/${item.maPhim}`}>ĐẶT VÉ</NavLink>
      </div> */}
      {/* Để fix vấn đề ta dùng thư viện history để link qua các trang */}

      <div
        onClick={() => {
          history.push(`/detail/${item.maPhim}`);
        }}
      >
        <div className=" text-center cursor-pointer py-2 bg-indigo-300 text-success-50 font-bold">
          ĐẶT VÉ
        </div>
      </div>
    </div>
  );
}
