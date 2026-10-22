/*
 * ============================================================
 *  DADOS DO SITE — edite aqui sem mexer no resto do código
 * ============================================================
 *  Fotos: coloque os arquivos na pasta "fotos/" com o mesmo nome
 *  usado abaixo (ex.: fotos/copa.jpg). Enquanto a foto não
 *  existir, o site mostra um espaço reservado bonitinho no lugar.
 */

const CONFIG = {
  nomeConfeiteira: 'Natália',     // aparece em "Prazer, eu sou a ..."
  whatsapp: '5511989794114',      // só números, com 55 + DDD
  precoKg: 110,                   // valor médio por quilo (R$)
  gramasPorPessoa: 100,           // usado na calculadora por nº de pessoas
};

// Tipos de bolo (aparecem nos cards, nos filtros da galeria e na calculadora)
// calc: false = não aparece na calculadora (não é vendido por kg)
const TIPOS = [
  { id: 'aniversario', nome: 'Aniversário',     icone: '🎂', desc: 'Chantininho, merengue maçaricado, drip de chocolate e morangos frescos.' },
  { id: 'tematicos',   nome: 'Temáticos',       icone: '🎨', desc: 'Copa, Halloween, batizado… com papel de arroz e detalhes de chocolate.' },
  { id: 'sobremesas',  nome: 'Sobremesas',      icone: '🍓', desc: 'Pavlova de frutas vermelhas, merengue de morango e outras delícias.' },
  { id: 'caseiros',    nome: 'Caseiros',        icone: '🏡', desc: 'Bolinho de cenoura com chocolate e outros pro café da tarde.' },
  { id: 'doces',       nome: 'Doces artesanais', icone: '🍬', desc: 'Brigadeiros gourmet, caixinhas de presente e cardápios de Natal e Páscoa.', calc: false },
];

// Galeria — adicione quantos quiser. "tipo" precisa ser um dos ids acima.
const BOLOS = [
  { tipo: 'aniversario', nome: "Bolo S'mores: brigadeiro com merengue maçaricado", foto: 'fotos/smores.jpg' },
  { tipo: 'aniversario', nome: 'Bolo de Ninho com morango', foto: 'fotos/ninho-morango.jpg' },
  { tipo: 'aniversario', nome: 'Bolo de chocolate com drip', foto: 'fotos/drip-chocolate.jpg' },
  { tipo: 'aniversario', nome: 'Bolo de merengue com morangos', foto: 'fotos/merengue-morango-1.jpg' },
  { tipo: 'aniversario', nome: 'Bolinho de merengue com morangos', foto: 'fotos/merengue-morango-2.jpg' },
  { tipo: 'aniversario', nome: 'Doce de leite com nozes', foto: 'fotos/doce-de-leite-nozes.jpg' },
  { tipo: 'aniversario', nome: 'Bolo com pétalas rosa e pérolas', foto: 'fotos/perolas-rosa.jpg' },
  { tipo: 'tematicos',   nome: 'Bolo do Stitch com fotos', foto: 'fotos/stitch.jpg' },
  { tipo: 'tematicos',   nome: 'Bolinho da Copa', foto: 'fotos/copa.jpg' },
  { tipo: 'tematicos',   nome: 'Bolinho de Halloween', foto: 'fotos/halloween.jpg' },
  { tipo: 'tematicos',   nome: 'Bolinho de batizado', foto: 'fotos/batizado.jpg' },
  { tipo: 'sobremesas',  nome: 'Pavlova de frutas vermelhas', foto: 'fotos/pavlova.jpg' },
  { tipo: 'sobremesas',  nome: 'Merengue de morango', foto: 'fotos/merengue-de-morango.jpg' },
  { tipo: 'caseiros',    nome: 'Bolinho de cenoura com chocolate', foto: 'fotos/cenoura.jpg' },
  { tipo: 'doces',       nome: 'Caixa de brigadeiros gourmet', foto: 'fotos/brigadeiros-gourmet.jpg' },
  { tipo: 'doces',       nome: 'Brigadeiros natalinos', foto: 'fotos/brigadeiros-natal.jpg' },
];

const MASSAS = ['Massa branca (baunilha)', 'Chocolate', 'Red velvet', 'Cenoura', 'Laranja', 'Coco'];

const RECHEIOS = [
  'Brigadeiro', 'Brigadeiro branco', 'Ninho', 'Ninho com morango',
  'Morango com chantininho', 'Morango com suspiro',
  'Mousse de brigadeiro', 'Doce de leite', 'Doce de leite com nozes', 'Prestígio', 'Limão siciliano', 'Maracujá',
  'Abacaxi com coco', 'Frutas vermelhas', 'Ganache meio amargo',
];
