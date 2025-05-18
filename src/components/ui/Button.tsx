import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  font-weight: ${props => props.theme.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.normal} ease;
  cursor: pointer;
  white-space: nowrap;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${props.theme.spacing[1]} ${props.theme.spacing[2]};
          font-size: ${props.theme.fontSizes.sm};
        `;
      case 'lg':
        return css`
          padding: ${props.theme.spacing[3]} ${props.theme.spacing[6]};
          font-size: ${props.theme.fontSizes.lg};
        `;
      default: // md
        return css`
          padding: ${props.theme.spacing[2]} ${props.theme.spacing[4]};
          font-size: ${props.theme.fontSizes.base};
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: ${props.theme.colors.secondary[500]};
          color: ${props.theme.colors.white};
          border: 1px solid ${props.theme.colors.secondary[500]};
          
          &:hover, &:focus {
            background-color: ${props.theme.colors.secondary[600]};
            border-color: ${props.theme.colors.secondary[600]};
          }
          
          &:active {
            background-color: ${props.theme.colors.secondary[700]};
            border-color: ${props.theme.colors.secondary[700]};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.primary[600]};
          border: 1px solid ${props.theme.colors.primary[600]};
          
          &:hover, &:focus {
            background-color: ${props.theme.colors.primary[50]};
          }
          
          &:active {
            background-color: ${props.theme.colors.primary[100]};
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.primary[600]};
          border: 1px solid transparent;
          
          &:hover, &:focus {
            background-color: ${props.theme.colors.primary[50]};
          }
          
          &:active {
            background-color: ${props.theme.colors.primary[100]};
          }
        `;
      default: // primary
        return css`
          background-color: ${props.theme.colors.primary[600]};
          color: ${props.theme.colors.white};
          border: 1px solid ${props.theme.colors.primary[600]};
          
          &:hover, &:focus {
            background-color: ${props.theme.colors.primary[700]};
            border-color: ${props.theme.colors.primary[700]};
          }
          
          &:active {
            background-color: ${props.theme.colors.primary[800]};
            border-color: ${props.theme.colors.primary[800]};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.isLoading && css`
    position: relative;
    
    &::after {
      content: "";
      position: absolute;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    
    span {
      opacity: 0;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      isLoading={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {leftIcon && !isLoading && leftIcon}
      <span>{children}</span>
      {rightIcon && !isLoading && rightIcon}
    </StyledButton>
  );
};

export default Button;