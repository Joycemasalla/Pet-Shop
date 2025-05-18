import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Consulta Veterinária',
    description: 'Consulta completa com médico veterinário para avaliação da saúde do seu pet.',
    price: 120.00,
    imageUrl: 'https://images.pexels.com/photos/6235911/pexels-photo-6235911.jpeg',
    duration: '30 minutos'
  },
  {
    id: '2',
    name: 'Banho para Cães Pequenos',
    description: 'Banho completo com shampoo e condicionador especiais para cães de pequeno porte.',
    price: 45.00,
    imageUrl: 'https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg',
    duration: '1 hora'
  },
  {
    id: '3',
    name: 'Banho para Cães Médios e Grandes',
    description: 'Banho completo com shampoo e condicionador especiais para cães de médio e grande porte.',
    price: 70.00,
    imageUrl: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg',
    duration: '1h30 minutos'
  },
  {
    id: '4',
    name: 'Tosa Higiênica',
    description: 'Tosa das regiões íntimas, patas e face do seu pet.',
    price: 35.00,
    imageUrl: 'https://images.pexels.com/photos/3198032/pexels-photo-3198032.jpeg',
    duration: '30 minutos'
  },
  {
    id: '5',
    name: 'Tosa Completa',
    description: 'Tosa completa personalizada de acordo com a raça e preferência do dono.',
    price: 80.00,
    imageUrl: 'https://images.pexels.com/photos/6235973/pexels-photo-6235973.jpeg',
    duration: '2 horas'
  },
  {
    id: '6',
    name: 'Vacinação',
    description: 'Aplicação de vacinas com avaliação prévia do médico veterinário.',
    price: 90.00,
    imageUrl: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg',
    duration: '15 minutos'
  },
];