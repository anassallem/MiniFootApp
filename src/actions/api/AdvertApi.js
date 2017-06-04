import axios from 'axios';
import { URL, CONFIG } from './config';

export const getadverts = (page) => {
    const requestURL = `${URL}/adverts?page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const getMesadverts = (page, idUser) => {
    const requestURL = `${URL}/adverts/${idUser}/joueur?page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const getPublicationsTeam = (idEquipe, page) => {
    const requestURL = `${URL}/adverts/${idEquipe}?page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const addInterrestedAdverts = (idAdvert, idUser) => {
    const requestURL = `${URL}/adverts/${idAdvert}?idUser=${idUser}`;
    return axios.post(requestURL, CONFIG).then((res) => {
      return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const deleteInterrestedAdverts = (idAdvert, idUser) => {
    const requestURL = `${URL}/adverts/${idAdvert}?idUser=${idUser}`;
    return axios.delete(requestURL, CONFIG).then((res) => {
      return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getListInteresstedAdvert = (idAdvert) => {
    const requestURL = `${URL}/adverts/${idAdvert}/interssted`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const deleteAdvertyId = (idAdvert) => {
    const requestURL = `${URL}/adverts/${idAdvert}/delete`;
    return axios.delete(requestURL).then((res) => {
      return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
export const getListCommentAdvert = (idAdvert, page) => {
    const requestURL = `${URL}/adverts/${idAdvert}/comments?page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const addCommentAdvertEvent = (comment) => {
    const requestURL = `${URL}/adverts/${comment.advert}/comments`;
  return axios.post(requestURL, comment)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const deleteCommentAdvertEvent = (idComment) => {
    const requestURL = `${URL}/adverts/comments/${idComment}`;
  return axios.delete(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
