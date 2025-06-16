import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Service, Appointment } from '../../types';
import { formatCurrency } from '../../utils/format';

interface AppointmentFormProps {
  services: Service[];
  preSelectedServiceId?: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[6]};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[700]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const FormSummary = styled.div`
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const SummaryTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.base};
`;

const SummaryLabel = styled.span`
  color: ${props => props.theme.colors.gray[600]};
`;

const SummaryValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[800]};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[2]};
`;

const AppointmentForm: React.FC<AppointmentFormProps> = ({ services, preSelectedServiceId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Appointment>({
    customerName: '',
    customerPhone: '',
    petName: '',
    petType: '',
    serviceId: preSelectedServiceId || '',
    date: '',
    time: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof Appointment, string>>>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof Appointment]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceId: value }));
    if (errors.serviceId) {
      setErrors(prev => ({ ...prev, serviceId: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Appointment, string>> = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Por favor, informe seu nome';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Por favor, informe seu telefone';
    } else if (!/^\d{10,11}$/.test(formData.customerPhone.replace(/\D/g, ''))) {
      newErrors.customerPhone = 'Telefone inválido';
    }
    
    if (!formData.petName.trim()) {
      newErrors.petName = 'Por favor, informe o nome do seu pet';
    }
    
    if (!formData.petType.trim()) {
      newErrors.petType = 'Por favor, informe o tipo do seu pet';
    }
    
    if (!formData.serviceId) {
      newErrors.serviceId = 'Por favor, selecione um serviço';
    }
    
    if (!formData.date) {
      newErrors.date = 'Por favor, selecione uma data';
    }
    
    if (!formData.time) {
      newErrors.time = 'Por favor, selecione um horário';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulating form submission
      setTimeout(() => {
        // Create WhatsApp message with appointment details
        const selectedService = services.find(s => s.id === formData.serviceId);
        
        let message = `Olá! Gostaria de agendar um serviço:\n\n`;
        message += `*Serviço:* ${selectedService?.name}\n`;
        message += `*Data:* ${formData.date}\n`;
        message += `*Horário:* ${formData.time}\n`;
        message += `*Nome:* ${formData.customerName}\n`;
        message += `*Telefone:* ${formData.customerPhone}\n`;
        message += `*Pet:* ${formData.petName} (${formData.petType})\n`;
        
        if (formData.notes) {
          message += `*Observações:* ${formData.notes}\n`;
        }
        
        // Encode the message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with the formatted message
        window.open(`https://wa.me/5532988949994?text=${encodedMessage}`, '_blank');
        
        // Navigate to thank you page
        navigate('/agradecimento', { 
          state: { 
            message: 'Seu agendamento foi enviado com sucesso!',
            type: 'appointment',
            service: selectedService?.name 
          } 
        });
        
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  const selectedService = services.find(s => s.id === formData.serviceId);
  
  // Generate time slots from 8:00 to 17:00 with 30-minute intervals
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip 12:00 to 13:30 for lunch break
        if (hour === 12 && minute === 0) continue;
        if (hour === 12 && minute === 30) continue;
        if (hour === 13 && minute === 0) continue;
        
        // Skip times after 17:00
        if (hour === 17 && minute > 0) continue;
        
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeSlot = `${formattedHour}:${formattedMinute}`;
        timeSlots.push({ value: timeSlot, label: timeSlot });
      }
    }
    return timeSlots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Get tomorrow's date for min date in date picker
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Agendar Serviço</FormTitle>
      
      {selectedService && (
        <FormSummary>
          <SummaryTitle>Resumo do Serviço</SummaryTitle>
          <SummaryItem>
            <SummaryLabel>Serviço:</SummaryLabel>
            <SummaryValue>{selectedService.name}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Duração:</SummaryLabel>
            <SummaryValue>{selectedService.duration}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Valor:</SummaryLabel>
            <SummaryValue>{formatCurrency(selectedService.price)}</SummaryValue>
          </SummaryItem>
        </FormSummary>
      )}
      
      <Select
        label="Serviço"
        name="serviceId"
        value={formData.serviceId}
        onChange={handleServiceChange}
        options={services.map(service => ({ 
          value: service.id, 
          label: `${service.name} - ${formatCurrency(service.price)}`
        }))}
        error={errors.serviceId}
        fullWidth
        required
      />
      
      <FormRow>
        <Input
          label="Data"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          min={getTomorrowDate()}
          fullWidth
          required
        />
        
        <Select
          label="Horário"
          name="time"
          value={formData.time}
          onChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
          options={timeSlots}
          error={errors.time}
          fullWidth
          required
        />
      </FormRow>
      
      <FormRow>
        <Input
          label="Seu Nome"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          error={errors.customerName}
          fullWidth
          required
        />
        
        <Input
          label="Seu Telefone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          error={errors.customerPhone}
          placeholder="(00) 00000-0000"
          fullWidth
          required
        />
      </FormRow>
      
      <FormRow>
        <Input
          label="Nome do Pet"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          error={errors.petName}
          fullWidth
          required
        />
        
        <Input
          label="Tipo do Pet (ex: Cão, Gato)"
          name="petType"
          value={formData.petType}
          onChange={handleChange}
          error={errors.petType}
          fullWidth
          required
        />
      </FormRow>
      
      <TextArea
        label="Observações (opcional)"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Informe detalhes importantes sobre seu pet ou alguma solicitação especial"
        fullWidth
      />
      
      <ButtonContainer>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          leftIcon={<Send size={18} />}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Enviar Agendamento
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default AppointmentForm;