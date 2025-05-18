import React, { useState } from 'react';
import styled from 'styled-components';
import ProductGrid from '../components/products/ProductGrid';
import CategoryFilter from '../components/products/CategoryFilter';
import { products } from '../data/products';
import { ProductCategory } from '../types';

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  return (
    <Section>
      <Container>
        <PageTitle>Nossos Produtos</PageTitle>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProductGrid
          products={products}
          category={selectedCategory}
        />
      </Container>
    </Section>
  );
};

export default ProductsPage;