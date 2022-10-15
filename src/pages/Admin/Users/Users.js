import React from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import {
  layDanhSachNguoiDungAction,
  xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
export default function Films() {
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  console.log("danhSachNguoiDung: ", danhSachNguoiDung);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: 250,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: 250,
    },

    {
      title: "Email",
      dataIndex: "email",
      width: 250,
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: 250,
    },
    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/user/edit/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              key={2}
              className="text-2xl"
              style={{ cursor: "pointer" }}
              onClick={() => {
                // gọi action xóa
                if (
                  window.confirm(
                    "Bạn có chắc muốn xóa tài khoản " +
                      user.taiKhoan +
                      " không ?"
                  )
                ) {
                  // gọi action
                  dispatch(xoaNguoiDungAction(user.taiKhoan));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
    },
  ];
  const data = danhSachNguoiDung;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const { Search } = Input;
  const onSearchUser = (value) => {
    console.log(value); // -> value = tenPhim
    // gọi api layDanhSachPhim
    dispatch(layDanhSachNguoiDungAction(value));
  };

  return (
    <div className="container">
      <h3 className="text-2xl">Quản lý người dùng</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/users/addnewuser");
        }}
      >
        Thêm người dùng
      </Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearchUser}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
