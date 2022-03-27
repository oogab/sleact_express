import fetcher from '@utils/fetcher'
import axios from 'axios'
import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR, { mutate } from 'swr'
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles'
import gravatar from 'gravatar'

const Workspace: FC = ({ children }) => {
    const { data: userData, error, mutate } = useSWR('/api/users', fetcher)
    const navigate = useNavigate()

    const onLogout = useCallback(() => {
        axios.post('/api/users/logout', null, {
            withCredentials: true,
        })
        .then(() => {
            mutate()
        })
        
    }, [])

    if (!userData) {
        navigate('/login')
    }
    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(userData?.email, { s: '28px', d: 'retro' })} alt={userData?.email} />
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