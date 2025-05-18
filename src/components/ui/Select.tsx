import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const SelectContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const SelectLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.gray[700]};
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  appearance: none;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  padding-right: ${props => props.theme.spacing[10]};
  border: 1px solid ${props => props.hasError ? props.theme.colors.error[500] : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.5;
  color: ${props => props.theme.colors.gray[800]};
  background-color: ${props => props.theme.colors.white};
  transition: all ${props => props.theme.transitions.fast} ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? props.theme.colors.error[500] : props.theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${props => props.hasError 
      ? `${props.theme.colors.error[100]}` 
      : `${props.theme.colors.primary[100]}`
    };
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: ${props => props.theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
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

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = false, onChange, ...props }, ref) => {
    const id = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <SelectContainer fullWidth={fullWidth}>
        {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
        <SelectWrapper>
          <StyledSelect
            id={id}
            ref={ref}
            hasError={!!error}
            aria-invalid={!!error}
            onChange={handleChange}
            {...props}
          >
            {!props.required && (
              <option value="" disabled={props.required}>
                {props.placeholder || 'Selecione uma opção...'}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <IconWrapper>
            <ChevronDown size={16} />
          </IconWrapper>
        </SelectWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SelectContainer>
    );
  }
);

Select.displayName = 'Select';

export default Select;