import fetcher from '@utils/fetcher'
import axios from 'axios'
import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles'
import gravatar from 'gravatar'
import Menu from '@components/Menu'
import { Link } from 'react-router-dom'
import { IUser, IWorkspace } from '@typings/db'
import { Button, Input, Label } from '@pages/SignUp/styles'
import useInput from '@hooks/useInput'
import Modal from '@components/Modal'
import { toast } from 'react-toastify'

const Workspace: FC = ({ children }) => {
  const { data: userData, error, mutate } = useSWR<IUser>('/api/users', fetcher)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('')
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('')
  const navigate = useNavigate()

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      mutate()
    })
  }, [])

  const onCloseUserProfile = useCallback(() => {
    setShowUserMenu(false)
  }, [])

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev)
  }, [])

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true)
  }, [])

  const onCreateWrokspace = useCallback((e) => {
    e.preventDefault()
    if (!newWorkspace || !newWorkspace.trim()) return
    if (!newUrl || !newUrl.trim()) return
    axios.post('/api/workspaces', {
      workspace: newWorkspace,
      url: newUrl
    })
    .then(() => {
      mutate()
      setShowCreateWorkspaceModal(false)
      setNewWorkspace('')
      setNewUrl('')
    })
    .catch((error) => {
      console.dir(error)
      toast.error(error.response?.data, { position: 'bottom-center' })
    })
  }, [newWorkspace, newUrl])
  
  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false)
  }, [])

  if (!userData) {
    navigate('/login')
  }
  return (
    <div>
      <Header>
        {userData && (
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
            </span>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.email, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                  <div>
                    <span id='profile-name'>{userData.nickname}</span>   
                    <span id='profile-active'>Active</span>   
                  </div>                                
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </RightMenu>
        )}
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData?.Workspaces.map((ws: IWorkspace) => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0,1).toUpperCase()}</WorkspaceButton>
              </Link>
            )
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>
            MenuScroll
            {/* <Menu>Menu</Menu> */}
          </MenuScroll>
        </Channels>
        {children}
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWrokspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
    </div>
  )
}

export default Workspace