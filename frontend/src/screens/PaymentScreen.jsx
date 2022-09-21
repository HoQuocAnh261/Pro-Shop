import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";

function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(
    "COD(Thanh toán khi nhận hàng)"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Phương thức thanh toán</h1>
      <Form onSubmit={handleSubmit} className="d-grid">
        <Form.Group>
          <Form.Label as="legend">Chọn phương thức thanh toán</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Momo"
              id="Momo"
              name="paymentMethod"
              value="Momo"
              defaultChecked
              onClick={(e) => setPaymentMethod(e.target.value)}
              onChan
            ></Form.Check>

            <Form.Check
              type="radio"
              label="COD"
              id="COD"
              name="paymentMethod"
              value="COD(Thanh toán khi nhận hàng)"
              defaultChecked
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" className="my-3">
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
