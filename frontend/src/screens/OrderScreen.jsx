import React, { useEffect } from "react";
import { Card, Col, Image, ListGroup, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, deliverOrder } from "../actions/orderAction";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import formatMoney from "../utils/formatMoney";
import PageNotFound from "../components/PageNotFound";

function OrderScreen() {
  const dispatch = useDispatch();
  const params = useParams();

  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && order) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
  }

  useEffect(() => {
    if (!order || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <PageNotFound title="thông tin giao hàng" />
  ) : (
    <Row>
      <h1>Order {order._id}</h1>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Thông tin giao hàng</h2>
            <p>
              <strong>Tên: </strong>
              {order.user.name}
            </p>

            <p>
              <strong>Địa chỉ: </strong>
              {order.shippingAddress.address},{order.shippingAddress.commune},
              {order.shippingAddress.district},{order.shippingAddress.province}{" "}
            </p>
            <p>
              <strong>Liên hệ: </strong> {order.user.email}
            </p>
            {order.isDelivered ? (
              <Message variant="info">Giao hàng thành công</Message>
            ) : (
              <Message variant="info">Đang giao hàng</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Phương thức thanh toán</h2>
            <strong>Phương thức: </strong>
            {order.paymentMethod}
            {order.isPaid ? (
              <Message variant="success">
                Thanh toán vào lúc {order.paidAt}
              </Message>
            ) : (
              <Message variant="danger">Chưa thanh toán</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Đặt hàng</h2>
            {order.orderItems.length === 0 ? (
              <Message>Giỏ hàng của bạn rỗng</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>Số lượng ({item.qty})</Col>
                      <Col md={3}>{formatMoney(item.qty * item.price)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Chi tiết đơn hàng</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tổng tiền hàng</Col>
                <Col>{formatMoney(order.itemsPrice)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Phí vận chuyển</Col>
                <Col>
                  {order.shippingPrice > 0
                    ? formatMoney(order.shippingPrice)
                    : "Free ship"}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tổng thanh toán</Col>
                <Col>{formatMoney(order.totalPrice)}</Col>
              </Row>
            </ListGroup.Item>
            {error && <Message variant="danger">{error}</Message>}
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Giao hàng thành công
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderScreen;
