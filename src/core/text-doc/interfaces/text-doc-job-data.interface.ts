import { Document } from 'langchain/document';

export interface ITextDocJobData {
  id: number;
  document: Document;
  indexName: string;
}
