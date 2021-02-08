import React from 'react';
import '../styles/filters.css';
import TimeFilter from '../component/TimeFilter';
import DateFilter from '../component/DateFilter';

const Filters = ({handleDatefilter, handleTimeFilter}) => {
    return (
        <>
            <form className="filter-container">
                <DateFilter  onChange={handleDatefilter}/>
                <TimeFilter onChange={handleTimeFilter}/>
            </form>
        </>
    );

}

export default Filters;