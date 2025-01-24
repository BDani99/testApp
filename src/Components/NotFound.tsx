import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
            <p className="mt-4 text-lg text-gray-600">The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
