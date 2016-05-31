import invariant from 'invariant';
import MainApp from '../components/app/main';
import ProjetTypeView from '../components/projet/ProjetTypeView';
import LoginScreen from '../components/login/LoginScreen';
import NewProjetScreen from '../components/projet/NewProjetView';
import SignUpScreen from '../components/signup/SignUpScreen';


var routes = {
  START_SCREEN: {
    title: 'Main',
    Component: MainApp,
  },
  PROJET_ITEM: {
    title: 'Projet details',
    Component: ProjetTypeView,
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
};

export default function getRoute(routeName, attrs) {
  invariant(routes[routeName], 'route non trouvé' + routeName);
  var route = routes[routeName];
  var sendAttrs = Object.assign(routes[routeName].attrs || {}, attrs || {});
  var returnObj = Object.assign(route, {sendAttrs});
  return returnObj;
}
