import React from "react";
import "../../styles/searchBarStyle.css";
import Lupa from '../../assets/lupa.svg';


type SearchBarProps = {
  handleChangeSearch: (event: any) => void;
};

export const SearchrBar = ({ handleChangeSearch }: SearchBarProps) => {
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          className="search-txt"
          placeholder="Search"
          onChange={handleChangeSearch}
        />
        <img className="search-btn" src={Lupa} alt="" height={20} width={20}/>
      </div>
    </>
  );
};
