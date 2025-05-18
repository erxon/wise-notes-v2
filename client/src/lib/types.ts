export interface ListItem {
  id: number;
  item: string;
}

export interface Note {
  id: number;
  title: string;
  content?: string;
  list?: ListItem[];
  created_at: string;
  type: "text" | "list";
}
