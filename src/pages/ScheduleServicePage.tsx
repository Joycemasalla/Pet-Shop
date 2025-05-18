import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AppointmentForm from '../components/services/AppointmentForm';
import { services } from '../data/services';

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ScheduleServicePage: React.FC = () => {
  const { serviceId } = useParams();
  
  return (
    <Section>
      <Container>
        <AppointmentForm 
          services={services}
          preSelectedServiceId={serviceId}
        />
      </Container>
    </Section>
  );
};

export default ScheduleServicePage;