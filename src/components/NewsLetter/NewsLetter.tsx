import { Title } from '@/components/UI/Title/Title';

import ImageFlowerPotOne from '@/assets/icons/flowerpot-1.svg';
import ImageFlowerPotTwo from '@/assets/icons/flowerpot-2.svg';
import ImageFlowerPotThree from '@/assets/icons/flowerpot-3.svg';

import './NewsLetter.scss';

export const NewsLetter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__list">
          <div className="newsletter__item">
            <div className="newsletter__image-container">
              <img src={ImageFlowerPotOne} alt="Flowerpot 1" />
            </div>
            <Title size="medium" variant="primary">
              Garden Care
            </Title>
            <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className="newsletter__item">
            <div className="newsletter__image-container">
              <img src={ImageFlowerPotTwo} alt="Flowerpot 2" />
            </div>
            <Title size="medium" variant="primary">
              Plant Renovation
            </Title>
            <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className="newsletter__item">
            <div className="newsletter__image-container">
              <img src={ImageFlowerPotThree} alt="Flowerpot 3" />
            </div>
            <Title size="medium" variant="primary">
              Watering Graden
            </Title>
            <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
