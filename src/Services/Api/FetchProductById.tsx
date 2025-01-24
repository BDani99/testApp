import axios from 'axios';
import API_URL from './ApiConfig.tsx';

export const fetchProductById = async (productId: number) => {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
