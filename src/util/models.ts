export class UserModel {
  _id?: string;
  email: string;
  name?: string;
  img_url?: string;
  password?: string;
  role: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export class CategoryModel {
  _id?: string;
  name?: string; 
  type: string;          // e.g., "Carpenter"
  description?: string;     // optional detail
  img_url?: string;            // e.g., image URL
  createdAt?: Date;
  updatedAt?: Date;
}
