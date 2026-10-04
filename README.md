# Meu Bolso

Controle financeiro pessoal simples, feito com HTML, CSS e JavaScript puros.

Registre suas entradas e saídas mês a mês, organize os gastos por categoria e veja na hora o saldo e para onde o seu dinheiro está indo.

---

## ✨ Funcionalidades

- **Saldo do mês em destaque**, com o total de entradas e de saídas. O cartão muda de cor quando o saldo fica negativo.
- **Navegação por mês**, com setas para voltar e avançar.
- **Lançamento rápido** de entradas e saídas, com valor, categoria, data e descrição opcional.
- **Campo de valor inteligente**: você digita só os números e a vírgula e os pontos entram sozinhos (`12345` vira `123,45`).
- **Categorias prontas**:
  - Saídas: Custos Mingau, Beleza, Assinaturas, Faculdade, Cartão de crédito, Parcelamentos, Uber e Outros.
  - Entradas: Salário, Vendas e Outras entradas.
- **Gráfico de gastos por categoria**, com rosca, barras de progresso, valores e porcentagens.
- **Lista de lançamentos do mês**, com opção de excluir.
- **Tema claro e escuro**, que acompanha a configuração do aparelho.
- **Layout responsivo**, pensado primeiro para o celular.
- **Sem cadastro e sem servidor**: os dados ficam salvos no próprio navegador (`localStorage`).

## 🚀 Como usar

Não precisa instalar nada.

1. Baixe ou clone o projeto.
2. Abra o arquivo `index.html` no navegador (duplo clique).

Se preferir, use a extensão **Live Server** do VS Code:

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Escolha **Open with Live Server**.

## 📁 Estrutura do projeto

```
meu-bolso/
├── index.html        # Estrutura da página
├── css/
│   └── style.css     # Estilos, temas e responsividade
└── js/
    └── script.js     # Lógica: lançamentos, cálculos, gráfico e armazenamento
```

## 🛠️ Tecnologias

- **HTML5** para a estrutura.
- **CSS3** com variáveis, Grid, Flexbox e `conic-gradient` para o gráfico de rosca.
- **JavaScript (ES6)** sem bibliotecas nem frameworks.
- **localStorage** para guardar os lançamentos no navegador.

## 💾 Sobre os dados

Os lançamentos são salvos no `localStorage` do navegador, na chave `fin`. Isso significa que:

- os dados **não** vão para nenhum servidor;
- cada navegador e cada aparelho tem o seu próprio conjunto de dados;
- limpar os dados do navegador apaga os lançamentos.

## ⚙️ Personalização

**Categorias:** no começo do `js/script.js`, edite as listas `SAI` (saídas) e `ENT` (entradas). Para cada categoria nova, adicione também um ícone em `EMO` e, se for uma saída, uma cor em `COR`.

```js
const SAI = ['Custos Mingau', 'Beleza', 'Assinaturas', 'Faculdade', 'Cartão de crédito', 'Parcelamentos', 'Uber', 'Outros'];
```

**Cores e tema:** as cores ficam nas variáveis CSS (`--pri`, `--in`, `--out` e outras) no início do `css/style.css`.

## 🗺️ Ideias para o futuro

- [ ] Editar um lançamento já criado
- [ ] Definir meta de gasto por categoria
- [ ] Exportar os dados em CSV
- [ ] Fazer backup e restaurar os dados
- [ ] Gráfico comparando os meses
- [ ] Integração com banco de dados (PHP + MySQL) para acessar de qualquer aparelho

