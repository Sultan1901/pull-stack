const initialState = {
  user: null,
  token: '',
};

const Login = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      const { user, token } = payload;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    case 'LOGOUT':
      localStorage.clear();
      return { user: '', token: '' };
    default:
      const tokenStore = localStorage.getItem('token');
      const userStore = JSON.parse(localStorage.getItem('user'));
      return { user: userStore, token: tokenStore };
  }
};
export default Login;
export const sign = data => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};

export const logout = data => {
  return {
    type: 'LOGOUT',
    payload: data,
  };
};
