import AppRouter from '../components/AppRouter/AppRouter';
import { classNames } from '../shared/lib/classNames/classNames';
import './styles/index.css';

function App() {
  return (
    <div className={classNames('app', {}, [])}>
      <div className={classNames('wrapper', {}, [])}>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
