// TODO: Соотнести с беком, когда будет готово API

import dayjs from 'dayjs';

export type TaskId = string;
export type TaskType = 'incident' | 'regular';
export type TaskStage = 'created' | 'appointed_account' | 'work' | 'work_completed' | 'closed';

export type TaskEntity = {
  taskId: TaskId;
  taskableType: TaskType;
  createdBy: string;
  accountName: string;
  deadlineAt: dayjs.Dayjs;
  objectId: string;
  stages: string[];
};

export type TaskTransition = {
  taskId: string;
  taskStageId: TaskStage;
  transitionedAt: dayjs.Dayjs;
};

export type RegionId = string;

export type Region = {
  regionId: RegionId;
  name: string;
};

export type AccountId = string;

export type Account = {
  accountId: AccountId;
  name: string;
};
