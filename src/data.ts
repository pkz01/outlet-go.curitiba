export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  sizes: string;
  images: string[];
  tone: string;
  description: string;
};

export const gallery = [
  { src: '/images/guo.jpg', label: 'Interior da loja', className: 'gallery-main' },
  { src: '/images/goooo.jpg', label: 'Vista aérea da Outlet.Go', className: 'gallery-tall' },
  { src: '/images/goo.jpg', label: 'Fachada Outlet.Go', className: 'gallery-wide' },
  { src: '/images/go.jpg', label: 'Experiência no interior', className: 'gallery-small' },
];

const px = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`;

const productData: Array<[string, string, string, string, string[]]> = [
  ['Vestido Midi', 'Vestidos', 'R$ 129,90', 'P, M, G', [px('32443160'), px('1537497'), px('19367295')]],
  ['Vestido Casual', 'Vestidos', 'R$ 159,90', 'P, M, G, GG', [px('32443159'), px('26050629'), px('20035934')]],
  ['Vestido Básico', 'Vestidos', 'R$ 99,90', 'P, M, G', [px('34121692'), px('34795623'), px('16791449')]],
  ['Agasalho Feminino', 'Agasalhos', 'R$ 149,90', 'P, M, G', [px('1066111'), px('13572448'), px('23644610')]],
  ['Moletom Feminino', 'Agasalhos', 'R$ 119,90', 'P, M, G, GG', [px('11187812'), px('7494681'), px('7494671')]],
  ['Jaqueta Feminina', 'Agasalhos', 'R$ 199,90', 'P, M, G', [px('18547909'), px('10391272'), px('1381556')]],
  ['Camiseta Básica', 'Camisetas', 'R$ 59,90', 'P, M, G', [px('9007809'), px('10159280'), px('2033975')]],
  ['Camiseta Casual', 'Camisetas', 'R$ 69,90', 'P, M, G, GG', [px('8089961'), px('8217314'), px('6769350')]],
  ['Camiseta Estampada', 'Camisetas', 'R$ 79,90', 'P, M, G', [px('8602188'), px('7319035'), px('9558249')]],
  ['Calça Jeans', 'Calças', 'R$ 149,90', '36, 38, 40, 42', [px('6402846'), px('17885538'), px('8811251')]],
  ['Calça Casual', 'Calças', 'R$ 119,90', '36, 38, 40, 42', [px('5114719'), px('5957081'), px('7446543')]],
  ['Calça Wide Leg', 'Calças', 'R$ 159,90', '36, 38, 40, 42', [px('16848895'), px('31514678'), px('5885422')]],
  ['Blusa Feminina', 'Blusas', 'R$ 89,90', 'P, M, G', [px('7973007'), px('17091656'), px('7945547')]],
  ['Blusa Casual', 'Blusas', 'R$ 79,90', 'P, M, G', [px('17714797'), px('19524040'), px('26953800')]],
  ['Blusa Manga Longa', 'Blusas', 'R$ 99,90', 'P, M, G, GG', [px('7945542'), px('7508795'), px('32870242')]],
  ['Saia Midi', 'Saias', 'R$ 109,90', 'P, M, G', [px('9410424'), px('1007019'), px('1084641')]],
  ['Saia Casual', 'Saias', 'R$ 89,90', 'P, M, G', [px('1007018'), px('8690604'), px('38347373')]],
  ['Saia Jeans', 'Saias', 'R$ 119,90', '36, 38, 40, 42', [px('37414278'), px('38398313'), px('11072743')]],
];

const tones = ['#e8ddd2', '#d8c9bc', '#c8d0cd', '#e0d5cc', '#d2c4b8', '#c0c8c5'];

export const products: Product[] = productData.map(([name, category, price, sizes, images], index) => ({
  id: `${category}-${index}`,
  name,
  category,
  price,
  sizes,
  images,
  tone: tones[index % tones.length],
  description: 'Peça apresentada como exemplo visual. Consulte a loja para informações atualizadas sobre disponibilidade, cores e tamanhos.',
}));

export const categories = ['Todos', 'Vestidos', 'Agasalhos', 'Camisetas', 'Calças', 'Blusas', 'Saias', 'Acessórios'];
export const models = [
  'https://images.pexels.com/photos/19220820/pexels-photo-19220820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6592254/pexels-photo-6592254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9167197/pexels-photo-9167197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
