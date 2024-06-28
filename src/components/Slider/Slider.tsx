import { useState, useEffect, useRef } from 'react';

import { BANNERS } from '@/constants/BANNERS';

import './Slider.scss';

export const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setActiveSlide((prev) => (prev + 1) % BANNERS.length), 3500);
    return () => clearInterval(interval);
  });

  return (
    <div className="slider hidden-tablet">
      <div className="slider__container">
        <div
          className="slider__line"
          ref={sliderLineRef}
          style={{
            transform: `translateX(-${
              activeSlide * Number(sliderLineRef?.current?.offsetWidth)
            }px)`,
          }}>
          {BANNERS.map((banner, index) => (
            <div
              key={index}
              className="slider__slide"
              style={{
                width: `${100 / BANNERS.length}%`,
              }}>
              <img src={banner} alt="Banner" />
            </div>
          ))}
        </div>
        <div className="slider__pag">
          {BANNERS.map((_, index) => (
            <div
              key={index}
              className={index === activeSlide ? 'slider__pag-point active' : 'slider__pag-point'}
              onMouseEnter={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
