import React from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";

const SearchBar = styled.div`
  background: #15171c;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: auto;
`;

const Search = () => {
  const SearchLogic = () => {
    const searchInput = document.querySelector(".form-control");
    const searchIcon = document.querySelector(".btn");
    searchInput.addEventListener("keyup", (e) => {
      if (e.target.value.length > 0) {
        searchIcon.classList.add("active");
      } else {
        searchIcon.classList.remove("active");
      }
    });
    searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("active");
    });
  };
  return (
    <div>
      <SearchBar className="m-2">
        <div className="input-group">
          <div className="form-outline" data-mdb-input-init>
            <input type="search" className="form-control" />
            <label className="form-label" htmlFor="form1">
              Search
            </label>
          </div>
          <button type="button" className="btn">
            <FaIcons.FaSearch />
          </button>
        </div>
      </SearchBar>
      <div className="card songcard">
        <h1 className="card-title">asd</h1>
      </div>
    </div>
  );
};

export default Search;
