const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const linkWpp = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

// ---------- textos vindos da configuração ----------
$$('.js-nome').forEach((el) => (el.textContent = CONFIG.nomeConfeiteira));
const precoMinimo = Math.min(...SABORES.map((s) => s.precoKg));
$$('.js-preco-kg').forEach((el) => (el.textContent = brl(precoMinimo)));
$('#ano').textContent = new Date().getFullYear();
$$('.js-wpp').forEach((a) => {
  a.href = linkWpp('Olá! Vim pelo site da NaDoces e gostaria de fazer uma encomenda 🎂');
  a.target = '_blank';
  a.rel = 'noopener';
});

// ---------- foto que ainda não existe vira um espaço reservado ----------
function placeholder(img, texto) {
  const div = document.createElement('div');
  div.className = 'foto-vazia';
  div.innerHTML = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6c-2 0-3.5 1.6-3.5 3.5 0 1.5.9 2.8 2.2 3.3V18H16a6 6 0 0 0-6 6v6h44v-6a6 6 0 0 0-6-6H33.3v-5.2a3.5 3.5 0 0 0 2.2-3.3C35.5 7.6 34 6 32 6ZM10 34v8c3 0 4.5-2 7.3-2s4.4 2 7.3 2 4.4-2 7.4-2 4.4 2 7.3 2 4.4-2 7.3-2S51 42 54 42v-8Zm0 12v12h44V46c-3.2-.3-4.7-2-6.7-2-2.9 0-4.4 2-7.3 2s-4.4-2-7.3-2-4.4 2-7.4 2-4.4-2-7.3-2c-2 0-3.5 1.7-8 2Z"/></svg><span>${texto}</span>`;
  img.replaceWith(div);
}
function imgComFallback(src, alt, textoVazio) {
  const img = new Image();
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.addEventListener('error', () => placeholder(img, textoVazio), { once: true });
  return img;
}
$$('img[data-placeholder]').forEach((img) => {
  const trocar = () => placeholder(img, img.dataset.placeholder);
  if (img.complete && img.naturalWidth === 0) trocar();
  else img.addEventListener('error', trocar, { once: true });
});

// ---------- cards de tipos ----------
const tiposLista = $('#tipos-lista');
TIPOS.forEach((t) => {
  const qtd = BOLOS.filter((b) => b.tipo === t.id).length;
  const a = document.createElement('a');
  a.href = '#galeria';
  a.className = 'tipo';
  a.innerHTML = `<span class="tipo__icone">${t.icone}</span><h3>${t.nome}</h3><p>${t.desc}</p><span class="tipo__link">Ver ${qtd} foto${qtd === 1 ? '' : 's'} →</span>`;
  a.addEventListener('click', () => filtrar(t.id));
  tiposLista.append(a);
});

// ---------- galeria + filtros ----------
const grid = $('#galeria-grid');
const filtros = $('#filtros');
const nomeTipo = Object.fromEntries(TIPOS.map((t) => [t.id, t.nome]));

[{ id: 'todos', nome: 'Todos' }, ...TIPOS].forEach((t) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'filtro';
  b.role = 'tab';
  b.dataset.tipo = t.id;
  b.textContent = t.nome;
  b.addEventListener('click', () => filtrar(t.id));
  filtros.append(b);
});

BOLOS.forEach((bolo) => {
  const fig = document.createElement('figure');
  fig.className = 'item';
  fig.dataset.tipo = bolo.tipo;
  fig.tabIndex = 0;
  fig.append(imgComFallback(bolo.foto, bolo.nome, 'Foto em breve'));
  const cap = document.createElement('figcaption');
  cap.innerHTML = `<span class="item__tag">${nomeTipo[bolo.tipo] ?? ''}</span>${bolo.nome}`;
  fig.append(cap);
  const abrir = () => abrirLightbox(fig, bolo);
  fig.addEventListener('click', abrir);
  fig.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), abrir()));
  grid.append(fig);
});

function filtrar(tipo) {
  $$('.filtro', filtros).forEach((b) => b.setAttribute('aria-selected', b.dataset.tipo === tipo));
  $$('.item', grid).forEach((f) => (f.hidden = tipo !== 'todos' && f.dataset.tipo !== tipo));
}
filtrar('todos');

