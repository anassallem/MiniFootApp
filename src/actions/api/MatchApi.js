import axios from 'axios';
import { URL, CONFIG } from './config';

export const getMesMatchs = (idEquipe, date, page) => {
    const requestURL = `${URL}/match/${idEquipe}/myMatchs?date=${date}&page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const getMesMatchsEquipe = (idEquipe, date, page) => {
    const requestURL = `${URL}/match/${idEquipe}/myTeam?date=${date}&page=${page}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const deleteMacth = (idMatch) => {
    const requestURL = `${URL}/match/${idMatch}/delete`;
    return axios.delete(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const acceptMatch = (idMatch) => {
    const requestURL = `${URL}/match/${idMatch}/accept`;
    return axios.put(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const reserverMatch = (idMatch, date, message) => {
    const reserver = { date, message };
    const requestURL = `${URL}/match/${idMatch}/reserver`;
    return axios.put(requestURL, reserver, CONFIG)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const addScoreMatch = (idMatch, scoreOne, scoreTow) => {
    const score = { scoreOne, scoreTow };
    const requestURL = `${URL}/match/${idMatch}/score`;
    return axios.put(requestURL, score, CONFIG)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
export const getMatchsTeamTerminated = (idEquipe) => {
    const requestURL = `${URL}/match/${idEquipe}/terminated`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
