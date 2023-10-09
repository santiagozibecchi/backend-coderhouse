import { v4 as uuidv4 } from 'uuid';


// getUUID is a function that returns a UUID

export const getUUID = () => {

  return uuidv4().slice(0, 8);
};