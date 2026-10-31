import data from '../world_universities_and_domains.json' with { type: 'json' };
import type { University } from './index.ts';

const universities: University[] = data;

export default universities;
