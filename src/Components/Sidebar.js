import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import * as FaIcons from "react-icons/fa";
import { SidebarData, SidebarDataLogin, SidebarDataAdmin } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Cookies from "js-cookie";

const Nav = styled.div`
  @media screen and (max-width: 960px) {
    height: 80px;
    width: 100%;
    top: 0;
    position: sticky;
    display: flex;
    justify-content: flex-start;
    align-items: left;
    background: rgba(21, 23, 28, 1);
    backdrop-filter: blur(15px);
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: rgba(21, 23, 28, 0.5);
  backdrop-filter: blur(15px);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const UserdisplayComponent = styled.div`
  display: flex;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderLoginItems = () => {
    var isLoggedIn = false;
    if (Cookies.get("token") != null) {
      isLoggedIn = true;
    }
    const loginItems = isLoggedIn
      ? SidebarDataLogin.filter((item) => item.title === "Sign out")
      : SidebarDataLogin.filter((item) => item.title === "Sign in");

    return loginItems.map((item, index) => {
      return <SubMenu item={item} key={index} onClick={showSidebar} />;
    });
  };

  const renderAdminItems = () => {
    var isAdmin = false;
    if (Cookies.get("isAdmin") == "true") {
      isAdmin = true;
    }
    const adminItems = isAdmin
      ? SidebarDataAdmin.filter((item) => item.requireAdmin === true)
      : SidebarDataAdmin.filter((item) => item.requireAdmin === false);

    return adminItems.map((item, index) => {
      return <SubMenu item={item} key={index} onClick={showSidebar} />;
    });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          {windowWidth < 960 || isMobile ? (
            <NavIcon to="#" onClick={showSidebar} sidebar={sidebar}>
              <FaIcons.FaBars />
            </NavIcon>
          ) : null}
        </Nav>
        <SidebarNav sidebar={sidebar ? 1 : 0}>
          <SidebarWrap>
            {windowWidth < 960 && (
              <NavIcon to="#">
                <FaIcons.FaTimes onClick={showSidebar} />
              </NavIcon>
            )}
            {SidebarData.filter((item) =>
              item.requireLoggedIn === true
                ? Cookies.get("token") != null
                : true
            ).map((item, index) => {
              return <SubMenu item={item} key={index} onClick={showSidebar} />;
            })}
            {renderAdminItems()}
            {renderLoginItems()}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
