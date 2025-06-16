import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import Cart from '../cart/Cart';

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: ${props => props.isScrolled ? props.theme.colors.white : 'transparent'};
  box-shadow: ${props => props.isScrolled ? props.theme.shadows.sm : 'none'};
  transition: background-color ${props => props.theme.transitions.normal} ease,
              box-shadow ${props => props.theme.transitions.normal} ease;
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
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[700]};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};

  span.highlight {
    color: ${props => props.theme.colors.secondary[600]};
  }
`;

const NavLinks = styled.nav<{ isOpen: boolean }>`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background-color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: ${props => props.theme.spacing[16]} ${props => props.theme.spacing[4]};
    transform: translateX(${props => (props.isOpen ? '0' : '100%')});
    transition: transform ${props => props.theme.transitions.normal} ease;
    box-shadow: ${props => props.isOpen ? '-4px 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
    z-index: 50;
    overflow-y: auto;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[6]};
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.primary[700] : props.theme.colors.gray[700]};
  font-weight: ${props => props.$isActive ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  text-decoration: none;
  padding: ${props => props.theme.spacing[2]};
  position: relative;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.primary[500]};
    transform: scaleX(${props => (props.$isActive ? 1 : 0)});
    transform-origin: bottom center;
    transition: transform ${props => props.theme.transitions.fast} ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    text-align: center;
    padding: ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes.lg};
    border-bottom: 1px solid ${props => props.theme.colors.gray[100]};

    &::after {
      display: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[700]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[700]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: ${props => props.theme.colors.accent[500]};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  transition: opacity ${props => props.theme.transitions.normal} ease,
              visibility ${props => props.theme.transitions.normal} ease;
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { state, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5532988949994?text=Olá! Gostaria de mais informações sobre a Agro Pet.', '_blank');
  };

  return (
    <>
      <HeaderContainer isScrolled={isScrolled}>
        <HeaderContent>
          <Logo to="/">
            Agro <span className="highlight">Pet</span>
          </Logo>
          
          <NavLinks isOpen={isMenuOpen}>
            <NavLink to="/" $isActive={location.pathname === '/'}>
              Início
            </NavLink>
            <NavLink to="/produtos" $isActive={location.pathname === '/produtos'}>
              Produtos
            </NavLink>
            <NavLink to="/servicos" $isActive={location.pathname === '/servicos'}>
              Serviços
            </NavLink>
            <NavLink to="/sobre" $isActive={location.pathname === '/sobre'}>
              Sobre
            </NavLink>
            <NavLink to="/contato" $isActive={location.pathname === '/contato'}>
              Contato
            </NavLink>
          </NavLinks>
          
          <ActionsContainer>
            <CartButton onClick={toggleCart} aria-label="Carrinho de compras">
              <ShoppingCart size={20} />
              {state.items.length > 0 && (
                <CartCount>{state.items.reduce((total, item) => total + item.quantity, 0)}</CartCount>
              )}
            </CartButton>
            
            <Button 
              variant="primary" 
              size="sm"
              leftIcon={<Phone size={16} />}
              onClick={handleWhatsAppClick}
            >
              WhatsApp
            </Button>
            
            <MobileMenuButton 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MobileMenuButton>
          </ActionsContainer>
        </HeaderContent>
      </HeaderContainer>
      
      <Overlay 
        isVisible={isMenuOpen} 
        onClick={() => setIsMenuOpen(false)} 
        aria-hidden="true"
      />
      
      {state.isOpen && <Cart />}
    </>
  );
};

export default Header;