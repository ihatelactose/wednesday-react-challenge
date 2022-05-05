import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ArtistsContainer from '@containers/ArtistsContainer/index';
import TrackDetails from './components/TrackDetails/index';

export const routeConfig = {
  artists: {
    component: ArtistsContainer,
    ...routeConstants.artists
  },
  trackDetails: {
    component: TrackDetails,
    ...routeConstants.trackDetails
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
