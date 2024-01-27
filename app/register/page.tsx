import { getCurrentUser } from '@/services/getCurrentUser';
import Container from '../components/Container';
import FormWrap from '../components/FormWrap';
import RegisterForm from './RegisterForm';

export const dynamic = 'force-dynamic';

async function RegisterPage() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
export default RegisterPage;
