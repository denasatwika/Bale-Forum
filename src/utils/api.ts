import type {
  User,
  Thread,
  Comment,
  ThreadDetail,
  Leaderboard,
  RegisterPayload,
  LoginPayload,
  NewThreadPayload,
} from '../types';
import type { VotePath } from './vote';

const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

const putAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const getAccessToken = () => localStorage.getItem('accessToken') || '';
const removeAccessToken = () => localStorage.removeItem('accessToken');

async function request<T>(
  path: string,
  options: RequestInit = {},
  withAuth = false):
    Promise<T> {

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (withAuth) headers.Authorization = `Bearer ${getAccessToken()}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string>) },
  });
  const json = (await response.json()) as ApiResponse<T>;
  if (json.status !== 'success') throw new Error(json.message);
  return json.data;
}

const api = {
  putAccessToken,
  getAccessToken,
  removeAccessToken,

  register: async (payload: RegisterPayload) => (
    await request<{ user: User }>('/register', { method: 'POST', body: JSON.stringify(payload) })
  ).user,

  login: async (payload: LoginPayload) => (
    await request<{ token: string }>('/login', { method: 'POST', body: JSON.stringify(payload) })
  ).token,

  getOwnProfile: async () => (await request<{ user: User }>('/users/me', {}, true)).user,
  getAllUsers: async () => (await request<{ users: User[] }>('/users')).users,
  getAllThreads: async () => (await request<{ threads: Thread[] }>('/threads')).threads,
  getThreadDetail: async (id: string) => (
    await request<{ detailThread: ThreadDetail }>(`/threads/${id}`)
  ).detailThread,
  getLeaderboards: async () => (
    await request<{ leaderboards: Leaderboard[] }>('/leaderboards')
  ).leaderboards,

  createThread: async (payload: NewThreadPayload) => (
    await request<{ thread: Thread }>(
      '/threads',
      { method: 'POST', body: JSON.stringify(payload) },
      true,
    )
  ).thread,

  createComment: async (threadId: string, content: string) => (
    await request<{ comment: Comment }>(
      `/threads/${threadId}/comments`,
      { method: 'POST', body: JSON.stringify({ content }) },
      true,
    )
  ).comment,

  voteThread: (threadId: string, type: VotePath) => request<unknown>(
    `/threads/${threadId}/${type}`,
    { method: 'POST' },
    true,
  ),

  voteComment: (threadId: string, commentId: string, type: VotePath) => request<unknown>(
    `/threads/${threadId}/comments/${commentId}/${type}`,
    { method: 'POST' },
    true,
  ),
};

export default api;