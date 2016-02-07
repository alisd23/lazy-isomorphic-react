import AlertTypes from '../constants/AlertTypes';

interface IAlert {
  id?: number;
  title: string;
  content: string;
  type: AlertTypes;
}

export default IAlert;
