import { Link } from '@/components/UI/Link/Link';
import { TextTruncated } from '@/components/UI/TextTruncated/TextTruncated';

import { SERVER_URL } from '@/constants/SERVER_URL';

import { BlogType } from '@/types/blog';

type BlogProps = {
  blog: BlogType;
};

export const Blog: React.FC<BlogProps> = ({
  blog: { _id, image, title, description, createdAt },
}) => {
  return (
    <div className="blog__card">
      <div className="blog__image-container">
        <img
          src={`${SERVER_URL}/static/blogs/${image}`}
          alt={`Blog ${_id}`}
          className="blog__image"
        />
      </div>
      <div className="blog__content">
        <div className="blog__date">{new Date(createdAt).toLocaleDateString('en-GB')}</div>
        <Link to={`/blog/${_id}`} className="blog__sub-title">
          {title}
        </Link>
        <TextTruncated rows={2}>{description}</TextTruncated>
      </div>
    </div>
  );
};
