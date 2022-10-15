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
export default function Films() {
  const { arrFilmsDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  //   console.log("arrFilmsDefault: ", arrFilmsDefault);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["ascend", "descend"],
      width: 150,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: 100,
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id//${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: 300,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "...."
              : film.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/films/edit/${film.maPhim}`}
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
                    "Bạn có chắc muốn xóa phim " + film.tenPhim + " không ?"
                  )
                ) {
                  // gọi action
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
            <NavLink
              key={3}
              className="ml-2 text-2xl"
              to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                // khi click btn tạo lịch chiếu thì lưu film đó lên local để tái sử dụng trong phần taoj lịch chiếu
                localStorage.setItem("filmParams", JSON.stringify(film));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];
  const data = arrFilmsDefault;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const { Search } = Input;
  const onSearch = (value) => {
    // console.log(value); -> value = tenPhim
    // gọi api layDanhSachPhim
    dispatch(layDanhSachPhimAction(value));
  };

  return (
    <div className="container">
      <h3 className="text-2xl">Quản lý phim</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
      >
        Thêm phim
      </Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
