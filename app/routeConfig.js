import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ArtistsContainer from '@containers/ArtistsContainer/index';
import TrackDetailsContainer from '@containers/TrackDetailsContainer/index';

export const routeConfig = {
  artists: {
    component: ArtistsContainer,
    ...routeConstants.artists
  },
  trackDetails: {
    component: TrackDetailsContainer,
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
