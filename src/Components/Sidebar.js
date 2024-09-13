import React from "react";
import useMobile from "../Hooks/useMobile";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const mobile = useMobile("(max-width: 940px)");

  return (
    <section
      className={mobile ? `${styles.section} ${styles.mobile}` : styles.section}
    >
      <SidebarItem index={1} stepInfo="Personal Information" />
      <SidebarItem index={2} stepInfo="Vehicle Details" />
      {/* <SidebarItem index={3} stepInfo="Add-ons" />*/}
      <SidebarItem index={3} stepInfo="Summary" />
      <SidebarItem index={4} stepInfo="Finished!" />
    </section>
  );
};

export default Sidebar;
