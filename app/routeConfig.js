import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ArtistsContainer from './containers/ArtistsContainer/index';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  artists: {
    component: ArtistsContainer,
    ...routeConstants.artists
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
