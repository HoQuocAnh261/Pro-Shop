import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import formatMoney from "../utils/formatMoney";

function ProductScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}/?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-light my-3 text-primary" to="/">
        Trở lại
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} variant={"danger"} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={Number(product.rating)}
                  text={`${product.numReviews} Đánh giá`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Giá: {formatMoney(product.price)}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Mô tả sản phẩm:</strong> {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Kho:</strong> {product.countInStock}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Giá:</Col>
                    <Col>{formatMoney(product.price)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Trạng thái:</Col>
                    <Col>
                      {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Số lượng:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Form.Select
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        0
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addToCartHandler}
                      variant="primary"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Thêm vào Giỏ hàng
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;
