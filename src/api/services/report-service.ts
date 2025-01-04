import { Message } from '@/types/message';
import { CreateReportType } from '@/types/report';

import { axiosWithAuth } from '@/api/api';

export class ReportService {
  static async create(report: CreateReportType) {
    return (await axiosWithAuth.post<Message>('/reports', report)).data;
  }
}
