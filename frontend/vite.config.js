import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  build: { rollupOptions: { input: {
    main: resolve(import.meta.dirname, 'index.html'),
    cardapio: resolve(import.meta.dirname, 'pages/cardapio.html'),
    carrinho: resolve(import.meta.dirname, 'pages/carrinho.html'),
    cozinha: resolve(import.meta.dirname, 'pages/cozinha.html'),
    atendentes: resolve(import.meta.dirname, 'pages/atendentes.html'),
    login: resolve(import.meta.dirname, 'pages/login.html'),
    conta: resolve(import.meta.dirname, 'pages/conta.html'),
  } } },
})
