export type GetTasksParams = {
  page: number;
  size: number;
  task_types?: string;
  region_id?: number;
  object_ids?: string;
  account_id?: number;
};
