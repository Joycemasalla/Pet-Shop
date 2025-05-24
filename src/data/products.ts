import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ração Premium para Cães Adultos',
    description: 'Ração super premium para cães adultos de todas as raças. Rica em nutrientes e proteínas.',
    price: 124.90,
    imageUrl: 'https://atacadaodasracoes.com.br/product_images/k/117/Special_Dog_Carne_Adulto__87208_zoom.png',
    category: 'food',
    featured: true,
    stockQuantity: 50
  },
  {
    id: '2',
    name: 'Brinquedo Mordedor para Cães',
    description: 'Brinquedo resistente para cães de médio e grande porte. Ideal para entreter seu pet por horas.',
    price: 39.90,
    imageUrl: 'https://m.media-amazon.com/images/I/61AAERO8spL._AC_UF1000%2C1000_QL80_.jpg',
    category: 'toys',
    stockQuantity: 30
  },
  {
    id: '3',
    name: 'Shampoo Neutro para Cães e Gatos',
    description: 'Shampoo com pH neutro para banhos frequentes. Indicado para cães e gatos com pele sensível.',
    price: 29.90,
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/573283/kit_banho_para_cachorro_e_gato_shampoo_e_condicionador_neutro_sanol_500ml_nao_agride_pele_e_pelagem__534700_1_9c260c8740799a42301843e5671a6e57.jpg',
    category: 'hygiene',
    stockQuantity: 45
  },
  {
    id: '4',
    name: 'Coleira Ajustável com Identificação',
    description: 'Coleira de nylon resistente com placa para identificação. Disponível em várias cores.',
    price: 34.90,
    imageUrl: 'https://img.elo7.com.br/product/zoom/4FF50E6/coleira-gato-ajustavel-elastica-nome-e-identificacao-pets.jpg',
    category: 'accessories',
    stockQuantity: 25
  },
  {
    id: '5',
    name: 'Antipulgas e Carrapatos',
    description: 'Proteção contra pulgas e carrapatos para cães de 10 a 20kg. Efeito por até 3 meses.',
    price: 89.90,
    imageUrl: 'https://m.media-amazon.com/images/I/71hnJ7KasZL._AC_UF1000%2C1000_QL80_.jpg',
    category: 'medication',
    featured: true,
    stockQuantity: 20
  },
  {
    id: '6',
    name: 'Cama Acolchoada para Pets',
    description: 'Cama macia e confortável para cães e gatos. Material lavável e antialérgico.',
    price: 79.90,
    imageUrl: 'https://m.media-amazon.com/images/I/71d2a9GRNJL.jpg',
    category: 'bedding',
    stockQuantity: 15
  },
  {
    id: '7',
    name: 'Ração Premium para Gatos',
    description: 'Ração super premium para gatos adultos. Formulada para saúde do trato urinário.',
    price: 99.90,
    imageUrl: 'https://petbox.vteximg.com.br/arquivos/ids/157995-1000-1000/3e17a00467abe0b4508eee1428a19ddb16acdff8.jpg?v=637336131494200000',
    category: 'food',
    discount: 10,
    stockQuantity: 40
  },
  {
    id: '8',
    name: 'Arranhador para Gatos',
    description: 'Arranhador vertical com base estável. Protege seus móveis e mantém as unhas do seu gato saudáveis.',
    price: 149.90,
    imageUrl: 'https://img.elo7.com.br/product/zoom/4E8352D/arranhador-parede-gatificacao-gato-madeira-grande-sisal-brinquedo-de-gato.jpg',
    category: 'accessories',
    stockQuantity: 10
  },
];
