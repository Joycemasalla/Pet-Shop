import React from 'react';
import styled from 'styled-components';
import { X, ShoppingCart, Trash } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: flex-end;
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: ${props => props.theme.colors.white};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const CartHeader = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[600]};
  cursor: pointer;
  transition: color ${props => props.theme.transitions.fast} ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing[1]};
  
  &:hover {
    color: ${props => props.theme.colors.gray[900]};
  }
`;

const CartContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing[4]};
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.colors.gray[600]};
  text-align: center;
  padding: ${props => props.theme.spacing[4]};
  
  svg {
    color: ${props => props.theme.colors.gray[400]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const CartItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItemContainer = styled.li`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[4]};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const CartItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  margin-right: ${props => props.theme.spacing[3]};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CartItemDetails = styled.div`
  flex-grow: 1;
`;

const CartItemTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const CartItemPrice = styled.div<{ hasDiscount?: boolean }>`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => 
    props.hasDiscount ? props.theme.colors.gray[500] : props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
  text-decoration: ${props => props.hasDiscount ? 'line-through' : 'none'};
  display: ${props => props.hasDiscount ? 'inline-block' : 'block'};
  margin-right: ${props => props.hasDiscount ? props.theme.spacing[2] : '0'};
`;

const CartItemDiscountPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.accent[600]};
  display: inline-block;
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[700]};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${props => props.theme.transitions.fast} ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.gray[100]};
  }
  
  &:disabled {
    color: ${props => props.theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.base};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[500]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    color: ${props => props.theme.colors.error[500]};
  }
`;

const CartFooter = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  background-color: ${props => props.theme.colors.gray[50]};
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const TotalLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
`;

const TotalValue = styled.span`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[700]};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const Cart: React.FC = () => {
  const { state, toggleCart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const handleCheckout = () => {
    // Create WhatsApp message with cart items
    let message = `Olá! Gostaria de fazer um pedido:\n\n`;
    
    state.items.forEach(item => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
        
      message += `*${item.quantity}x ${item.product.name}*\n`;
      message += `Valor unitário: ${formatCurrency(price)}\n`;
      message += `Subtotal: ${formatCurrency(price * item.quantity)}\n\n`;
    });
    
    message += `*Total: ${formatCurrency(state.total)}*\n\n`;
    message += `Aguardo confirmação do pedido. Obrigado!`;
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/5532999999999?text=${encodedMessage}`, '_blank');
    
    // Close cart
    toggleCart();
  };
  
  return (
    <CartOverlay onClick={toggleCart}>
      <CartContainer onClick={e => e.stopPropagation()}>
        <CartHeader>
          <CartTitle>
            <ShoppingCart size={20} />
            <span>Carrinho de Compras</span>
          </CartTitle>
          <CloseButton onClick={toggleCart} aria-label="Fechar carrinho">
            <X size={20} />
          </CloseButton>
        </CartHeader>
        
        <CartContent>
          {state.items.length === 0 ? (
            <EmptyCart>
              <ShoppingCart size={64} />
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos para começar suas compras</p>
            </EmptyCart>
          ) : (
            <CartItemList>
              {state.items.map(item => {
                const discountedPrice = item.product.discount 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : null;
                  
                return (
                  <CartItemContainer key={item.product.id}>
                    <CartItemImage>
                      <img src={item.product.imageUrl} alt={item.product.name} />
                    </CartItemImage>
                    
                    <CartItemDetails>
                      <CartItemTitle>{item.product.name}</CartItemTitle>
                      <div>
                        {discountedPrice ? (
                          <>
                            <CartItemPrice hasDiscount>
                              {formatCurrency(item.product.price)}
                            </CartItemPrice>
                            <CartItemDiscountPrice>
                              {formatCurrency(discountedPrice)}
                            </CartItemDiscountPrice>
                          </>
                        ) : (
                          <CartItemPrice>
                            {formatCurrency(item.product.price)}
                          </CartItemPrice>
                        )}
                      </div>
                      
                      <CartItemActions>
                        <QuantityControl>
                          <QuantityButton 
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            aria-label="Diminuir quantidade"
                          >
                            -
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity}
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </QuantityButton>
                        </QuantityControl>
                        
                        <RemoveButton 
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Remover item"
                        >
                          <Trash size={18} />
                        </RemoveButton>
                      </CartItemActions>
                    </CartItemDetails>
                  </CartItemContainer>
                );
              })}
            </CartItemList>
          )}
        </CartContent>
        
        {state.items.length > 0 && (
          <CartFooter>
            <CartTotal>
              <TotalLabel>Total</TotalLabel>
              <TotalValue>{formatCurrency(state.total)}</TotalValue>
            </CartTotal>
            
            <ButtonsContainer>
              <Button 
                variant="primary" 
                fullWidth
                onClick={handleCheckout}
              >
                Finalizar Pedido via WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                fullWidth
                onClick={clearCart}
              >
                Limpar Carrinho
              </Button>
            </ButtonsContainer>
          </CartFooter>
        )}
      </CartContainer>
    </CartOverlay>
  );
};

export default Cart;