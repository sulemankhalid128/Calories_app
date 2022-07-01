import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import NoDataFound from "../../common-component/NoDataFound";
import Loader from "../../common-component/Loader";
import TableLayout from "../../common-component/TableLayout";
import DELETE_ICON from "../../assets/images/deleteIcon.svg";
import VIEW_ICON from "../../assets/images/viewIcon.svg";
import { ApiService } from "../../axios-config";
import ConfirmPopUp from "../../common-component/Confermation";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import GoBack from "../../common-component/GoBack";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userRecord, setUserRecord] = useState(null);
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // this method is used for the fetch stats for admin
  const getStats = async () => {
    try {
      let res = await ApiService.getStats();
      setStats(res);
    } catch (error) {
      console.log("error::", error);
    }
  };

  // this method is used for getting the all user exist in our db
  const getUsers = async () => {
    try {
      setIsLoading(true);
      let res = await ApiService.getUsers({
        limit: 10,
        skip: currentPage * 10,
      });
      setUsers(res?.users);
      setUserCount(res?.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error::", error);
    }
  };

  // used for the delete user
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

  useEffect(() => {
    getUsers();
    getStats();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="mt-3">
        <GoBack url="/" />
      </div>

      <Row className="my-3">
        <Col md="12">
          <Card className="stats-bg border-0 shadow-sm">
            <CardBody className="m-2 ">
              <h4 className="text-light">Last 7 days / Previous Entries </h4>
              <h5 className="text-light">
                {stats?.lastSevenDays || 0} / {stats?.previousWeek || 0}
              </h5>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <h3 className="my-4">All User</h3>

      <TableLayout
        TableHeader={() => (
          <React.Fragment>
            <th>#</th>
            <th>user Id</th>
            <th> Name</th>
            <th> Calories Avg</th>
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
            return users.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th scope="row">{item?._id}</th>
                <td>
                  <Link
                    to={`/admin/user/foods/${item?._id}`}
                    className="text-decoration-none"
                  >
                    {item?.name}
                  </Link>
                </td>
                <th scope="row">{(item?.averageCount).toFixed(2)}</th>
                <td>
                  <Link
                    className="bg-transparent border-0 shadow-none"
                    to={`/admin/user/foods/${item?._id}`}
                  >
                    <img src={VIEW_ICON} alt="alt" width={18} />
                  </Link>
                  <Button
                    disabled={item?.role === "admin"}
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

      {users?.length && (
        <div className="mt-5 d-flex justify-content-end align-items-center">
          <div className="pagination_width">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={Math.ceil(userCount / 10)}
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
