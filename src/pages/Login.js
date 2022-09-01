import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/authActions";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import car from "../assets/car.png";

AOS.init();

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    if (
      values.username === undefined ||
      "" ||
      values.password === undefined ||
      ""
    ) {
      message.error("Please fill all the fields");
    } else {
      dispatch(userLogin(values));
    }
  };

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            data-aos="slide-right"
            data-aos-duration="1500"
            alt="logo"
            src={car}
            height={250}
          />
          <h1 className="login-logo">Enveco</h1>
        </Col>
        <Col lg={8} className="text-left p-5 ">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>

            <button className="button2 mt-2">Login</button>

            <hr />

            <Link to="/register">Not registered ? click here to register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
