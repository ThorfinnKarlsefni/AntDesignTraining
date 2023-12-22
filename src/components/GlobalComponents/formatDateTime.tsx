import moment from 'moment';

const FormatDateTime = (dateTime: string) => {
  return dateTime ? moment(dateTime).format('YYYY-MM-DD HH:mm:ss') : '';
};

export default FormatDateTime;
