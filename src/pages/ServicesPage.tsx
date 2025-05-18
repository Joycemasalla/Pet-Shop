import React from 'react';
import styled from 'styled-components';
import ServiceGrid from '../components/services/ServiceGrid';
import { services } from '../data/services';

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const PageDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing[8]};
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const ServicesPage: React.FC = () => {
  return (
    <Section>
      <Container>
        <PageTitle>Nossos Serviços</PageTitle>
        <PageDescription>
          Oferecemos uma variedade de serviços veterinários e de cuidados para garantir o bem-estar do seu pet.
          Agende agora mesmo e proporcione o melhor atendimento para seu companheiro.
        </PageDescription>
        <ServiceGrid services={services} />
      </Container>
    </Section>
  );
};

export default ServicesPage;