
    import React from 'react';
    import PropTypes from 'prop-types';

    import { StyledProjects } from './Projects.styled';


    const Projects = ({children}) => {
        return (
            <StyledProjects>
                {children}
            </StyledProjects>
        )
    }

    Projects.propTypes = {
      children: PropTypes.node
    }

    export default Projects
  