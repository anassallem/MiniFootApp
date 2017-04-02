import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { URL, CONFIG } from './config';

export const create = (user) => {
    const requestURL = `${URL}/register`;
      return axios.post(requestURL, user, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUser = (idUser) => {
    const requestURL = `${URL}/users/${idUser}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const updateUser = (idUser, user) => {
    const requestURL = `${URL}/users/${idUser}`;
      return axios.put(requestURL, user, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUserSkills = (idUser) => {
    const requestURL = `${URL}/users/${idUser}/skills`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getUsers = (text) => {
    const requestURL = `${URL}/users?name=${text}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const uploadImageUser = (idUser, photo) => {
    const requestURL = `${URL}/users/upload/${idUser}`;
    const x = photo.fileName.split('.');
    const imageName = `image${Date.now()}.${x[1]}`;
    const data = new FormData();
        data.append('name', 'testName');
        data.append('photo', {
          uri: photo.uri,
          type: photo.type,
          name: imageName
        });
      return futch(requestURL, {
          method: 'post',
          body: data
        }, (e) => {
          const progress = e.loaded / e.total;
          console.log(progress);
        }).then((res) => {
          try {
               AsyncStorage.getItem('user').then((value) => {
                 const user = JSON.parse(value);
                 user.user.photo = imageName;
                 AsyncStorage.mergeItem('user', JSON.stringify(user), () => {

                });
               }).done();
           } catch (e) {
               console.log('caught error', e);
           }
        }, (e) => console.log(e));
};

const futch = (url, opts = {}, onProgress) => {
    console.log(url, opts);
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers || {})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
    });
};

export const postUserSkills = (idUser, skills, from) => {
    const requestURL = `${URL}/users/${idUser}/skills?id=${from}`;
      return axios.post(requestURL, skills, CONFIG)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const updatePassword = (idUser, password) => {
    const requestURL = `${URL}/users/${idUser}`;
console.log(password);
      return axios.patch(requestURL, ({ password }), CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
