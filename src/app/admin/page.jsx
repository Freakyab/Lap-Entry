/* eslint-disable react/jsx-props-no-spreading */

"use client";

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { usePagination, useTable } from "react-table";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import InputBox from "../../components/input";
import dataList from "./data.json";

function AdminPage() {
  const [isLogin, setIsLogin] = useState(false);
  const data = useMemo(() => dataList, []);
  const columns = useMemo(
    () => [
      {
        Header: "UID",
        accessor: "uid",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Lab no.",
        accessor: "labno",
      },
      {
        Header: "Pc no.",
        accessor: "pcno",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Semester",
        accessor: "semester",
      },
      {
        Header: "Section",
        accessor: "section",
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    state: { pageIndex },
  } = useTable({ columns, data }, usePagination);

  if (!isLogin) {
    return (
      <AdminPageLogin setIsLogin={setIsLogin} />
    );
  }

  return (
    <main className="bg-primary w-screen h-screen flex flex-col items-center justify-center">
      <header className="m-10">
        <h1 className="font-bold text-5xl mx-14 text-tertiary">Admin Page</h1>
      </header>
      <div className="w-4/5  bg-white rounded-lg shadow-lg">
        <table {...getTableProps} className="rounded-lg">
          <thead className="bg-tertiary text-white text-base font-bold">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-secondary cursor-pointer"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <div className=" flex justify-between w-4/5 ">
        <button
          disabled={!canPreviousPage}
          className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm disabled:bg-secondary disabled:cursor-not-allowed"
          onClick={() => previousPage()}
          type="button"
        >
          <span>
            <AiOutlineArrowLeft size="20px" />
          </span>
        </button>

        <div className="flex items-center">
          <span className="text-base">Page</span>

          <select
            name=""
            id=""
            value={pageIndex}
            className="text-base p-2 bg-tertiary text-white rounded-md  mx-2 cursor-pointer shadow-lg active:shadow-sm "
            onChange={(e) => gotoPage(e.target.value)}
          >
            {pageOptions.map((option) => (
              <option value={option} key={option}>
                {option + 1}
              </option>
            ))}
          </select>
          <span className="text-base">
            of
            {" "}
            {pageOptions.length}
          </span>
        </div>

        <button
          disabled={!canNextPage}
          className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm  disabled:bg-secondary disabled:cursor-not-allowed"
          onClick={() => nextPage()}
          type="button"
        >
          <span className="text-white">
            <AiOutlineArrowRight size="20px" />
          </span>
        </button>
      </div>
    </main>
  );
}

function AdminPageLogin({ setIsLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="bg-primary w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-1/3 flex flex-col justify-center items-center py-5 bg-secondary rounded-lg shadow-lg">
        <h1 className="font-bold text-5xl mx-14 text-white">Admin Login</h1>
        <br />
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (id === "admin" && password === "admin") {
              setIsLogin(true);
            }
          }}
          className="w-[100%] md:w-[80%] h-full flex flex-col justify-between rounded-lg p-5"
        >
          <InputBox type="text" placeholder="ID" value={id} setValue={setId} />
          <InputBox type="password" placeholder="Password" value={password} setValue={setPassword} />
          <br />
          <br />
          <input
            type="submit"
            value="Login"
            className="text-base p-3 bg-tertiary text-white rounded-md w-full cursor-pointer shadow-lg active:shadow-sm"
          />
        </form>
      </div>
    </main>
  );
}

AdminPageLogin.prototype = {
  setIsLogin: PropTypes.func.isRequired,
};

export default AdminPage;
