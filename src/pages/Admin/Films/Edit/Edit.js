import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
  themPhimUploadHinhAction,
} from "../../../../redux/actions/QuanLyPhimAction";
import { GROUP_ID } from "../../../../util/settings/config";

const Edit = (props) => {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  console.log("thongTinPhim: ", thongTinPhim);

  useEffect(() => {
    return () => {
      let { id } = props.match.params;
      dispatch(layThongTinPhimAction(id));
    };
  }, []);

  const formik = useFormik({
    enableReinitialize: true, // thuộc tính chỉ dùng trong edit (formik) để edit formData
    initialValues: {
      maPhim: thongTinPhim.maPhim, // mặc định
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      maNhom: GROUP_ID,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      values.maNhom = GROUP_ID;
      //   tạo đối tượng formData => đưa giá trị values từ formik vào formData
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //   console.log("formData: ", formData.get("File")); -> dùng get mới lấy đc value của formData
      //   cập nhật phimupload hình
      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const handleDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  //   closure function
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    // lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type == "image/jpeg" ||
      file.type == "image/jpg" ||
      file.type == "image/gif" ||
      file.type == "image/png"
    ) {
      //   đem dữ liệu vào formik
      await formik.setFieldValue("hinhAnh", file);
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); // hình base 64
      };
    }
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Chỉnh sửa phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            onChange={handleDatePicker}
            format="DD/MM/YYYY"
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png,image/jpeg,image/gif,image/png"
          />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={imgSrc == "" ? thongTinPhim.hinhAnh : imgSrc}
          />
        </Form.Item>
        <Form.Item label="Thao tác">
          <button type="submit" className="bg-blue-500 text-white p-2">
            Cập nhật phim
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
