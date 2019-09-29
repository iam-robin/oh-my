import Home from './pages/Home';
import EditLimit from './pages/EditLimit';

export default [
  {
    path: '/',
    redirect: {
      name: 'home',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/editLimit',
    name: 'editLimit',
    component: EditLimit,
    props: true,
  },
];
