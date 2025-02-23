import Modal from "react-modal";
import { useRetreatContext } from "../context/RetreatContext";
import { formatToStringDate } from "./RetreatList";

export const ViewDetailsModal = ({ retreatData }) => {
    const { viewDetailsModal, setViewDetailsModal } = useRetreatContext();

    const closeModal = () => {
        setViewDetailsModal(false);
    };

    return (
        <Modal
            isOpen={viewDetailsModal}
            onRequestClose={closeModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 focus:border-none rounded-lg w-full max-w-2xl sm:max-w-lg md:max-w-2xl max-h-full md:max-h-3/4 shadow-lg transition-all duration-500 ease-in-out overflow-y-auto scrollbar-custom"
            overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center focus:border-none"
        >
            {
                !retreatData ? (
                    <div className="loading-screen fixed inset-0 flex items-end justify-center z-[9999]">
                        <div className="loading-spinner border-7 border-t-7 border-[#f7ae65] rounded-full w-80px h-80px animate-spin"></div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-lg mb-4 text-center font-bold">Booking Details</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">User Name:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.user_name}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">User Email:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.user_email}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">User Phone:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.user_phone}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">Retreat Title:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.retreat_title}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">Retreat Location:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.retreat_location}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">Retreat Price:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.retreat_price}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block mb-2 font-bold">Payment Details:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{retreatData.payment_details}</span>
                            </div>
                            <div className="mb-4">
                                <span className="block mb-2 font-bold">Booking Date:</span>
                                <span className="w-full p-2 rounded bg-gray-200 text-gray-900">{formatToStringDate(retreatData.booking_date)}</span>
                            </div>
                        </div>
                    </div>

                )
            }
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
