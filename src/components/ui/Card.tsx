import styled, { css } from 'styled-components';

interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  isInteractive?: boolean;
}

const Card = styled.div<CardProps>`
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  
  ${props => {
    switch (props.variant) {
      case 'outlined':
        return css`
          border: 1px solid ${props.theme.colors.gray[200]};
          background-color: ${props.theme.colors.white};
        `;
      case 'elevated':
        return css`
          box-shadow: ${props.theme.shadows.md};
          background-color: ${props.theme.colors.white};
          border: none;
        `;
      default:
        return css`
          background-color: ${props.theme.colors.white};
          border: 1px solid ${props.theme.colors.gray[100]};
          box-shadow: ${props.theme.shadows.sm};
        `;
    }
  }}
  
  ${props => {
    switch (props.padding) {
      case 'small':
        return css`padding: ${props.theme.spacing[2]};`;
      case 'medium':
        return css`padding: ${props.theme.spacing[4]};`;
      case 'large':
        return css`padding: ${props.theme.spacing[6]};`;
      case 'none':
      default:
        return css`padding: 0;`;
    }
  }}
  
  ${props => props.isInteractive && css`
    transition: transform ${props.theme.transitions.fast} ease, 
      box-shadow ${props.theme.transitions.fast} ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `}
`;

Card.defaultProps = {
  variant: 'default',
  padding: 'medium',
  isInteractive: false,
};

export default Card;