import { Routes, Route } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { SecondMain } from '../../pages/SecondMainPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Main />} />
      <Route
        path='/second'
        element={<SecondMain />} />
    </Routes >
  );
};

export default AppRouter;
