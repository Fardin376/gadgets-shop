import { getCurrentUser } from '@/services/getCurrentUser';
import Container from '../components/Container';
import FormWrap from '../components/FormWrap';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

async function Login() {
  const currentUser = await getCurrentUser();

  return (
    <div className="login-page-wrapper">
      <Container>
        <FormWrap>
          <LoginForm currentUser={currentUser} />
        </FormWrap>
      </Container>
    </div>
  );
}
export default Login;
