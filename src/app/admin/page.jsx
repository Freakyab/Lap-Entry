"use client";

import React from "react";
import Table from "rc-table";
import data from "./data.json";

function AdminPage() {
  const columns = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Lab no.",
      dataIndex: "labno",
      key: "labno.",
      width: 100,
    },
    {
      title: "Pc no.",
      dataIndex: "pcno",
      key: "pcno",
      width: 100,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: 200,
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      width: 100,
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      width: 100,
    },

    // {
    //   title: "Operations",
    //   dataIndex: "",
    //   key: "operations",
    //   render: () => <span>Delete</span>,
    // },
  ];

  return (
    <main className="bg-primary w-screen h-screen flex flex-col items-center justify-center">
      <header className="m-10">
        <h1 className="font-bold text-5xl mx-14 text-tertiary">Admin Page</h1>
      </header>
      <div className="w-4/5 h-1/2 bg-white rounded-lg shadow-lg">
        <Table
          columns={columns}
          data={data}
          scroll={{ y: 400 }}
          rowKey={(record) => record.key}
          className=" bg-white rounded-lg shadow-lg table-fixed"
        />
      </div>
    </main>
  );
}

export default AdminPage;
