/* @flow */

export default [
  {
    icon: 'icon-home',
    name: 'Dashboard',
    route: '/admin',
    onlyActiveOnIndex: true,
  },
  {
    icon: 'icon-people',
    name: 'Users',
    route: '/admin/users',
    onlyActiveOnIndex: false,
  },
  {
    heading: true,
    name: 'Features',
  },
  {
    icon: 'icon-folder',
    name: 'Font Icons',
    route: '/admin/icons',
    onlyActiveOnIndex: false,
  },
  {
    heading: true,
    name: '------------',
  },
];
