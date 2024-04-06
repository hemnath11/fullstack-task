import axiosInstance from "../axios-instance";
import { FILE_URL } from "../constant";


class UsersAPI {

    getFiles() {
        return new Promise((resolve, reject) => {
            axiosInstance.get(FILE_URL).then(response => {
              resolve(response.data);
            }).catch(err => {
              reject(err);
            })
          })
    }

    upload(request) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(FILE_URL, request).then(response => {
              resolve(response.data);
            }).catch(err => {
              reject(err);
            })
          })
    }
}

export const usersAPI = new UsersAPI()