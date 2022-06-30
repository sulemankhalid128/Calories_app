import React, { useState } from "react";
import classNames from "classnames";
import styles from "./pagination.module.scss";
// import PrevImage from "../../../assets/images/previous-arrow.svg";
// import NextImage from "../../../assets/images/next-arrow.svg";
import { Input } from "reactstrap";

let time = 0;

export const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const [currentPageLocal, setCurrentPageLocal] = useState(currentPage);
  const [pageError, setPageError] = useState("");

  const handlePageChange = (pageEntered) => {
    if (pageEntered) {
      let numb = parseInt(pageEntered);
      if (numb > 0 && numb <= pageCount) {
        onPageChange(numb);
      } else {
        setPageError("Please enter a valid page number");
      }
    } else {
      onPageChange(1);
    }
  };

  return (
    <div className={`search-filter ${styles.pagination}`}>
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => onPageChange(1)}
          type="button"
          disabled={currentPage === 1}
          className={`prevbtn-Pagination ${classNames(
            [styles.pageItem, styles.sides].join(" ")
          )}`}
        >
          {/* <img src={PrevImage} alt="prev" width="8px" />
          <img src={PrevImage} alt="prev" width="8px" /> */}
          P
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
          disabled={currentPage === 1}
          className={`prevbtn-Pagination ${classNames(
            [styles.pageItem, styles.sides].join(" ")
          )}`}
        >
          {/* <img src={PrevImage} alt="prev" width="8px" /> */}
          PP
        </button>

        <Input
          type="number"
          placeholder="Enter page number"
          value={currentPageLocal}
          style={{ border: pageError ? "1px solid red" : "1px solid #9A9693" }}
          onChange={({ target: { value } }) => {
            if (!value) {
              setCurrentPageLocal(1);
            } else {
              setCurrentPageLocal(parseInt(value));
            }

            window.clearTimeout(time);
            time = window.setTimeout(() => {
              handlePageChange(value);
            }, 1000);
          }}
          min={1}
          className="users-pagination-style"
        />

        <button
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
          disabled={currentPage === pageCount}
          className={`${[styles.pageItem, styles.sides].join(" ")}`}
        >
          {/* <img className="next" src={NextImage} alt="next" width="8px" /> */}
          N
        </button>

        <button
          onClick={() => onPageChange(pageCount)}
          type="button"
          disabled={currentPage === pageCount}
          className={`${[styles.pageItem, styles.sides].join(" ")}`}
        >
          {/* <img className="next" src={NextImage} alt="next" width="8px" />
          <img className="next" src={NextImage} alt="next" width="8px" /> */}
          NN
        </button>
      </div>
    </div>
  );
};
export default Pagination;
