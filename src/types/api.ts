export interface ApiResponse<T = any> {
  status: "success" | "error";
  message: string;
  data?: T;
  timestamp?: string;
}

export interface ErrorResponse {
  status: "error";
  message: string;
  stack?: string;
}
