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
        <ul>
          {loggedIn ? (
            <div>
              <Image
                src={Person}
                onClick={handleShowDropdown}
                width={45}
                height={45}
                alt={"사람 이미지"}
              />
              {showDropdown && (
                <div>
                  <AiOutlineClose onClick={handleHideDropdown} />
                  <button>Logout</button>
                  <Link href="/create-post" onClick={handleHideDropdown}>
                    CREATE
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button>로그인</button>
              <Link href="/register">회원가입</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
