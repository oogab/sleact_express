import React from 'react'
import loadable from '@loadable/component'
import { Routes, Route, Navigate } from 'react-router-dom'

const LogIn = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const Workspace = loadable(() => import('@layouts/Workspace'))
// const Channel = loadable(() => import('@pages/Channel'))
// const DirectMessage = loadable(() => import('@pages/DirectMessage'))

// 라우트 파라미터 적용
// 파라미터와 파라미터가 아닌 것이 둘 다 존재하면 파라미터가 아닌 것을 반드시 위에 작성해야 한다.
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/:workspace/*" element={<Workspace />} />
    </Routes>
  )
};

export default App

// react-router version 6

// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 레이아웃