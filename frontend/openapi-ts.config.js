import { defineConfig  } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8000/openapi.json',
  // input: 'http://localhost:8000/docs',
  output: './src/service',
  plugins: [
    '@hey-api/client-fetch',
    '@tanstack/react-query'
  ]
});