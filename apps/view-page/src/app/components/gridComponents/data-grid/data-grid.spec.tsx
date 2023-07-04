import { render } from '@testing-library/react';

import DataGrid from './data-grid';

describe('DataGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataGrid />);
    expect(baseElement).toBeTruthy();
  });
});
