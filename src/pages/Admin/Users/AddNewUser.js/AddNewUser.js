import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { GROUP_ID } from "../../../../util/settings/config";
const { Option } = Select;

export default function AddNewUser() {
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: 0,
      maLoaiNguoiDung: "",
      hoTen: "",
      maNhom: GROUP_ID,
    },
    onSubmit: (values) => {
      console.log("values: ", values);
    },
  });

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue(value);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
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
      <h3>Thêm người dùng mới</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tài khoản">
        <Input name="taiKhoan" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input name="matKhau" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input name="hoTen" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <InputNumber
          style={{ width: 200 }}
          name="soDt"
          onChange={handleChangeInputNumber("soDt")}
        />
      </Form.Item>
      <Form.Item label="Loại người dùng" name="maLoaiNguoiDung">
        <Select onChange={handleChangeSelect}>
          {/* <Select.Option value="khachHang">KhachHang</Select.Option>
          <Select.Option value="quanTri">QuanTri</Select.Option> */}
          <Option value="khachHang">KhachHang</Option>
          <Option value="quanTri">QuanTri</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Thao tác">
        <button type="submit" className="bg-blue-500 text-white p-2">
          Thêm người dùng
        </button>
      </Form.Item>
    </Form>
  );
}
