import React from 'react';

const DateFilter = ({onChange}) => {
    return (
        <>
                <label className="dropdown-text">Sort By </label>
                <select className="dropdown-select" onChange={onChange}>
                    <option name="date" value="date"> Date </option>
                    <option name="popularity" value="popularity"> Popularity </option>
                </select>
        </>

    );

}

export default DateFilter;