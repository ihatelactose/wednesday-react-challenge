/**
 *
 * Asynchronously loads the components for ArtistsContainer
 *
 */

import loadable from '@app/utils/loadable';

export default loadable(() => import('./index'));
