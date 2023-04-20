import {BACK_END_POINTS} from '../apiconstants/apiConstants';

export const getChallenge = async (username) => {
  const body = {username};
  try {
    const response = await fetch(BACK_END_POINTS.SIGN_IN.CHALLENGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (response.status === 401)
    {
      window.location.reload();
    }
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    const signature = data.payload.signature;
    const challenge = data.payload.challenge;
    return {challenge, signature};
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getEncryptedChallenge = async (challenge, data) => {
  try {
    const result = await data.encryptServerMessage(challenge);
    const encryptedChallenge = result.payload.cipherText;
    return encryptedChallenge;
  } catch (error) {
    throw new Error('Authentication failed. Please check windows app')
  }
};



export const getToken = async (response, signature, challenge) => {
  const body = { response, signature, challenge};
  
  try {
    const result = await fetch(BACK_END_POINTS.SIGN_IN.AUTHENTICATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    if (result.status === 401)
    {
      window.location.reload();
    }
    if (!result.ok) {
      const data = await result.json();
      throw new Error(data.message);
      //throw new Error(`Authentication failed. Server responded with ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const deleteToken = async () => {
  try {
    const result = await fetch(BACK_END_POINTS.SIGN_IN.LOGOUT, {
      method: 'GET',
      credentials: 'include'
    });
    if (result.status === 401)
    {
      window.location.reload();
    }
    if (!result.ok) {
      throw new Error(`Logout failed. Server responded with ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    throw new Error('Logout failed')
  }
};
