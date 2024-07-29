import Modal from "react-modal";
import { useRetreatContext } from "../context/RetreatContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const BookingModal = ({ retreat }) => {
    const { isModalOpen, setIsModalOpen } = useRetreatContext();
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        user_id: user?.id || "",
        user_name: "",
        user_email: "",
        user_phone: "",
        retreat_id: retreat.id,
        retreat_title: retreat?.title || "",
        retreat_location: retreat?.location || "",
        retreat_price: retreat?.price || "",
        retreat_duration: retreat?.duration || "",
        payment_details: "Payment made via credit card.",
        booking_date: retreat?.date || "",
    });

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}book`, formData);
            if (response.status === 201) {
                toast.success('Booking successful');
                closeModal();
            }
        } catch (error) {
            toast.error('There was an error booking the retreat!', error);
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 focus:border-none rounded-lg w-full max-w-2xl sm:max-w-lg md:max-w-2xl max-h-full md:max-h-3/4 shadow-lg transition-all duration-500 ease-in-out overflow-y-auto scrollbar-custom"
            overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center focus:border-none"
        >
            <h2 className="text-lg mb-4 text-center font-bold">Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-2">
                        <label className="block mb-2">User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            value={formData.user_name}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">User Email</label>
                        <input
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">User Phone</label>
                        <input
                            type="tel"
                            name="user_phone"
                            value={formData.user_phone}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">Retreat Title</label>
                        <input
                            type="text"
                            name="retreat_title"
                            value={retreat?.title}
                            disabled
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">Retreat Location</label>
                        <input
                            type="text"
                            name="retreat_location"
                            value={retreat?.location}
                            disabled
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">Retreat Price</label>
                        <input
                            type="number"
                            name="retreat_price"
                            value={retreat?.price}
                            disabled
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">Retreat Duration</label>
                        <input
                            type="text"
                            name="retreat_duration"
                            value={retreat?.duration + " Days"}
                            disabled
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2">Payment Details</label>
                        <input
                            type="text"
                            name="payment_details"
                            value={retreat?.payment_details}
                            disabled
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Booking Date</label>
                        <input
                            type="text"
                            name="booking_date"
                            value={retreat?.date}
                            className="w-full p-2 rounded bg-gray-200 text-gray-900 focus:outline-0"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-red-600 p-2 rounded-md text-white mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 p-2 rounded-md text-white"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </Modal>
    );
};
