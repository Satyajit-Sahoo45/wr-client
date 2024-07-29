import React from 'react';

const SearchBar = ({ search, onSearchChange }) => {
    return (
        <div className="mb-4 w-[50%]">
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={onSearchChange}
                className="border w-full p-2 rounded-md"
            />
        </div>
    );
};

export default SearchBar;
