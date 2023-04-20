import {BACK_END_POINTS} from '../apiconstants/apiConstants';

export const updateUserInfo = async (username, metadata) => {
    const body = { username, metadata};

    try {
    const response = await fetch(BACK_END_POINTS.USER_INFO.EDIT, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',         
      },
      body: JSON.stringify(body)
    });
    if (response.status === 401)
    {
      window.location.reload();
    }
    if (!response.ok) {
      throw new Error('User info failed to update')
    }    
    
    const data = await response.json();
    return (data.payload);
} catch(error) {
    throw new Error('User info failed to update')

}
}