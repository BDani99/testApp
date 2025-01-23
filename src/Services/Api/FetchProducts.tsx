import axios from 'axios';
import API_URL from './ApiConfig.tsx';
import { Product } from '../Interface/Product.tsx';

export const fetchProducts = async (skip: number = 0): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}?limit=10&skip=${skip}`);
        console.log(response.data.products);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