// ---------- lightbox ----------
const lightbox = $('#lightbox');
function abrirLightbox(fig, bolo) {
  const img = $('img', fig);
  if (!img) return; // ainda sem foto
  $('img', lightbox).src = img.src;
  $('img', lightbox).alt = bolo.nome;
  $('.lightbox__legenda', lightbox).textContent = bolo.nome;
  lightbox.showModal();
}
$('.lightbox__fechar').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => e.target === lightbox && lightbox.close());

// ---------- sabores ----------
const minuscula = (t) => t[0].toLowerCase() + t.slice(1); // mantém "Ninho" com maiúscula
const descSabor = (s) => `Massa de ${minuscula(s.massa)}, recheio de ${minuscula(s.recheio)} e cobertura de ${minuscula(s.cobertura)}.`;
SABORES.forEach((s) => {
  const card = document.createElement('article');
  card.className = 'sabor';
  card.innerHTML = `<span class="sabor__icone" aria-hidden="true">${s.icone}</span><h3>${s.nome}</h3>
    <dl><div><dt>Massa</dt><dd>${s.massa}</dd></div><div><dt>Recheio</dt><dd>${s.recheio}</dd></div><div><dt>Cobertura</dt><dd>${s.cobertura}</dd></div></dl>
    <p class="sabor__preco">${brl(s.precoKg)}<small>/kg</small></p>`;
  $('#lista-sabores').append(card);
});
const precoDocinho = (d) => (d.precoCento == null ? 'consultar valor' : `${brl(d.precoCento)} o cento`);
const precosCento = [...new Set(DOCINHOS.map((d) => d.precoCento).filter((p) => p != null))];
// se todos têm o mesmo preço, mostra uma vez só em cima da lista
const precoUnico = precosCento.length === 1 ? precosCento[0] : null;
if (precoUnico != null) $('#docinhos-preco').textContent = `${brl(precoUnico)} o cento`;
DOCINHOS.forEach((d) => {
  const sufixo = d.precoCento == null || precoUnico == null ? ` · ${precoDocinho(d)}` : '';
  $('#lista-docinhos').append(Object.assign(document.createElement('li'), { textContent: d.nome + sufixo }));
});

const avisoAgenda = `Encomendas com pelo menos ${CONFIG.diasAntecedencia} dias de antecedência. A confirmação depende da disponibilidade da agenda.`;
$$('.js-aviso-agenda').forEach((el) => (el.textContent = avisoAgenda));

// ---------- calculadora ----------
const form = $('#calc-form');
const inPessoas = $('#pessoas');
const inPeso = $('#peso');
const selTipo = $('#tipo');
const inData = $('#data');
const selSabor = $('#sabor');
TIPOS.filter((t) => t.calc !== false).forEach((t) => selTipo.append(new Option(t.nome, t.id)));
SABORES.forEach((s, i) => selSabor.append(new Option(`${s.nome} · ${brl(s.precoKg)}/kg`, i)));
const dataISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const primeiraData = new Date();
primeiraData.setDate(primeiraData.getDate() + CONFIG.diasAntecedencia);
inData.min = dataISO(primeiraData);

const qtdDocinhos = DOCINHOS.map((d, i) => {
  const linha = document.createElement('div');
  linha.className = 'docinho';
  linha.innerHTML = `<label class="docinho__nome" for="docinho-${i}">${d.nome}<small>${[d.desc, precoDocinho(d)].filter(Boolean).join(' · ')}</small></label>
    <div class="qtd">
      <button type="button" aria-label="Menos ${d.nome}">−</button>
      <input type="number" id="docinho-${i}" min="0" step="${CONFIG.docinhosPasso}" value="0" inputmode="numeric">
      <button type="button" aria-label="Mais ${d.nome}">+</button>
    </div>`;
  const input = $('input', linha);
  const [menos, mais] = $$('button', linha);
  const mudar = (delta) => {
    input.value = Math.max(0, (+input.value || 0) + delta);
    calcular();
  };
  menos.addEventListener('click', () => mudar(-CONFIG.docinhosPasso));
  mais.addEventListener('click', () => mudar(CONFIG.docinhosPasso));
  $('#calc-docinhos').append(linha);
  return input;
});

