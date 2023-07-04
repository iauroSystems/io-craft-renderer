import { render } from '@testing-library/react';

import IconComponent from './icon-component';

describe('IconComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconComponent />);
    expect(baseElement).toBeTruthy();
  });
});
