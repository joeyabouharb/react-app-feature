import React from 'react';
import { useAuthContext } from '../contexts/auth/useAuthContext';


const Bucket = (props) => {
  const state = useAuthContext();
  return (
    <div>
      Bucket!!
    </div>
  );
};

export default Bucket;
