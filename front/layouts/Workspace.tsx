import fetcher from '@utils/fetcher'
import axios from 'axios'
import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR, { mutate } from 'swr'

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
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </div>
    )
}

export default Workspace