import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

interface LocationState {
  message?: string;
  type?: 'contact' | 'appointment';
  service?: string;
}

const Section = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[4]};
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.success[500]};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  svg {
    width: 64px;
    height: 64px;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const Message = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
  max-width: 300px;
  margin: 0 auto;
`;

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  const getMessage = () => {
    if (state?.type === 'appointment') {
      return `Seu agendamento para ${state.service} foi enviado com sucesso! Em breve entraremos em contato via WhatsApp para confirmar os detalhes.`;
    }
    return state?.message || 'Obrigado por entrar em contato conosco! Retornaremos em breve.';
  };
  
  return (
    <Section>
      <Container>
        <Icon>
          <CheckCircle />
        </Icon>
        <Title>Agradecemos seu contato!</Title>
        <Message>{getMessage()}</Message>
        
        <ButtonContainer>
          <Button
            variant="primary"
            as={Link}
            to="/"
            fullWidth
          >
            Voltar para a Página Inicial
          </Button>
          
          <Button
            variant="outline"
            as="a"
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
          >
            Siga-nos no Instagram
          </Button>
        </ButtonContainer>
      </Container>
    </Section>
  );
};

export default ThankYouPage;