// Appwrite types
export interface TodoDocument {
  $id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  $createdAt?: string;
  $updatedAt?: string;
}
export interface User {
  user_id: string;
  role: "driver" | "rider";
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  profile_image_id?: string;
}

export interface Database {
  $id: string;
  name: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Collection {
  $id: string;
  name: string;
  $createdAt: string;
  $updatedAt: string;
  databaseId: string;
}

export interface DocumentList<T> {
  total: number;
  documents: T[];
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  isComplete: boolean;
}
