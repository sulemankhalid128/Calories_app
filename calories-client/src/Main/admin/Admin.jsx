import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import NoDataFound from "../../common-component/NoDataFound";
import TableLayout from "../../common-component/TableLayout";
import DELETE_ICON from "../../assets/images/deleteIcon.svg";
import EDIT_ICON from "../../assets/images/editIcon.svg";
import VIEW_ICON from "../../assets/images/viewIcon.svg";

const Admin = () => {
  const { history } = useHistory();
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
            <th>#</th>
            <th> Name</th>
            <th> Actions</th>
          </React.Fragment>
        )}
        TableContent={() => {
          if (true) {
            return [1, 2, 3, 4, 5, 5, 4].map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link
                    to={`/admin/user/foods/${item?._id}`}
                    className="text-decoration-none"
                  >
                    Mark
                  </Link>
                </td>
                <td>
                  {/* <Button className="bg-transparent border-0 shadow-none">
                    <img src={EDIT_ICON} alt="alt" width={18} />
                  </Button> */}
                  <Link
                    className="bg-transparent border-0 shadow-none"
                    to={`/admin/user/foods/${12}`}
                  >
                    <img src={VIEW_ICON} alt="alt" width={18} />
                  </Link>
                  <Button className="bg-transparent border-0 shadow-none">
                    <img src={DELETE_ICON} alt="alt" width={18} />
                  </Button>
                </td>
              </tr>
            ));
          }
          return (
            <tr>
              <td colSpan={2}>
                <NoDataFound />
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default Admin;
