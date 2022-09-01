import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import {
  Row,
  Col,
  DatePicker,
  Typography,
  Card,
  Space,
  Divider,
  Select,
} from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import car from "../assets/car.png";
import money from "../assets/money.png";
import tool from "../assets/tool.png";
import eco from "../assets/eco.png";
import { CountryRegionData } from "react-country-region-selector";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Home = ({ user }) => {
  const [totalCars, setTotalCars] = useState([]);
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState("");

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const userData = JSON.parse(user);

  const dispatch = useDispatch();

  const getCountries = () => CountryRegionData;

  const countries = getCountries();

  const getStates = (index) =>
    CountryRegionData[index][2].split("|").map((state) => {
      state = state.split("~");
      return {
        label: state[0],
        value: state[1],
      };
    });

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setTotalCars(cars.filter((c) => c.user !== userData._id));
    } else {
      setTotalCars(cars);
    }
  }, [cars]);

  const setFilter = (dates) => {
    if (dates) {
      moment.suppressDeprecationWarnings = true;

      const selectedFrom = moment(dates[0], "DD MMM yyyy HH:mm");
      const selectedTo = moment(dates[1], "DD MMM yyyy HH:mm");

      const temp = [];

      for (let car of cars) {
        if (car.bookedTimeSlots.length === 0) {
          temp.push(car);
        } else {
          for (let booking of car.bookedTimeSlots) {
            if (
              selectedFrom.isBetween(booking.from, booking.to) ||
              selectedTo.isBetween(booking.from, booking.to) ||
              moment(booking.from).isBetween(selectedFrom, selectedTo) ||
              moment(booking.to).isBetween(selectedFrom, selectedTo)
            ) {
            } else {
              temp.push(car);
            }
          }
        }
      }
      setTotalCars(temp);
    } else {
      window.location.reload();
    }
  };

  const setCarCountry = (value) => {
    if (!value) return;
    const temp = [];

    cars.forEach((car) => {
      if (car.country === value) {
        temp.push(car);
      }
    });
    setCountry(value);
    setTotalCars(temp);
  };

  const setCarState = (value, title) => {
    if (!value) return;
    const temp = [];

    cars.forEach((car) => {
      if (car.state === value) {
        temp.push(car);
      }
    });
    setCurrentState(title);
    setTotalCars(temp);
  };

  return (
    <DefaultLayout>
      <Link className="button1 box-shadow" to="/help">
         Help
        </Link>
      <div className="back-img">
        <Title level={3} className="main-title-text">
          Eco-Friendly & smart car sharing that is good for the enviroment
        </Title>
        <Row className="mt-3" justify="center">
          <Col
            lg={24}
            sm={24}
            xs={24}
            className="d-flex justify-content-center form-height"
          >
            <div className="box-shadow-1 p-2 where" layout="inline">
              <span> Country :</span>{" "}
              <Select
                showSearch
                className="selector-width"
                allowClear
                onChange={(value, option) => {
                  if (value) setStates(getStates(option.key));
                  setCarCountry(value);
                }}
                onClear={() => {
                  setTotalCars(cars);
                  setCurrentState("");
                  setStates([]);
                }}
                filterOption={(input, option) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
                size="small"
              >
                {countries.map((c, i) => (
                  <Option key={i} value={c[1]}>
                    {c[0]}
                  </Option>
                ))}
              </Select>
              <span> State :</span>{" "}
              <Select
                showSearch
                className="selector-width"
                size="small"
                allowClear
                onChange={(value, option) => {
                  setCarState(value, option.children);
                }}
                onClear={() => {
                  setCarCountry(country);
                  setCurrentState("");
                }}
                filterOption={(input, option) =>
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
                value={currentState}
              >
                {states.map((s, i) => (
                  <Option key={i} value={s.value}>
                    {s.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
        </Row>

        <Row className="mt-3" justify="center">
          <Col
            lg={20}
            sm={24}
            xs={24}
            className="d-flex justify-content-center "
          >
            <RangePicker
              className="tofrom"
              showTime={{ format: "HH:mm" }}
              format="DD MMM yyyy HH:mm"
              onChange={setFilter}
            />
          </Col>
        </Row>

        {loading && <Spinner />}

        <Row justify="center" gutter={16}>
          {totalCars.map((car) => {
            return (
              <Col lg={6} sm={24} xs={24} key={car._id}>
                <Card
                  className="car"
                  hoverable
                  cover={<img src={car.image} alt={car.name} />}
                >
                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div>
                      <p>{car.name}</p>
                      <p>{car.rentPerHour}$ Rent Per Hour</p>
                    </div>
                    <div>
                      <button className="button1 mr-2">
                        <Link to={user ? `/rentals/${car._id}` : "/login"}>
                          Book Now
                        </Link>
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <Divider />
      <Row justify="center" className="p-100 gray-color">
        <Space size={50}>
          <img src={car} height={250} alt="car" />
          <Title level={5} className="para-text">
            Cars account for a significant part of the world's CO2 emissions. If
            we got better at sharing the cars, we could settle for half as many
            cars in the city and take better care of the planet.
            <Title level={4} className="title-text">
              That's why Enveco helps people share cars.
            </Title>
          </Title>
        </Space>
      </Row>
      <Divider />
      <Row justify="center" className="p-100">
        <Space size={50}>
          <img src={money} height={350} alt="car" />
          <Title level={5} className="para-text">
            Share your car when you don’t use it and make money of your car when
            it is just standing.
            <Title level={4} className="title-text">
              Hire a car if you need a car for a hour, a day, a week or for
              months
            </Title>
          </Title>
        </Space>
      </Row>
      <Divider />
      <Row justify="center" className="p-100 gray-color">
        <Space size={50}>
          <img src={tool} height={250} alt="car" />
          <Title level={5} className="para-text">
            You are insured
            <Title level={4} className="title-text">
              Every cars are insured and cover by 24/7 roadside assistance.
            </Title>
          </Title>
        </Space>
      </Row>
      <Divider />
      <Row justify="center" className="p-100">
        <Space size={50}>
          <img src={eco} height={250} alt="car" />
          <Title level={4} className="title-text">
            Take care of our Environment
          </Title>
        </Space>
      </Row>
      <Divider />
      <Row justify="center" className="p-100 gray-color">
        <Space size={50}>
          <Title level={4} className="title-text">
            If you rent an electric car then we dont charge any commission
          </Title>
        </Space>
      </Row>
    </DefaultLayout>
  );
};

export default Home;
