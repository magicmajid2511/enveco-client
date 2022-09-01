import React from "react";
import { Row, Col, Space } from "antd";

import DefaultLayout from "../components/DefaultLayout";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Help = () => {
  return (
    <DefaultLayout>
      <div className="back-img background-repeat">
        <Row justify="center" className="mt-5">
          <Col lg={12} sm={24} xs={22}>
            <Space direction="vertical" justify="center">
              <h2 className="main-title-text-help">Contact Us</h2>
              <h4 className="main-title-text-help">Email:</h4>
              <p className="main-title-text-help">enveco1sharing@gmail.com</p>
              <h4 className="main-title-text-help">Telephone:</h4>
              <p className="main-title-text-help">+47 912 34 567</p>
              <h4 className="main-title-text-help">
                <a
                  href="https://www.facebook.com/people/Enveco/100085227875313/"
                  target="_blank"
                >
                  {" "}
                  Facebook
                </a>
              </h4>
              <h4 className="main-title-text-help">
                <a
                  href="https://www.instagram.com/enveco1sharing/"
                  target="_blank"
                >
                  Instagram
                </a>
              </h4>
            </Space>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default Help;
