import {BACK_END_POINTS} from '../apiconstants/apiConstants';

export const SearchUser = async (username) => {
    const body = { username};

    try {
    const response = await fetch(BACK_END_POINTS.USER_INFO.SEARCH, {
      method: 'POST',
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
      throw new Error('failed to search user info')
    }    

    const data = await response.json();
    if (data.message === 'User does not exist')
        throw new Error('User does not exist');
    return (data.payload);
} catch(error) {
    if (error.message === 'User does not exist')
        throw new Error('user does not exist');
    else 
        throw new Error('failed to search user info')

}
}