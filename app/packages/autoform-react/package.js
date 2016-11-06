Package.describe({
  name: 'mfactory:autoform-react',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.2');
  api.use([
    'ecmascript',
    'check',
    'random',
    'tmeasday:check-npm-versions@0.3.1',
    'aldeed:simple-schema@1.5.3',
  ]);
  api.mainModule('autoform-react.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mfactory:autoform-react');
  api.mainModule('autoform-react-tests.js');
});
