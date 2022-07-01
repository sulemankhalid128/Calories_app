import { Link } from "react-router-dom";
import { Container } from "reactstrap";

import ErrorImage from "../assets/images/error-page.svg";

const Page404 = () => {
  return (
    <div
      className="justify-content-center align-items-center d-flex"
      style={{ height: "50vh" }}
    >
      <div className="inner">
        <Container>
          <img src={ErrorImage} alt="404 error" />

          <h1>Page Not Found</h1>

          <p>
            Uh ho! We can’t seem to find the page you are looking for. Lets go
            back where you will meet us.
          </p>

          <Link to="/">Go Back</Link>
        </Container>
      </div>
    </div>
  );
};
export default Page404;
