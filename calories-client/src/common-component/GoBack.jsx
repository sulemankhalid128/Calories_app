import { withRouter } from "react-router-dom";
import PrevImage from "../assets/images/back.svg";

const GoBack = ({ history, url }) => {
  return (
    <div
      style={{ display: "inline-block", cursor: "pointer" }}
      onClick={() => {
        if (url) {
          history.push({ pathname: url });
        } else {
          history.goBack();
        }
      }}
    >
      <img src={PrevImage} alt="back" />{" "}
      <span style={{ color: "rgb(59 60 54)" }}>Back</span>
    </div>
  );
};
export default withRouter(GoBack);
