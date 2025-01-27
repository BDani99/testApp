import axios from 'axios';
import API_URL from './ApiConfig.tsx';
import { Product } from '../Interface/Product.tsx';

export const fetchProducts = async (skip: number = 0): Promise<{ products: Product[]; total: number; skip: number; limit: number }> => {
    try {
        const response = await axios.get(`${API_URL}?limit=10&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
