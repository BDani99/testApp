import React, { useState, useCallback } from 'react';
import { fetchProducts } from '../Services/Api/FetchProducts';
import { Product } from '../Services/Interface/Product';
import { truncateTitle, truncateDescription } from '../Utils/TextUtils';
import InfiniteScroll from '../Utils/InfiniteScroll';
import CustomButton from '../Components/CustomButton';
import PulseLoading from '../Components/PulseLoading';
import { FaDollarSign } from 'react-icons/fa';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadProducts = useCallback(async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        try {
            const response = await fetchProducts(skip);
            setProducts(prev => [...prev, ...response.products]);
            setSkip(prev => prev + 10);
            setHasMore(products.length + response.products.length < response.total);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    }, [skip, hasMore, loading, products.length]);

    const sentinelRef = InfiniteScroll(loadProducts, hasMore);

    const handleClick = (productId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        window.location.href = `/details/${productId}`;
    };

    return (
        <div className="max-w-screen-2xl w-full mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold my-6 text-center text-gray-800">See Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-15">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="relative flex flex-col rounded-lg bg-white shadow-sm p-3 overflow-hidden pb-6"
                    >
                        <div className="relative flex-shrink-0">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <span className="absolute top-2 right-2 bg-purple-700 text-white text-sm font-semibold rounded-full px-3 py-1">
                                -{product.discountPercentage}%
                            </span>
                        </div>
                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-lg text-gray-600">{truncateTitle(product.title)}</h2>
                                <span className="flex items-center text-lg font-bold text-gray-500">
                                    {product.price} <FaDollarSign />
                                </span>
                            </div>
                            <p className="text-gray-700 flex-grow mb-4 line-clamp-3">
                                {truncateDescription(product.description)}
                            </p>
                            <CustomButton label="See details" width="100%" onClick={handleClick(product.id)} />
                        </div>
                    </div>
                ))}
            </div>

            <div ref={sentinelRef} className="h-10" />
            {loading && <PulseLoading />}
            {!hasMore && (
                <div className="text-center py-5 text-gray-500">No more products to show</div>
            )}
        </div>
    );
};

export default HomePage;