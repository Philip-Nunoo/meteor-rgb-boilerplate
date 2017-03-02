import jss from 'jss';
import jssNested from 'jss-nested';
import camelCase from 'jss-camel-case';
import localRefs from 'jss-local-refs';
import defaultUnit from 'jss-default-unit';

jss.use(camelCase());
jss.use(localRefs());
jss.use(jssNested());
jss.use(defaultUnit());

const styles = {
  light: {},
  bordered: {},
  mrg: {},
  fit: {},
  mrgPanelTitle: {},
  mrgPanelBody: {},
  mrgPanel: {
    marginTop: 0,
    marginBottom: 25,
    padding: 0,
    borderRadius: 4,

    '&.light.bordered .mrg-panel-title': {
      padding: '12px 20px 15px',
      backgroundColor: '#fff',

      '&.fit': {
        '&.bordered': {
          border: '1px solid #e7ecf1!important',
        },
      },

    },
  },
  '.mrgPanel.light': {
    backgroundColor: '#fff',
    padding: '12px 20px 15px',

    '&.fit .mrg-panel-title': {
      padding: '15px 20px 10px',
    },
  },

  '.mrgPanel.fit': {
    padding: 0,
  },

  '.mrgPanel > .mrgPanelBody': {
    clear: 'both',
    '-webkit-border-radius': '0 0 4px 4px',
    '-moz-border-radius': '0 0 4px 4px',
    '-ms-border-radius': '0 0 4px 4px',
    '-o-border-radius': '0 0 4px 4px',
    borderRadius: '0 0 4px 4px',
  },
};


const { classes } = jss.createStyleSheet(styles).attach();

export default classes;
