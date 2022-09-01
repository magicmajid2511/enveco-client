import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";


import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Profile = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    if (
      values.firstName === undefined ||
      "" ||
      values.lastName === undefined ||
      "" ||
      values.adress === undefined ||
      "" ||
      values.cardDetails === undefined ||
      "" ||
      values.image === undefined ||
      ""
    ) {
      message.error("Please fill all the fields");
    } else {
      dispatch(Profile(values));
    }
  };


  return (
<DefaultLayout>
      {loading && <Spinner />}
      <div className="back-img background-repeat">
        <Row justify="center" className="mt-5">
          <Col lg={12} sm={24} xs={22}>
            <Form
              className="box-shadow-1 p-2 login-form"
              layout="vertical"
              onFinish={onFinish}
            >
              <h1 className="main-title-text">My Profile</h1>
              <hr />
              <Form.Item name="firstName" label="First Name">
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item name="lastName" label="Last Name">
                <Input placeholder="Last Name" />
              </Form.Item>

              <Form.Item name="adress" label="Adress">
                <Input placeholder="Adress" />
              </Form.Item>

              <Form.Item name="cardDetails" label="Card Details">
                <Input placeholder="Card Details" />
              </Form.Item>

              <Form.Item name="image" label="Image url">
                <Input placeholder="Image URL" />
              </Form.Item>

              <div className="text-right">
                <button className="button1 mr-1">Update Profile</button>
                <button className="button1">
                  <Link to="/admin">Cancel</Link>
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default Profile