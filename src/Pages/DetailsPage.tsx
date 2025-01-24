import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { fetchProductById } from '../Services/Api/FetchProductById.tsx';
import { Product } from '../Services/Interface/Product.tsx';
import CustomButton from '../Components/CustomButton.tsx';
import StarRating from '../Components/StarRating.tsx';
import ImageViewer from '../Components/ImageViewer.tsx';
import ImageModal from '../Components/ImageModal.tsx';
import PulseLoading from '../Components/PulseLoading.tsx';
import NotFound from '../Components/NotFound.tsx';
import { FaDollarSign } from 'react-icons/fa';

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(parseInt(id!));
                setProduct(data);
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 404) {
                        setError('Product not found');
                    } else {
                        setError('Fetching product failed: ' + err.message);
                    }
                } else if (err instanceof Error) {
                    setError('An unknown error occurred');
                }
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) return <PulseLoading />;
    if (error) {
        if (error === 'Product not found') {
            return <NotFound />;
        }
        return <p className='text-red-600 text-center'>{error}</p>;
    }

    return (
        <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
            <div className="max-w-6xl w-full">
                {product && (
                    <div className="flex flex-col md:flex-row justify-between gap-8 p-6">
                        <div className="flex-shrink-0 w-full md:w-1/2">
                            <ImageViewer
                                images={product.images}
                                currentImageIndex={currentImageIndex}
                                onNext={handleNextImage}
                                onPrev={handlePrevImage}
                                onClickImage={openModal}
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl w-6/10 font-bold text-gray-700">{product.title}</h1>
                                    <div className="flex items-center">
                                        <StarRating rating={product.rating} />
                                        <strong className="ml-2 text-lg">{product.rating}</strong>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className='font-semibold text-gray-700'>{product.description}</p>
                                    <p className='text-gray-500 font-semibold mt-2'>Stock: {product.stock}</p>
                                    <p className='text-gray-500 font-semibold mt-2'>Brand: {product.brand}</p>
                                    <p className='text-gray-500 font-semibold mt-2'>Category: {product.category}</p>
                                </div>
                                <div className="bg-purple-700 text-white rounded-full px-4 py-1 w-fit mt-4">
                                    -{product.discountPercentage}%
                                </div>
                                <div className='flex justify-between items-center mt-4'>
                                    <p className="flex items-center text-3xl font-bold text-gray-700">{product.price} <FaDollarSign /></p>
                                    <CustomButton label="Add to cart" width='40%' onClick={handleAddToCart} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && product && (
                <ImageModal
                    images={product.images}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default DetailsPage;
