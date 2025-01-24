import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageViewerProps {
    images: string[];
    currentImageIndex: number;
    onNext: () => void;
    onPrev: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, currentImageIndex, onNext, onPrev }) => {
    return (
        <div className="relative">
            <div className="flex items-center justify-center mb-2">
                <button className='cursor-pointer' onClick={onPrev}>
                    <FaChevronLeft className="text-2xl mr-2" />
                </button>
                <img
                    src={images[currentImageIndex]}
                    alt={`Product Image ${currentImageIndex + 1}`}
                    className='w-full h-auto max-w-[350px] rounded-lg shadow-md'
                />
                <button className='cursor-pointer' onClick={onNext}>
                    <FaChevronRight className="text-2xl ml-2" />
                </button>
            </div>

            <div className="flex justify-center mt-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageViewer;
