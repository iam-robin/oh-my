import List from './pages/List';
import Ratio from './pages/Ratio';
import Detail from './pages/Detail';

export default [
  {
    path: '/',
    redirect: {
      name: 'ratio',
    },
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    props: true,
  },
  {
    path: '/ratio',
    name: 'ratio',
    component: Ratio,
    props: true,
  },
  {
    path: '/detail/:domain',
    name: 'detail',
    component: Detail,
  },
];
