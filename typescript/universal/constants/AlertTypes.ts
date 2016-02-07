
enum AlertTypes {
  ERROR,
  SUCCESS,
  INFO
}

export const classesMap = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  [AlertTypes.ERROR]: 'error',
  [AlertTypes.SUCCESS]: 'success',
  [AlertTypes.INFO]: 'info'
}

export const alertClasses = classesMap;
export default AlertTypes;
