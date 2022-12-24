import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loader from './components/Loader/Loader';
import Pages from './Pages';
import Meta from './components/Meta';

function App() {
  return (
    <>
      <Meta title="Home" /> <Pages />
    </>
  );
}

export default App;
