import React from 'react';
import styled from 'styled-components';
import { ShoppingCart } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';

interface ProductCardProps {
  product: Product;
}

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-top-left-radius: ${props => props.theme.borderRadius.lg};
  border-top-right-radius: ${props => props.theme.borderRadius.lg};
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.normal} ease;
  }
`;

const ProductImageHover = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.normal} ease;
`;

const ProductCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0;
  
  &:hover {
    ${ProductImage} img {
      transform: scale(1.05);
    }
    
    ${ProductImageHover} {
      opacity: 1;
    }
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing[2]};
  right: ${props => props.theme.spacing[2]};
  background-color: ${props => props.theme.colors.accent[500]};
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.fontWeights.bold};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  z-index: 1;
`;

const ProductContent = styled.div`
  padding: ${props => props.theme.spacing[4]};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductCategory = styled.span`
  color: ${props => props.theme.colors.primary[600]};
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  font-weight: ${props => props.theme.fontWeights.semibold};
  letter-spacing: 0.5px;
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const ProductTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing[3]};
  line-height: 1.5;
  flex-grow: 1;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const ProductPrice = styled.span<{ hasDiscount?: boolean }>`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.hasDiscount ? props.theme.colors.gray[500] : props.theme.colors.gray[800]};
  text-decoration: ${props => props.hasDiscount ? 'line-through' : 'none'};
  margin-right: ${props => props.hasDiscount ? props.theme.spacing[2] : 0};
`;

const ProductDiscountPrice = styled.span`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.accent[600]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
`;

const getCategoryName = (category: string): string => {
  const categories: Record<string, string> = {
    food: 'Alimentação',
    toys: 'Brinquedos',
    hygiene: 'Higiene',
    accessories: 'Acessórios',
    medication: 'Medicamentos',
    bedding: 'Camas e Conforto'
  };
  
  return categories[category] || category;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
    
  return (
    <ProductCardContainer isInteractive>
      <ProductImage>
        {product.discount && (
          <DiscountBadge>-{product.discount}%</DiscountBadge>
        )}
        <img src={product.imageUrl} alt={product.name} />
        <ProductImageHover>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            aria-label="Adicionar ao carrinho"
            leftIcon={<ShoppingCart size={16} />}
          >
            Adicionar
          </Button>
        </ProductImageHover>
      </ProductImage>
      
      <ProductContent>
        <ProductCategory>{getCategoryName(product.category)}</ProductCategory>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        
        <PriceContainer>
          {discountedPrice ? (
            <>
              <ProductPrice hasDiscount>{formatCurrency(product.price)}</ProductPrice>
              <ProductDiscountPrice>{formatCurrency(discountedPrice)}</ProductDiscountPrice>
            </>
          ) : (
            <ProductPrice>{formatCurrency(product.price)}</ProductPrice>
          )}
        </PriceContainer>
        
        <ButtonContainer>
          <Button
            variant="primary"
            fullWidth
            leftIcon={<ShoppingCart size={16} />}
            onClick={handleAddToCart}
          >
            Adicionar ao Carrinho
          </Button>
        </ButtonContainer>
      </ProductContent>
    </ProductCardContainer>
  );
};

export default ProductCard;