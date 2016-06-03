import invariant from 'invariant';
import MainApp from '../components/app/main';
import ProjetTypeView from '../components/projet/ProjetTypeView';
import LoginScreen from '../components/login/LoginScreen';
import NewProjetScreen from '../components/projet/NewProjetView';
import SignUpScreen from '../components/signup/SignUpScreen';
import AddfriendScreen from '../components/options/AddFriendScreen';
import ProjetSummaryView from '../components/projet/ProjetSummaryView'
import NewSpending from '../components/projet/NewSpending';


var routes = {
  START_SCREEN: {
    title: 'Main',
    Component: MainApp,
  },
  NEW_PROJET_TYPE: {
    title: 'new projet type',
    Component: ProjetTypeView,
  },
  NEW_SPENDING: {
    title: 'new spending',
    Component: NewSpending,
  },
  PROJET_SUMMARY: {
    title: 'projet summary',
    Component: ProjetSummaryView,
  },
  LOGIN_SCREEN: {
    title: 'Login',
    Component: LoginScreen,
  },
  NEW_PROJET: {
    title: 'New Projet',
    Component: NewProjetScreen,
  },
  SIGNUP_SCREEN: {
    title: 'Sign up',
    Component: SignUpScreen,
  },
  ADDFRIEND_SCREEN: {
    title: 'Add friend',
    Component: AddfriendScreen,
  },
};

export default function getRoute(routeName, attrs) {
  invariant(routes[routeName], 'route non trouvé' + routeName);
  var route = routes[routeName];
  var sendAttrs = Object.assign(routes[routeName].attrs || {}, attrs || {});
  var returnObj = Object.assign(route, {sendAttrs});
  return returnObj;
}
