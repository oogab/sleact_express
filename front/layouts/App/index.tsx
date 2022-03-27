import React from 'react'
import loadable from '@loadable/component'
import { Routes, Route, Navigate } from 'react-router-dom'
import Workspace from '../Workspace'

const LogIn = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/sleact/channel" element={<Channel />} />
      <Route path="/workspace/sleact/dm" element={<DirectMessage />} />
    </Routes>
  )
};

export default App

// react-router version 6

// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 레이아웃