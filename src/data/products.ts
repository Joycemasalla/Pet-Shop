import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ração Premium para Cães Adultos',
    description: 'Ração super premium para cães adultos de todas as raças. Rica em nutrientes e proteínas.',
    price: 124.90,
    imageUrl: 'https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg',
    category: 'food',
    featured: true,
    stockQuantity: 50
  },
  {
    id: '2',
    name: 'Brinquedo Mordedor para Cães',
    description: 'Brinquedo resistente para cães de médio e grande porte. Ideal para entreter seu pet por horas.',
    price: 39.90,
    imageUrl: 'https://images.pexels.com/photos/8434782/pexels-photo-8434782.jpeg',
    category: 'toys',
    stockQuantity: 30
  },
  {
    id: '3',
    name: 'Shampoo Neutro para Cães e Gatos',
    description: 'Shampoo com pH neutro para banhos frequentes. Indicado para cães e gatos com pele sensível.',
    price: 29.90,
    imageUrl: 'https://images.pexels.com/photos/6568663/pexels-photo-6568663.jpeg',
    category: 'hygiene',
    stockQuantity: 45
  },
  {
    id: '4',
    name: 'Coleira Ajustável com Identificação',
    description: 'Coleira de nylon resistente com placa para identificação. Disponível em várias cores.',
    price: 34.90,
    imageUrl: 'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg',
    category: 'accessories',
    stockQuantity: 25
  },
  {
    id: '5',
    name: 'Antipulgas e Carrapatos',
    description: 'Proteção contra pulgas e carrapatos para cães de 10 a 20kg. Efeito por até 3 meses.',
    price: 89.90,
    imageUrl: 'https://images.pexels.com/photos/6568622/pexels-photo-6568622.jpeg',
    category: 'medication',
    featured: true,
    stockQuantity: 20
  },
  {
    id: '6',
    name: 'Cama Acolchoada para Pets',
    description: 'Cama macia e confortável para cães e gatos. Material lavável e antialérgico.',
    price: 79.90,
    imageUrl: 'https://images.pexels.com/photos/6568620/pexels-photo-6568620.jpeg',
    category: 'bedding',
    stockQuantity: 15
  },
  {
    id: '7',
    name: 'Ração Premium para Gatos',
    description: 'Ração super premium para gatos adultos. Formulada para saúde do trato urinário.',
    price: 99.90,
    imageUrl: 'https://images.pexels.com/photos/6568579/pexels-photo-6568579.jpeg',
    category: 'food',
    discount: 10,
    stockQuantity: 40
  },
  {
    id: '8',
    name: 'Arranhador para Gatos',
    description: 'Arranhador vertical com base estável. Protege seus móveis e mantém as unhas do seu gato saudáveis.',
    price: 149.90,
    imageUrl: 'https://images.pexels.com/photos/6568619/pexels-photo-6568619.jpeg',
    category: 'accessories',
    stockQuantity: 10
  },
];