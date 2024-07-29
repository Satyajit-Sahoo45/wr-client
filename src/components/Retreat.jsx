import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import SearchBar from './SearchBar';
import RetreatList from './RetreatList';
import Pagination from './Pagination';
import axios from 'axios';
import { useRetreatContext } from '../context/RetreatContext';
import { Header } from './Header';


function Retreat() {
    const [retreats, setRetreats] = useState([]);
    const [filter, setFilter] = useState({ date: '', type: '' });
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const retreatsPerPage = 6;
    const { isModalOpen, setIsModalOpen } = useRetreatContext();

    useEffect(() => {
        const getRetreatData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}retreats`);
            setRetreats(res.data)
        }
        getRetreatData()
    }, [])

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const filteredRetreats = retreats.filter(retreat => {
        const retreatDate = new Date(retreat.date);
        const filterDate = new Date(filter.date);
        const isDateMatch = filter.date === '' || retreatDate.toDateString() === filterDate.toDateString();
        const isTypeMatch = filter.type === '' || retreat.tags.includes(filter.type.toLowerCase());

        return (
            isDateMatch &&
            isTypeMatch &&
            retreat.title.toLowerCase().includes(search.toLowerCase())
        );
    });
    const indexOfLastRetreat = currentPage * retreatsPerPage;
    const indexOfFirstRetreat = indexOfLastRetreat - retreatsPerPage;
    const currentRetreats = filteredRetreats.slice(indexOfFirstRetreat, indexOfLastRetreat);


    return (
        <div className="font-sans">
            <Header />
            <div className="p-6">
                {
                    currentRetreats.length === 0 ? (

                        <div className="loading-screen fixed inset-0 flex items-center justify-center z-[9999]">
                            <div className="loading-spinner border-7 border-t-7 border-[#f7ae65] rounded-full w-100px h-100px animate-spin"></div>
                        </div>

                    ) : (
                        <>
                            <Filter filter={filter} onFilterChange={handleFilterChange} />
                            <div className="flex justify-center mb-4">

                                <SearchBar search={search} onSearchChange={handleSearchChange} />
                            </div>
                            <RetreatList retreats={currentRetreats} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
                            <Pagination
                                totalItems={filteredRetreats.length}
                                itemsPerPage={retreatsPerPage}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Retreat;
