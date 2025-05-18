import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { Product, ProductCategory } from '../../types';

interface ProductGridProps {
  products: Product[];
  category?: ProductCategory | 'all';
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[10]};
  color: ${props => props.theme.colors.gray[600]};
`;

const ProductGrid: React.FC<ProductGridProps> = ({ products, category }) => {
  const filteredProducts = category && category !== 'all'
    ? products.filter(product => product.category === category)
    : products;
    
  if (filteredProducts.length === 0) {
    return (
      <EmptyState>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente mudar os filtros de busca ou categoria.</p>
      </EmptyState>
    );
  }
  
  return (
    <Grid>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;