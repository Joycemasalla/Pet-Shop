import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ServicesHighlight from '../components/home/ServicesHighlight';
import Testimonials from '../components/home/Testimonials';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';

const HomePage: React.FC = () => {
  return (
    <>
      <Banner />
      <FeaturedProducts products={products} />
      <ServicesHighlight />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export default HomePage;