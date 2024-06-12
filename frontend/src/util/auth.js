import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExperationDate = localStorage.getItem('experation');
  const experationDate = new Date(storedExperationDate);
  const now = new Date();
  const duration = experationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
  return token;
}
