import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
import "./HomeCarousel.css";

const contentStyle = {
  height: "700px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  /*  sẽ tự kích hoạt khi component load ra */
  // ---- Goị api truyền thống
  // useEffect(async () => {
  //   try {
  //     const result = await axios({
  //       url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
  //       method: "GET",
  //       headers: {
  //         TokenCybersoft:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMSIsIkhldEhhblN0cmluZyI6IjIzLzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzExMDQwMDAwMCIsIm5iZiI6MTY0ODQwMDQwMCwiZXhwIjoxNjc3MjU4MDAwfQ.0byoDjBIIS6877xg7NwEnO16v5HOltI9AatD9OLB0Ys",
  //       },
  //     });
  //     console.log("result: ", result);
  //     dispatch({
  //       type: "SET_CAROUSEL",
  //       arrImg: result.data.content,
  //     });
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // }, []);

  useEffect(() => {
    // viết redux thunk để tái sử dụng
    // để truyền tham số trong getCarouselAction thì bên action phải là arrow function để nhận props
    const action = getCarouselAction();
    // (k chạy hàm action -> để tự redux thunk gọi và chạy)

    /**
     * Trong hàm dispatch chỉ nhận 2 loại
     * 1: action = {type: '', data}
     * 2: (phải cài middleware): callbackFunction(dispatch)
     */
    dispatch(action); // callback (getCarouselAction)
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className=" opacity-0" alt={item.hinhAnh} />
          </div>
        </div>
      );
    });
  };

  return (
    <Carousel autoplay style={{ width: "100%", padding: 0, margin: 0 }}>
      {renderImg()}
    </Carousel>
  );
}
