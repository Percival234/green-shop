type ReviewUserType = {
  _id: string;
  firstname: string;
  lastname: string;
  image: string;
};

export type ReviewType = {
  _id: string;
  user: ReviewUserType;
  rate: number;
  text: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateReviewType = Omit<ReviewType, '_id' | 'user' | 'createdAt' | 'updatedAt'>;
