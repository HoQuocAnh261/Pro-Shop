import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetail, updateUser } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/user-list");
    } else {
      if (!user.name || userId !== user._id) {
        dispatch(getUserDetail(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, successUpdate, navigate]);

  return (
    <>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Trở về
      </Link>
      <FormContainer>
        <h1>Chỉnh sửa tài khoản</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="d-grid">
            <Form.Group controlId="name">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type="text"
                placeholder="Điền tên tài khoản"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Địa chỉ email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Điền địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" className="my-3">
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditScreen;
