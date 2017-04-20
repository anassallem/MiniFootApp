import { getPlayerTeam, deletePlayerTeam, updateSousCapitaine, updateCapitaine } from './api/EquipeApi';
import {
  GET_PLAYER_TEAM_BY_ID,
  START_REFRESH_MEMBRE_TEAM
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
