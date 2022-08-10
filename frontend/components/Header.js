import React from "react";
import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import logo from "../assets/momentix-logo.png";

const styles = {
  container: `h-[60px] w-full flex items-center gap-5 px-16`,
  logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
  menu: `flex items-center gap-6`,
  menuItem: `flex items-center text-md font-bold cursor-pointer`,
};

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="momentix_logo"
          height={50}
          width={50}
          className="object-cover"
        />
      </div>
      <div className={styles.menu}>
        <div className={styles.menuItem}>Login</div>
        <CgMenuGridO fontSize={30} className={styles.menuItem} />
      </div>
    </div>
  );
};

export default Header;
