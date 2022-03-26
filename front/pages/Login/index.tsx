import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import useSWR from 'swr';

const LogIn = () => {
  // fetcher 이 주소를 어떻게 처리할 것인가 적어주는 것
  // swr이 첫 줄에 있으니 login 컴포넌트가 실행 될 때 바로 실행된다.
  // login 안되어있으니 false 뜬다.
  // users 요청을 두 번보냈는데 탭 변경 같은 작업이 발생할 때 자동으로 실행된다.
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const navigate = useNavigate()

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          mutate();
        })
        .catch((error) => {
          setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password, mutate],
  );

  console.log(error, userData);
  if (!error && userData) {
    console.log('로그인됨', userData);
    navigate("/workspace/sleact/channel/일반")
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to={"/signup"}>회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;