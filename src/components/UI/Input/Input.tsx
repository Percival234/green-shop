import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import './Input.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register: React.InputHTMLAttributes<HTMLInputElement>;
};

export const Input: React.FC<InputProps> = ({ register, className, ...props }) => {
  return <input {...register} {...props} className={clsx('input', className)} />;
};

export const InputPass: React.FC<InputProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleIsVisible = () => setIsVisible(!isVisible);

  return (
    <div className="input-pass">
      <Input type={isVisible ? 'text' : 'password'} {...props} />
      <button type="button" onClick={handleIsVisible} className="input-pass__button">
        {isVisible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
      </button>
    </div>
  );
};

type InputWithLabelProps = InputProps & {
  label: string;
};

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, ...props }) => {
  return (
    <label className="label-input">
      <div className="label-input__label">{label}</div>
      <Input {...props} />
    </label>
  );
};
