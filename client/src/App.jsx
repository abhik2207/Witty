import './App.css';
import Jokes from './components/Jokes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div id="main">
        <Jokes />
      </div>
      <ToastContainer />
    </>
  )
}

export default App;
