import React, { useEffect, useState } from 'react';
import { BookingModal } from './Modal';
import { MapPin, Clock } from 'lucide-react';
import axios from 'axios';
import { useRetreatContext } from '../context/RetreatContext';
import { ViewDetailsModal } from './ViewDetailsModal';
import { Header } from './Header';
import toast from 'react-hot-toast';

const BookedRetreats = ({ retreats }) => {
    const [bookedRetreats, setBookedRetreats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isModalOpen, setViewDetailsModal, viewDetailsModal: isViewDetailsModal } = useRetreatContext();

    const formatToStringDate = (dateString) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    useEffect(() => {
        const fetchBookedRetreats = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}bookings?user_id=${user.id}`);
                setBookedRetreats(res.data);
            } catch (error) {
                toast.error('Error fetching booked retreats:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookedRetreats();
    }, []);

    if (loading) {
        return (
            <div className="loading-screen fixed inset-0 flex items-center justify-center z-[9999]">
                <div className="loading-spinner border-7 border-t-7 border-[#f7ae65] rounded-full w-100px h-100px animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-wrap justify-center items-center h-screen bg-slate-200">
                {bookedRetreats.length === 0 ? (
                    <h2 className="text-xl font-semibold">No data available</h2>
                ) : (
                    bookedRetreats.map(retreat => (
                        <div key={retreat} className="w-full md:w-1/3 p-2">
                            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                                <div className="text-sm text-gray-600 items-center flex justify-between px-6 py-2">
                                    <span className="mr-2 font-semibold flex gap-1 items-center">
                                        <Clock size={14} />
                                        {formatToStringDate(retreat.booking_date)}
                                    </span>
                                    <span className="mr-2 font-semibold flex gap-1 items-center">
                                        <MapPin size={14} />
                                        {retreat.retreat_location}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {retreat.retreat_title}
                                    </h5>
                                </div>
                                <div className="p-6 pt-0">
                                    <div className='flex justify-between items-center'>
                                        <button
                                            className="font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                                            type="button"
                                            disabled
                                        >
                                            Booked
                                        </button>
                                        <span
                                            className='underline cursor-pointer'
                                            onClick={() => { setViewDetailsModal(true) }}
                                        >
                                            View Details
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {isViewDetailsModal && <ViewDetailsModal />}
            </div>
        </>
    );
};

export default BookedRetreats;
