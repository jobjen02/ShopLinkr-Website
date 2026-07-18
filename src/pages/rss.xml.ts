import type { APIRoute } from 'astro';
import { feedResponse } from '../utils/feed';

export const prerender = false;

export const GET: APIRoute = (context) => feedResponse('nl', context.site);
