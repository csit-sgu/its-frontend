import axios from 'axios';
import { BASE_URL } from '@/../app.config';
import { GetTasksParams } from './dto';
import { z } from 'zod';
import { TaskPageScheme, TaskTransitions } from './schemes';

axios.defaults.baseURL = BASE_URL;

export async function getTasks(params: GetTasksParams): Promise<z.infer<typeof TaskPageScheme>> {
  const result = TaskPageScheme.safeParse(await axios.get('/tasks', { params }).then((r) => r.data));
  if (!result.success) {
    console.error(result.error);
    throw result.error;
  }
  return result.data;
}

export async function getTransitionsForTask(taskId: number): Promise<z.infer<typeof TaskTransitions>> {
  const result = TaskTransitions.safeParse(await axios.get(`/transitions/${taskId}`).then((r) => r.data));
  if (!result.success) {
    console.error(result.error);
    throw result.error;
  }
  return result.data;
}

export function getTaskStages(taskId: number): Promise<string[]> {
  return axios.get(`/tasks/${taskId}/stages/traverse`).then((r) => r.data); 
}
