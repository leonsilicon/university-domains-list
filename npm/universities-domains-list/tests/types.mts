import universities, { type University } from 'universities-domains-list';

const university: University = universities[0];
const name: string = university.name;
const province: string | null = university['state-province'];
void name;
void province;
