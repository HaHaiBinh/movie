import axios from "axios";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DOMAIN, TOKEN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselType";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      /* call api như bình thường */
      // const result = await axios({
      //   url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
      //   method: "GET",
      //   headers: {
      //     TokenCybersoft: TOKEN,
      //   },
      // });
      const result = await quanLyPhimService.layDanhSachBanner();
      console.log("result: ", result);
      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
