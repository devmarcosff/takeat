# Backend - Takeat Delivery

O backend do projeto Takeat Delivery foi desenvolvido utilizando NestJS. Esta aplicação gerencia a lógica do servidor, rotas e interações com o banco de dados PostgreSQL.

---

## Como iniciar o projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Yarn (gerenciador de pacotes)
- Banco de dados PostgreSQL configurado

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-repositorio/takeat-delivery.git
   cd takeat-delivery/backend
   ```

2. **Instale as dependências**
   ```bash
   yarn
   ```

3. **Configuração do ambiente**
   Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:
   ```env
   DB_HOST=ep-raspy-breeze-a5wawphc.us-east-2.aws.neon.tech
   DB_PORT=5432
   DB_USERNAME=neondb_owner
   DB_PASSWORD=HR9fzxoFDl5h
   DB_DATABASE=neondb
   FRONTEND_URL=http://localhost:3000
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   yarn start:dev
   ```
   O backend estará acessível em [http://localhost:8000](http://localhost:8000).

---

## Rotas Disponíveis

| Método | Endpoint            | Descrição                     |
|--------|---------------------|-------------------------------|
| GET    | `/api/v1/orders`    | Lista todos os pedidos        |
| POST   | `/api/v1/orders`    | Cria um novo pedido           |
| GET    | `/api/v1/orders/:id`| Retorna detalhes de um pedido |
| PUT    | `/api/v1/orders/:id`| Atualiza informações de um pedido |
| DELETE | `/api/v1/orders/:id`| Exclui um pedido              |

---

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações server-side.
- **PostgreSQL**: Banco de dados relacional utilizado.
- **Yarn**: Gerenciador de pacotes.

---

## Contribuições

Contribuições são bem-vindas! Caso tenha sugestões, sinta-se à vontade para abrir um PR ou issue no repositório.

---

## Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

