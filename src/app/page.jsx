"use client"
import React, { useState } from "react";
import InputBox from "../components/input";
import CheckBoxInput from "../components/checkboxinput";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Home() {
  const [name, setName] = useState('jhon');

  const handleSubmit = async (e) => {
    console.log('submitting name to the database');
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      // Name stored successfully
      console.log('Name stored in the database');
    } else {
      // Failed to store name, handle accordingly
      console.error('Failed to store name in the database');
    }
  };

  return (
    <main className="bg-primary w-screen h-screen flex items-center justify-center">
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
      <div className="xl:w-[65%] h-[70%] lg:w-[75%] w-[85%]  rounded-lg flex">
        <section className="w-[100%] md:w-[50%] h-full flex flex-col justify-between rounded-lg md:rounded-r-none bg-secondary p-5">
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
          <form onSubmit={handleSubmit}>
            <input
              type="submit"
              value="Register"
              className="text-base p-3 bg-tertiary text-white rounded-md w-full cursor-pointer shadow-lg active:shadow-sm"
            />
          </form>
        </section>

        <section className="w-[50%]  h-full bg-white hidden md:flex flex-col items-start justify-center  rounded-r-lg">
          <h2 className="font-bold text-5xl mx-14">Student</h2>
          <img src="/studentlogin.jpg" alt="" />
        </section>
      </div>
    </main>
  );
}
