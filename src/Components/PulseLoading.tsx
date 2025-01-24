import React from "react";

const PulseLoading: React.FC = () => {
    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading</h2>
            <div className="flex space-x-1.5 ml-1 mt-1 animate-pulse">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
};

export default PulseLoading;
