import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { variable } from './variables';
//const baseUrl = 'http://localhost:3200';
const baseUrl = variable.base_url_aws;

const api = axios.create({
    baseURL: baseUrl,
});

// Add Viaje

export const addViaje = (viaje) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/viajes/addViaje', viaje)
};

export const useAddViaje = () =>{
    //console.log(useMutation(logIn))
    return useMutation(addViaje,{
        onSuccess: (data) => {
            console.log(data)
        }
    });
}
