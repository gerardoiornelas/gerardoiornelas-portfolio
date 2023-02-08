
import React from 'react';

import { StyledAiNftMinter } from './AiNftMinter.styled';

interface Props {
  children: React.ReactNode
}

const AiNftMinter = ({children} : Props) => {
    return (
        <StyledAiNftMinter>
            {children}
        </StyledAiNftMinter>
    )
}

export default AiNftMinter
  