# Protect your Feathers API with Custom Key Auth Strategy

## Overview

This guide demonstrates how to protect your [Feathers](http://feathersjs.com) app using a custom authentication strategy built around the [Unkey](https://www.unkey.com/) for managing and validating API keys. By leveraging Unkey's API key validation system, we can ensure that requests to your Feathers backend are authenticated using time-sensitive, secure keys.

## Tech Stack

- [Feathers JS](http://feathersjs.com): An open source framework for building APIs and real-time applications.
- [Unkey](https://www.unkey.com/): A service to manage API keys with advanced features like time-bound access, rate limiting, and access control.

## Features

- Secure endpoints with both Local Auth and API Key-based strategies.
- Integration with Unkey API to validate keys for time-sensitive access.

## How it works

Within the custom API key auth strategy, we'll check if there is a specific header in the request containing a **valid** API key. If true, we'll successfully authorize the request.

## Quickstart

### Create your first root key

1. Go to [settings.root-keys](https://app.unkey.com/settings/root-key) and click on the "Create New Root Key" button.
2. Enter a name for the key.
3. Select the following workspace permissions: `create_key`, `read_key`, `encrypt_key` and `decrypt_key`.
4. Click "Create".

### Create your first API

1. Go to [apis](https://app.unkey.com/apis) and click on the "Create New API" button.
2. Give it a name.
3. Click "Create".

### Set up the example

1. Clone the repository

    ```bash
    git clone git@github.com:unrenamed/unkey-feathers
    cd unkey-feathers
    ```

2. Install your dependencies

    ```bash
    pnpm install
    ```

3. Create a`.env.local` file and add the following:

    ```env
    UNKEY_ROOT_KEY=your-root-key
    UNKEY_API_ID=your-api-id
    ```

4. Start your app

    ```bash
    pnpm compile # Compile TypeScript source
    pnpm migrate # Run migrations to set up the database
    pnpm start
    ```

    The server will start and listen on `3030` port.

### Test the API routes

1. Create some users before accesing `GET` endpoint

    ```bash
    curl -X POST http://localhost:3030/users \
    -H "Content-Type: application/json" \
    -d '{
        "email": "alice@unkey.com",
        "password": "supersecret"
    }'
    ```

2. Validate if you can access `/users` and `/users/:id` endpoints

    ```bash
    curl -X GET http://localhost:3030/users
    curl -X GET http://localhost:3030/users/1
    ```

    These two are protected. You should NOT be able to access them before authorization.

3. Authorize using `local` strategy, i.e. email + password

    ```bash
    curl -X POST http://localhost:3030/authentication \
    -H "Content-Type: application/json" \
    -d '{
        "email": "alice@unkey.com",
        "password": "supersecret",
        "strategy": "local"
    }'
    ```

4. Validate if you can access `/users` and `/users/:id` endpoints

    ```bash
    curl -X GET http://localhost:3030/users \
    -H "Authorization: Bearer <your-bearer-token>"
    ```

    ```bash
    curl -X GET http://localhost:3030/users/:id \
    -H "Authorization: Bearer <your-bearer-token>"
    ```

    The first one still not accessible, because it requires an API key for access.

5. Create an API key to access routes protected with API key strategy

    ```bash
    curl -X POST http://localhost:3030/keys \
    -H "Content-Type: application/json" \
    -d '{}'
    ```

    You will get `key` and `keyId` in the response object.

6. Now you can access `/users` route with `x-api-key` header and valid key

    ```bash
    curl -X GET http://localhost:3030/users \
    -H 'Content-Type: application/json' \
    -H 'x-api-key: <your-api-key>'
    ```
