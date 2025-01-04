import { SizeType } from '@/types/size';

import { axiosInstance } from '@/api/api';

export class SizeService {
  static async getMany() {
    return (await axiosInstance.get<SizeType[]>('/sizes')).data;
  }
}
