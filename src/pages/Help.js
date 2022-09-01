import React from "react";
import { Row, Col, Form, Input, message } from "antd";

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
            <h2>Contact Us</h2>
            <h4>Email:</h4>
            <p>enveco1sharing@gmail.com</p>
            <h4>Telephone:</h4>
            <p>+47 912 34 567</p>
            <h4><a href="https://www.facebook.com/people/Enveco/100085227875313/" target={"_blank"}></a>Facebook</h4>
            <h4><a href="https://www.instagram.com/enveco1sharing/" target={"_blank"} ></a>instagram</h4>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default Help