import fetcher from '@utils/fetcher'
import axios from 'axios'
import React, { VFC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceModal, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles'
import gravatar from 'gravatar'
import Menu from '@components/Menu'
import { Link } from 'react-router-dom'
import { IChannel, IUser, IWorkspace } from '@typings/db'
import { Button, Input, Label } from '@pages/SignUp/styles'
import useInput from '@hooks/useInput'
import Modal from '@components/Modal'
import { toast } from 'react-toastify'
import CreateChannelModal from '@components/CreateChannelModal'
import { Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import { useParams } from 'react-router'

const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))

const Workspace: VFC = () => {
  const { workspace } = useParams<{ workspace: string }>()
  console.log(workspace)

  const { data: userData, error, mutate } = useSWR<IUser>('/api/users', fetcher)
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showWrokspaceModal, setShowWorkspaceModal] = useState(false)
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)
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
    setShowCreateChannelModal(false)
  }, [])

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev)
  }, [])

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true)
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
          <WorkspaceName onClick={toggleWorkspaceModal}>
            Sleact
          </WorkspaceName>
          <MenuScroll>
            <Menu show={showWrokspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((v) => (
              <div>{v.name}</div>
            ))}
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
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
      <CreateChannelModal show={showCreateChannelModal} onCloseModal={onCloseModal} setShowCreateChannelModal={setShowCreateChannelModal} />
    </div>
  )
}

export default Workspace