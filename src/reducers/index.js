import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import UserProfileReducer from './UserProfileReducer';
import SearchPlayerReducer from './SearchPlayerReducer';
import PlayerNoteFormReducer from './PlayerNoteFormReducer';
import UpdateProfileUserReducer from './UpdateProfileUserReducer';
import ListFriendsReducer from './ListFriendsReducer';
import MyInvitationsReducer from './MyInvitationsReducer';
import DiscussionReducer from './DiscussionReducer';
import HomeReducer from './HomeReducer';
import EquipeReducer from './EquipeReducer';
import SearchTeamReducer from './SearchTeamReducer';
import ProfileEquipeReducer from './ProfileEquipeReducer';
import UpdateProfileTeamReducer from './UpdateProfileTeamReducer';
import MembreEquipeReducer from './MembreEquipeReducer';
import ShowTeamPhotosReducer from './ShowTeamPhotosReducer';
import NotificationReducer from './NotificationReducer';
import FormationReducer from './FormationReducer';
import AddPlayerFormationReducer from './AddPlayerFormationReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  userProfile: UserProfileReducer,
  searchPlayer: SearchPlayerReducer,
  notePlayer: PlayerNoteFormReducer,
  updateUser: UpdateProfileUserReducer,
  friends: ListFriendsReducer,
  myInvitations: MyInvitationsReducer,
  discussionPlayer: DiscussionReducer,
  homeDiscussion: HomeReducer,
  equipe: EquipeReducer,
  searchTeam: SearchTeamReducer,
  profileEquipe: ProfileEquipeReducer,
  updateTeamProfile: UpdateProfileTeamReducer,
  membreTeam: MembreEquipeReducer,
  teamPhotos: ShowTeamPhotosReducer,
  notification: NotificationReducer,
  formation: FormationReducer,
  playersFormation: AddPlayerFormationReducer
});
