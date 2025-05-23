import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
      overflow-x: hidden;
      max-width: 100vw;

  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[800]};
    line-height: ${theme.lineHeights.normal};
    min-height: 100vh;
     overflow-x: hidden;
      max-width: 100vw;
  }

  body, button, input, select, textarea {
    font-family: 'Montserrat', sans-serif;
  }

  a {
    color: ${theme.colors.primary[600]};
    text-decoration: none;
    transition: color ${theme.transitions.fast} ease;

    &:hover {
      color: ${theme.colors.primary[800]};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.gray[900]};
    font-weight: ${theme.fontWeights.semibold};
    line-height: ${theme.lineHeights.tight};
    margin-bottom: ${theme.spacing[4]};
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['5xl']};
    }
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['4xl']};
    }
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['2xl']};
    }
  }

  p {
    margin-bottom: ${theme.spacing[4]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, input, textarea, select {
    font-size: ${theme.fontSizes.base};
  }

  /* Clear button styles */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${theme.spacing[4]};
  }

  /* Container */
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 ${theme.spacing[4]};
    max-width: 1280px;
  }

  /* Section Spacing */
  section {
    padding: ${theme.spacing[8]} 0;
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Visually hidden for screen readers */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;