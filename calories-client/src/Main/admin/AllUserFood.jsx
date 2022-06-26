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

const AllUserFood = () => {
  const [userEntries, setUserEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(0);
  const [entryData, setEntryData] = useState(null);
  const [editEntryModal, setEditEntryModal] = useState(false);

  const getUserEntries = async () => {
    debugger;
    let id = "62b8446aa04fa7783e4d7dab";
    let payload = {
      limit: 10,
      skip: 0,
      id,
    };
    try {
      let res = await ApiService.getUserEntries(payload);
      debugger;
      setUserEntries(res?.foodEntries);
      setEntryCount(res?.count);
    } catch (error) {
      debugger;
    }
  };

  useEffect(() => getUserEntries(), []);
  return (
    <div>
      <div>
        <h2 className="my-5">Suleman Food History</h2>

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
                    <Button className="bg-transparent border-0 shadow-none">
                      <img src={VIEW_ICON} alt="alt" width={18} />
                    </Button>
                    <Button className="bg-transparent border-0 shadow-none">
                      <img src={DELETE_ICON} alt="alt" width={18} />
                    </Button>
                  </td>
                </tr>
              ));
            }
            return (
              <tr>
                <td colSpan={5}>
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
    </div>
  );
};

export default AllUserFood;
