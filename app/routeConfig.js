import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ArtistsContainer from './containers/ArtistsContainer/index';

export const routeConfig = {
  artists: {
    component: ArtistsContainer,
    ...routeConstants.artists
  },
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
