import React from "react";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/"}>Home</Link>
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item key="2">
            <Link to={"/userRentals"}>Bookings</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={"/admin"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <div
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </div>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={"/help"}>Help</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="5">
            <Link to={"/login"}>Login</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={"/help"}>Help</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div>
      <div className="header box-shadow-1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link style={{ color: "rgb(2 121 101)" }} to="/">
                    Enveco
                  </Link>
                </b>
              </h1>

              {user ? (
                <Dropdown overlay={menu} placement="bottom">
                  <Button>
                    <UserOutlined /> {user.username}
                  </Button>
                </Dropdown>
              ) : (
                <Dropdown overlay={menu} placement="bottom">
                  <Button>
                    <UserOutlined />
                  </Button>
                </Dropdown>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <hr />
        <p style={{ textAlign: "center" }}>Designed & Developed By</p>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          <b>-</b>
        </p>
      </div>
    </div>
  );
};

export default DefaultLayout;
