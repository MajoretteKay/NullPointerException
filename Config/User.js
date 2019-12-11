let user = localStorage.getItem('user');

export const getUser = () => {
  return user;
};

export const setUser = (t) => {
  user = t;
  localStorage.setItem('user', t);
};