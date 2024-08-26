import React, { FC } from "react";
import HamburgerMenu from "../Hamburger/page";

const Header: FC = () => {
  return (
    <header className="flex justify-between bg-slate-600 mb-8">
      <p className="ml-20"> </p>
      <h1 className="my-6 text-3xl">Dagen i Dag</h1>
      <HamburgerMenu />
    </header>
  );
};

export default Header;
