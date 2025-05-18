import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
  background-color: ${props => props.theme.colors.white};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing[2]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialsContainer = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing[4]} 0;
`;

const TestimonialsTrack = styled.div<{ currentSlide: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.currentSlide * -100}%);
`;

const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: 0 ${props => props.theme.spacing[2]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    min-width: 50%;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    min-width: 33.333%;
  }
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const TestimonialContent = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[700]};
  margin-bottom: ${props => props.theme.spacing[4]};
  line-height: 1.6;
  flex-grow: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const AuthorImage = styled.div<{ imageUrl?: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.gray[300]};
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.p`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
`;

const PetName = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
`;

const RatingContainer = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const StarIcon = styled(Star)<{ filled: boolean }>`
  color: ${props => props.filled 
    ? props.theme.colors.warning[400] 
    : props.theme.colors.gray[300]};
  margin-right: 2px;
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: -20px;' : 'right: -20px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[700]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  cursor: pointer;
  z-index: 2;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary[50]};
    color: ${props => props.theme.colors.primary[600]};
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[6]};
`;

const Indicator = styled.button<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => 
    props.isActive ? props.theme.colors.primary[600] : props.theme.colors.gray[300]};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    background-color: ${props => 
      props.isActive ? props.theme.colors.primary[600] : props.theme.colors.gray[400]};
  }
`;

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const maxSlide = Math.max(0, testimonials.length - visibleSlides);
  
  // Update visible slides based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Update maxSlide when visibleSlides changes
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [visibleSlides, maxSlide, currentSlide]);
  
  const goToPrevious = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };
  
  const goToNext = () => {
    setCurrentSlide(prev => Math.min(maxSlide, prev + 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(maxSlide, index));
  };
  
  const totalIndicators = maxSlide + 1;
  
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon 
        key={index} 
        size={16} 
        filled={index < rating} 
      />
    ));
  };
  
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>O que nossos clientes dizem</SectionTitle>
          <SectionSubtitle>
            Veja os depoimentos de quem já confia em nossos serviços e produtos.
          </SectionSubtitle>
        </SectionHeader>
        
        <TestimonialsContainer>
          <TestimonialsTrack currentSlide={currentSlide}>
            {testimonials.map((testimonial, index) => (
              <TestimonialSlide key={testimonial.id}>
                <TestimonialCard>
                  <RatingContainer>
                    {renderRating(testimonial.rating)}
                  </RatingContainer>
                  <TestimonialContent>
                    "{testimonial.comment}"
                  </TestimonialContent>
                  <TestimonialAuthor>
                    <AuthorImage imageUrl={testimonial.imageUrl} />
                    <AuthorInfo>
                      <AuthorName>{testimonial.customerName}</AuthorName>
                      {testimonial.petName && (
                        <PetName>Tutor de {testimonial.petName}</PetName>
                      )}
                    </AuthorInfo>
                  </TestimonialAuthor>
                </TestimonialCard>
              </TestimonialSlide>
            ))}
          </TestimonialsTrack>
          
          {currentSlide > 0 && (
            <NavigationButton 
              direction="left" 
              onClick={goToPrevious}
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </NavigationButton>
          )}
          
          {currentSlide < maxSlide && (
            <NavigationButton 
              direction="right" 
              onClick={goToNext}
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </NavigationButton>
          )}
        </TestimonialsContainer>
        
        {totalIndicators > 1 && (
          <Indicators>
            {Array.from({ length: totalIndicators }).map((_, index) => (
              <Indicator
                key={index}
                isActive={currentSlide === index}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </Indicators>
        )}
      </Container>
    </Section>
  );
};

export default Testimonials;