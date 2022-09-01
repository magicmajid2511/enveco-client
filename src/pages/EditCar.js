import { Col, Row, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars, editCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { CountryRegionData } from "react-country-region-selector";

const { Option } = Select;

function EditCar({ user }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);
  const [states, setStates] = useState([]);

  const { carid } = useParams();

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
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((car) => car._id === carid));
    }
  }, [dispatch, car, cars, carid]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const onFinish = (values) => {
    if (
      values.capacity === undefined ||
      "" ||
      values.fuelType === undefined ||
      "" ||
      values.image === undefined ||
      "" ||
      values.name === undefined ||
      "" ||
      values.rentPerHour === undefined ||
      "" ||
      values.country === undefined ||
      "" ||
      values.state === undefined ||
      ""
    ) {
      message.error("Please fill all the fields");
    } else {
      values._id = car._id;
      dispatch(editCar(values));
    }
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="back-img background-repeat">
        <Row justify="center" className="mt-5">
          <Col lg={12} sm={24} xs={22}>
            {totalCars.length > 0 && (
              <Form
                initialValues={car}
                className="box-shadow-1 p-2 login-form"
                layout="vertical"
                onFinish={onFinish}
              >
                <h1 className="main-title-text">Edit Car</h1>
                <hr />
                <Form.Item name="name" label="Car name">
                  <Input placeholder="Car Name" />
                </Form.Item>

                <Form.Item name="image" label="Image url">
                  <Input placeholder="Image URL" />
                </Form.Item>

                <Form.Item name="rentPerHour" label="Rent per hour">
                  <Input placeholder="Rent Per Hour" />
                </Form.Item>

                <Form.Item name="capacity" label="Capacity">
                  <Input placeholder="Capacity" />
                </Form.Item>

                <Form.Item name="fuelType" label="Fuel Type">
                  <Input placeholder="Fuel Type" />
                </Form.Item>

                <Form.Item name="country" label="Country">
                  <Select
                    allowClear
                    onChange={(value, option) => {
                      if (value) setStates(getStates(option.key));
                      form.setFieldsValue({
                        state: undefined,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    showSearch
                    size="small"
                  >
                    {countries.map((c, i) => (
                      <Option key={i} value={c[1]}>
                        {c[0]}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="state" label="State">
                  <Select
                    size="small"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {states.map((s, i) => (
                      <Option key={i} value={s.value}>
                        {s.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="text-right">
                  <button className="button1 mr-1">Edit Car</button>
                  <button className="button1">
                    <Link to="/admin">Cancel</Link>
                  </button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default EditCar;
