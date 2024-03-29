import axios from 'axios';
import { BASE_URL } from '@/../app.config';
import { GetTasksParams } from './dto';
import { z } from 'zod';
import { TaskPageScheme, TaskTransitions } from './schemes';

axios.defaults.baseURL = BASE_URL;

export async function getTasks(params: GetTasksParams): Promise<z.infer<typeof TaskPageScheme>> {
  return TaskPageScheme.parse(await axios.get('/tasks', { params }).then((r) => r.data));
}

export async function getTransitionsForTask(taskId: number): Promise<z.infer<typeof TaskTransitions>> {
  return TaskTransitions.parse(await axios.get(`/transitions/${taskId}`).then((r) => r.data));
}
