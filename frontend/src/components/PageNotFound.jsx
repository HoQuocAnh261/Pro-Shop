import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound(props) {
  const { title } = props;
  let pageNotFound = "/images/page_not_found.jpg";
  return (
    <div className="text-center">
      <Image
        src={pageNotFound}
        width={"30%"}
        className="d-block rounded mx-auto d-block"
      />
      <h1>Không tìm thấy {title} 😪</h1>
      <p>
        URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.
        <br /> Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay
        vì dùng URL đã lưu.
      </p>

      <Link className="btn btn-light my-3 text-light bg-primary" to="/">
        Truy cập trang chủ
      </Link>
    </div>
  );
}

PageNotFound.defaultProps = {
  title: "nội dung",
};

export default PageNotFound;
