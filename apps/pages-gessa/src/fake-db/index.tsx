import mock from './mock';
import './db/report-data-db';
import './db/color-font-db';

// Set this to true to enable mock APIs
const enableMock = true;

if (enableMock) {
  mock.onAny().passThrough();
} else {
  mock.restore();
}
