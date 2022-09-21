import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [commune, setCommune] = useState(shippingAddress.commune);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [province, setProvince] = useState(shippingAddress.province);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, commune, district, province }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>Địa chỉ giao hàng</h1>
      <Form onSubmit={handleSubmit} className="d-grid">
        <Form.Group controlId="address">
          <Form.Label>Địa chỉ cụ thể</Form.Label>
          <Form.Control
            type="text"
            placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="commune">
          <Form.Label>Phường/Xã</Form.Label>
          <Form.Control
            type="text"
            placeholder="Điền Phường/Xã"
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="district">
          <Form.Label>Quận/Huyện</Form.Label>
          <Form.Control
            type="text"
            placeholder="Điền Quận/Huyện"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="province">
          <Form.Label>Tỉnh/Thành phố</Form.Label>
          <Form.Control
            type="text"
            placeholder="Điền Tỉnh/Thành phố"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3">
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
