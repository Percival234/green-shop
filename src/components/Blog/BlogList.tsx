import { FiInfo } from 'react-icons/fi';

import { BlogType } from '@/type/blog';

import { Blog } from '@/components/Blog/Blog';
import { Empty } from '@/components/UI/Empty/Empty';

import './Blogs.scss';

type BlogListProps = {
  blogs: BlogType[];
};

export const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  if (!blogs.length) return <Empty Icon={FiInfo} text="No blogs" />;

  return (
    <div className="blog__list">
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};
