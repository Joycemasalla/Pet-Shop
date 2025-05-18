import React from 'react';
import styled from 'styled-components';
import { ProductCategory } from '../../types';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

interface CategoryOption {
  value: ProductCategory | 'all';
  label: string;
}

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[1]};
  }
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => 
    props.isActive ? props.theme.colors.primary[600] : props.theme.colors.gray[100]};
  color: ${props => 
    props.isActive ? props.theme.colors.white : props.theme.colors.gray[700]};
  font-weight: ${props => 
    props.isActive ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    background-color: ${props => 
      props.isActive ? props.theme.colors.primary[700] : props.theme.colors.gray[200]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    text-align: center;
    border-radius: ${props => props.theme.borderRadius.md};
  }
`;

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories: CategoryOption[] = [
    { value: 'all', label: 'Todos' },
    { value: 'food', label: 'Alimentação' },
    { value: 'toys', label: 'Brinquedos' },
    { value: 'hygiene', label: 'Higiene' },
    { value: 'accessories', label: 'Acessórios' },
    { value: 'medication', label: 'Medicamentos' },
    { value: 'bedding', label: 'Camas e Conforto' },
  ];
  
  return (
    <FilterContainer>
      {categories.map((category) => (
        <CategoryButton
          key={category.value}
          isActive={selectedCategory === category.value}
          onClick={() => onCategoryChange(category.value)}
        >
          {category.label}
        </CategoryButton>
      ))}
    </FilterContainer>
  );
};

export default CategoryFilter;