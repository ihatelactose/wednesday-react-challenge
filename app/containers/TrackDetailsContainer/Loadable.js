/**
 *
 * Asynchronously loads the components for TrackDetailsContainer
 *
 */

import loadable from '@app/utils/loadable';

export default loadable(() => import('./index'));
