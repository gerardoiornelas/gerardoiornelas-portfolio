
    import React from 'react';
    import PropTypes from 'prop-types';

    import { StyledBlog } from './Blog.styled';


    const Blog = ({children}) => {
        return (
            <StyledBlog>
                {children}
            </StyledBlog>
        )
    }

    Blog.propTypes = {
      children: PropTypes.node
    }

    export default Blog
  