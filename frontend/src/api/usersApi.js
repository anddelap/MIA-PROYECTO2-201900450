import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { variable } from './variables';
//const baseUrl = variable.base_url;
const baseUrl = window.location.href.includes('localhost') ? variable.base_url : variable.base_url_aws;

console.log(baseUrl)
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

// Delete user

export const deleteUser = (user) => {
    return api.post('/usuarios/deleteUser', user)
};

export const useDeleteUser = () =>{
    //console.log(useMutation(logIn))
    return useMutation(deleteUser,{
        onSuccess: (data) => {
            console.log(data)
        }
    });
}
