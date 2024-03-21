import React from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';

const SearchStyle = styled.div`
    background: #15171c;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75.4rem;
    margin-top: 0.7rem;
    position: fixed;
    border-radius: 1rem;
    @media screen and (max-width: 960px) {
      width: 90%;
      margin-top: 1rem;
      margin-left: 0;
      left: 50%;
      transform: translateX(-50%);
    }
`;

const Search =() => {
    
};

const SearchBar = () => {
return(
    <SearchStyle>
    <div className='input-group'>
    <div className='form-outline' data-mdb-input-init>
      <input type='search' id='form1' className='form-control' />
      <label className='form-label' htmlFor='form1'>
        Search
      </label>
    </div>
    <button type="button" className='btn'>
      <FaIcons.FaSearch/>
    </button>
    </div>
    </SearchStyle>
);
}


export default SearchBar;