const kgFmt = (kg) => `${kg.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kg`;

function calcular() {
  const modo = form.modo.value;
  $$('[data-modo]', form).forEach((c) => (c.hidden = c.dataset.modo !== modo));

  const sabor = SABORES[selSabor.value];
  $('#sabor-desc').textContent = descSabor(sabor);

  let kg, pessoas;
  if (modo === 'pessoas') {
    pessoas = +inPessoas.value;
    kg = Math.max(1, Math.ceil((pessoas * CONFIG.gramasPorPessoa) / 500) / 2); // arredonda pra cima de 0,5 em 0,5 kg
  } else {
    kg = +inPeso.value;
    pessoas = Math.floor((kg * 1000) / CONFIG.gramasPorPessoa);
  }
  const docinhos = DOCINHOS
    .map((d, i) => ({ ...d, qtd: Math.max(0, Math.floor(+qtdDocinhos[i].value || 0)) }))
    .filter((d) => d.qtd > 0);
  const totalDocinhos = docinhos.reduce((soma, d) => soma + d.qtd, 0);
  const docinhosConsultar = docinhos.filter((d) => d.precoCento == null);
  const valorDocinhos = docinhos.reduce((soma, d) => soma + (d.qtd * (d.precoCento ?? 0)) / 100, 0);
  const valor = kg * sabor.precoKg + valorDocinhos;

  $('#pessoas-out').textContent = inPessoas.value;
  $('#peso-out').textContent = kgFmt(+inPeso.value);
  $('#calc-valor').textContent = brl(valor);
  $('#calc-detalhe').textContent = `${kgFmt(kg)} · serve aprox. ${pessoas} pessoas · ${brl(sabor.precoKg)}/kg`;
  const extra = $('#calc-extra');
  extra.hidden = totalDocinhos === 0;
  extra.textContent = [
    `+ ${totalDocinhos} docinhos`,
    valorDocinhos > 0 && `${brl(valorDocinhos)} incluídos`,
    docinhosConsultar.length && `${docinhosConsultar.map((d) => d.nome).join(', ')}: consultar valor`,
  ].filter(Boolean).join(' · ');

  const dataCedo = inData.value && inData.value < inData.min;
  const aviso = $('#data-aviso');
  aviso.classList.toggle('alerta', !!dataCedo);
  aviso.textContent = dataCedo
    ? `Essa data é muito próxima: as encomendas precisam de pelo menos ${CONFIG.diasAntecedencia} dias de antecedência.`
    : avisoAgenda;

  const tipoNome = selTipo.options[selTipo.selectedIndex].text;
  const data = inData.value ? new Date(inData.value + 'T12:00').toLocaleDateString('pt-BR') : 'a combinar';
  const msg = [
    'Olá! Vim pelo site da NaDoces e gostaria de um orçamento 🎂',
    '',
    `• Tipo: ${tipoNome}`,
    `• Sabor: ${sabor.nome} (${brl(sabor.precoKg)}/kg)`,
    `• Tamanho: ${kgFmt(kg)} (aprox. ${pessoas} pessoas)`,
    ...(docinhos.length ? ['• Docinhos:', ...docinhos.map((d) => `   - ${d.qtd} ${d.nome} (${d.precoCento == null ? 'consultar valor' : brl((d.qtd * d.precoCento) / 100)})`)] : []),
    `• Data da festa: ${data}`,
    `• Valor estimado no site: ${brl(valor)}${docinhosConsultar.length ? ' (fora os docinhos a consultar)' : ''}`,
  ].join('\n');
  $('#calc-wpp').href = linkWpp(msg);
}
form.addEventListener('input', calcular);
calcular();

// ---------- menu mobile ----------
const btnMenu = $('.topo__menu');
const nav = $('.topo__nav');
btnMenu.addEventListener('click', () => {
  const aberto = nav.classList.toggle('aberto');
  btnMenu.setAttribute('aria-expanded', aberto);
});
$$('a', nav).forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('aberto');
  btnMenu.setAttribute('aria-expanded', false);
}));
