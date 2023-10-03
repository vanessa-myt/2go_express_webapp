import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// will change this once login api is done na
export var API_KEY = "0fcTliqGYJYaqbonSWgcYjnbj2Hp0mN5t22ZKhu71p0sJ1giD2"
export var TOKEN = "uEhp1rwt4Dehn0v0duluYzEGu9IhPFdB0BoYLNbnuPYeNWx5uA"

let config = {
    headers: {

        "token" : "ba9dfa1a-4879-11ee-86c0-0209f4cb5e6e",
        "Content-Type": "application/json",
    }
}

// API Axios Get Call.
export const getAPICall = (url, data) => {
    return axios.get(url, data, config);
}

// API Axios Post Call.
export const postAPICall = (url, data) => {
    return axios.post(url, data, config);
}
// API Axios Put Call.
export const putAPICall = (url, data) => {
    return axios.put(url, data, config);
}
// API Axios Delete Call.
export const deleteAPICall = (url) => {
    return axios.delete(url,config);
}