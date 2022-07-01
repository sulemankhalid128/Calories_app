import React, { useEffect, useState } from "react";
import TableLayout from "../../common-component/TableLayout";
import DELETE_ICON from "../../assets/images/deleteIcon.svg";
import EDIT_ICON from "../../assets/images/editIcon.svg";
import { Button } from "reactstrap";
import NoDataFound from "../../common-component/NoDataFound";
import { ApiService } from "../../axios-config";
import { dateFormate, getUserLocal } from "../../utils/statics";
import FoodEntryModal from "../../common-component/FoodEntryModal";
import { toast } from "react-toastify";
import ConfirmPopUp from "../../common-component/Confermation";
import Loader from "../../common-component/Loader";
import GoBack from "../../common-component/GoBack";
import WarningPenal from "../../common-component/WarningPenal";
import ReactPaginate from "react-paginate";

const AllUserFood = ({ match }) => {
  const [userEntries, setUserEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(0);
  const [entryData, setEntryData] = useState(null);
  const [editEntryModal, setEditEntryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [warning, setWaring] = useState(null);
  const [thresholdToggle, setThresholdToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);

  // this method is used for the getting all food entries of the user
  const getUserEntries = async () => {
    try {
      setIsLoading(true);
      let payload = {
        limit: 10,
        skip: currentPage * 10,
        userId: match?.params?.id,
        searchFilter: {},
        sort: -1,
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

  // this method is used for the delete the user food entry
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

  useEffect(() => getUserEntries(), [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps
  let user = getUserLocal();

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between mt-4 align-items-center">
          <GoBack url="/admin" />
          {match?.params?.id === user?._id && (
            <Button
              size="sm"
              className="border-0 shadow-none background-hd "
              onClick={() => {
                setEntryData(null);
                setEditEntryModal(!editEntryModal);
              }}
            >
              Create Entry
            </Button>
          )}
        </div>
        <div className="mt-2">
          {thresholdToggle && warning?.thresholdWarning && (
            <WarningPenal
              message={warning?.thresholdWarning}
              isOpen={thresholdToggle}
              toggle={() => setThresholdToggle(!thresholdToggle)}
            />
          )}

          {warning?.priceWarning && priceToggle && (
            <WarningPenal
              message={warning?.priceWarning}
              isOpen={priceToggle}
              toggle={() => setPriceToggle(!priceToggle)}
            />
          )}
        </div>

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

            if (!isLoading && !userEntries?.length) {
              return (
                <tr>
                  <td colSpan={6}>
                    <NoDataFound />
                  </td>
                </tr>
              );
            }
          }}
        />

        {userEntries?.length && (
          <div className="mt-5 d-flex justify-content-end align-items-center">
            <div className="pagination_width">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(entryCount / 10)}
                onPageChange={(page) => {
                  setCurrentPage(page?.selected);
                }}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </div>
          </div>
        )}
      </div>

      <FoodEntryModal
        toggle={() => setEditEntryModal(!editEntryModal)}
        isOpen={editEntryModal}
        refetch={() => {
          getUserEntries();
        }}
        data={entryData}
        setWaring={setWaring}
        setThresholdToggle={setThresholdToggle}
        setPriceToggle={setPriceToggle}
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
