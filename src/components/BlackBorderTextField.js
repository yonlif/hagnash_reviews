import { TextField } from '@mui/material';
import styled from "styled-components";



export const BlackBorderTextField = styled(TextField)`
    border: 1px solid black;
    &:focus {
      outline: none;
      border-color: black;
    }
    border-color: black;
    & label.Mui-focused {
      color: black;
    }
    & label.Mui-not-focused {
      color: black;
    }
    & .MuiInput-underline:after {
      border-bottom-color: black,
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        borde-color: black;
      },
      &:hover fieldset {
        border-color: black;
      },
      &.Mui-focused fieldset {
        border-color: black;
      }
    }
`;