import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: ${props => props.theme.colors.primary[100]};
  z-index: 1000;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${props => props.theme.colors.primary[600]};
  width: ${props => props.progress}%;
  transition: width 0.2s ease;
`;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <ProgressBar>
      <Progress progress={progress} />
    </ProgressBar>
  );
};

export default ScrollProgress;