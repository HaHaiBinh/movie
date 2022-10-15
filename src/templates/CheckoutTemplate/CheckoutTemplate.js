import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";

// vì trang checkout không liên quan đến trang khác nhưng vì mục đích có thể tái sử dụng thì nên tạo template riêng
export const CheckoutTemplate = (props) => {
  const { Component, ...restProps } = props;

  //  render thì luôn luôn scrool lên đầu trang, k bị lặp vô tận (k setState hay dispatch)
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // if (!localStorage.getItem(USER_LOGIN)) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
