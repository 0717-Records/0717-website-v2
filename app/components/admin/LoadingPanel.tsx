import { PuffLoader } from 'react-spinners';

const LoadingPanel = () => {
  return (
    <div className='absolute z-1000 h-screen w-screen top-0 left-0 bg-slate-500 bg-opacity-20 rounded-md flex justify-center items-center'>
      <PuffLoader size={100} color='blue' />
    </div>
  );
};

export default LoadingPanel;
