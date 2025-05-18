import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary[600]};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => (props.visible ? '1' : '0')};
  transform: translateY(${props => (props.visible ? '0' : '20px')});
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: ${props => props.theme.colors.primary[700]};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
  }
`;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton visible={visible} onClick={scrollToTop} aria-label="Voltar ao topo">
      <ArrowUp size={20} />
    </ScrollButton>
  );
};

export default ScrollToTop;