import { withRouter } from "react-router-dom";
import PrevImage from "../assets/images/back.svg";

const GoBack = ({ history, url }) => {
  return (
    <div
      className="previous-page cursor-pointer"
      style={{ display: "inline-block" }}
      onClick={() => {
        if (url) {
          history.push({ pathname: url });
        } else {
          history.goBack();
        }
      }}
    >
      <img src={PrevImage} alt="back" />{" "}
      <span style={{ color: "#eaa827" }}>Back</span>
    </div>
  );
};
export default withRouter(GoBack);
