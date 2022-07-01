import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { ApiService } from "../../axios-config";
import NoDataFound from "../../common-component/NoDataFound";
import TableLayout from "../../common-component/TableLayout";
import WarningPenal from "../../common-component/WarningPenal";
import { dateFormate, getUserLocal } from "../../utils/statics";
import FoodEntryModal from "../../common-component/FoodEntryModal";
import Loader from "../../common-component/Loader";
import ReactPaginate from "react-paginate";

const UserPenal = () => {
  const [loading, setLoading] = useState(false);
  const [entryModal, setEntryModal] = useState(false);
  const [userEntries, setUserEntries] = useState([]);
  const [exceedEntries, setExceedEntries] = useState([]);
  const [dateFilter, setDateFilter] = useState({});
  const [entryCount, setEntryCount] = useState(0);
  const [warning, setWaring] = useState({});
  const [thresholdToggle, setThresholdToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState(1);

  //this function is used for the fetching user existing entries
  const getUserEntries = async () => {
    let user = getUserLocal();
    let payload = {
      limit: 10,
      skip: currentPage * 10,
      userId: user?._id,
      searchFilter: dateFilter,
      sort,
    };
    try {
      setLoading(true);
      let res = await ApiService.getUserEntries(payload);
      setUserEntries(res?.foodEntries);
      setEntryCount(res?.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error::", error);
    }
  };

  //this function is used for the fetching user exceeded entries
  const getExceedEntries = async () => {
    try {
      setLoading(true);
      let res = await ApiService.getReachedDays();
      setExceedEntries(res);
    } catch (error) {
      setLoading(false);
      console.log("error::", error);
    }
  };

  // this is used for getting entries with filtering
  useEffect(() => {
    getUserEntries();
  }, [currentPage, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getExceedEntries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <div className=" d-flex">
            <div>
              <Button
                className="background-hd border-0 shadow-none mx-3"
                onClick={() => getUserEntries()}
              >
                Search
              </Button>
            </div>
            <div className="me-3">
              <Input
                type="select"
                name="select"
                onChange={(e) => setSort(e?.target?.value)}
              >
                <option value={-1}>Previous</option>
                <option value={1}>Latest</option>
              </Input>
            </div>
            <div>
              <Button
                className="background-hd border-0 shadow-none"
                onClick={() => setEntryModal(!entryModal)}
              >
                Add Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {warning?.thresholdWarning && (
        <WarningPenal
          message={warning?.thresholdWarning}
          isOpen={thresholdToggle}
          toggle={() => setThresholdToggle(!thresholdToggle)}
        />
      )}
      {priceToggle && warning?.priceWarning && (
        <WarningPenal
          message={warning?.priceWarning}
          isOpen={priceToggle}
          toggle={() => setPriceToggle(!priceToggle)}
        />
      )}

      <Nav tabs>
        <NavItem>
          <NavLink
            className={`${classnames({
              active: activeTab === "1",
            })} text-dark`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setActiveTab("1");
            }}
          >
            Entries
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${classnames({
              active: activeTab === "2",
            })} text-dark`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setActiveTab("2");
            }}
          >
            Limit Exceed
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
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
              if (loading) {
                return (
                  <tr>
                    <td colSpan={5}>
                      <Loader />
                    </td>
                  </tr>
                );
              }
              if (!loading && userEntries?.length) {
                return userEntries.map((item, index) => (
                  <tr key={index}>
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
              if (!loading && !userEntries?.length) {
                return (
                  <tr>
                    <td colSpan={5}>
                      <NoDataFound />
                    </td>
                  </tr>
                );
              }
            }}
          />
          {!!userEntries?.length && (
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
        </TabPane>
        <TabPane tabId="2">
          <TableLayout
            TableHeader={() => (
              <React.Fragment>
                <th>#</th>
                <th>Limit</th>
                <th>Exceed</th>
                <th>Date</th>
              </React.Fragment>
            )}
            TableContent={() => {
              if (loading) {
                return (
                  <tr>
                    <td colSpan={3}>
                      <Loader />
                    </td>
                  </tr>
                );
              }
              if (!loading && exceedEntries?.length) {
                return exceedEntries.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item?.thresholdLimit}</td>
                    <td>{item?.exceedThreshold}</td>
                    <td>{dateFormate(item?.exceedDate)}</td>
                  </tr>
                ));
              }
              if (!loading && !exceedEntries?.length) {
                return (
                  <tr>
                    <td colSpan={5}>
                      <NoDataFound />
                    </td>
                  </tr>
                );
              }
            }}
          />
        </TabPane>
      </TabContent>

      <FoodEntryModal
        toggle={() => setEntryModal(!entryModal)}
        isOpen={entryModal}
        refetch={() => {
          getUserEntries();
          getExceedEntries();
        }}
        setWaring={setWaring}
        setThresholdToggle={setThresholdToggle}
        setPriceToggle={setPriceToggle}
      />
    </div>
  );
};

export default UserPenal;
