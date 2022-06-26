import React from "react";
import { Table } from "reactstrap";

const TableLayout = ({ TableHeader, TableContent }) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader />
        </tr>
      </thead>
      <tbody>
        <TableContent />
      </tbody>
    </Table>
  );
};

export default TableLayout;
