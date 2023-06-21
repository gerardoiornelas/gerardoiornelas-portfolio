
  import React from 'react';
  import { render } from '@testing-library/react';
  import Blog from './Blog';

  describe('<Blog/> spec', () => {
   
    test('should render <Blog/>', () => {
      render(<Blog/>);
    });

  });

  