import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import Cart from '../cart/Cart';
import MobileSidebar from './MobileSidebar';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: ${props => props.isScrolled ? props.theme.colors.white : 'transparent'};
  box-shadow: ${props => props.isScrolled ? props.theme.shadows.sm : 'none'};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing[2]} 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  max-width: 1280px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[700]};
  text-decoration: none;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[700]};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${props => props.theme.colors.accent[500]};
  color: white;
  border-radius: 50%;
  font-size: 12px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const menuItems = [
  { path: '/', label: 'Início' },
  { path: '/produtos', label: 'Produtos' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/contato', label: 'Contato' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { state, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderContainer isScrolled={isScrolled}>
        <HeaderContent>
          <Logo to="/">Agro Pet</Logo>
          
          <ActionsContainer>
            <IconButton onClick={toggleCart} aria-label="Carrinho">
              <ShoppingCart size={24} />
              {state.items.length > 0 && (
                <CartCount>{state.items.length}</CartCount>
              )}
            </IconButton>
            
            <IconButton 
              as={Link} 
              to="/perfil"
              aria-label="Perfil"
            >
              <User size={24} />
            </IconButton>
            
            <IconButton
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} />
            </IconButton>
          </ActionsContainer>
        </HeaderContent>
      </HeaderContainer>
      
      <MobileSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        currentPath={location.pathname}
      />
      
      {state.isOpen && <Cart />}
    </>
  );
};

export default Header;