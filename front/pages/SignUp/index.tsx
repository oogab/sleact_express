import useInput from '@hooks/useInput'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { Form, Error, Success, Label, Input, LinkContainer, Button, Header } from './styles'

// 코드를 거의 완성하고 중복을 제거하는 것이 좋다.
const SignUp = () => {
  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [mismatchError, setMismatchError] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  // useInput을 이용하여 중복 제거
  // const onChangeEmail = useCallback((e) => {
  //   setEmail(e.target.value)
  // }, [])

  // const onChangeNickname = useCallback((e) => {
  //   setNickname(e.target.value)
  // }, [])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
    setMismatchError(e.target.value !== passwordCheck)
  }, [passwordCheck])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setMismatchError(e.target.value !== password)
  }, [password])
  // useCallback => [] 안에 값이 바뀔 때까지 해당 함수를 캐싱해둬라
  // 바뀌는 게 없으면 이 함수를 그대로 써라
  // 이걸 사용 안하면 해당 함수가 계속 재 생성 => 리렌더링 많아진다.
  // 리렌더링이 많아지더라도 화면 자체를 다시 그리지는 않는다.
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log(email, nickname, password, passwordCheck)
    if (!mismatchError) {
      console.log('서버로 회원가입하기')
      // then, catch, finally 같은 곳에는 미리 초기화를 한 번 하는게 좋다.
      // 미리 초기화하지 않으면 여러번 요청을 보낼 경우 이전 요청에 대한 결과가 남아서 side effect 발생 가능성있다.
      setSignUpError('')
      setSignUpSuccess(false)
      // POST, OPTIONS => CORS 요청
      // webpack devserver 수정시에는 OPTIONS 요청이 안보내짐
      axios.post('/api/users', {
        email, nickname, password
      })
      .then((response) => {
        console.log(response)
        setSignUpSuccess(true)
      })
      .catch((error) => {
        console.log(error.response)
        setSignUpError(error.response.data)
      })
      .finally(() => {})
    }
  }, [email, nickname, password, passwordCheck])

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input type="password" id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  )
}

export default SignUp