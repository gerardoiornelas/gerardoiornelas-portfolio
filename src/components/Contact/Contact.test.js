
  import React from 'react';
  import { render } from '@testing-library/react';
  import Contact from './Contact';

  describe('<Contact/> spec', () => {
   
    test('should render <Contact/>', () => {
      render(<Contact/>);
    });

  });

  