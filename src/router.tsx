import { createHashRouter } from 'react-router-dom';
import { App } from './page/Editor';
import { Preview } from './page/Preview';
import Test from './page/Test';

export const router: any = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);
