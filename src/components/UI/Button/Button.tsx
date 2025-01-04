import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

import './Button.scss';

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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariant>;

export const Button: React.FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={clsx(buttonVariant({ variant, size }), className)} {...props} />;
};
