import { LuMail, LuPhone, LuMapPin } from 'react-icons/lu';

import { Logo } from '@/components/UI/Logo/Logo';

import './Contacts.scss';

export const Contacts = () => {
  return (
    <section className="contacts">
      <div className="contacts__container">
        <div className="contacts__container">
          <Logo />
          <div className="contacts__item">
            <LuMapPin size={20} className="contacts__icon" />
            <address>70 West Buckingham Ave. Farmingdale, NY 11735</address>
          </div>
        </div>
        <div className="contacts__container">
          <div className="contacts__item">
            <LuMail size={20} className="contacts__icon" />
            <div>contact@greenshop.com</div>
          </div>
          <div className="contacts__item">
            <LuPhone size={20} className="contacts__icon" />
            <div>+098-765-04-90</div>
          </div>
        </div>
      </div>
    </section>
  );
};
