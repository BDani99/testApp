import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageViewerProps {
    images: string[];
    currentImageIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onClickImage: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, currentImageIndex, onNext, onPrev, onClickImage }) => {
    return (
        <div className="relative">
            <div className="flex items-center justify-center mb-2">
                <button className='cursor-pointer' onClick={onPrev}>
                    <FaChevronLeft className="text-2xl mr-2" />
                </button>
                <img
                    src={images[currentImageIndex]}
                    alt={`Product Image ${currentImageIndex + 1}`}
                    className='w-full max-w-[400px] h-[400px] object-contain rounded-lg shadow-md cursor-pointer'
                    onClick={onClickImage}
                />
                <button className='cursor-pointer' onClick={onNext}>
                    <FaChevronRight className="text-2xl ml-2" />
                </button>
            </div>

            <div className="flex justify-center mt-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 mx-1 mt-2 rounded-full ${index === currentImageIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageViewer;
