import React from 'react';
import styled from 'styled-components';
import { Award, Heart, Users } from 'lucide-react';

const Section = styled.section`
  padding: ${props => props.theme.spacing[10]} 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutImage = styled.div`
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing[4]};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary[500]};
  }
`;

const AboutParagraph = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: ${props => props.theme.lineHeights.loose};
  color: ${props => props.theme.colors.gray[700]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ValuesSection = styled.section`
  margin-top: ${props => props.theme.spacing[10]};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ValueCard = styled.div`
  padding: ${props => props.theme.spacing[6]};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: transform ${props => props.theme.transitions.normal} ease;
  
  &:hover {
    transform: translateY(-8px);
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
  background-color: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[600]};
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ValueTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ValueDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[600]};
  line-height: ${props => props.theme.lineHeights.normal};
`;

const AboutContent: React.FC = () => {
  return (
    <>
      <Section>
        <Container>
          <AboutGrid>
            <AboutImage>
              <img src="https://images.pexels.com/photos/6568500/pexels-photo-6568500.jpeg" alt="Loja Agro Pet" />
            </AboutImage>
            <AboutText>
              <SectionTitle>Nossa História</SectionTitle>
              <AboutParagraph>
                A Agro Pet nasceu em 2010 com um sonho: proporcionar um atendimento acolhedor e produtos de qualidade para pets e seus tutores em Cataguases.
              </AboutParagraph>
              <AboutParagraph>
                O que começou como uma pequena loja de rações se transformou em um centro completo de cuidados para animais de estimação, oferecendo não apenas produtos selecionados, mas também serviços veterinários com profissionais qualificados e apaixonados.
              </AboutParagraph>
              <AboutParagraph>
                Hoje, somos referência na região e continuamos com o mesmo compromisso: tratar cada pet como se fosse nosso, com amor, respeito e cuidado excepcional.
              </AboutParagraph>
            </AboutText>
          </AboutGrid>
        </Container>
      </Section>
      
      <ValuesSection>
        <Container>
          <SectionTitle style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Nossos Valores
          </SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <IconContainer>
                <Heart />
              </IconContainer>
              <ValueTitle>Amor pelos Animais</ValueTitle>
              <ValueDescription>
                Acreditamos que os animais merecem o melhor cuidado e respeito. Nossa paixão por pets guia cada decisão que tomamos.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <IconContainer>
                <Award />
              </IconContainer>
              <ValueTitle>Qualidade e Excelência</ValueTitle>
              <ValueDescription>
                Oferecemos apenas produtos e serviços que atendam aos mais altos padrões de qualidade, garantindo a saúde e bem-estar dos pets.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard>
              <IconContainer>
                <Users />
              </IconContainer>
              <ValueTitle>Atendimento Personalizado</ValueTitle>
              <ValueDescription>
                Cada pet e tutor são únicos. Por isso, oferecemos um atendimento personalizado, com atenção às necessidades específicas de cada um.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </Container>
      </ValuesSection>
    </>
  );
};

export default AboutContent;