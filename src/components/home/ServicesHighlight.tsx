import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight, Stethoscope, Bath, Scissors, Syringe } from 'lucide-react';
import Button from '../ui/Button';

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
  background-color: ${props => props.theme.colors.primary[50]};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing[2]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal} ease,
              box-shadow ${props => props.theme.transitions.normal} ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[4]};
  background-color: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[600]};
  
  svg {
    width: 32px;
    height: 32px;
  }
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
`;

const CTAContainer = styled.div`
  margin-top: ${props => props.theme.spacing[10]};
  text-align: center;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.primary[600]};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-top: ${props => props.theme.spacing[4]};
  transition: color ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary[800]};
  }
`;

const ServicesHighlight: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Consulta Veterinária',
      description: 'Atendimento completo com profissionais experientes para cuidar da saúde do seu pet.',
      icon: <Stethoscope />,
      link: '/servicos'
    },
    {
      id: 2,
      title: 'Banho',
      description: 'Banho completo com produtos específicos para cada tipo de pelagem e necessidade.',
      icon: <Bath />,
      link: '/servicos'
    },
    {
      id: 3,
      title: 'Tosa',
      description: 'Tosa higiênica ou decorativa realizada por tosadores profissionais.',
      icon: <Scissors />,
      link: '/servicos'
    },
    {
      id: 4,
      title: 'Vacinação',
      description: 'Serviço de vacinação com todas as vacinas necessárias para a saúde do seu pet.',
      icon: <Syringe />,
      link: '/servicos'
    }
  ];
  
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <SectionSubtitle>
            Oferecemos uma variedade de serviços veterinários e de cuidados para garantir o bem-estar do seu pet.
          </SectionSubtitle>
        </SectionHeader>
        
        <ServicesGrid>
          {services.map(service => (
            <ServiceCard key={service.id}>
              <IconContainer>
                {service.icon}
              </IconContainer>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>
                {service.description}
              </ServiceDescription>
              <Button
                variant="outline"
                as={Link}
                to={service.link}
              >
                Saiba mais
              </Button>
            </ServiceCard>
          ))}
        </ServicesGrid>
        
        <CTAContainer>
          <Button
            variant="primary"
            size="lg"
            as={Link}
            to="/servicos"
          >
            Agendar Serviço
          </Button>
          
          <div>
            <ViewAllLink to="/servicos">
              <span>Ver todos os serviços</span>
              <ChevronRight size={16} />
            </ViewAllLink>
          </div>
        </CTAContainer>
      </Container>
    </Section>
  );
};

export default ServicesHighlight;