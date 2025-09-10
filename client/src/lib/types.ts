export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  profilePicture?: string;
}

export interface ListItem {
  id: number;
  item: string;
}

export interface Note {
  _id: string;
  notebookId?: string;
  title: string;
  content?: string;
  list?: ListItem[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  type: "text" | "list";
  sortKey: number;
}

export interface Notebook {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Chat {
  _id: string;
  userId: string;
  query: string;
  answer: string;
}
