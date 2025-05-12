export interface ListItem {
  id: number;
  item: string;
}

export interface Note {
  title: string;
  content?: string;
  list?: ListItem[];
  created_at: string;
  type: "text" | "list";
}
