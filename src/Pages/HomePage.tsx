import React, { useEffect, useState, useCallback } from 'react';
import { fetchProducts } from '../Services/Api/FetchProducts.tsx';
import { Product } from '../Services/Interface/Product.tsx';
import CustomButton from '../Components/CustomButton.tsx';
import { truncateTitle, truncateDescription } from '../Utils/TextUtils.tsx';
import InfiniteScroll from '../Utils/InfiniteScroll.tsx';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadProducts = useCallback(async () => {
        if (!hasMore) return;

        try {
            const data = await fetchProducts(skip);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setProducts(prevProducts => [...prevProducts, ...data]);
            }
        } catch (err) {
            setError('Failed to fetch products. ' + err);
        } finally {
            setLoading(false);
        }
    }, [skip, hasMore]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleLoadMore = () => {
        setSkip(prevSkip => prevSkip + 10);
        setLoading(true);
    };

    const handleClick = (productId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        window.location.href = `/details/${productId}`;
    };

    if (loading && products.length === 0) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex justify-center items-center">
            <div className="w-4/5">
                <h1 className="text-4xl font-bold my-6 text-center text-gray-800">See Products</h1>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
                    {products.map((product, index) => (
                        <li
                            key={`${product.id}-${index}`}
                            className="relative rounded-lg bg-white shadow-sm p-3 overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <span className="absolute top-2 right-2 bg-purple-700 text-white text-sm font-semibold rounded-full px-2 py-1">
                                    -{product.discountPercentage}%
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-lg text-gray-600">{truncateTitle(product.title)}</h2>
                                    <span className="text-lg font-bold text-gray-500">{product.price} $</span>
                                </div>
                                <p className="text-gray-700 w-9/10" style={{ minHeight: '3rem' }}>
                                    {truncateDescription(product.description)}
                                </p>
                            </div>

                            <CustomButton label="See details" width='100%' onClick={handleClick(product.id)} />
                        </li>
                    ))}
                </ul>
                {loading && <p>Loading more products...</p>}
                {!hasMore && <p className="text-center text-gray-500">No more products to load.</p>}
            </div>
            <InfiniteScroll loading={loading} hasMore={hasMore} loadMore={handleLoadMore} />
        </div>
    );
};

export default HomePage;
