import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import UserProfileReducer from './UserProfileReducer';
import SearchPlayerReducer from './SearchPlayerReducer';
import PlayerNoteFormReducer from './PlayerNoteFormReducer';
import UpdateProfileUserReducer from './UpdateProfileUserReducer';


export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  userProfile: UserProfileReducer,
  searchPlayer: SearchPlayerReducer,
  notePlayer: PlayerNoteFormReducer,
  updateUser: UpdateProfileUserReducer
});
