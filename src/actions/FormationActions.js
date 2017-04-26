import { Animated } from 'react-native';
import {
  LOAD_FORMATION,
  CHANGE_VISIBILITY_ZONE_DROP,
  SET_DROP_ZONE_VALUES,
  FILTER_BUBBLES,
  START_LOADING_FORMATION,
  STOP_LOADING_FORMATION
} from './types';
import { getFormationTeamById, saveFormationMyTeam } from './api/EquipeApi';

export const equipeFetchFormation = (idEquipe, tags) => {
  return (dispatch) => {
      getFormationTeamById(idEquipe).then((res) => {
          if ((tags !== undefined)) {
              if (tags.length > 0) {
                  res.formation = [...tags, ...res.formation ];
                  res.formation = res.formation.filter((tag, index, self) => self.findIndex((item) => { return item.idJoueur._id === tag.idJoueur._id; }) === index);
              }
          }
          if (res.formation.length > 0) {
              res.formation.forEach((item) => {
                  item.pan = new Animated.ValueXY({ x: item.pan.x, y: item.pan.y });
                  item.showDraggable = true;
              });
          }
          dispatch({ type: LOAD_FORMATION, payload: res.formation });
        }, (err) => {
          console.log(err);
        }
      );
  };
};
export const saveFormationTeam = (idEquipe, players) => {
  return (dispatch) => {
      dispatch({ type: START_LOADING_FORMATION });
      let formation = [];
      players.forEach((player) => {
          formation.push({ idJoueur: player.idJoueur._id, pan: { x: player.pan.x, y: player.pan.y } });
      });
      saveFormationMyTeam(idEquipe, { formation }).then((res) => {
          dispatch({ type: STOP_LOADING_FORMATION });
        }, (err) => {
          console.log(err);
        }
      );
  };
};
export const changeVisibilityDropZone = (value) => {
  return {
    type: CHANGE_VISIBILITY_ZONE_DROP,
    payload: value
  };
};

export const setDropZone = (event) => {
  return {
    type: SET_DROP_ZONE_VALUES,
    payload: event.nativeEvent.layout
  };
};
export const filterBubblesVisibility = (id) => {
  return {
    type: FILTER_BUBBLES,
    payload: id
  };
};
