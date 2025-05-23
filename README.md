# Gympass app

A API for a gympass management system, allowing users to check in to gyms, manage their profiles and validate check-ins.

## Tech Stack

Node, Typescript, Fastify, Zod, Prisma, Vitest, Biomejs.

## Features

- User registration with unique e-mail validation
- User authentication via JWT
- Consult and update logged-in user profile
- Record and history of gym check-ins
- Search for nearby gyms (up to 10km) or by name
- Check-in at gyms with proximity validation (100m)
- Validation of check-ins by administrators (up to 20 minutes after creation)
- Registration of gyms restricted to administrators
- List pagination (20 items per page)
- Data persistence in PostgreSQL database
- Passwords stored in encrypted form

## API Reference

#### Register user

```http
  POST /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User's name |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

#### Authenticate user

```http
  POST /sessions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

#### Refresh authorization token

```http
  PATCH /token/refresh
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |

#### Get user's profile

```http
  GET /me
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |

#### Create gym

```http
  POST /gyms
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |
| `title` | `string` | **Required**. Gym's title |
| `latitude` | `number` | **Required**. Gym's latitude |
| `longitude` | `number` | **Required**. Gym's longitude |
| `description` | `string` | Gym's description |
| `phone` | `string` | Gym's phone |

#### Search for gyms

```http
  GET /gyms/search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |
| `q` | `string` | **Required**. Search query |
| `page` | `string` | List page |

#### Lists nearby gyms

```http
  GET /gyms/nearby
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |
| `latitude` | `number` | **Required**. User's latitude |
| `longitude` | `number` | **Required**. User's longitude |

#### Get a user's check-in history

```http
  GET /check-ins/history
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |
| `page` | `string` | List page |

#### Get a user's check-in metrics

```http
  GET /check-ins/metrics
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |

#### Validate a user's check-in

```http
  PATCH /check-ins/${id}/validate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |
| `id`      | `string` | **Required**. Id of check-in to validate |

#### Check in

```http
  GET /gyms/${id}/check-ins
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your auth token |
| `id`      | `string` | **Required**. Id of gym to check in |
| `latitude` | `number` | **Required**. User's latitude |
| `longitude` | `number` | **Required**. User's longitude |

## Environment Variables

To run this project, you'll need to add the environment variables from the `.env.example` file to your `.env` file.

## Run Locally

Clone the project

```bash
  git clone https://github.com/oThinas/api-solid.git
```

Go to the project directory

```bash
  cd api-solid
```

Install dependencies

```bash
  pnpm install
```

Start docker container

```bash
  docker compose up -d
```

Generate database

```bash
  pnpx prisma generate
```

Start the server

```bash
  pnpm run dev
```

## Running Tests

To run tests, run the following command

```bash
  pnpm run test
  # or
  pnpm run test:watch
  # or
  pnpm run test:e2e
```

For more info, check `package.json`.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
