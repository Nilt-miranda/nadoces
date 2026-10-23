# Site NaDoces

Site estático (HTML + CSS + JS), sem build. Para ver localmente:

```bash
cd ~/nadoces-site && python3 -m http.server 8765
```

## Como editar

Tudo que muda com frequência fica em **`dados.js`**:

- `CONFIG.nomeConfeiteira`: nome que aparece em "Prazer, eu sou a ..."
- `TIPOS`: tipos de bolo (cards, filtros da galeria e opções da calculadora)
- `BOLOS`: fotos da galeria (adicione quantas linhas quiser)
- `SABORES`: cardápio com massa, recheio, cobertura e preço por kg (seção Sabores e calculadora)
- `DOCINHOS`: docinhos que dá pra adicionar na calculadora, com `precoCento` (preço do cento).
  Com `null` aparece como "consultar valor" e não soma no valor estimado
- `CONFIG.diasAntecedencia`: dias mínimos de antecedência (a calculadora não deixa escolher antes)

## Fotos

Coloque as fotos na pasta `fotos/` com os nomes usados em `dados.js`
(ex.: `fotos/copa.jpg`). A foto da confeiteira é `fotos/confeiteira.jpg`.
Enquanto uma foto não existir, aparece um espaço reservado no lugar.
Dica: fotos em pé (4:5) de no máximo ~1200px ficam melhores e carregam mais rápido.

## Publicar de graça

Arraste a pasta inteira em https://app.netlify.com/drop, ou suba num
repositório do GitHub e ative o GitHub Pages.
