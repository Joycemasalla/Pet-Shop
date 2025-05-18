import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const Sidebar = styled.aside`
  width: 80vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  background: ${props => props.theme.colors.white};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  padding: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[700]};
  
  &:hover {
    color: ${props => props.theme.colors.gray[900]};
  }
`;

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 60px;
`;

const MenuItem = styled.li`
  padding: 16px;
  margin-bottom: 8px;
  list-style: none;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const MenuLink = styled(Link)`
  color: ${props => props.theme.colors.gray[800]};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  display: block;
  min-height: 44px;
  display: flex;
  align-items: center;
`;

const MobileSidebar = ({ isOpen, onClose, menuItems }) => {
  const sidebarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeThreshold = 50;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > swipeThreshold) {
      onClose();
    }
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Sidebar
        ref={sidebarRef}
        role="navigation"
        aria-label="Main menu"
        aria-hidden={!isOpen}
        isOpen={isOpen}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        dir="ltr"
      >
        <CloseButton
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </CloseButton>

        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item.path}>
              <MenuLink
                to={item.path}
                onClick={onClose}
              >
                {item.label}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </Sidebar>
    </>
  );
};

MobileSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MobileSidebar;