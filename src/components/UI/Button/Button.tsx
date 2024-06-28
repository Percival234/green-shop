import clsx from 'clsx';
import { cva } from 'class-variance-authority';

import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'rounded';
  size?: 'default' | 'icon';
};

const buttonVariant = cva('button', {
  variants: {
    variant: {
      primary: 'button-primary',
      outline: 'button-outline',
      ghost: 'button-ghost',
      rounded: 'button-primary button-rounded',
    },
    size: {
      default: 'button-size-default',
      icon: 'button-size-icon',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export const Button: React.FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={clsx(buttonVariant({ variant, size }), className)} {...props} />;
};
