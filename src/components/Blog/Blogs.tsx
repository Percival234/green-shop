import { useQuery } from '@tanstack/react-query';

import { BlogList } from './BlogList';
import { Title } from '@/components/UI/Title/Title';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingLocal } from '@/components/UI/Loading/Loading';

import { BlogService } from '@/api/services/blog-service';

import './Blogs.scss';

export const Blogs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => BlogService.getMany({ limit: 4 }),
  });

  if (isPending) return <LoadingLocal />;
  if (error) return <ErrorServer error={error} />;

  return (
    <section className="blog">
      <div className="blog__container">
        <div className="blog__intro">
          <Title>Our Blog Posts</Title>
          <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
        </div>
        <BlogList blogs={data} />
      </div>
    </section>
  );
};
