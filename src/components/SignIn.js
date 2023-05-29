import React from 'react';

import Left from './Left';
import Right from './Right';

export const SignIn = () => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#A78BFA',
        width: '100%',
        height: '100vh',
        marginTop: '70px',
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '92vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              display: 'flex',
              marginTop: '-3rem',
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              width: '80vw',
              height: '80vh',
            }}
          >
            <Left login="Login" />
            <Right login="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};
