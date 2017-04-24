import { MODAL_VISIBLE, IMAGES_MULTIPLE } from '../actions/types';

const INITIAL_STATE = {
  modalVisible: false,
  modalImage: require('../components/assets/imgEquipe.jpg'),
  images: [
     require('../components/assets/drawer.jpg'),
     require('../components/assets/userdefault.png'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
     require('../components/assets/logoEquipe.jpg'),
  ],
  photos: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_VISIBLE:
      return { ...state, modalVisible: action.payload, modalImage: state.images[action.image] };
    case IMAGES_MULTIPLE:
      return { ...state, photos: action.payload };
    default:
      return state;
  }
};
