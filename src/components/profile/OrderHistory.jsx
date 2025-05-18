import React from 'react';
import styled from 'styled-components';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const OrderCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[4]};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[3]};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing[2]};
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[1]};
`;

const OrderNumber = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
`;

const OrderDate = styled.span`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background-color: ${props.theme.colors.warning[50]};
          color: ${props.theme.colors.warning[700]};
        `;
      case 'completed':
        return `
          background-color: ${props.theme.colors.success[50]};
          color: ${props.theme.colors.success[700]};
        `;
      case 'cancelled':
        return `
          background-color: ${props.theme.colors.error[50]};
          color: ${props.theme.colors.error[700]};
        `;
      default:
        return `
          background-color: ${props.theme.colors.gray[100]};
          color: ${props.theme.colors.gray[700]};
        `;
    }
  }}
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[2]} 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const ItemImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.md};
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[800]};
`;

const ItemQuantity = styled.span`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ItemPrice = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[900]};
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing[4]};
  padding-top: ${props => props.theme.spacing[3]};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return <Clock size={16} />;
    case 'completed':
      return <CheckCircle size={16} />;
    case 'cancelled':
      return <XCircle size={16} />;
    default:
      return <Package size={16} />;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'completed':
      return 'Concluído';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Em processamento';
  }
};

const OrderHistory = ({ orders }) => {
  if (!orders?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3>Nenhum pedido encontrado</h3>
        <p>Você ainda não realizou nenhum pedido.</p>
      </div>
    );
  }

  return (
    <OrdersContainer>
      {orders.map(order => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <OrderInfo>
              <OrderNumber>Pedido #{order.id}</OrderNumber>
              <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
            </OrderInfo>
            <StatusBadge status={order.status}>
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </StatusBadge>
          </OrderHeader>
          
          <OrderItems>
            {order.items.map(item => (
              <OrderItem key={item.id}>
                <ItemInfo>
                  <ItemImage src={item.imageUrl} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>Quantidade: {item.quantity}</ItemQuantity>
                  </ItemDetails>
                </ItemInfo>
                <ItemPrice>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(item.price)}
                </ItemPrice>
              </OrderItem>
            ))}
          </OrderItems>
          
          <OrderTotal>
            <span>Total</span>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(order.total)}
            </span>
          </OrderTotal>
        </OrderCard>
      ))}
    </OrdersContainer>
  );
};

export default OrderHistory;