import React, { createContext, useState, useContext } from 'react';

const RetreatContext = createContext();

export const RetreatProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewDetailsModal, setViewDetailsModal] = useState(false);

    const value = {
        isModalOpen,
        setIsModalOpen,
        viewDetailsModal,
        setViewDetailsModal
    };

    return (
        <RetreatContext.Provider value={value}>
            {children}
        </RetreatContext.Provider>
    );
};

export const useRetreatContext = () => {
    return useContext(RetreatContext);
};
