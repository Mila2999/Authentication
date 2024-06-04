import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  console.log('action working', request);
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  console.log(mode);
  if (mode !== 'login' && mode !== 'signup') {
    console.log('if');
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = request.formData();
  console.log(data);
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };
  console.log('authData: ' + authData);
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json ' },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: 'Could not autentificate user' }, { status: 500 });
  }
  // soon: manage that token
  return redirect('/');
}
