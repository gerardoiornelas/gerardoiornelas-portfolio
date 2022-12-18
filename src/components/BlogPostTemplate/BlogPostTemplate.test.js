
  import React from 'react';
  import { render } from '@testing-library/react';
  import BlogPostTemplate from './BlogPostTemplate';

  describe('<BlogPostTemplate/> spec', () => {
   
    test('should render <BlogPostTemplate/>', () => {
      render(<BlogPostTemplate/>);
    });

  });

  