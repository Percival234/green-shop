import { useState, useEffect, useRef, useCallback } from 'react';

import { ProductType } from '@/types/product';

import { RelatedSlide } from '@/components/Related/RelatedSlide/RelatedSlide';

import './RelatedSlider.scss';

type RelatedSliderProps = {
  related: ProductType[];
};

export const RelatedSlider: React.FC<RelatedSliderProps> = ({ related }) => {
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [relatedArrays, setRalatedArrays] = useState<ProductType[][]>([]);
  const [relatedPerSlide, setRalatedPerSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [documentWidth, setDocumentWidth] = useState(window.innerWidth);

  const changeSlide = useCallback(
    (index = activeSlide) => setActiveSlide(index % relatedArrays.length),
    [activeSlide, relatedArrays]
  );

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) =>
    setTouchPosition(event.touches[0].clientX);

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (!touchPosition) return;

    const direction = touchPosition - event.touches[0].clientX;
    let activeIndex = activeSlide + (direction > 10 ? 1 : direction < -10 ? -1 : 0);
    activeIndex = activeIndex < 0 ? relatedArrays.length - 1 : activeIndex;

    changeSlide(activeIndex);
    setTouchPosition(null);
  };

  useEffect(() => {
    const interval = setInterval(() => changeSlide(activeSlide + 1), 2500);
    return () => clearInterval(interval);
  }, [activeSlide, changeSlide]);

  useEffect(() => {
    const relatedPerSlide = Math.floor(Number(sliderLineRef?.current?.offsetWidth) / 250);
    const slides = Math.ceil(related.length / relatedPerSlide);
    const relatedArrays = Array.from({ length: slides }, (_, slideIndex) => {
      const startIndex = slideIndex * relatedPerSlide;
      return related.slice(startIndex, startIndex + relatedPerSlide);
    });

    setRalatedPerSlide(relatedPerSlide);
    setRalatedArrays(relatedArrays);
  }, [documentWidth, relatedPerSlide, related]);

  useEffect(() => {
    const handleResize = () => setDocumentWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="related-slider">
      <div
        ref={sliderLineRef}
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        className="related-slider__line"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
        {relatedArrays.map((slide, index) => (
          <RelatedSlide
            slides={relatedPerSlide}
            width={Number(sliderLineRef?.current?.offsetWidth)}
            related={slide}
            key={index}
          />
        ))}
      </div>
      <div className="related-slider__pagination">
        {relatedArrays.map((_, index) => (
          <div
            onMouseEnter={() => setActiveSlide(index)}
            key={index}
            className={`related-slider__pagination-point ${
              activeSlide === index ? 'active' : ''
            }`}></div>
        ))}
      </div>
    </div>
  );
};
