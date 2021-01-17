import ParseGoogleBookToBook from "../Utilities/ParseGoogleBookToBook";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;
 
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();
 
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }
    
    dispatch({ type: 'LOGIN_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export async function addToRead(dispatch, payload) {
  console.log("Adding...", payload);
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': payload.auth_token, 'Content-Type': 'application/json' },
    body: JSON.stringify({volumeId: payload.volumeId}),
  };

  try {
    dispatch({type: 'ADD_TO_READ'});
    let response = await fetch(`${ROOT_URL}/user/to-read`, requestOptions);
    let data = await response.json();
    console.log(data);
    if (data.message) {
      dispatch({type: 'SUCCESS_ADD_TO_READ', payload: data})
      const books = data.toRead.map(book => ParseGoogleBookToBook(book));
      localStorage.setItem('toRead', JSON.stringify(books));
      return data;
    }
  } catch (error) {
    console.error(error);
    dispatch({type: 'FAILED_ADD_TO_READ'});
  }
}

export async function removeToRead(dispatch, payload) {
  console.log("Removing...", payload);
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Authorization': payload.auth_token, 'Content-Type': 'application/json' },
    body: JSON.stringify({volumeId: payload.volumeId}),
  };

  try {
    dispatch({type: 'REMOVE_TO_READ'});
    let response = await fetch(`${ROOT_URL}/user/to-read`, requestOptions);
    let data = await response.json();
    console.log(data);
    if (data.message) {
      dispatch({type: 'SUCCESS_REMOVE_TO_READ', payload: data})
      return data;
    }
  } catch (error) {
    console.error(error);
    dispatch({type: 'FAILED_REMOVE_TO_READ'});
  }
}