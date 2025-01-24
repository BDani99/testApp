import React from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar key={i} className={`text-lg ${i < fullStars ? 'text-purple-500' : 'text-gray-300'}`} />
        );
    }
    return stars;
};

export default StarRating;
