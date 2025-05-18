import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const InputLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.gray[700]};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasLeftIcon?: boolean; hasRightIcon?: boolean; hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  padding-left: ${props => (props.hasLeftIcon ? props.theme.spacing[10] : props.theme.spacing[3])};
  padding-right: ${props => (props.hasRightIcon ? props.theme.spacing[10] : props.theme.spacing[3])};
  border: 1px solid ${props => props.hasError ? props.theme.colors.error[500] : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.5;
  color: ${props => props.theme.colors.gray[800]};
  transition: all ${props => props.theme.transitions.fast} ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? props.theme.colors.error[500] : props.theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${props => props.hasError 
      ? `${props.theme.colors.error[100]}` 
      : `${props.theme.colors.primary[100]}`
    };
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const LeftIconContainer = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[500]};
`;

const RightIconContainer = styled.div`
  position: absolute;
  right: ${props => props.theme.spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[500]};
`;

const ErrorMessage = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.error[500]};
  margin-top: ${props => props.theme.spacing[1]};
  margin-bottom: 0;
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, leftIcon, rightIcon, ...props }, ref) => {
    const id = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <InputWrapper>
          {leftIcon && <LeftIconContainer>{leftIcon}</LeftIconContainer>}
          <StyledInput
            id={id}
            ref={ref}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon}
            hasError={!!error}
            aria-invalid={!!error}
            {...props}
          />
          {rightIcon && <RightIconContainer>{rightIcon}</RightIconContainer>}
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;