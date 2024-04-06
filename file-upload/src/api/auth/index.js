import axiosInstance from "../axios-instance";
import { FORGOT_URL, LOGIN_URL, REGISTER_URL } from "../constant";


class AuthAPI {

    SignIn(request) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(LOGIN_URL, request).then(response => {
              resolve(response.data);
            }).catch(err => {
              reject(err);
            })
          })
    }

    SignUp(request) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(REGISTER_URL, request).then(response => {
              resolve(response.data);
            }).catch(err => {
              reject(err);
            })
          })
    }

    Forgot(request) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(FORGOT_URL, request).then(response => {
              resolve(response.data);
            }).catch(err => {
              reject(err);
            })
          })
    }

    ResetPassword(request) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(FORGOT_URL+ '/reset', request).then(response => {
              resolve(response.data);
            }).catch(err => {
              reject(err);
            })
          })
    }
}

export const authAPI = new AuthAPI()