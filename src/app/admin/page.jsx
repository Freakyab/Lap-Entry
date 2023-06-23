/* eslint-disable react/jsx-props-no-spreading */

"use client";

import React, {
  useMemo,
  useState,
  useReducer,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { usePagination, useTable } from "react-table";
import { useRouter } from "next/navigation";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";

import InputBox from "../../components/input";
import CheckBoxInput from "../../components/checkboxinput";
// import dataList from "./data.json";

const ACTION = {
  UID: "uid",
  FULLNAME: "fullname",
  LABNO: "labno",
  PCNO: "pcno",
  PERSONALLAPTOP: "personalLaptop",
  SUBJECT: "subject",
  SEMESTER: "semester",
  SECTION: "section",
};

// eslint-disable-next-line react/prop-types
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
            } else {
              alert("ID or Password is incorrect");
            }
          }}
          className="w-[100%] md:w-[80%] h-full flex flex-col justify-between rounded-lg p-5"
        >
          <InputBox type="text" placeholder="ID" value={id} setValue={setId} />
          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
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

function Filter({ isFilter, filter, dispatch }) {
  return (
    <div
      className={`${
        isFilter ? "w-full md:w-1/3 p-5" : "w-0 p-0"
      } transition-all duration-700`}
    >
      <h1 className="font-bold  text-3xl  mx-14 text-tertiary">Filter</h1>
      <div>
        <InputBox
          label="UID"
          type="number"
          placeholder="Enter UID"
          value={filter.uid}
          setValue={dispatch}
          actionType={ACTION.UID}
        />

        <InputBox
          label="Full Name"
          type="text"
          placeholder="Enter Name"
          value={filter.fullname}
          setValue={dispatch}
          actionType={ACTION.FULLNAME}
        />

        <InputBox
          label="lab no."
          type="text"
          placeholder="Enter Lab No."
          value={filter.labno}
          setValue={dispatch}
          actionType={ACTION.LABNO}
        />

        <InputBox
          label="pc no."
          type="number"
          placeholder="Enter PC No."
          value={filter.pcno}
          setValue={dispatch}
          actionType={ACTION.PCNO}
        />

        <InputBox
          label="Subject"
          type="text"
          placeholder="Enter Subject"
          value={filter.subject}
          setValue={dispatch}
          actionType={ACTION.SUBJECT}
        />

        <CheckBoxInput
          label="Personal Laptop"
          value={filter.personalLaptop}
          setValue={dispatch}
          actionType={ACTION.PERSONALLAPTOP}
        />

        <InputBox
          label="Semester"
          type="text"
          placeholder="Enter Semester"
          value={filter.semester}
          setValue={dispatch}
          actionType={ACTION.SEMESTER}
        />

        <InputBox
          label="Section"
          type="text"
          placeholder="Enter Section"
          value={filter.section}
          setValue={dispatch}
          actionType={ACTION.SECTION}
        />
      </div>
    </div>
  );
}

Filter.propTypes = {
  isFilter: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function AdminPage() {
  const router = useRouter();
  const initialform = {
    uid: "",
    fullname: "",
    labno: "",
    pcno: "",
    personalLaptop: false,
    subject: "",
    semester: "",
    section: "",
  };

  const columns = useMemo(
    () => [
      {
        Header: "UID",
        accessor: "uid",
      },
      {
        Header: "Name",
        accessor: "fullname",
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
      {
        Header: "Date",
        accessor: "createdAt",
      },
      {
        Header: "IP Address",
        accessor: "ip",
      },
    ],
    [],
  );

  const reducer = (form, action) => {
    switch (action.type) {
      case ACTION.UID:
        return { ...form, uid: action.payload };
      case ACTION.FULLNAME:
        return { ...form, fullname: action.payload };
      case ACTION.LABNO:
        return { ...form, labno: action.payload };
      case ACTION.PCNO:
        return { ...form, pcno: action.payload };
      case ACTION.PERSONALLAPTOP:
        return { ...form, personalLaptop: action.payload };
      case ACTION.SUBJECT:
        return { ...form, subject: action.payload };
      case ACTION.SEMESTER:
        return { ...form, semester: action.payload };
      case ACTION.SECTION:
        return { ...form, section: action.payload };
      default:
        return form;
    }
  };

  const [isLogin, setIsLogin] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, dispatch] = useReducer(reducer, initialform);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const data = useMemo(() => filteredData, [filteredData]);

  async function fetchData() {
    const result = await fetch("https://freaky-api.vercel.app/LabEntry/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultData = await result.json();
    setOriginalData(resultData.data);
    setFilteredData(resultData.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = originalData.filter((d) => {
      const uid = d.uid.toString();
      const semester = d.semester.toString();
      const pcno = d.pcno.toString();

      if (
        (filter.uid === "" || uid.includes(filter.uid))
        && (filter.fullname === "" || d.fullname.includes(filter.fullname))
        && (filter.labno === "" || d.labno.includes(filter.labno))
        && (filter.pcno === "" || pcno.includes(filter.pcno))
        && (filter.subject === "" || d.subject.includes(filter.subject))
        && (filter.semester === "" || semester.includes(filter.semester))
        && (filter.section === "" || d.section.includes(filter.section))
        && (filter.personalLaptop === false
        || d.personal_laptop === filter.personalLaptop)
      ) {
        return true;
      }
      return false;
    });

    setFilteredData(filtered);
  }, [filter]);

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
    return <AdminPageLogin setIsLogin={setIsLogin} />;
  }

  return (
    <main className="bg-primary w-screen h-screen flex flex-col items-center justify-center">
      <header className="w-4/5 flex justify-between md:m-10 m-5">
        <h1 className="font-bold md:text-5xl text-2xl  mx-14 text-tertiary">
          Admin Page
        </h1>
        <div>
          <button
            type="button"
            className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm mx-2"
            onClick={() => setIsFilter(!isFilter)}
          >
            <span className="text-white">
              <FaFilter />
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/");
              setIsLogin(false);
            }}
            className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm"
          >
            <span className="text-white">
              <BiLogOut />
            </span>
          </button>
        </div>
      </header>
      <div className="flex w-4/5 h-3/5 relative overflow-hidden bg-white rounded-lg shadow-lg">
        <div
          className={`rounded-lg ${
            isFilter ? "md:w-2/3 w-0" : "w-full"
          } transition-all duration-700 w-f md:!overflow-x-hidden  overflow-scroll`}
        >
          {
            page.length > 0
              ? (
                <table
                  {...getTableProps}
                >
                  <thead className="sticky top-0 left-0 bg-tertiary text-white text-base font-bold">
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
                    {
                    page.map((row) => {
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
                    })
                    }
                  </tbody>
                </table>
              )
              : (
                <>
                  <table
                    {...getTableProps}
                  >
                    <thead className="sticky top-0 left-0 bg-tertiary text-white text-base font-bold">
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
                  </table>
                  <div className="w-full h-full flex items-center justify-center text-center">
                    <h3 className="text-3xl">
                      No Data Found
                    </h3>
                  </div>
                </>
              )
            }
        </div>

        <Filter isFilter={isFilter} filter={filter} dispatch={dispatch} />
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

export default AdminPage;
