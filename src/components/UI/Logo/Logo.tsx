import { Link } from 'react-router-dom';

import LogoImage from '@/assets/icons/logo.svg';

import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoImage} alt="Logo" className="logo" />
    </Link>
  );
};
