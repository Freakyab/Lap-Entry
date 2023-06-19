"use client";

import React from "react";
import Table from "rc-table";

function AdminPage() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      render: () => <span>Delete</span>,
    },
  ];

  const data = [
    {
      name: "Jack",
      age: 28,
      address: "some where",
      key: "1",
    },
    {
      name: "Rose",
      age: 36,
      address: "some where",
      key: "2",
    },
  ];

  return (
    <main className="bg-primary w-screen h-screen flex flex-col items-center justify-center">
      <header className="m-10">
        <h1 className="font-bold text-5xl mx-14 text-tertiary">Admin Page</h1>
      </header>
      <Table
        columns={columns}
        data={data}
        tableLayout="auto"
        rowKey={(record) => record.key}
        onHeaderRow={() => ({ style: { fontSize: "2rem" } })}
      />
    </main>
  );
}

export default AdminPage;
