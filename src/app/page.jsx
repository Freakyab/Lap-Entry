"use client";

import React from "react";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";

import InputBox from "../components/input";
import CheckBoxInput from "../components/checkboxinput";

export default function Home() {
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
        <form className="w-[100%] md:w-[50%] h-full flex flex-col justify-between rounded-lg md:rounded-r-none bg-secondary p-5">
          <InputBox placeholder="UID" type="number" />
          <InputBox placeholder="Fullname" />
          <InputBox placeholder="Lab no." />
          <div>
            <InputBox placeholder="Pc no." />
            <CheckBoxInput label="Personal Laptop" />
          </div>
          <InputBox placeholder="Subject" />

          <div className="flex">
            <InputBox placeholder="Semester" type="number" />
            <span className="m-3" />
            <InputBox placeholder="Section" />
          </div>

          <input
            type="button"
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
