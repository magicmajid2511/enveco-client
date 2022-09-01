import { Col, Row, Form, Input, message, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { addCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { CountryRegionData } from "react-country-region-selector";

const { Option } = Select;

function AddCar({ user }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [states, setStates] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");

  const { loading } = useSelector((state) => state.alertsReducer);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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

  const onFinish = (values) => {
    values = {
      ...values,
      user: JSON.parse(user)._id,
      countryName: countryName,
      stateName: stateName,
    };
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
      values.bookedTimeSlots = [];
      dispatch(addCar(values));
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
              <h1 className="main-title-text">Add New Car</h1>
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
                    if (!value) return;

                    setStates(getStates(option.key));
                    setCountryName(option.children);

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
                  onChange={(value, option) => {
                    if (!value) return;
                    setStateName(option.children);
                  }}
                >
                  {states.map((s, i) => (
                    <Option key={i} value={s.value}>
                      {s.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="text-right">
                <button className="button1 mr-1">Add Car</button>
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

export default AddCar;
