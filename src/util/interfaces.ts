import { ObjectId } from "mongodb";

export interface AdminResponse {
  _id?: ObjectId;
  email: string;
  name?: string;
  img_url?: string;
}


export interface UserResponse {
  _id?: string;
  email: string;
  name?: string;
  img_url?: string;
  role: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface CategoryResponse {
  _id?: string;
  name: string;             // e.g., "Carpenter"
  description?: string;     // optional detail
  img_url?: string;            // e.g., image URL
  createdAt?: Date;
  updatedAt?: Date;
}


export class Response {
 isSuccess: boolean;
  data: any;
  message: string;
} 


export class ApiResponse<T = any> {
  isSuccess: boolean;
  data: T;
  message: string;
}


