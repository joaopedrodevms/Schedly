import { defineConfig  } from '@hey-api/openapi-ts';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env apropriado
dotenv.config();

// Verifica se a variável de ambiente existe
const apiUrl = process.env.VITE_API_URL || 'http://localhost:8000';
if (!apiUrl) {
  throw new Error('VITE_API_URL não está definida no arquivo .env');
}

export default defineConfig({
  input: apiUrl+'openapi.json',
  output: './src/service',
  plugins: [
    '@hey-api/client-fetch',
    '@tanstack/react-query'
  ]
});