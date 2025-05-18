import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/contact/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const ContactTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.primary[700]};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  
  svg {
    color: ${props => props.theme.colors.primary[500]};
    flex-shrink: 0;
    margin-top: ${props => props.theme.spacing[1]};
  }
`;

const InfoText = styled.div`
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.theme.fontWeights.semibold};
    margin-bottom: ${props => props.theme.spacing[1]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    margin-bottom: 0;
  }
`;

const Map = styled.div`
  margin-top: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  height: 300px;
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const ContactPage: React.FC = () => {
  return (
    <Section>
      <Container>
        <Grid>
          <ContactInfo>
            <ContactTitle>Entre em Contato</ContactTitle>
            <InfoList>
              <InfoItem>
                <MapPin size={24} />
                <InfoText>
                  <h3>Endereço</h3>
                  <p>Av. Principal, 123 - Centro<br />Cataguases - MG</p>
                </InfoText>
              </InfoItem>
              
              <InfoItem>
                <Phone size={24} />
                <InfoText>
                  <h3>Telefone</h3>
                  <p>(32) 3422-1234</p>
                </InfoText>
              </InfoItem>
              
              <InfoItem>
                <Mail size={24} />
                <InfoText>
                  <h3>E-mail</h3>
                  <p>contato@agropet.com.br</p>
                </InfoText>
              </InfoItem>
              
              <InfoItem>
                <Clock size={24} />
                <InfoText>
                  <h3>Horário de Funcionamento</h3>
                  <p>Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 12h</p>
                </InfoText>
              </InfoItem>
            </InfoList>
            
            <Map>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.5726063013897!2d-42.6977893!3d-21.7875456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ3JzE1LjIiUyA0MsKwNDEnNTIuMCJX!5e0!3m2!1spt-BR!2sbr!4v1635789012345!5m2!1spt-BR!2sbr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Agro Pet"
              />
            </Map>
          </ContactInfo>
          
          <ContactForm />
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactPage;