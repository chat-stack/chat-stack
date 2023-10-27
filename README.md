## Installation

Clone this repo then run it with Docker Compose

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
First: get service token from console output.

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
You will get some response like
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

## Swagger API Doc

Access Swagger from http://localhost:5001/api

An online version is also available from ReadmeDocs but the interactive playground is not available for urls under localhost.

ReadmeDocs: https://chatstack.readme.io/reference/

## Features

- [ ] Auth
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
