import React, { useState } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing[4]};
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  width: 100%;
  max-width: 500px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[500]};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gray[700]};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: ${props => props.columns || '1fr 1fr'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[4]};
`;

const AddressModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.street.trim()) newErrors.street = 'Rua é obrigatória';
    if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state.trim()) newErrors.state = 'Estado é obrigatório';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSave(formData);
        onClose();
      } catch (error) {
        console.error('Error saving address:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Adicionar Novo Endereço</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <Form onSubmit={handleSubmit}>
          <FormRow columns="2fr 1fr">
            <Input
              label="Rua"
              name="street"
              value={formData.street}
              onChange={handleChange}
              error={errors.street}
              fullWidth
              required
            />
            <Input
              label="Número"
              name="number"
              value={formData.number}
              onChange={handleChange}
              error={errors.number}
              fullWidth
              required
            />
          </FormRow>
          
          <FormRow>
            <Input
              label="Complemento"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Bairro"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              error={errors.neighborhood}
              fullWidth
              required
            />
          </FormRow>
          
          <FormRow>
            <Input
              label="Cidade"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              fullWidth
              required
            />
            <Input
              label="Estado"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              fullWidth
              required
            />
          </FormRow>
          
          <Input
            label="CEP"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            placeholder="00000-000"
            fullWidth
            required
          />
          
          <TextArea
            label="Observações"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Informações adicionais para entrega"
            fullWidth
          />
          
          <ButtonContainer>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Salvar Endereço
            </Button>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddressModal;