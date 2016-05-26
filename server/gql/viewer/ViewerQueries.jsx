import ViewerType, {resolveSingle} from './ViewerType';

export default {
  viewer: {
    type: ViewerType,
    description: 'Root Entry Point',
    resolve: resolveSingle
  }
};
