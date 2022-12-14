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
import { detailsProduct, createProductReview } from "../actions/productAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import formatMoney from "../utils/formatMoney";
import PageNotFound from "../components/PageNotFound";

function ProductScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== params.id) {
      dispatch(detailsProduct(params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, params.id, successProductReview, rating]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}/?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Link className="btn btn-light my-3 text-primary" to="/">
        Tr??? l???i
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <PageNotFound title="s???n ph???m" />
      ) : (
        <>
          <Meta title={product.name} />
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
                    text={`${product.numReviews} ????nh gi??`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Gi??: {formatMoney(product.price)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>M?? t??? s???n ph???m:</strong> {product.description}
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
                      <Col>Gi??:</Col>
                      <Col>{formatMoney(product.price)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tr???ng th??i:</Col>
                      <Col>
                        {product.countInStock > 0 ? "C??n h??ng" : "H???t h??ng"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>S??? l?????ng:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Form.Select
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
                        Th??m v??o Gi??? h??ng
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>????nh gi??</h2>
              {product.reviews.length === 0 && (
                <Message>Ch??a c?? ????nh gi?? n??o</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>G???i ????nh gi?? c???a b???n</h2>
                  {successProductReview && (
                    <Message variant="success">
                      ????nh gi?? s???n ph???m th??nh c??ng
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>????nh gi??</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="5">5 - Tuy???t v???i</option>
                          <option value="4">4 - R???t t???t</option>
                          <option value="3">3 - T???t</option>
                          <option value="2">2 - Trung b??nh</option>
                          <option value="1">1 - T???</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>B??nh lu???n</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        G???i ????nh gi??
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to="/login">????ng nh???p</Link> ????? vi???t ????nh gi??{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
