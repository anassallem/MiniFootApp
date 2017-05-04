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
                //const progress = e.loaded / e.total;
              }).then((response) => {
                return JSON.parse(response._response);
              }, (e) => console.log(e));
        } else {
          return res.data;
        }
    }, (res) => {
      throw new Error(res);
    });
};

export const uploadLogoTeam = (idEquipe, photo) => {
    const photoURL = `${URL}/equipe/teamUploads/${idEquipe}`;
      console.log(photo);
    const x = photo.fileName.split('.');
    const imageName = `image${Date.now()}.${x[1]}`;
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
          console.log(progress);
        }).then((res) => {
          try {
               AsyncStorage.getItem('equipe').then((value) => {
                 const equipe = JSON.parse(value);
                 equipe.logo = imageName;
                 AsyncStorage.mergeItem('equipe', JSON.stringify(equipe), () => {

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
export const getTeams = (text) => {
    const requestURL = `${URL}/equipe?name=${text}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const getAllPhotosTeam = (idEquipe) => {
    const requestURL = `${URL}/equipe/${idEquipe}/photos`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const getTeamByID = (idEquipe) => {
    const requestURL = `${URL}/equipe/${idEquipe}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const updateTeam = (idTeam, team) => {
    const requestURL = `${URL}/equipe/${idTeam}`;
      return axios.put(requestURL, team, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const saveFormationMyTeam = (idEquipe, players) => {
    const requestURL = `${URL}/equipe/${idEquipe}/formation`;
      return axios.put(requestURL, players, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getPlayerTeam = (idEquipe) => {
    const requestURL = `${URL}/equipe/${idEquipe}/membres`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getFormationTeamById = (idEquipe) => {
    const requestURL = `${URL}/equipe/${idEquipe}/formation`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const deletePlayerTeam = (idEquipe, idJoueur) => {
    const requestURL = `${URL}/equipe/${idEquipe}/players/${idJoueur}/delete`;
      return axios.put(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const updateSousCapitaine = (idJoueur) => {
    const requestURL = `${URL}/equipe/${idJoueur}/rename`;
      return axios.put(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const updateCapitaine = (idJoueur, idEquipe, idCapitaine) => {
    const requestURL = `${URL}/equipe/${idEquipe}/capitaine/${idCapitaine}/to/${idJoueur}`;
      return axios.put(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const rejoindreTeam = (idUser, idEquipe) => {
    console.log(idUser, idEquipe);
    const requestURL = `${URL}/from/${idUser}/to/${idEquipe}`;
      return axios.post(requestURL, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getPlayerInTeam = (idUser, idEquipe) => {
    console.log(idUser, idEquipe);
    const requestURL = `${URL}/notification/${idUser}/playerBelongsTeam/${idEquipe}`;
      return axios.get(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const deleteRejoindreTeam = (idRejoindreTeam) => {
    const requestURL = `${URL}/notification/${idRejoindreTeam}`;
      return axios.delete(requestURL)
      .then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
  };

/*export const sendNotificationsTeam = (notification, idEquipe) => {
    const requestURL = `${URL}/notification/${idEquipe}`;
      return axios.post(requestURL, notification, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};*/
