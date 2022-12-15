
  import React from 'react';
  import { render } from '@testing-library/react';
  import Segment from './Segment';

  describe('<Segment/> spec', () => {
    test('should match <Segment/> snapshot', () => {
      const container = render(Segment);
      expect(container.firstChild).toMatchSnapshot();
    });
    test('should render <Segment/>', () => {
      render(<Segment/>);
    });

  });

  