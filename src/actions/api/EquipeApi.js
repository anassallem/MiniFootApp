import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { URL, CONFIG } from './config';

export const createTeam = (equipe, photo) => {
    const requestURL = `${URL}/equipe`;
      return axios.post(requestURL, equipe, CONFIG).then((res) => {
        if (photo !== null) {
          const photoURL = `${URL}/equipe/teamUploads/${res.data.message._id}`;
          const x = photo.fileName.split('.');
          const imageName = `equipe${Date.now()}.${x[1]}`;
          const data = new FormData();
              data.append('name', 'testName');
              data.append('photo', {
                uri: photo.uri,
                type: photo.type,
                name: imageName
              });
            return futch(photoURL, {
                method: 'post',
                body: data
              }, (e) => {
                const progress = e.loaded / e.total;
              }).then((response) => {
                var team = response._response.message;
                AsyncStorage.setItem('equipe', JSON.stringify(team));
                return JSON.parse(response._response);
              }, (e) => console.log(e));
        } else {
          AsyncStorage.setItem('equipe', JSON.stringify(res.data.message));
          return res.data;
        }
    }, (res) => {
      throw new Error(res);
    });
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