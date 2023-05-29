import React from 'react';
import Right from './Right';
import Left from './Left';

export const SignUp = () => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#A78BFA',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        marginTop: '70px',
      }}
    >
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'hidden',
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
            <Right login="SIGN UP" />
            <Left login="SIGN UP" />
          </div>
        </div>
      </div>
    </div>
  );
};
