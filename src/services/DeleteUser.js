import {BACK_END_POINTS} from '../apiconstants/apiConstants';

export const UserVerification = async (username, data) => {
  try {
    const result = await data.encryptServerMessage(username);
    const encryptedusername = result.payload.cipherText;
    return encryptedusername;
  } catch (error) {
    throw new Error('Authentication failed. Please check windows app')
  }
};

export const DeleteUser = async (username, encryptedusername) => {
    const body = {username, encryptedusername};
    try {
    const response = await fetch(BACK_END_POINTS.USER_INFO.DELETE, {
      method: 'DELETE',
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
      throw new Error('User info failed to delete')
    }    
    const data = await response.json();
    return (data.payload);
} catch(error) {
    throw new Error('User info failed to delete')

}
}

export const DeleteUserWindows = async (username, data) => {
  try {
    const result = await data.deleteUsername(username);
    return result;
  } catch (error) {
    throw new Error('Authentication failed. Please check windows app')
  }
}