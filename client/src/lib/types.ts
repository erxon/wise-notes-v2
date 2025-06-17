export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ListItem {
  id: number;
  item: string;
}

export interface Note {
  _id: string;
  notebook?: string;
  title: string;
  content?: string;
  list?: ListItem[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  type: "text" | "list";
}

export interface Notebook {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}
