import { Animated } from 'react-native';
import {
  LOAD_FORMATION,
  CHANGE_VISIBILITY_ZONE_DROP,
  SET_DROP_ZONE_VALUES,
  FILTER_BUBBLES,
  START_LOADING_FORMATION,
  STOP_LOADING_FORMATION,
  SET_IMAGE_ZONE_VALUES,
  CHANGE_TOP_FORMATION,
  CHANGE_CENTER_FORMATION,
  CHANGE_BOTTOM_FORMATION
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
          let top = 0;
          let center = 0;
          let bottom = 0;
          res.formation.forEach((p) => {
              top += p.position.top;
              center += p.position.center;
              bottom += p.position.bottom;
          });
          dispatch({ type: LOAD_FORMATION, payload: res.formation, top, center, bottom });
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
          formation.push({ idJoueur: player.idJoueur._id, pan: { x: player.pan.x, y: player.pan.y }, position: player.position });
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

export const setImageZone = (event) => {
  return {
    type: SET_IMAGE_ZONE_VALUES,
    payload: event.nativeEvent.layout,
  };
};

export const changeFormation = (idBubble, position) => {
    return (dispatch) => {
      switch (position) {
          case 'TOP':
              dispatch({ type: CHANGE_TOP_FORMATION, payload: idBubble });
              break;
          case 'CENTER':
              dispatch({ type: CHANGE_CENTER_FORMATION, payload: idBubble });
              break;
          case 'BOTTOM':
              dispatch({ type: CHANGE_BOTTOM_FORMATION, payload: idBubble });
              break;
          default:
              break;
      }
  };
};

export const filterBubblesVisibility = (id) => {
  return {
    type: FILTER_BUBBLES,
    payload: id
  };
};
