import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { Product } from '../../types';

interface FeaturedProductsProps {
  products: Product[];
}

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing[2]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.primary[600]};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: color ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary[800]};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  // Get featured products or the first 4 products
  const featuredProducts = products
    .filter(product => product.featured)
    .slice(0, 4);
    
  // If we don't have enough featured products, add more from the regular products
  const displayProducts = featuredProducts.length < 4
    ? [...featuredProducts, ...products.filter(p => !p.featured).slice(0, 4 - featuredProducts.length)]
    : featuredProducts;
    
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Produtos em Destaque</SectionTitle>
          <ViewAllLink to="/produtos">
            <span>Ver todos</span>
            <ChevronRight size={16} />
          </ViewAllLink>
        </SectionHeader>
        
        <ProductGrid>
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Container>
    </Section>
  );
};

export default FeaturedProducts;