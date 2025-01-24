import React from 'react';

interface CustomButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    width?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, width }) => {
    return (
        <button
            className="mt-2 bg-black text-white font-semibold py-2 rounded-full hover:bg-gray-800 transition cursor-pointer"
            onClick={onClick}
            style={{ width }}
        >
            {label}
        </button>
    );
};

export default CustomButton;
