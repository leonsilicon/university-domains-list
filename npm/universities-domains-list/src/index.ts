import data from '../world_universities_and_domains.json' with { type: 'json' };

export interface University {
  name: string;
  country: string;
  alpha_two_code: string;
  'state-province': string | null;
  domains: string[];
  web_pages: string[];
}

const universities: University[] = data;

export default universities;
