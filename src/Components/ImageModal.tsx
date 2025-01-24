import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface ModalProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
}

const ImageModal: React.FC<ModalProps> = ({ images, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!isOpen) return null;

    const totalImages = images.length;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg min-w-[70%] max-w-[90%] max-h-[80vh] p-4">
                <button
                    className="absolute top-2 right-2 text-gray-700 hover:text-black cursor-pointer"
                    onClick={onClose}
                >
                    <FaTimes className="text-xl" />
                </button>

                <div className="flex items-center justify-center mb-2">
                    <button className='cursor-pointer' onClick={handlePrev}>
                        <FaChevronLeft className="text-2xl mr-2" />
                    </button>
                    <img
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        className='w-9/10 h-[80vh] object-contain'
                    />
                    <button className='cursor-pointer' onClick={handleNext}>
                        <FaChevronRight className="text-2xl ml-2" />
                    </button>
                </div>

                <div className="flex justify-center mt-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
