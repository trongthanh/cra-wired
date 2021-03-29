import React from 'react';
import { css } from 'linaria';
import theme from '@clad-ui/theme';
import { Button } from 'clad-ui';
import { sx } from 'clad-ui/utils';

import logo from './logo.svg';

const appClass = css`
  text-align: center;
  ${sx({
    padding: 20,
  })}

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    background-color: ${theme.colors.black};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: ${theme.colors.link};
    :hover {
      color: ${theme.colors.linkHover};
    }
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const App = () => {
  console.log(theme.colors.primary);

  return (
    <div className={appClass}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button as="a" href="https://chotot.com">
          Visit Chotot
        </Button>
      </header>
    </div>
  );
};

export default App;
