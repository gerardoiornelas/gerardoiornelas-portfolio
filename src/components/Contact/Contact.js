
    import React from 'react';
    import PropTypes from 'prop-types';

    import { StyledContact } from './Contact.styled';


    const Contact = ({children}) => {
        return (
            <StyledContact>
                {children}
            </StyledContact>
        )
    }

    Contact.propTypes = {
      children: PropTypes.node
    }

    export default Contact
  