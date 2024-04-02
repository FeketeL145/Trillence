import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SidebarData, SidebarDataLogin } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  @media screen and (max-width: 960px) {
    background: #15171c;
    height: 80px;
    width: 100%;
    top: 0;
    position: sticky;
    display: flex;
    justify-content: flex-start;
    align-items: left;
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
  background: #15171c;
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

const SidebarNavBottom = styled.nav`
  bottom: 0;
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
    // Ide majd Authentikáció feltételként
    var isLoggedIn = false;
    const loginItems = isLoggedIn
      ? SidebarDataLogin.filter((item) => item.title === "Sign out")
      : SidebarDataLogin.filter((item) => item.title === "Sign in");

    return loginItems.map((item, index) => {
      return <SubMenu item={item} key={index} />;
    });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          {windowWidth < 960 && (
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          )}
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {windowWidth < 960 && (
              <NavIcon to="#">
                <FaIcons.FaTimes onClick={showSidebar} />
              </NavIcon>
            )}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            <SidebarNavBottom>{renderLoginItems()}</SidebarNavBottom>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
