import React from 'react';

const DateFilter = ({onChange}) => {
    return (
        <>
                <label className="dropdown-text">Sort By </label>
                <select className="dropdown-select" onChange={onChange}>
                    <option value="popularity">Popularity</option>
                    <option value="date">Date</option>
                </select>
        </>
    );

}

export default DateFilter;