import axios from 'axios';
import API_URL from './ApiConfig.tsx';

export const fetchProductById = async (productId: number) => {
    const response = await axios.get(`${API_URL}/${productId}`);
    console.log(response.data);
    return response.data;
};