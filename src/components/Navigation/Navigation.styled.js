import { rem } from "polished";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledNavigation = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: `${rem(16)}`,
  },
}));

export { StyledNavigation };
