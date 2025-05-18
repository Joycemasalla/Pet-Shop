import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/7210356/pexels-photo-7210356.jpeg',
    title: 'Cuidado completo para seu melhor amigo',
    subtitle: 'Produtos de qualidade e atendimento veterinário especializado',
    ctaText: 'Ver Produtos',
    ctaLink: '/produtos',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/6568851/pexels-photo-6568851.jpeg',
    title: 'Serviços veterinários profissionais',
    subtitle: 'Consultas, vacinas, exames e muito mais para a saúde do seu pet',
    ctaText: 'Agendar Consulta',
    ctaLink: '/servicos',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/6131645/pexels-photo-6131645.jpeg',
    title: 'Banho & Tosa com carinho',
    subtitle: 'Seu pet limpo, cheiroso e feliz com profissionais qualificados',
    ctaText: 'Agendar Serviço',
    ctaLink: '/servicos',
  },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BannerContainer = styled.section`
  position: relative;
  height: 500px;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 400px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 350px;
  }
`;

const BannerSlide = styled.div<{ isActive: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${props => (props.isActive ? 1 : 0)};
  transition: opacity 0.5s ease;
  visibility: ${props => (props.isActive ? 'visible' : 'hidden')};
`;

const BannerImage = styled.div<{ image: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 6s ease;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
  }
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[4]};
  z-index: 1;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 50%;
    bottom: 50%;
    transform: translateY(50%);
    padding: ${props => props.theme.spacing[10]};
  }
`;

const BannerTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing[2]};
  animation: ${slideUp} 0.8s ease;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.fontSizes['5xl']};
  }
`;

const BannerSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing[6]};
  opacity: 0.9;
  animation: ${slideUp} 0.8s ease 0.2s both;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const BannerButton = styled(Button)`
  animation: ${slideUp} 0.8s ease 0.4s both;
`;

const NavButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 2;
  transition: background-color ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing[4]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  z-index: 2;
`;

const Indicator = styled.button<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => 
    props.isActive ? props.theme.colors.white : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast} ease,
              transform ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const goToPrevious = () => {
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setActiveIndex(prevIndex => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <BannerContainer>
      {banners.map((banner, index) => (
        <BannerSlide key={banner.id} isActive={index === activeIndex}>
          <BannerImage image={banner.image} />
          <BannerContent>
            <BannerTitle>{banner.title}</BannerTitle>
            <BannerSubtitle>{banner.subtitle}</BannerSubtitle>
            <BannerButton 
              variant="primary" 
              size="lg" 
              as="a" 
              href={banner.ctaLink}
            >
              {banner.ctaText}
            </BannerButton>
          </BannerContent>
        </BannerSlide>
      ))}
      
      <NavButton 
        direction="left" 
        onClick={goToPrevious}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </NavButton>
      
      <NavButton 
        direction="right" 
        onClick={goToNext}
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </NavButton>
      
      <Indicators>
        {banners.map((banner, index) => (
          <Indicator 
            key={banner.id}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </Indicators>
    </BannerContainer>
  );
};

export default Banner;