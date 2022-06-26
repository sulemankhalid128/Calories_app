import React, { useEffect, useState } from "react";
import TableLayout from "../../common-component/TableLayout";
import DELETE_ICON from "../../assets/images/deleteIcon.svg";
import EDIT_ICON from "../../assets/images/editIcon.svg";
import VIEW_ICON from "../../assets/images/viewIcon.svg";
import { Button } from "reactstrap";
import NoDataFound from "../../common-component/NoDataFound";
import { ApiService } from "../../axios-config";
import { dateFormate } from "../../utils/statics";
import FoodEntryModal from "../../common-component/FoodEntryModal";
import { toast } from "react-toastify";
import ConfirmPopUp from "../../common-component/Confermation";
import Loader from "../../common-component/Loader";

const AllUserFood = ({ match }) => {
  const [userEntries, setUserEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(0);
  const [entryData, setEntryData] = useState(null);
  const [editEntryModal, setEditEntryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUserEntries = async () => {
    try {
      setIsLoading(true);
      let payload = {
        limit: 10,
        skip: 0,
        userId: match?.params?.id,
      };
      let res = await ApiService.getUserEntries(payload);
      setUserEntries(res?.foodEntries);
      setEntryCount(res?.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error::", error);
      toast.error("Error while fetching entries!");
    }
  };

  const deleteEntry = async () => {
    try {
      await ApiService.deleteUserFoodEntry(entryData?._id);
      toast.success("Entry Successfully Deleted!");
      setDeleteModal(false);
      await getUserEntries();
    } catch (error) {
      console.log("error::", error);
      toast.error("Error while delete entries!");
    }
  };
  useEffect(() => getUserEntries(), []);
  return (
    <div>
      <div>
        <h2 className="my-5">Food History</h2>

        <TableLayout
          TableHeader={() => (
            <React.Fragment>
              <th>#</th>
              <th>Food Name</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Price</th>
              <th>Actions</th>
            </React.Fragment>
          )}
          TableContent={() => {
            if (isLoading) {
              return (
                <tr>
                  <td colSpan={6}>
                    <Loader />
                  </td>
                </tr>
              );
            }
            if (userEntries?.length) {
              return userEntries.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.foodName}</td>
                  <td>{item?.calorie}</td>
                  <td>
                    {dateFormate(item?.foodDate)}
                    {"   "}
                    {new Date(item?.foodDate).toLocaleTimeString()}
                  </td>
                  <td>${item?.price}</td>
                  <td>
                    <Button
                      className="bg-transparent border-0 shadow-none"
                      onClick={() => {
                        setEntryData(item);
                        setEditEntryModal(!editEntryModal);
                      }}
                    >
                      <img src={EDIT_ICON} alt="alt" width={18} />
                    </Button>

                    <Button
                      className="bg-transparent border-0 shadow-none"
                      onClick={() => {
                        setEntryData(item);
                        setDeleteModal(!deleteModal);
                      }}
                    >
                      <img src={DELETE_ICON} alt="alt" width={18} />
                    </Button>
                  </td>
                </tr>
              ));
            }
            return (
              <tr>
                <td colSpan={6}>
                  <NoDataFound />
                </td>
              </tr>
            );
          }}
        />
      </div>

      <FoodEntryModal
        isOpen={editEntryModal}
        toggle={() => setEditEntryModal(!editEntryModal)}
        data={entryData}
        refetch={() => getUserEntries()}
      />
      <ConfirmPopUp
        confirmText="Are you sure you want to delete"
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(!deleteModal);
        }}
        confirmAction={deleteEntry}
        modalHeading="Delete Record"
        extraProp={entryData?.foodName}
        secondaryText=" entry?"
        btnText="Delete"
        btnColor="primary"
        className="revampDialog revampDialogWidth"
      />
    </div>
  );
};

export default AllUserFood;
