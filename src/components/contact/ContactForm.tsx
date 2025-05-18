import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  max-width: 600px;
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu email';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (formData.phone && !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Por favor, informe o assunto';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, escreva sua mensagem';
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
        // Create WhatsApp message with form data
        let message = `Nova mensagem de contato:\n\n`;
        message += `*Nome:* ${formData.name}\n`;
        message += `*Email:* ${formData.email}\n`;
        
        if (formData.phone) {
          message += `*Telefone:* ${formData.phone}\n`;
        }
        
        message += `*Assunto:* ${formData.subject}\n\n`;
        message += `*Mensagem:*\n${formData.message}`;
        
        // Encode the message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with the formatted message
        window.open(`https://wa.me/5532999999999?text=${encodedMessage}`, '_blank');
        
        // Navigate to thank you page
        navigate('/agradecimento', { 
          state: { 
            message: 'Sua mensagem foi enviada com sucesso!',
            type: 'contact' 
          } 
        });
        
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Input
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Seu nome completo"
          fullWidth
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="seu.email@exemplo.com"
          fullWidth
          required
        />
      </FormRow>
      
      <FormRow>
        <Input
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="(00) 00000-0000"
          fullWidth
        />
        
        <Input
          label="Assunto"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          placeholder="Assunto da mensagem"
          fullWidth
          required
        />
      </FormRow>
      
      <TextArea
        label="Mensagem"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Escreva sua mensagem aqui..."
        fullWidth
        required
      />
      
      <Button
        type="submit"
        variant="primary"
        leftIcon={<Send size={18} />}
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Enviar Mensagem
      </Button>
    </Form>
  );
};

export default ContactForm;