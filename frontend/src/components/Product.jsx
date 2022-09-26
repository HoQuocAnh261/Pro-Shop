import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import formatMoney from "../utils/formatMoney";

function Product({ product }) {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
        <Card.Body>
          <Link to={`product/${product._id}`}>
            <Card.Title as="div">{product.name}</Card.Title>
          </Link>
          <Card.Text as="div" className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} Đánh giá`}
            />
          </Card.Text>
          <Card.Text as="h3">{formatMoney(product.price)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Product;