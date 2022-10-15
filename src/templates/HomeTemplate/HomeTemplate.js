import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => {
  // path, exact, Component = props bên app.js
  // đây là phần dùng chung : HomeTemplate
  // ...restProps = path,exact : xác định đúng đường dẫn -> đúng mới load Route còn sai thì bỏ qua
  const { Component, ...restProps } = props;
  //  render thì luôn luôn scrool lên đầu trang, k bị lặp vô tận (k setState hay dispatch)
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      // load đến HomeTemplate nếu đúng exact, path (...restProps) --> render (Route)
      {...restProps}
      // k nên dùng component={Component} : vì nếu có thì chỉ render được phần component động (k có header, footer)
      // --> Route có render (truyền vào component trung gian) : sinh ra các tp (header, footer)
      render={(propsRoute) => {
        // props.location, props.history, props.match = propsRoute
        /**
         *  Phần propsRoute trong render
         *  +Nếu không có: các Component (Home) k thể dùng các props như location, history, match
         *  +Nếu có: các Component (Home) có thể dùng được các props như trên để thực hiện các tác vụ (chuyển trang)
         */

        return (
          <Fragment>
            <Header {...propsRoute} />
            {/* <HomeCarousel {...propsRoute} /> */}

            {/* thành phần động */}
            <Component {...propsRoute} />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
};
