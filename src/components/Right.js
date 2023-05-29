import React from 'react';
import kio from '../asset/kio.jpg';

export const Right = ({ login }) => {
  return (
    <section style={{ width: '100%', height: '100%' }}>
      <img
        src={kio}
        style={{
          borderRadius:
            login === 'SIGN UP' ? '1rem 0rem 0rem 1rem' : '0rem 1rem 1rem 0rem',
          height: '100%',
          width: '100%',
        }}
        alt=""
      />
    </section>
  );
};

export default Right;
