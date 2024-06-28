import { createPortal } from 'react-dom';

import GifLoader from '@/assets/gifs/potted-plant-loader.gif';

import './Loading.scss';

export const LoadingPage = () => {
  return createPortal(
    <div className="page-loading">
      <img className="page-loading__gif" alt="Loading-gif" src={GifLoader} />
    </div>,
    document.getElementById('loading')!
  );
};

export const LoadingLocal = () => {
  return (
    <div className="local-loading">
      <div className="local-loading__spiner"></div>
    </div>
  );
};

export const LoadingButton = () => {
  return (
    <div className="button-loading">
      <div className="button-loading__spiner"></div>
      <div>Processing...</div>
    </div>
  );
};
