import * as moment from 'moment';

export function convert(value: Date): string {
  return moment
    .utc(new Date(value))
    .local()
    .format('DD/MM/YYYY')
    .replace('T', ' ');
}
