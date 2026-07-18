import Rating from '../components/Rating';

const App = () => {
  const name = 'Brad';
  return (
    <div>
      {/* <h1>Hello {name}</h1> */}
      <Rating
        heading='How do you feel about React?'
        color='red'
        feedbackMessages={['Terrible', 'poor', 'meh', 'good', 'excellent']}
      />
    </div>
  );
};

export default App;
// Convention is to use upper case
