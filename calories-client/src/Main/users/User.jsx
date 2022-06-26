import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { ApiService } from "../../axios-config";
import NoDataFound from "../../common-component/NoDataFound";
import TableLayout from "../../common-component/TableLayout";
import WarningPenal from "../../common-component/WarningPenal";
import { dateFormate } from "../../utils/statics";
import FoodEntryModal from "../../common-component/FoodEntryModal";

const User = () => {
  const [entryModal, setEntryModal] = useState(false);
  const [userEntries, setUserEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(0);
  const getUserEntries = async () => {
    let id = "62b8446aa04fa7783e4d7dab";
    let payload = {
      limit: 10,
      skip: 0,
      id,
    };
    try {
      let res = await ApiService.getUserEntries(payload);
      setUserEntries(res?.foodEntries);
      setEntryCount(res?.count);
    } catch (error) {
      debugger;
    }
  };

  useEffect(() => getUserEntries(), []);

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mt-3">
        <Link to="/admin">Admin</Link>fa
        <Link to="/create/user">create user</Link>
        <div className="d-flex">
          <FormGroup className="d-flex justify-content-center align-items-center">
            <Label className="mx-2">From:</Label>
            <Input type="date" />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center align-items-center">
            <Label className="mx-2">To:</Label>
            <Input type="date" />
          </FormGroup>
          <div className="ms-3">
            <Button
              className="background-hd border-0"
              onClick={() => setEntryModal(!entryModal)}
            >
              Add Entry
            </Button>
          </div>
        </div>
      </div>
      <WarningPenal message="User has increase the daily limit of calories" />
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
      />
    </div>
  );
};

export default User;
