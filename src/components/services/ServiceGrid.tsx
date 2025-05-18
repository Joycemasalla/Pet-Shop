import React from 'react';
import styled from 'styled-components';
import ServiceCard from './ServiceCard';
import { Service } from '../../types';

interface ServiceGridProps {
  services: Service[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <Grid>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </Grid>
  );
};

export default ServiceGrid;