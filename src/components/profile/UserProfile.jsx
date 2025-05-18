import React, { useState } from 'react';
import styled from 'styled-components';
import { User, MapPin, Package, Award, Save, Edit2, PawPrint } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AddressModal from './AddressModal';
import OrderHistory from './OrderHistory';

const ProfileContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[6]};
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const ProfileTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ProfileTabs = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[2]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  margin-bottom: ${props => props.theme.spacing[6]};
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[2]};
  }
`;

const TabButton = styled.button`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.$active ? props.theme.colors.primary[700] : props.theme.colors.gray[600]};
  background-color: ${props => props.$active ? props.theme.colors.primary[50] : 'transparent'};
  border: 1px solid ${props => props.$active ? props.theme.colors.primary[200] : props.theme.colors.gray[200]};
  transition: all ${props => props.theme.transitions.normal} ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  min-width: max-content;
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.primary[100] : props.theme.colors.gray[50]};
  }
`;

const ProfileSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[4]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PetProfileGrid = styled(FormGrid)`
  margin-top: ${props => props.theme.spacing[6]};
`;

const LoyaltyCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[800]});
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  color: white;
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[4]};
  }
`;

const LoyaltyPoints = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const LoyaltyStatus = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  opacity: 0.9;
`;

const LoyaltyProgress = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.full};
  margin-top: ${props => props.theme.spacing[2]};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${props => props.theme.colors.secondary[400]};
  transition: width 0.3s ease;
`;

const RewardsList = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const RewardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[3]};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const AddressCard = styled.div`
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    margin-bottom: ${props => props.theme.spacing[1]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(32) 99999-9999'
  });
  
  const [petInfo, setPetInfo] = useState({
    name: 'Rex',
    type: 'Cachorro',
    breed: 'Labrador',
    age: '3',
    weight: '25',
    medicalHistory: 'Vacinado em dia',
    specialNeeds: 'Nenhuma'
  });
  
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'Cataguases',
      state: 'MG',
      zipCode: '36770-000'
    }
  ]);
  
  const mockOrders = [
    {
      id: '1',
      date: '2024-03-10',
      status: 'completed',
      items: [
        {
          id: '1',
          name: 'Ração Premium',
          quantity: 2,
          price: 89.90,
          imageUrl: 'https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg'
        }
      ],
      total: 179.80
    },
    {
      id: '2',
      date: '2024-03-05',
      status: 'pending',
      items: [
        {
          id: '2',
          name: 'Antipulgas',
          quantity: 1,
          price: 45.90,
          imageUrl: 'https://images.pexels.com/photos/6568622/pexels-photo-6568622.jpeg'
        }
      ],
      total: 45.90
    }
  ];

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePetInfoChange = (e) => {
    const { name, value } = e.target;
    setPetInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = async (addressData) => {
    const newAddress = {
      id: Date.now().toString(),
      ...addressData
    };
    setAddresses(prev => [...prev, newAddress]);
  };
  
  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <>
            <ProfileSection>
              <SectionTitle>
                <User size={24} />
                Informações Pessoais
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                  onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
                >
                  {isEditing ? 'Salvar' : 'Editar'}
                </Button>
              </SectionTitle>
              <FormGrid>
                <Input
                  label="Nome"
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Telefone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
              </FormGrid>
            </ProfileSection>
            
            <ProfileSection>
              <SectionTitle>
                <PawPrint size={24} />
                Perfil do Pet
              </SectionTitle>
              <FormGrid>
                <Input
                  label="Nome do Pet"
                  name="name"
                  value={petInfo.name}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Tipo"
                  name="type"
                  value={petInfo.type}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Raça"
                  name="breed"
                  value={petInfo.breed}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Idade"
                  name="age"
                  value={petInfo.age}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Peso (kg)"
                  name="weight"
                  value={petInfo.weight}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Histórico Médico"
                  name="medicalHistory"
                  value={petInfo.medicalHistory}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  label="Necessidades Especiais"
                  name="specialNeeds"
                  value={petInfo.specialNeeds}
                  onChange={handlePetInfoChange}
                  disabled={!isEditing}
                  fullWidth
                />
              </FormGrid>
            </ProfileSection>
          </>
        );
      
      case 'addresses':
        return (
          <ProfileSection>
            <SectionTitle>
              <MapPin size={24} />
              Endereços
            </SectionTitle>
            
            <Button
              variant="primary"
              onClick={() => setIsAddressModalOpen(true)}
              style={{ marginBottom: '1rem' }}
            >
              Adicionar Novo Endereço
            </Button>
            
            {addresses.map(address => (
              <AddressCard key={address.id}>
                <h3>Endereço de Entrega</h3>
                <p>{address.street}, {address.number}</p>
                <p>{address.neighborhood}</p>
                <p>{address.city} - {address.state}</p>
                <p>CEP: {address.zipCode}</p>
                {address.notes && <p>Obs: {address.notes}</p>}
              </AddressCard>
            ))}
            
            <AddressModal
              isOpen={isAddressModalOpen}
              onClose={() => setIsAddressModalOpen(false)}
              onSave={handleSaveAddress}
            />
          </ProfileSection>
        );
      
      case 'orders':
        return (
          <ProfileSection>
            <SectionTitle>
              <Package size={24} />
              Histórico de Pedidos
            </SectionTitle>
            <OrderHistory orders={mockOrders} />
          </ProfileSection>
        );
        
      case 'loyalty':
        return (
          <ProfileSection>
            <SectionTitle>
              <Award size={24} />
              Programa de Fidelidade
            </SectionTitle>
            
            <LoyaltyCard>
              <LoyaltyPoints>1,250 pontos</LoyaltyPoints>
              <LoyaltyStatus>Nível Prata</LoyaltyStatus>
              
              <LoyaltyProgress>
                <div>Próximo nível: Ouro (2,500 pontos)</div>
                <ProgressBar>
                  <ProgressFill progress={50} />
                </ProgressBar>
              </LoyaltyProgress>
              
              <RewardsList>
                <RewardItem>
                  <div>Desconto de 10% em Banho</div>
                  <div>500 pontos</div>
                </RewardItem>
                <RewardItem>
                  <div>Consulta Veterinária Grátis</div>
                  <div>1,000 pontos</div>
                </RewardItem>
                <RewardItem>
                  <div>Pacote Completo de Cuidados</div>
                  <div>2,000 pontos</div>
                </RewardItem>
              </RewardsList>
            </LoyaltyCard>
          </ProfileSection>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>Meu Perfil</ProfileTitle>
      </ProfileHeader>
      
      <ProfileTabs>
        <TabButton
          $active={activeTab === 'personal'}
          onClick={() => setActiveTab('personal')}
        >
          <User size={18} />
          Dados Pessoais
        </TabButton>
        
        <TabButton
          $active={activeTab === 'addresses'}
          onClick={() => setActiveTab('addresses')}
        >
          <MapPin size={18} />
          Endereços
        </TabButton>
        
        <TabButton
          $active={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
        >
          <Package size={18} />
          Pedidos
        </TabButton>
        
        <TabButton
          $active={activeTab === 'loyalty'}
          onClick={() => setActiveTab('loyalty')}
        >
          <Award size={18} />
          Fidelidade
        </TabButton>
      </ProfileTabs>
      
      {renderTabContent()}
    </ProfileContainer>
  );
};

export default UserProfile;