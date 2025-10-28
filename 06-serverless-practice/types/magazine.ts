export type Category =
  | '인공지능'
  | '웹개발'
  | '클라우드'
  | '보안'
  | '모바일'
  | '데이터사이언스'
  | '블록체인'
  | 'DevOps';

export interface Magazine {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  tags: string[];
  imageUrl: string;
  date: string;
}
