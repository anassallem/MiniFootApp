import { getPlayerTeam } from './api/EquipeApi';
import {
  GET_PLAYER_TEAM_BY_ID_FORMATION,
  START_REFRESH_MEMBRE_TEAM_FORMATION,
  FILTER_PLAYER_LIST_TAG_FORMATION,
  ADD_PLAYER_TO_LIST_TAGS_FORMATION,
  INITIAL_STATE_FORMATION
} from './types';

export const getMembresTeamFormation = (idEquipe) => {
  return (dispatch) => {
    dispatch({ type: START_REFRESH_MEMBRE_TEAM_FORMATION });
    getPlayerTeam(idEquipe).then((res) => {
      dispatch({ type: GET_PLAYER_TEAM_BY_ID_FORMATION, payload: res.joueurs });
      }, (err) => {
        console.log(err);
      });
    };
};


export const filterListTagsFormation = (tags, player) => {
    const newTags = tags.filter((item) => { return (item._id === player._id) ? false : true; });
  return {
    type: FILTER_PLAYER_LIST_TAG_FORMATION,
    payload: newTags,
  };
};

export const addPlayerToListTagsFormation = (player) => {
  return {
    type: ADD_PLAYER_TO_LIST_TAGS_FORMATION,
    payload: player,
  };
};

export const initialStateAddPlayerFormation = () => {
  return {
    type: INITIAL_STATE_FORMATION,
  };
};
