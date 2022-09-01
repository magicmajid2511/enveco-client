import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/rentalActions";
import { Col, Row } from "antd";
import moment from "moment";
import Spinner from "../components/Spinner";

function UserBookings() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (document.body.clientWidth < 400) {
    const viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=0.75, user-scalable=0"
    );
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="back-img background-repeat">
        <h1 className="text-center mt-2 main-title-text">My Bookings</h1>

        <Row justify="center" gutter={16}>
          <Col lg={16} sm={24}>
            {bookings
              .filter((o) => o.user === user._id)
              .map((booking) => {
                return (
                  <Row
                    gutter={16}
                    className="box-shadow-1 mt-3 text-left"
                    key={booking._id}
                    style={{ background: "rgb(2, 121, 101)", padding: "15px" }}
                  >
                    <Col lg={6} sm={24}>
                      <p style={{ color: "white" }}>
                        <b>{booking.car.name}</b>
                      </p>
                      <p style={{ color: "white" }}>
                        Total Hours : <b>{booking.totalHours}</b>
                      </p>
                      <p style={{ color: "white" }}>
                        Rent Per Hour : <b>{booking.car.rentPerHour}</b>
                      </p>
                      <p style={{ color: "white" }}>
                        Total Amount : <b>{booking.totalAmount} $</b>
                      </p>
                    </Col>

                    <Col lg={12} sm={24}>
                      <p style={{ color: "white" }}>
                        Transaction ID : <b>{booking.transactionId}</b>
                      </p>
                      <p style={{ color: "white" }}>
                        From : <b>{booking.bookedTimeSlots.from}</b>
                      </p>
                      <p style={{ color: "white" }}>
                        To : <b>{booking.bookedTimeSlots.to}</b>
                      </p>
                      <p style={{ color: "white" }}>
                        Date of booking :{" "}
                        <b>{moment(booking.createdAt).format("DD MMM yyyy")}</b>
                      </p>
                    </Col>

                    <Col lg={6} sm={24} className="text-right">
                      <img
                        src={booking.car.image}
                        alt="car_image"
                        height="140"
                        className="p-2"
                        style={{ borderRadius: "10px" }}
                      />
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default UserBookings;
