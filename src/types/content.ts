export interface Media {
  _id: string;
  url: string;
  filename?: string;
  mimetype?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  imageId?: Media | any;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Offer {
  _id: string;
  title: string;
  offer: string;
  imageId?: Media | any;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt?: string;
}
