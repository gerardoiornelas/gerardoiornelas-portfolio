
  import React from 'react';
  import { render } from '@testing-library/react';
  import {PageNotFound} from './PageNotFound';

  describe('<PageNotFound/> spec', () => {
   
    test('should render <PageNotFound/>', () => {
      render(<PageNotFound/>);
    });

  });

  