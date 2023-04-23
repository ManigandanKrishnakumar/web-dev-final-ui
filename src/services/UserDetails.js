import {BACK_END_POINTS} from '../apiconstants/apiConstants';

export const ListAllUsers = async () => {
    try {
      const res = await fetch(BACK_END_POINTS.USER_INFO.LISTUSERS);
      const resJson = await res.json();

      if (resJson.isSuccess === true) {
        
        
      } else {
        throw new Error('Not able to view details');
      }

      return (resJson);
    
    } catch (err) {
          throw new Error('Not able to view details');
    }
  };