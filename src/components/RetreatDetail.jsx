import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookingModal } from './Modal';
import { useRetreatContext } from '../context/RetreatContext';

const RetreatDetail = () => {
    const { id } = useParams();
    const [retreat, setRetreat] = useState(null);
    const { setIsModalOpen } = useRetreatContext();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API_URL}retreats/${id}`)
            .then(response => response.json())
            .then(data => setRetreat(data))
            .catch(error => console.error('Error fetching retreat:', error));
    }, [id]);

    if (!retreat) {
        return <div className="loading-screen fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="loading-spinner border-7 border-t-7 border-[#f7ae65] rounded-full w-100px h-100px animate-spin"></div>
        </div>
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold mb-4">{retreat.title}</h1>
            <img src={retreat.image} alt={retreat.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-lg text-gray-700 mb-4">{retreat.description}</p>
            <div className='flex justify-between'>
                <div className="text-gray-600 mb-4">
                    <p className="mb-2"><span className="font-semibold">Location:</span> {retreat.location}</p>
                    <p className="mb-2"><span className="font-semibold">Date:</span> {new Date(retreat.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Price:</span> ₹{retreat.price}</p>
                </div>
                <div className='flex items-end mb-4'>
                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Book
                    </button>
                </div>
            </div>
            <BookingModal retreat={retreat} />
        </div>
    );
};

export default RetreatDetail;
