import { Document } from 'langchain/document';

export interface ITextDocJobData {
  document: Document;
  indexName: string;
}
