export default {
  artists: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  trackDetails: {
    route: '/track/:trackId',
    exact: true
  },
  repos: {
    route: '/repos',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
