import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <FormContainer>
      <h1>Đăng nhập</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="d-grid">
        <Form.Group controlId="email">
          <Form.Label>Địa chỉ email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Điền email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Điền mật khẩu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3">
          Đăng nhập
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Chưa có tài khoản?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Đăng ký
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
