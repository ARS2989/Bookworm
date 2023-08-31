import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK } from './mutations';

function Login() {
  const [loginUser] = useMutation(LOGIN_USER);
  // Other mutation hooks...

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { email: 'example@email.com', password: 'password' },
      });
      const user = data.login.user;
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Other mutation handling functions...

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {/* Other mutation buttons */}
    </div>
  );
}

export default Login;
