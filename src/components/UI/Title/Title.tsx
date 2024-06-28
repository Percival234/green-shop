import clsx from 'clsx';
import { cva } from 'class-variance-authority';

import './Title.scss';

const titleVariants = cva('', {
  variants: {
    variant: {
      primary: '',
      border: 'title-border',
    },
    size: {
      large: 'title-size-large',
      medium: 'title-size-medium',
      small: 'title-size-small',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'large',
  },
});

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'primary' | 'border';
  size?: 'large' | 'medium' | 'small';
  centered?: boolean;
};

export const Title: React.FC<TitleProps> = ({
  tag = 'h3',
  variant,
  size,
  className,
  centered,
  ...props
}) => {
  const Element = tag;
  return (
    <Element
      className={clsx(titleVariants({ variant, size }), className, {
        centered: centered,
      })}
      {...props}
    />
  );
};
