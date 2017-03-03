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
    name: 'Font Icons (feature > UI)',
    route: '/admin/icons',
    onlyActiveOnIndex: false,
  },
  {
    icon: 'icon-settings',
    name: 'Forms (feature > Form)',
    route: '/admin/forms',
    onlyActiveOnIndex: false,
  },
  {
    icon: 'icon-wallet',
    name: 'MrgbPanels (feature > panels)',
    route: '/admin/panels',
    onlyActiveOnIndex: false,
  },
  {
    icon: 'icon-briefcase',
    name: 'Tables (feature > tables)',
    route: '/admin/tables',
    onlyActiveOnIndex: false,
  },
];
