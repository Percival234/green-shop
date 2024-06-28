import './TextTruncated.scss';

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  rows?: number;
};

export const TextTruncated: React.FC<TextProps> = ({ rows, ...props }) => {
  const styles: React.CSSProperties & { '--rows'?: number } = { '--rows': rows };
  return <p className="text-truncated" style={styles} {...props} />;
};
