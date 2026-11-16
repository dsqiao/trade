# trade

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```
不能使用 pnpm，会造成格式化功能失效。

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Deploy only the sub account page

GitHub Actions builds a standalone site containing only the sub account overview and its funding, exchange, and stock-history pages. On pushes to `main`, it deploys the site to GitHub Pages; the overview is the site homepage at https://dsqiao.github.io/trade/. The standalone build does not include the Finnhub API token, so live stock quotes require a public-safe price source or configured fallback prices.

Enable GitHub Pages for this repository and select **GitHub Actions** as the deployment source. The published page is publicly accessible; stock, funding, and exchange data in `src/data/sub/` will be included in the site.

To build the standalone site locally, run `npm run build:sub`; its files are written to `dist-sub/`.

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
