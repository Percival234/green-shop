import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { Link as L, LinkProps as LProps, useLocation } from 'react-router-dom';

import './Link.scss';

type LinkProps = React.PropsWithChildren<LProps> & {
  variant?: 'default' | 'button' | 'ghost' | 'social';
  size?: 'default' | 'button' | 'icon';
  navlink?: boolean;
};

const linkVariants = cva('link', {
  variants: {
    variant: {
      default: 'link-default',
      ghost: 'link-ghost',
      social: 'link-social',
      button: 'link-button',
    },
    size: {
      default: 'link-size-default',
      button: 'link-size-button',
      icon: 'link-size-icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const Link: React.FC<LinkProps> = ({ variant, size, className, to, navlink, ...props }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <L
      to={to}
      className={clsx(linkVariants({ variant, size }), className, {
        'active-link': navlink && isActive,
      })}
      {...props}
    />
  );
};
