import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Section = styled.section`
  padding: ${props => props.theme.spacing[6]} 0;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[10]} 0;
  }
`;

const TestimonialsTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.currentSlide * -100}%);
  touch-action: pan-y pinch-zoom;
`;

const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: 0 ${props => props.theme.spacing[2]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    min-width: 50%;
  }
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[4]};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.sm};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[6]};
  }
`;

// ... (rest of the styled components remain the same)

const Testimonials = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < testimonials.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }

    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Section>
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <TestimonialsTrack currentSlide={currentSlide}>
          {testimonials.map(testimonial => (
            <TestimonialSlide key={testimonial.id}>
              <TestimonialCard>
                {/* Card content remains the same */}
              </TestimonialCard>
            </TestimonialSlide>
          ))}
        </TestimonialsTrack>
      </div>
    </Section>
  );
};

export default Testimonials;