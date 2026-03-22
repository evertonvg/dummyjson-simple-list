import { api } from './api'

export const loginRequest = (data: {
    username: string
    password: string
}) => {
    return api('/auth/login', {
        method: 'POST',
        body: data
    })
}