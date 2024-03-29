import axios from 'axios';
import { BASE_URL } from '@/../app.config';
import { GetTasksParams } from './dto';
import { z } from 'zod';
import { TaskPageScheme } from './schemes';

axios.defaults.baseURL = BASE_URL;

export async function getTasks(params: GetTasksParams): Promise<z.infer<typeof TaskPageScheme>> {
  return TaskPageScheme.parse(await axios.get('/tasks', { params }).then((r) => r.data));
}
