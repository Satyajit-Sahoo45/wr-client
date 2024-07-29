import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = ({ filter, onFilterChange }) => {
    const [localDate, setLocalDate] = useState("");

    useEffect(() => {
        setLocalDate(filter.date);
    }, [filter.date]);

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        onFilterChange({ ...filter, type: newType });
    };

    return (
        <div className="flex justify-between mb-4 p-4 bg-gray-500 shadow-md rounded-lg">
            <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-semibold">Date:</label>
                <DatePicker selected={localDate} onChange={(date) => { setLocalDate(date); onFilterChange({ ...filter, date: date || "" }); }} className='text-black px-1' />

            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-semibold">Type:</label>
                <select
                    name="type"
                    value={filter.type}
                    onChange={handleTypeChange}
                    className="border border-gray-300 bg-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                >
                    <option value="">All</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Detox">Detox</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
