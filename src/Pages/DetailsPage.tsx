import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../Services/Api/FetchProductById.tsx';
import { Product } from '../Services/Interface/Product.tsx';
import CustomButton from '../Components/CustomButton.tsx';
import StarRating from '../Components/StarRating.tsx';
import ImageViewer from '../Components/ImageViewer.tsx';
import { FaDollarSign } from 'react-icons/fa';

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(parseInt(id!));
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product details. ' + err);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleNextImage = () => {
        if (product) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
        }
    };

    const handlePrevImage = () => {
        if (product) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
        }
    };

    const handleAddToCart = () => {
        console.log('Added to cart');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
            <div className="max-w-5xl w-full">
                {product && (
                    <div className="flex flex-col md:flex-row justify-between gap-8 p-6">

                        <div className="flex-shrink-0 w-full md:w-1/2">
                            <ImageViewer
                                images={product.images}
                                currentImageIndex={currentImageIndex}
                                onNext={handleNextImage}
                                onPrev={handlePrevImage}
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                                    <div className="flex items-center">
                                        <StarRating rating={product.rating} />
                                        <strong className="ml-2 text-lg">{product.rating.toFixed(1)}</strong>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className='font-semibold text-gray-700'>{product.description}</p>
                                    <p className='text-gray-500 font-semibold mt-2'>Stock: {product.stock}</p>
                                    <p className='text-gray-500 font-semibold mt-2'>Brand: {product.brand}</p>
                                    <p className='text-gray-500 font-semibold mt-2'>Category: {product.category}</p>
                                </div>
                                <div className="bg-purple-700 text-white rounded-full px-3 py-1 w-fit mt-4">
                                    -{product.discountPercentage}%
                                </div>
                                <div className='flex justify-between items-center mt-4'>
                                    <p className="flex items-center text-3xl font-bold text-gray-800">{product.price} <FaDollarSign/></p>
                                    <CustomButton label="Add to cart" width='45%' onClick={handleAddToCart} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailsPage;
