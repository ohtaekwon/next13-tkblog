"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Person from "/public/person.jpg";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

  const handleShowDropdown = () => setShowDropdown((prev) => true);

  const handleHideDropdown = () => setShowDropdown((prev) => false);
  const loggedIn = true;
  return (
    <div className="sticky z-999 h-16 w-full bg-wh-10 shadow-bl-sm flex justify-center items-center top-0 left-0">
      <div className="w-5/6 mx-0 my-auto flex justify-between items-center relative">
        <h2 className="text-4xl text-lime-500">
          <Link href="/">TK BLOG</Link>
        </h2>
        <ul className="flex items-center gap-5">
          {loggedIn ? (
            <div>
              <Image
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                src={Person}
                onClick={handleShowDropdown}
                width={45}
                height={45}
                alt={"사람 이미지"}
              />
              {showDropdown && (
                <div className="absolute bg-wh-50 p-4 flex flex-col items-center gap-5 top-13 right-[-3rem] rounded-lg">
                  <AiOutlineClose
                    className="absolute top-1.5 right-1.5"
                    onClick={handleHideDropdown}
                  />
                  <hr className="mt-4" />
                  <button className="mx-4 px-2 py-4 border-none text-wh-10 rounded-lg font-bold text-lg bg-accent-green">
                    Logout
                  </button>
                  <Link
                    className="text-zinc-800 text-lg font-light px-2 py-5 text-lg	bg-green-900 text-wh-50 rounded-xl cursor-pointer	"
                    href="/create-post"
                    onClick={handleHideDropdown}
                  >
                    CREATE
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="outline-none border-none	">로그인</button>
              <Link href="/register">회원가입</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
