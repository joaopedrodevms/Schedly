# Etapa de build
FROM node:20-alpine AS builder

# Define diretório de trabalho
WORKDIR /app

# Argumentos recebidos na build
ARG VITE_API_URL
ARG VITE_APP_URL

# Variáveis de ambiente de build (para gerar .env.production)
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_URL=${VITE_APP_URL}

# Instala dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o restante da aplicação
COPY . .

# Gera o .env.production com base nos argumentos
RUN echo "VITE_API_URL=$VITE_API_URL" >> .env.production && \
    echo "VITE_APP_URL=$VITE_APP_URL" >> .env.production

# Build do projeto
RUN npm run build

# Etapa final: apenas para servir
FROM node:20-alpine

WORKDIR /app

# Instala apenas vite como servidor de preview
RUN npm install -g vite

# Copia os arquivos da build
COPY --from=builder /app/dist ./dist

# Expondo porta customizada
EXPOSE 5173

# Comando para rodar o servidor em produção
CMD ["vite", "preview", "--port", "5173", "--host"]
