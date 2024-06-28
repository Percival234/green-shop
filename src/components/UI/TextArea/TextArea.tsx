import './TextArea.scss';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  register: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export const TextArea: React.FC<TextAreaProps> = ({ register, ...props }) => {
  return <textarea className="textarea" {...register} {...props} />;
};
