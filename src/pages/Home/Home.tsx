import { Shop } from '@/components/Shop/Shop';
import { Blogs } from '@/components/Blog/Blogs';
import { Slider } from '@/components/Slider/Slider';
import { Contacts } from '@/components/Contacts/Contacts';
import { NewsLetter } from '@/components/NewsLetter/NewsLetter';

export const Home = () => {
  return (
    <>
      <Slider />
      <Shop />
      <Blogs />
      <NewsLetter />
      <Contacts />
    </>
  );
};
