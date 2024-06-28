export type ReportType = {
  _id: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateReportType = {
  text: string;
};
