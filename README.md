# 📅 Schedly

Schedly é uma aplicação moderna de agendamento criada como projeto de portfólio para demonstrar habilidades técnicas em desenvolvimento full stack com foco em arquitetura limpa, performance, usabilidade e boas práticas de engenharia de software. Com uma interface intuitiva e recursos robustos, o Schedly oferece uma experiência fluida para gerenciar eventos e disponibilidades de forma elegante e eficiente.

![Agendamento](screenshots/scheduling1-dark.png)
![Calendario Eventos](screenshots/calendar-dark.png)

## ✨ Funcionalidades

- 🗓️ Gerenciamento de eventos e disponibilidades
- 👥 Perfis de usuário personalizáveis
- 🌐 Interface moderna e responsiva
- 🔐 Autenticação segura
- 🎨 Tema claro/escuro
- 🌍 Suporte a diferentes fusos horários
- 📱 Design mobile-first
- 🚀 Alta performance e escalabilidade

## 🛠️ Tecnologias

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - Framework web moderno e rápido
- [SQLModel](https://sqlmodel.tiangolo.com/) - ORM SQL para Python
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [MinIO](https://min.io/) - Armazenamento de objetos
- [Alembic](https://alembic.sqlalchemy.org/) - Migrações de banco de dados
- [Poetry](https://python-poetry.org/) - Gerenciamento de dependências
- [JWT](https://jwt.io/) - Autenticação baseada em tokens
- [Pytest](https://docs.pytest.org/) - Framework de testes

### Frontend
- [React](https://react.dev/) - Biblioteca JavaScript para interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript tipado
- [Vite](https://vitejs.dev/) - Build tool moderna
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [React Query](https://tanstack.com/query/latest) - Gerenciamento de estado e cache
- [React Router](https://reactrouter.com/) - Roteamento
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Zod](https://zod.dev/) - Validação de esquemas

## 🖼️ Pré-visualização

Algumas telas da aplicação:

### Tela Inicial
![Tela Inicial](screenshots/home-dark.png)

### Agendamento de Evento
![Agendamento](screenshots/scheduling2-dark.png)
![Agendamento](screenshots/scheduling3-dark.png)

### Eventos
![Eventos](screenshots/event_list-dark.png)
![Eventos](screenshots/event_view1-dark.png)

### Configurações
![Configuracao](screenshots/settings-dark.png)

Outras imagens estão disponíveis na pasta /screenshots, incluindo diferentes páginas, variações de tema e exemplos de responsividade.

## 🚀 Como Iniciar

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Como iniciar

1. Clone o repositório:
```
git clone https://github.com/joaopedrodevms/Schedly.git
cd Schedly
```

2. Suba os serviços com Docker Compose:
```
docker compose up -d
```

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- MinIO Console: http://localhost:9001
- PostgreSQL: localhost:5432

## 📦 Estrutura do Projeto

O projeto segue uma arquitetura limpa e modular:

### Backend
- \`/core\` - Regras de negócio e modelos
- \`/interface\` - APIs e rotas
- \`/infra\` - Implementações de infraestrutura
- \`/use_cases\` - Casos de uso da aplicação

### Frontend
- \`/components\` - Componentes reutilizáveis
- \`/pages\` - Páginas da aplicação
- \`/context\` - Contextos React
- \`/hooks\` - Hooks personalizados
- \`/service\` - Serviços e integrações

## 🧪 Testes

Para rodar os testes do backend:
```
docker compose exec backend poetry run task test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Sobre o Projeto

Schedly é um projeto de portfólio desenvolvido com foco em boas práticas de arquitetura, testes, performance e experiência do usuário. Ele reflete meu compromisso com a qualidade técnica e a entrega de soluções modernas e eficientes.
Se você quiser conversar sobre o projeto ou tem interesse em colaboração, fique à vontade para entrar em contato!