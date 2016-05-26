import invariant from 'invariant';
import MainApp from '../components/app/main';
import ProjetTypeView from '../components/projet/ProjetTypeView';

var routes = {
  START_SCREEN: {
    title: 'Main',
    Component: MainApp,
  },
  PROJET_ITEM: {
    title: 'ProjectItem',
    Component: ProjetTypeView,
  },
};

export default function getRoute(routeName, attrs) {
  invariant(routes[routeName], 'route non trouvé' + routeName);
  var route = routes[routeName];
  var sendAttrs = Object.assign(routes[routeName].attrs || {}, attrs || {});
  var returnObj = Object.assign(route, {sendAttrs});
  console.log(returnObj);
  return returnObj;
}
