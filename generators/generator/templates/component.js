module.exports = (componentName) => ({
  content: `
  import React from 'react';
  import { Box, Typography } from '@mui/material';

  import { Styled${componentName} } from './${componentName}.styles';
  
  export const ${componentName} : React.FC = () => {
      return (
          <Styled${componentName}>
            <Box>
                <Typography>${componentName}</Typography>
            </Box>
          </Styled${componentName}>
      )
  }
  `,
  extension: `.tsx`,
});
