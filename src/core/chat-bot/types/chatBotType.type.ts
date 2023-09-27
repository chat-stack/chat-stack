export enum ChatBotType {
  // DEFAULT refers to a simple LLM chat model with prompt templates
  DEFAULT = 'DEFAULT',
  // RAG refers to a chat bot that has only one knowledge base and always retrieves context from that to answer questions
  RAG = 'RAG',
  // AGENT refers to a chat bot that can dynamically choose tools e.g. search/rag/calculator etc. to answer questions
  AGENT = 'AGENT',
}
