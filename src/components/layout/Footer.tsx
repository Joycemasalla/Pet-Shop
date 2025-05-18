import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary[800]};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[10]} 0 ${props => props.theme.spacing[6]};
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing[4]};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.theme.colors.secondary[400]};
  }
`;

const FooterLogo = styled(Link)`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing[2]};
  
  span.highlight {
    color: ${props => props.theme.colors.secondary[400]};
  }
`;

const FooterDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[300]};
  margin-bottom: ${props => props.theme.spacing[4]};
  line-height: ${props => props.theme.lineHeights.normal};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[300]};
  
  svg {
    color: ${props => props.theme.colors.secondary[400]};
    min-width: 20px;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.gray[300]};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing[2]};
  transition: color ${props => props.theme.transitions.fast} ease;
  display: inline-block;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.secondary[400]};
  }
  
  &::before {
    content: '›';
    margin-right: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.secondary[400]};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[2]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.primary[700]};
  color: ${props => props.theme.colors.white};
  transition: all ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary[500]};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.spacing[6]};
  margin-top: ${props => props.theme.spacing[6]};
  border-top: 1px solid ${props => props.theme.colors.primary[700]};
  color: ${props => props.theme.colors.gray[400]};
  font-size: ${props => props.theme.fontSizes.sm};
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => props.theme.spacing[4]};
  padding-right: ${props => props.theme.spacing[4]};
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo to="/">
            Agro <span className="highlight">Pet</span>
          </FooterLogo>
          <FooterDescription>
            Sua loja completa de produtos e serviços para animais de estimação em Cataguases.
            Oferecemos produtos de qualidade e atendimento veterinário especializado.
          </FooterDescription>
          
          <ContactItem>
            <MapPin size={20} />
            <span>Av. Principal, 123 - Centro, Cataguases - MG</span>
          </ContactItem>
          
          <ContactItem>
            <Phone size={20} />
            <span>(32) 3422-1234</span>
          </ContactItem>
          
          <ContactItem>
            <Mail size={20} />
            <span>contato@agropet.com.br</span>
          </ContactItem>
          
          <ContactItem>
            <Clock size={20} />
            <span>Seg-Sex: 8h às 18h | Sáb: 8h às 12h</span>
          </ContactItem>
          
          <SocialLinks>
            <SocialLink href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </SocialLink>
            <SocialLink href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterNav>
            <FooterLink to="/">Início</FooterLink>
            <FooterLink to="/produtos">Produtos</FooterLink>
            <FooterLink to="/servicos">Serviços</FooterLink>
            <FooterLink to="/sobre">Sobre Nós</FooterLink>
            <FooterLink to="/contato">Contato</FooterLink>
          </FooterNav>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Serviços</FooterTitle>
          <FooterNav>
            <FooterLink to="/servicos">Consulta Veterinária</FooterLink>
            <FooterLink to="/servicos">Banho e Tosa</FooterLink>
            <FooterLink to="/servicos">Vacinação</FooterLink>
            <FooterLink to="/servicos">Farmácia Veterinária</FooterLink>
            <FooterLink to="/servicos">Exames Laboratoriais</FooterLink>
          </FooterNav>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Agro Pet. Todos os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;