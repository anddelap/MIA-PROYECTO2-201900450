import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { variable } from './variables';
//const baseUrl = 'http://localhost:3200';
const baseUrl = window.location.href.includes('localhost') ? variable.base_url : variable.base_url_aws;

console.log(baseUrl)
const api = axios.create({
    baseURL: baseUrl,
});

// Add Viaje

export const addCars = (car) => {
    /* api.post('/usuarios/getUser', user).then(function (response) {
        return response.data;
    }) */
    return api.post('/carros/addCar', car)
};

export const useAddCars = () =>{
    //console.log(useMutation(logIn))
    return useMutation(addCars,{
        onSuccess: (data) => {
            console.log(data)
        }
    });
}

//Delete Car

export const deleteCar = (car) => {
    return api.post('/carros/deleteCar', car)
}

export const useDeleteCar = () =>{
    return useMutation(deleteCar,{
        onSuccess: (data) => {
            console.log(data)
        }
    });
}
