import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { ApiService } from "../../axios-config";
import NoDataFound from "../../common-component/NoDataFound";
import TableLayout from "../../common-component/TableLayout";
import WarningPenal from "../../common-component/WarningPenal";
import { dateFormate } from "../../utils/statics";
import FoodEntryModal from "../../common-component/FoodEntryModal";
import AdminAuthModal from "../admin/AdminAuthModal";

const User = () => {
  const [entryModal, setEntryModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [userEntries, setUserEntries] = useState([]);
  const [warning, setWaring] = useState({});
  const [dateFilter, setDateFilter] = useState({});
  const [entryCount, setEntryCount] = useState(0);
  const getUserEntries = async () => {
    let id = "62b848fd58f737232bc5d052";
    let payload = {
      limit: 10,
      skip: 0,
      userId: id,
      searchFilter: dateFilter,
    };
    try {
      let res = await ApiService.getUserEntries(payload);

      setUserEntries(res?.foodEntries);
      setEntryCount(res?.count);
    } catch (error) {}
  };

  useEffect(() => getUserEntries(), []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h3>Food Entries</h3>
        <div className="d-flex">
          <FormGroup className="d-flex justify-content-center align-items-center">
            <Label className="mx-2">From:</Label>
            <Input
              type="date"
              onChange={(e) => {
                setDateFilter({ ...dateFilter, from: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center align-items-center">
            <Label className="mx-2">To:</Label>
            <Input
              type="date"
              onChange={(e) => {
                setDateFilter({ ...dateFilter, to: e.target.value });
              }}
            />
          </FormGroup>
          <div className="ms-3">
            <Button
              className="background-hd border-0 shadow-none mr-3"
              onClick={() => getUserEntries()}
            >
              Search
            </Button>
            <Button
              className="background-hd border-0 shadow-none"
              onClick={() => setEntryModal(!entryModal)}
            >
              Add Entry
            </Button>
            <Button
              className="background-hd border-0 shadow-none ms-3"
              onClick={() => setAdminModal(!adminModal)}
            >
              As Admin
            </Button>
          </div>
        </div>
      </div>

      {warning?.thresholdWarning && (
        <WarningPenal message={warning?.thresholdWarning} />
      )}
      {warning?.priceWarning && (
        <WarningPenal message={warning?.priceWarning} />
      )}
      <TableLayout
        TableHeader={() => (
          <React.Fragment>
            <th>#</th>
            <th>Food Name</th>
            <th>Calories</th>
            <th>Date</th>
            <th>Price</th>
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
      <FoodEntryModal
        toggle={() => setEntryModal(!entryModal)}
        isOpen={entryModal}
        refetch={() => {
          getUserEntries();
        }}
        setWaring={setWaring}
      />

      <AdminAuthModal
        toggle={() => setAdminModal(!adminModal)}
        isOpen={adminModal}
      />
    </div>
  );
};

export default User;
