# App

GymPass Style App

## Requisitos funcionais

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados por um usuário logado;
- [ ] Deve ser possível obter o histórico de check-ins realizados por um usuário logado;
- [ ] Deve ser possível buscar academias próximas a localização do usuário logado;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia.

## Regras de negócio

- [ ] O usuário não deve poder se cadastrar com o mesmo e-mail mais de uma vez;
- [ ] O usuário não deve poder fazer 2 check-ins no mesmo dia;
- [ ] O usuário não deve poder fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos de sua criação;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores.

## Requisitos não funcionais

- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação devem ser persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados devem ser paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por JWT (JSON Web Token).
