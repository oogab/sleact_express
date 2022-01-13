import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LogIn from '@pages/Login'
import SignUp from '@pages/SignUp'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default App

// react-router version 6

// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 레이아웃