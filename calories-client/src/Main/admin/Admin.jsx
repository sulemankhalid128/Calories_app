import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import NoDataFound from "../../common-component/NoDataFound";
import Loader from "../../common-component/Loader";
import TableLayout from "../../common-component/TableLayout";
import DELETE_ICON from "../../assets/images/deleteIcon.svg";
import VIEW_ICON from "../../assets/images/viewIcon.svg";
import { ApiService } from "../../axios-config";
import ConfirmPopUp from "../../common-component/Confermation";
import { toast } from "react-toastify";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userRecord, setUserRecord] = useState(null);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      let res = await ApiService.getUsers({ limit: 10, skip: 0 });
      setUsers(res?.users);
      setUserCount(res?.count);
      setIsLoading(false);
      debugger;
    } catch (error) {
      setIsLoading(false);
      console.log("error::", error);
      debugger;
    }
  };

  const deleteUser = async () => {
    try {
      await ApiService.deleteUser(userRecord?._id);
      toast.success("User Successfully Deleted!");
      setDeleteModal(false);
      await getUsers();
    } catch (error) {
      console.log("error::", error);
      toast.error("Error while delete entries!");
    }
  };

  useEffect(() => getUsers(), []);

  return (
    <div>
      <Row className="my-3">
        <Col md="6">
          <Card className="stats-bg border-0 shadow-sm">
            <CardBody className="m-2 ">
              <h4>Last 7 days / Previous Entries </h4>
              <h5>23 / 50</h5>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card className="stats-bg border-0 shadow-sm">
            <CardBody className="m-2 ">
              <div>
                <h4>Calories Average</h4>
                <h5>23</h5>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <TableLayout
        TableHeader={() => (
          <React.Fragment>
            <th>#Id</th>
            <th> Name</th>
            <th> Actions</th>
          </React.Fragment>
        )}
        TableContent={() => {
          if (isLoading) {
            return (
              <tr>
                <td colSpan={3}>
                  <Loader />
                </td>
              </tr>
            );
          }
          if (!isLoading && users?.length) {
            debugger;
            return users.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item?._id}</th>
                <td>
                  <Link
                    to={`/admin/user/foods/${item?._id}`}
                    className="text-decoration-none"
                  >
                    {item?.name}
                  </Link>
                </td>
                <td>
                  <Link
                    className="bg-transparent border-0 shadow-none"
                    to={`/admin/user/foods/${item?._id}`}
                  >
                    <img src={VIEW_ICON} alt="alt" width={18} />
                  </Link>
                  <Button
                    className="bg-transparent border-0 shadow-none"
                    onClick={() => {
                      setUserRecord(item);
                      setDeleteModal(!deleteModal);
                    }}
                  >
                    <img src={DELETE_ICON} alt="alt" width={18} />
                  </Button>
                </td>
              </tr>
            ));
          }
          if (!users?.length && !isLoading) {
            return (
              <tr>
                <td colSpan={3}>
                  <NoDataFound />
                </td>
              </tr>
            );
          }
        }}
      />
      <ConfirmPopUp
        confirmText="Are you sure you want to delete"
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(!deleteModal);
        }}
        confirmAction={deleteUser}
        modalHeading="Delete Record"
        extraProp={userRecord?.name}
        secondaryText="?"
        btnText="Delete"
        btnColor="primary"
        className="revampDialog revampDialogWidth"
      />
    </div>
  );
};

export default Admin;
