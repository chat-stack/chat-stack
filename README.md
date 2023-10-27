## Introduction

ChatStack provides a one stop service stack to host a a set of ChatBot APIs that let you create redistributable ChatBots (for your own customers) with RAG mode to attach your own documentations from text, web pages, or files (csv, pdf etc.). Agent mode is also planned for future release.

Disclaimer:

This repo is still under construction and is in early access mode. Production use is not recommended and let us know if you have any questions by open a github issue.

## Tech Stack

ChatStack combines following technologies

- Nest.js
- Langchain
- OpenSearch
- Postgresql & MikroOrm
- Bull Queue & Redis

Its Nest.js also features latest SWC compiler.

## Installation

Clone this repo then run pnpm install

```
pnpm install
```

Copy `example.env` to `.env` then fill in necessary environment variables.

- OPENAI_API_KEY is required and you need to obtain it from openai.com
- For JWT secret you can generate a random string

Then run ChatStack with Docker Compose

```
docker-compose up --build -d
```

Inside NestJS docker container
```
docker exec -it chat-stack-nestjs sh
```

Run initial MikroOrm schema generation with

```
pnpm mikro-orm schema:fresh --run
```

Then restart NestJS docker container

## Overview of the APIs
IMPORTANT: first get service token from console output. And use it in `Authorization: Bearer <service_token>` header when endpoints request authentication.

Create ChatBot
```
POST http://localhost:5001/v1/chat-bot
```
```json
{
    "name": "TestChatBot",
    "promptTemplate": "You are an AI assistant",
    "mode": "RAG",
    "rag": {
        "textDocs": [
            {
                "text": "Some test texts"
            }
        ],
        "webDocs": [
            {
                "url": "https://news.ycombinator.com/item?id=37806861"
            }
        ]
    }
}
```
You will get some response like (and docs are being loaded asynchronously in background)
```json
{
    "uuid": "ad73f858-22cd-48b0-80c3-99042e96547e",
    "mode": "RAG",
    "name": "TestChatBot",
    "promptTemplate": "You are an AI assistant",
    "rag": {
        "id": 1
    },
    "id": 1
}
```

Then send a test message to the ChatBot, where chatSessionDistinctId is a uuid created from front end or you can get one from https://www.uuidgenerator.net/

```
POST http://localhost:5001/v1/chat
```
```json
{
    "chatBotUuid": "ad73f858-22cd-48b0-80c3-99042e96547e",
    "chatSessionDistinctId": "75378b24-a982-494b-8626-1708bd29b850",
    "userMessage": "Github link for llama.cpp?"
}
```
Example Response
```json
{
    "text": "Sure! Here is the Github link for llama.cpp: \n\nhttps://github.com/ggerganov/llama.cpp"
}
```
Explanation: we created the ChatBot with WebDoc of url https://news.ycombinator.com/item?id=37806861 and in that HackerNews discussion this knowledge is added to our RAG ChatBot.

## API Doc

Access Swagger API docs from http://localhost:5001/api

An online version is also available from ReadmeDocs https://chatstack.readme.io/reference/

## Features

- [ ] Auth (WIP)
  - [x] Service Token (admin role)
  - [ ] Anon Token (WIP)
  - [ ] End Customer
- [ ] Metadata Filters
- [ ] End Customer customizations
- [x] Chat
- [x] ChatBot
- [x] ChatSession
- [x] ChatHistory
- [x] RAG (WIP)
  - [x] TextDoc
  - [x] WebDoc
  - [x] FileDoc
- [ ] Agents

## Stay in touch

- Author: [James Zhang](https://jczhang.com)

## License

ChatStack is [Apache Licensed](LICENSE).
