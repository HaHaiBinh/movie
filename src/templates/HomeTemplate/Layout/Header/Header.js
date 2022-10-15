import _ from "lodash";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { USER_LOGIN } from "../../../../util/settings/config";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      /* chưa đăng nhập */
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded border-white border"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded  dark:bg-violet-400 dark:text-gray-900"
          >
            Sign up
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          onClick={() => {
            history.push("/profile");
          }}
          className="self-center px-8 py-3 rounded border-white border"
        >
          {userLogin.taiKhoan}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            history.push("/home");
            window.location.reload();
          }}
          className="text-yellow-500 ml-5"
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };

  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100 bg-black bg-opacity-40 text-white w-full fixed z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
            alt="cgv.logo"
          />
        </NavLink>

        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white"
              activeClassName="border-b-2"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center px-4 -mb-1 dark:border-transparent text-white"
              activeClassName="border-b-2"
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center px-4 -mb-1 dark:border-transparent text-white"
              activeClassName="border-b-2"
            >
              News
            </NavLink>
          </li>
        </ul>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
