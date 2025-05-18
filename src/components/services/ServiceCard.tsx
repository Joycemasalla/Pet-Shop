import React from 'react';
import styled from 'styled-components';
import { CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Service } from '../../types';
import { formatCurrency } from '../../utils/format';

interface ServiceCardProps {
  service: Service;
}

const ServiceCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0;
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-top-left-radius: ${props => props.theme.borderRadius.lg};
  border-top-right-radius: ${props => props.theme.borderRadius.lg};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.normal} ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ServiceContent = styled.div`
  padding: ${props => props.theme.spacing[4]};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ServiceTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ServiceDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing[4]};
  flex-grow: 1;
`;

const ServiceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ServicePrice = styled.span`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[800]};
`;

const ServiceDuration = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  
  svg {
    color: ${props => props.theme.colors.primary[500]};
  }
`;

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  
  const handleSchedule = () => {
    navigate(`/servicos/agendar/${service.id}`);
  };
  
  return (
    <ServiceCardContainer isInteractive>
      <ServiceImage>
        <img src={service.imageUrl} alt={service.name} />
      </ServiceImage>
      
      <ServiceContent>
        <ServiceTitle>{service.name}</ServiceTitle>
        <ServiceDescription>{service.description}</ServiceDescription>
        
        <ServiceMeta>
          <ServicePrice>{formatCurrency(service.price)}</ServicePrice>
          <ServiceDuration>
            <CalendarClock size={16} />
            <span>{service.duration}</span>
          </ServiceDuration>
        </ServiceMeta>
        
        <Button
          variant="primary"
          fullWidth
          leftIcon={<CalendarClock size={16} />}
          onClick={handleSchedule}
        >
          Agendar
        </Button>
      </ServiceContent>
    </ServiceCardContainer>
  );
};

export default ServiceCard;