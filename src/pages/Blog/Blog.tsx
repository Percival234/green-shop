import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingPage } from '@/components/UI/Loading/Loading';

import { BlogService } from '@/api/services/blog-service';

import { SERVER_URL } from '@/constants/SERVER_URL';

import './Blog.scss';

export const Blog = () => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => BlogService.getById(String(id)),
  });

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorServer error={error} />;

  return (
    <article className="article">
      <div className="article__image-container">
        <img
          className="article__image"
          src={`${SERVER_URL}/static/blogs/${data.image}`}
          alt={data.title}
        />
      </div>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.article }}></div>
    </article>
  );
};
