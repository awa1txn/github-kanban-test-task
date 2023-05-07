
import './App.css';
import BoardContainer from './components/BoardContainer';
import InputBox from './components/Input';

const App = () => {

  return (
    <div className='main'>
      <InputBox />
      <BoardContainer/>
    </div>
  );
};

export default App;