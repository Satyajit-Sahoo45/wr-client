import React, { useEffect, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import axios from 'axios';
import { useRetreatContext } from '../context/RetreatContext';
import { ViewDetailsModal } from './ViewDetailsModal';
import { Header } from './Header';
import toast from 'react-hot-toast';

const BookedRetreats = ({ retreats }) => {
    const [bookedRetreats, setBookedRetreats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [retreatData, setRetreatData] = useState(null);
    const { setViewDetailsModal, viewDetailsModal: isViewDetailsModal } = useRetreatContext();

    const formatToStringDate = (dateString) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
                <div className="loading-spinner border-7 border-t-7 border-[#f7ae65] rounded-full w-16 h-16 animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex justify-center items-center w-full min-h-screen bg-slate-200 px-4 py-6">
                {bookedRetreats.length === 0 ? (
                    <h2 className="text-xl font-semibold text-center">No data available</h2>
                ) : (
                    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookedRetreats.map(retreat => (
                            <div key={retreat.id} className="flex flex-col justify-center bg-white shadow-md rounded-xl p-4">
                                <div className="flex flex-col text-gray-700 mb-4">
                                    <div className="text-sm text-gray-600 mb-2 flex items-center">
                                        <Clock size={14} className="mr-2" />
                                        {formatToStringDate(retreat.booking_date)}
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center">
                                        <MapPin size={14} className="mr-2" />
                                        {retreat.retreat_location}
                                    </div>
                                </div>
                                <h5 className="text-xl font-semibold mb-4">{retreat.retreat_title}</h5>
                                <div className="flex justify-between items-center">
                                    <button
                                        className="bg-gray-300 text-gray-600 font-bold text-xs py-2 px-4 rounded-lg cursor-not-allowed"
                                        type="button"
                                        disabled
                                    >
                                        Booked
                                    </button>
                                    <span
                                        className="text-blue-600 underline cursor-pointer"
                                        onClick={() => { setViewDetailsModal(true); setRetreatData(retreat) }}
                                    >
                                        View Details
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {isViewDetailsModal && <ViewDetailsModal retreatData={retreatData} />}
            </div>
        </>
    );
};

export default BookedRetreats;
