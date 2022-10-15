import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeMenu from "./HomeMenu/HomeMenu";
import MultipleRowSlick from "../../components/React_Slick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  //   console.log(props); props.history/location/match : nhờ có propsRoute trong HomeTemplate

  const { arrFilms } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  // console.log("arrFilms: ", arrFilms);
  const dispatch = useDispatch();

  // const renderFilms = () => {
  //   return arrFilm.map((phim, index) => {
  //     return <Film key={index} />;
  //   });
  // };

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action); //dispatch function từ redux thunk
    // ===============================
    // --> nghiên cứu pure component: tối ưu code (tránh re-render nhiều lần khi call api)
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  return (
    <div>
      <HomeCarousel />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto w-4/5 ">
          <MultipleRowSlick arrFilms={arrFilms} />
        </div>
      </section>
      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
