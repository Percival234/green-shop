import '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { SizeType } from '@/type/size';
import { BlogType } from '@/type/blog';
import { UpdatePasswordType, UpdateUserType, UserType } from '@/type/user';
import { DetailType } from '@/type/detail';
import { CreateReviewType, ReviewType } from '@/type/review';
import { WishlistType } from '@/type/wishlist';
import { CategoryType } from '@/type/category';
import { CreateReportType } from '@/type/report';
import { CredentialsType } from '@/type/credentials';
import { CreateOrderType, OrderType } from '@/type/order';
import { ProductInfoType, ProductType } from '@/type/product';

import { SERVER_URL } from '@/constants/SERVER_URL';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{ message: string }>;
  }
}

type Message = { message: string };
type Token = { token: string };

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- REQUEST --- //

const request = async <T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  endpoint: string,
  data: unknown = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axiosInstance<T>({
    method,
    url: endpoint,
    data,
    ...config,
  });
  return response.data;
};

// --- USER --- //

export const deleteUser = () => request<Message>('delete', 'user');

export const getUser = () => request<UserType>('get', 'user/current');

export const updateUser = (userData: UpdatePasswordType | UpdateUserType) =>
  request<Message>('patch', 'user', userData);

export const loginUser = (credentials: CredentialsType) =>
  request<Token>('post', 'user/login', credentials);

export const registerUser = (credentials: CredentialsType) =>
  request<Token>('post', 'user/register', credentials);

// --- FILTER --- //

export const getSizes = () => request<SizeType[]>('get', 'size');

export const getCategories = () => request<CategoryType[]>('get', 'category');

// --- WISHLIST --- //

export const getWishlist = () => request<WishlistType>('get', 'wishlist');

export const clearWishlist = () => request<Message>('delete', 'wishlist');

export const updateWishlist = (productId: string) =>
  request<Message>('patch', 'wishlist', { productId });

// --- PRODUCT --- //

export const getProduct = (id: string) => request<ProductInfoType>('get', `product/${id}`);

export const getRelated = (categoryId: string, productId: string) =>
  request<{ products: ProductType[]; pagesCount: number }>(
    'get',
    `product?categories=${categoryId}&exclude=${productId}&limit=12`
  );

export const getProducts = () =>
  request<{ products: ProductType[]; pagesCount: number }>(
    'get',
    `product?${new URLSearchParams(window.location.search)}`
  );

// --- DETAILS --- //

export const getDetails = (id: string) => request<DetailType[]>('get', `detail/${id}`);

// --- WISHLIST --- //

export const getReviews = (id: string) => request<ReviewType[]>('get', `review/${id}`);

export const postReview = (review: CreateReviewType) => request<Message>('post', 'review', review);

// --- ORDER --- //

export const getOrders = () => request<OrderType[]>('get', 'order');

export const postOrder = (order: CreateOrderType) => request<Message>('post', 'order', order);

// --- BLOG --- //

export const getBlogs = () => request<BlogType[]>('get', 'blog');

export const getBlog = (id: string) => request<BlogType>('get', `blog/${id}`);

// --- REPORT --- //

export const postReport = (report: CreateReportType) => request<Message>('post', 'report', report);
