import { getPlayerTeam, deletePlayerTeam, updateSousCapitaine, updateCapitaine, sendNotificationsTeam } from './api/EquipeApi';
import { getUsers } from './api/UserApi';
import {
  GET_PLAYER_TEAM_BY_ID,
  START_REFRESH_MEMBRE_TEAM,
  GET_ALL_USERS_EQUIPE,
  SEARCH_PLAYERS_TEAM_CHANGED,
  ADD_PLAYER_TO_LIST_TAGS,
  FILTER_PLAYER_LIST_TAGS,
  START_LOAD_NOTIFICATION_EQUIPE,
  STOP_LOAD_NOTIFICATION_EQUIPE
} from './types';

export const getMembresTeam = (idEquipe) => {
  return (dispatch) => {
    dispatch({ type: START_REFRESH_MEMBRE_TEAM });
    getPlayerTeam(idEquipe).then((res) => {
      dispatch({ type: GET_PLAYER_TEAM_BY_ID, payload: res.joueurs });
      }, (err) => {
        console.log(err);
      }
    );
    };
};

export const deletePlayer = (idEquipe, idJoueur) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESH_MEMBRE_TEAM });
      deletePlayerTeam(idEquipe, idJoueur).then((res) => {
          getPlayerTeam(idEquipe).then((data) => {
            dispatch({ type: GET_PLAYER_TEAM_BY_ID, payload: data.joueurs });
            }, (err) => {
              console.log(err);
            }
          );
        }, (err) => {
          console.log(err);
        });
    };
};

export const nommerSousCapitaine = (idJoueur, idEquipe) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESH_MEMBRE_TEAM });
      updateSousCapitaine(idJoueur).then((res) => {
          getPlayerTeam(idEquipe).then((data) => {
            dispatch({ type: GET_PLAYER_TEAM_BY_ID, payload: data.joueurs });
            }, (err) => {
              console.log(err);
            }
          );
        }, (err) => {
          console.log(err);
        });
    };
};

export const renameCapitaine = (idJoueur, idEquipe, idCapitaine) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESH_MEMBRE_TEAM });
      updateCapitaine(idJoueur, idEquipe, idCapitaine).then((res) => {
          getPlayerTeam(idEquipe).then((data) => {
            dispatch({ type: GET_PLAYER_TEAM_BY_ID, payload: data.joueurs });
            }, (err) => {
              console.log(err);
            }
          );
        }, (err) => {
          console.log(err);
        });
    };
};

export const searchPalyersTeamChanged = (text) => {
  return {
    type: SEARCH_PLAYERS_TEAM_CHANGED,
    payload: text,
  };
};

export const addPlayerToListTags = (player) => {
  return {
    type: ADD_PLAYER_TO_LIST_TAGS,
    payload: player,
  };
};

export const filterListTags = (tags, player) => {
    const newTags = tags.filter((item) => { return (item._id === player._id) ? false : true; });
  return {
    type: FILTER_PLAYER_LIST_TAGS,
    payload: newTags,
  };
};

export const getAllUserEquipe = (text, page) => {
  return (dispatch) => {
      dispatch({ type: START_REFRESH_MEMBRE_TEAM });
      getUsers(text, page).then((res) => {
          dispatch({ type: GET_ALL_USERS_EQUIPE, payload: res });
      }, (err) => {
        console.log(err);
      });
  };
};
export const envoyerIvitationEquipe = (tags, name, idEquipe) => {
    let users = [];
    let tokens = [];
    tags.forEach((tag) => {
        users.push(tag._id);
        tokens.push(tag.token);
    });
    const notification = { users, title: name, tokens };
    return (dispatch) => {
        dispatch({ type: START_LOAD_NOTIFICATION_EQUIPE });
        sendNotificationsTeam(notification, idEquipe).then((res) => {
            dispatch({ type: STOP_LOAD_NOTIFICATION_EQUIPE });
        }, (err) => {
          console.log(err);
        });
    };
};
