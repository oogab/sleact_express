import fetcher from '@utils/fetcher'
import axios from 'axios'
import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles'
import gravatar from 'gravatar'
import Menu from '@components/Menu'

const Workspace: FC = ({ children }) => {
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      mutate()
    })
  }, [])

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev)
  }, [])

  if (!userData) {
    navigate('/login')
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData?.email, { s: '28px', d: 'retro' })} alt={userData?.email} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData?.email, { s: '36px', d: 'retro' })} alt={userData?.email} />
                  <div>
                    <span id='profile-name'>{userData.nickname}</span>   
                    <span id='profile-active'>Active</span>   
                  </div>                                
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>
            MenuScroll
            {/* <Menu>Menu</Menu> */}
          </MenuScroll>
        </Channels>
        {children}
      </WorkspaceWrapper>
    </div>
  )
}

export default Workspace