import React from 'react';

const TimeFilter = ({onChange}) => {
    return (
        <>
                <label className="dropdown-text">Upload Date </label>
                <select className="dropdown-select" onChange={onChange}>
                    <option value="all" > All time </option>
                    <option value="24hour"> Last 24 hours </option>
                    <option value="week"> Last Week </option>
                    <option value="month"> Last Month </option>
                    <option value="year"> Last Year </option>
                </select>
        </>

    );

}

export default TimeFilter;