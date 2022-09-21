import React, { Component } from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css"; // styleSlick kiểu dạng như class mẹ (chấm đến các class con trong file css)
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";

/**
 * custom các class css
 *  hocVien : {
 *    ten-hhb: "binh",
 *    lop: "abc"
 * }
 *
 * hocVien['ten-hhb'] -> dùng cách này có thể lấy bất cứ thuộc tính nào có ký tự đặc biệt
 */

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    return props.arrFilms.slice(0, 12).map((item, index) => {
      return (
        <div className={` mr-2`} key={index}>
          {/* className={`${styleSlick["width-item"]}`} */}
          {/* <Film phim={item} /> */}
          <Film_Flip item={item} />
        </div>
      );
    });
  };
  const settings = {
    className: "center variableWidth",
    centerMode: true,
    infinite: true,
    centerPadding: "-10px",
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <button
        className={`${styleSlick[activeDC]} mr-2 px-8 py-3 font-semibold border rounded border-gray-600`}
        onClick={() => {
          const action = { type: SET_PHIM_DANG_CHIEU };
          dispatch(action);
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        className={`${styleSlick[activeSC]} px-8 py-3 font-semibold border rounded border-gray-600`}
        onClick={() => {
          const action = { type: SET_PHIM_SAP_CHIEU };
          dispatch(action);
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};
export default MultipleRowSlick;
