import React from 'react';
import {DotLottiePlayer} from "@dotlottie/react-player"

const LoadingAnim = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50'>
        <div style={{ width: '300px', height: '300px' }}>
          <DotLottiePlayer src='../../public/loading.lottie' autoplay loop />
        </div>
      </div>
  );
};

export default LoadingAnim;