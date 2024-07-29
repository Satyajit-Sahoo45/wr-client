import Modal from "react-modal";
import { useRetreatContext } from "../context/RetreatContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatToStringDate } from "./RetreatList";

export const ViewDetailsModal = ({ retreat }) => {
    const { viewDetailsModal, setViewDetailsModal } = useRetreatContext();
    const [userBookedDetails, setUserBookedDetails] = useState([]);

    const closeModal = () => {
        setViewDetailsModal(false);
    };

    useEffect(() => {
        const fetchBookedRetreats = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}bookings?user_id=${user.id}`);
            setUserBookedDetails(res.data);
        };

        fetchBookedRetreats();
    }, []);

    return (
        <Modal
            isOpen={viewDetailsModal}
            onRequestClose={closeModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 focus:border-none rounded-lg w-full max-w-2xl sm:max-w-lg md:max-w-2xl max-h-full md:max-h-3/4 shadow-lg transition-all duration-500 ease-in-out overflow-y-auto scrollbar-custom"
            overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center focus:border-none"
        >
            {
                userBookedDetails.length === 0 ? (
                    <div className="loading-screen fixed inset-0 flex items-end justify-center z-[9999]">
                        <div className="loading-spinner border-7 border-t-7 border-[#f7ae65] rounded-full w-80px h-80px animate-spin"></div>
                    </div>
                ) : (
                    userBookedDetails.map((detail) => {
                        return (
                            <div key={detail}>
                                <h2 className="text-lg mb-4 text-center font-bold">Booking Details</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">User Name:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.user_name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">User Email:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.user_email}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">User Phone:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.user_phone}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">Retreat Title:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.retreat_title}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">Retreat Location:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.retreat_location}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">Retreat Price:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.retreat_price}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block mb-2 font-bold">Payment Details:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{detail.payment_details}</span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="block mb-2 font-bold">Booking Date:</span>
                                        <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{formatToStringDate(detail.booking_date)}</span>
                                    </div>
                                </div>
                            </div>
                        )

                    }))}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-600 p-2 rounded-md text-white mr-2"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};
