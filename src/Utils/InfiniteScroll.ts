import React, { useEffect } from 'react';

interface InfiniteScrollProps {
    loading: boolean;
    hasMore: boolean;
    loadMore: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loading, hasMore, loadMore }) => {
    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore, loadMore]);

    return null;
};

export default InfiniteScroll;
