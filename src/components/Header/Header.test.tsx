
  import React from 'react';
  import { render } from '@testing-library/react';
  import Header from './Header';

  describe('<Header/> spec', () => {
   
    test('should render <Header/>', () => {
      render(<Header/>);
    });

  });

  