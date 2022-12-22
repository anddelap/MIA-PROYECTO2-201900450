import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const baseUrl = 'http://localhost:3200';

const api = axios.create({
    baseURL: baseUrl,
});

export const getUsers = () => api.get('/getUsers').then(res=>res.data);

// Login user

export const logIn = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/usuarios/getUser', user)
};


export const useUserLogin = () =>{
    //console.log(useMutation(logIn))
    const queryClient = useQueryClient();
    return useMutation(logIn, {
        onSuccess: (data) => {
            /* queryClient.setQueryData('user', () => {
                return {
                    data: d,
                }
            }); */
            queryClient.setQueryData('user', data);
        }
    });
}

// Add user

export const addUser = (user) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/usuarios/addUser', user)
};

export const useAddUser = () =>{
    //console.log(useMutation(logIn))
    return useMutation(addUser,{
        onSuccess: (data) => {
            console.log(data)
        }
    });
}
