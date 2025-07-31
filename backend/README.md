#### Como instalar

poetry install
Crie um .env

## Template

- Crie um .env e defina o valor da variável PROJECT_NAME
- Renomeie a pasta [PROJECT_NAME] para o valor da variavel

TODO:

- Criar migration
  Tive que remover as importações que iniciam com nome do projeto

#### Como usar o template

- execute create_module.py com o nome do modulo
- Crie o model
- Adicione o model no **init**.py da pasta models
- alembic revision --autogenerate -m "create*table*{nome}"
- importar sqlmodel no arquivo de revision gerado
- alembic upgrade head
- Adicione o router no app.py
