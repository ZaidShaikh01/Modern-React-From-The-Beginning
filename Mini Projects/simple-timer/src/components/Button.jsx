const Button = ({ type, isRunning = false, onClick }) => {
  return type === 'Start' ? (
    <button
      onClick={onClick}
      className='mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-3'
    >
      {isRunning ? 'Pause' : 'Start'}
    </button>
  ) : (
    <button
      onClick={onClick}
      className='mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-3'
    >
      Reset
    </button>
  );
};

export default Button;
