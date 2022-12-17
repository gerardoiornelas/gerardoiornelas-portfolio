
    import React from 'react';
    import PropTypes from 'prop-types';

    import { StyledThoughts } from './Thoughts.styled';


    const Thoughts = ({children}) => {
        return (
            <StyledThoughts>
                {children}
            </StyledThoughts>
        )
    }

    Thoughts.propTypes = {
      children: PropTypes.node
    }

    export default Thoughts
  