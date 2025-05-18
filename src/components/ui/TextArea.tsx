import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextAreaContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const TextAreaLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.gray[700]};
`;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.hasError ? props.theme.colors.error[500] : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.5;
  color: ${props => props.theme.colors.gray[800]};
  transition: all ${props => props.theme.transitions.fast} ease;
  min-height: 100px;
  resize: vertical;
  
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

const ErrorMessage = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.error[500]};
  margin-top: ${props => props.theme.spacing[1]};
  margin-bottom: 0;
`;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, ...props }, ref) => {
    const id = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <TextAreaContainer fullWidth={fullWidth}>
        {label && <TextAreaLabel htmlFor={id}>{label}</TextAreaLabel>}
        <StyledTextArea
          id={id}
          ref={ref}
          hasError={!!error}
          aria-invalid={!!error}
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;