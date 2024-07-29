import React, { useEffect, useState } from 'react';
import { BookingModal } from './Modal';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRetreatContext } from '../context/RetreatContext';
import { ViewDetailsModal } from './ViewDetailsModal';

export const formatToStringDate = (dateString) => {
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

const RetreatList = ({ retreats }) => {
    const [bookedRetreats, setBookedRetreats] = useState([]);
    const { viewDetailsModal: isViewDetailsModal } = useRetreatContext();


    useEffect(() => {
        const fetchBookedRetreats = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}bookings?user_id=${user.id}`);
            setBookedRetreats(res.data);
        };

        fetchBookedRetreats();
    }, [retreats]);

    const isRetreatBooked = (retreatId) => {
        return bookedRetreats.some(booking => booking.retreat_id === retreatId);
    };

    return (
        <div className="flex flex-wrap ">
            {retreats.map(retreat => (
                <div key={retreat} className="w-full md:w-1/3 p-2">

                    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 ">
                        <div className='absolute top-0 right-0 text-white px-4 py-1 rounded-bl-lg z-20 flex gap-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-foreground border-0'>
                            <span className='text-xl'>₹</span>{retreat.price}
                        </div>
                        <div
                            className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                            <img
                                src={retreat.image} alt={retreat.title}
                                className="object-fill w-full h-full"
                            />
                        </div>

                        <div className="text-sm text-gray-600 items-center flex justify-between px-6 py-2">
                            <span className="mr-2 font-semibold flex gap-1 items-center"><Clock size={14} />{formatToStringDate(retreat.date)}</span>
                            <span className="mr-2 font-semibold flex gap-1 items-center"><MapPin size={14} />{retreat.location}</span>
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {retreat.title}
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                {retreat.description}
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            {isRetreatBooked(retreat.id) ? (
                                <div className='flex justify-between items-center'>
                                    <button
                                        className=" font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                                        type="button" disabled>
                                        Booked
                                    </button>
                                </div>
                            ) : (
                                <Link to={`/retreat/${retreat.id}`}>
                                    <button
                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Book
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

            ))
            }

            <BookingModal />
            {
                isViewDetailsModal &&
                <ViewDetailsModal />
            }
        </div >
    );
};

export default RetreatList;
