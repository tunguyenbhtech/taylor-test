import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { Colors } from 'src/assets';
import React from 'react';
import { ReduxProvider } from 'src/state';
import Router from './Router';

const GlobalStyle = createGlobalStyle`
  body {
    #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: ${Colors.solitude};
    }
  }
`;

export type Props = {};

const Application = (props: Props) => {
    return (
        <ThemeProvider theme={{}}>
            <GlobalStyle />
            <ReduxProvider>
                <Router />
            </ReduxProvider>
        </ThemeProvider>
    );
};

export default Application;
