import React from 'react';
import '../styles/dropdown.css';

const Dropdown = () => {
    return (
        <>
            <form className="filter-container">
            <label className="dropdowm-text">Upload Date </label>
            <select className="dropdowm">
                <option name="all" value="one"> All time </option>
                <option name="hour" value="one"> Last 24 hours </option>
                <option  name="week" value="two"> Last Week </option>
                <option name="month" value="three"> Last Month </option>
                <option name="year" value="three"> Last Year </option>
            </select>
            </form>
        </>

    );

}

export default Dropdown;