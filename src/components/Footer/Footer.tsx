import { FiTwitter, FiFacebook, FiLinkedin, FiInstagram } from 'react-icons/fi';

import { Link } from '@/components/UI/Link/Link';
import { Title } from '@/components/UI/Title/Title';

import {
  BLOG_HOW_TO_BUY_ID,
  BLOG_HOW_TO_RETURN_ID,
  BLOG_PRIVATE_POLICY_ID,
} from '@/constants/BLOGS';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__action">
          <div className="footer__menu">
            <Title tag="h4" size="small">
              My Account
            </Title>
            <Link to="/account">Account</Link>
            <Link to="/account/wishlist">Wishlist</Link>
            <Link to="/account/support">Support</Link>
          </div>
          <div className="footer__menu">
            <Title tag="h4" size="small">
              Help & Guide
            </Title>
            <Link to={`/blog/${BLOG_HOW_TO_RETURN_ID}`}>How to return</Link>
            <Link to={`/blog/${BLOG_PRIVATE_POLICY_ID}`}>Product policy</Link>
            <Link to={`/blog/${BLOG_HOW_TO_BUY_ID}`}>How to buy</Link>
          </div>
          <div className="footer__menu">
            <Title tag="h4" size="small" centered>
              Social Media
            </Title>
            <div className="footer__link-list">
              <Link size="icon" variant="social" to="#" aria-label="Facebook link">
                <FiFacebook />
              </Link>
              <Link size="icon" variant="social" to="#" aria-label="Instagram link">
                <FiInstagram />
              </Link>
              <Link size="icon" variant="social" to="#" aria-label="Linkedin link">
                <FiLinkedin />
              </Link>
              <Link size="icon" variant="social" to="#" aria-label="Twitter link">
                <FiTwitter />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer__copy">&copy; 2021 GreenShop. All rights reserved.</div>
      </div>
    </footer>
  );
};
