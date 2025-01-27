import { useEffect, useRef, RefObject } from 'react';

const InfiniteScroll = (
  onLoadMore: () => void,
  hasMore: boolean
): RefObject<HTMLDivElement> => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { rootMargin: '100px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [onLoadMore, hasMore]);

  return sentinelRef;
};

export default InfiniteScroll;