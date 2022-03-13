import { environment } from '../../environments/environment';

export const getIdByUrl = (url: string): string => {
  return url.replace(`${environment.apiUrl}/people/`, '').replace('/', '');
};
