import EmptyBox from "../assets/images/emptyBox.svg";

const NoDataFound = ({ text = "No Record Found!" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <img src={EmptyBox} alt="empty" width={25} className="mx-2" />
      {text}
    </div>
  );
};

export default NoDataFound;
