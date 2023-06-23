"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";

import InputBox from "../components/input";
import CheckBoxInput from "../components/checkboxinput";

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

export default function Home() {
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

  const [formState, dispatch] = useReducer(reducer, initialform);

  return (
    <main className="bg-primary w-screen h-screen flex items-center justify-center">
      <Link href="/admin">
        <button
          className="
        flex items-center
        absolute
        top-10
        right-10
        text-base
        w-fit p-3 bg-tertiary text-white rounded-md  cursor-pointer shadow-lg active:shadow-sm"
          type="button"
        >
          <MdAdminPanelSettings className="text-xl mr-2" />
          <span>Admin</span>
        </button>
      </Link>

      <div className="xl:w-[65%] h-[70%] lg:w-[75%] w-[85%]  rounded-lg flex">
        <form
          className="w-[100%] md:w-[50%] h-full flex flex-col justify-between rounded-lg md:rounded-r-none bg-secondary p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            const { ip } = data;
            formState.ip = ip;
            fetch("https://freaky-api.vercel.app/LabEntry/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formState),
            })
              .then((res) => res.json())
              .then((resultData) => {
                if (data.message === "success") {
                  // setSuccess(true);
                  console.log(resultData);
                  console.log("working");
                }
              });
          }}
        >
          <InputBox
            placeholder="UID"
            type="number"
            value={formState.uid}
            setValue={dispatch}
            actionType={ACTION.UID}
          />
          <InputBox
            placeholder="Fullname"
            type="text"
            value={formState.fullname}
            setValue={dispatch}
            actionType={ACTION.FULLNAME}
          />
          <InputBox
            placeholder="Lab no."
            type="text"
            value={formState.labno}
            setValue={dispatch}
            actionType={ACTION.LABNO}
          />
          <div>
            <InputBox
              placeholder="Pc no."
              type="number"
              value={formState.pcno}
              setValue={dispatch}
              actionType={ACTION.PCNO}
            />
            <CheckBoxInput
              label="Personal Laptop"
              value={formState.personalLaptop}
              setValue={dispatch}
              actionType={ACTION.PERSONALLAPTOP}
            />
          </div>
          <InputBox
            placeholder="Subject"
            type="text"
            value={formState.subject}
            setValue={dispatch}
            actionType={ACTION.SUBJECT}
          />

          <div className="flex">
            <InputBox
              placeholder="Semester"
              type="number"
              value={formState.semester}
              setValue={dispatch}
              actionType={ACTION.SEMESTER}
            />
            <span className="m-3" />
            <InputBox
              placeholder="Section"
              type="text"
              value={formState.section}
              setValue={dispatch}
              actionType={ACTION.SECTION}
            />
          </div>

          <input
            type="submit"
            value="Register"
            className="text-base p-3 bg-tertiary text-white rounded-md w-full cursor-pointer shadow-lg active:shadow-sm"
          />
        </form>
        <section className="w-[50%]  h-full bg-white hidden md:flex flex-col items-start justify-center  rounded-r-lg">
          <h2 className="font-bold text-5xl mx-14">Student</h2>
          <img src="/studentlogin.jpg" alt="" />
        </section>
      </div>
    </main>
  );
}
