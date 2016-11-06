import './check-npm.js';

import React, { PropTypes } from 'react';
import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

SimpleSchema.extendOptions({
  autoform: Match.Optional(Object)
});

function get(obj, path) {
  if (typeof path === 'string') {
    return get(obj, path.split('.'));
  }

  const [key, ...rest] = path;

  if (path.length > 0) {
    if (obj != null) {
      return get(obj[key], rest);
    }

    return undefined;
  }

  return obj;
}

function set(obj = {}, path, modifierOrValue) {
  if (typeof path === 'string') {
    return set(obj, path.split('.'), modifierOrValue);
  }

  const [key, ...rest] = path;

  if (path.length > 0) {
    return {
      ...obj,
      [key]: set(obj[key], rest, modifierOrValue),
    };
  }

  return typeof modifierOrValue === 'function'
    ? modifierOrValue(obj)
    : modifierOrValue;
}

class Form {
  constructor(schema, doc, onChange) {
    this._schema = schema;
    this._doc = doc;
    this._onChangeListeners = [];
    this._validationContext = null;
    this._fieldsToValidate = {};

    this.onChange(onChange);
  }

  getSchemaField(name) {
    this._fieldsToValidate[name] = true;
    return this._schema._schema[name];
  }

  getFieldValue(name) {
    return get(this._doc, name);
  }

  setFieldValue(name, value, triggerUpdate) {
    this._doc = set(this._doc, name, value);
    this._onChangeListeners.forEach(cb => cb(this._doc, triggerUpdate));
  }

  getFieldErrorMessage(name) {
    if (this._validationContext && this._validationContext.keyIsInvalid(name)) {
      return this._validationContext.keyErrorMessage(name);
    }
  }

  validate(doc = {}, isInsert) {
    this._validationContext = this._schema.newContext();
    Object.keys(this._fieldsToValidate).forEach(key =>
      this._fieldsToValidate[key] && this._validationContext.validateOne(doc, key));
    return this._validationContext.isValid();
  }

  onChange(cb) {
    if (typeof cb === 'function') {
      this._onChangeListeners.push(cb);
    }
  }
}

class Field {
  constructor(form, name) {
    this._form = form;
    this._name = name;
  }

  getSchema() {
    return this._form.getSchemaField(this._name);
  }

  getAtts() {
    return this.getSchema().autoform;
  }

  getValue() {
    return this._form.getFieldValue(this._name);
  }

  setValue(value, triggerUpdate) {
    this._form.setFieldValue(this._name, value, triggerUpdate);
  }

  getErrorMessage() {
    return this._form.getFieldErrorMessage(this._name);
  }

  getLabel() {
    const schema = this.getSchema();
    if (schema.label) {
      return schema.label;
    }

    const arr = this._name.split('.');
    const [first, ...tail] = arr[arr.length - 1];

    return first.toUpperCase() + tail.join('');
  }

  getType() {
    // TODO: implement the same behaviour as original implementation here:
    //       https://github.com/aldeed/meteor-autoform/blob/0097d5fe0e1c7456b2fd5ed49358576b35a34fb8/autoform-api.js#L778

    const { type, autoform } = this.getSchema();

    if (autoform && autoform.type) {
      return autoform.type;
    }

    if (type.name === 'Number') {
      return 'number';
    }

    if (autoform && autoform.afFieldInput && autoform.afFieldInput.options) {
      return 'select';
    }

    if (autoform && autoform.afFieldInput && autoform.afFieldInput.rows) {
      return 'textarea';
    }

    return 'text';
  }

  getOptions() {
    const { autoform } = this.getSchema();
    return autoform.afFieldInput ? autoform.afFieldInput.options : autoform.options;
  }
}

const contextTypes = {
  getAutoFormField: PropTypes.func.isRequired,
};

export class AutoForm extends React.Component {
  constructor(props) {
    super(props);

    const { schema, doc } = this.props;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      doc,
      validationContext: null
    };
    this._form = new Form(schema, doc, this.onChange);
  }

  getChildContext() {
    return {
      getAutoFormField: (name) => new Field(this._form, name),
    };
  }

  onChange(doc, triggerUpdate = true) {
    this.state.doc = doc;
    if (triggerUpdate) {
      this.setState({ doc });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.submit();
  }

  submit() {
    const { onSubmit, doc } = this.props;
    const isValid = this._form.validate(this.state.doc, !doc);

    this.forceUpdate();

    if (isValid) {
      onSubmit && onSubmit(this.state.doc);
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

AutoForm.propTypes = {
  schema: PropTypes.instanceOf(SimpleSchema).isRequired,
  doc: PropTypes.object,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

AutoForm.childContextTypes = contextTypes;

export class FormGroup extends React.Component {
  render() {
    const field = this.context.getAutoFormField(this.props.name);
    const errorMessage = this.props.errorMessage || field.getErrorMessage();

    return (
      <div className={['form-group', errorMessage ? 'has-error' : ''].join(' ')}>
        <label className="control-label">{field.getLabel()}</label>
        {this.props.children}
        {errorMessage &&
          <span className="help-block">{errorMessage}</span>
        }
      </div>
    )
  }
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
};

FormGroup.contextTypes = contextTypes;

export class FieldInput extends React.Component {
  render() {
    const { name, ...inputProps } = this.props;
    const field = this.context.getAutoFormField(name);

    const props = { ...inputProps, field };

    switch (field.getType()) {
      case 'text':
        return (<TextInput {...props} />);
      case 'password':
        return (<PasswordInput {...props} />);
      case 'number':
        return (<NumberInput {...props} />);
      case 'textarea':
        return (<TextAreaInput {...props} />);
      case 'select':
        return (<SelectInput {...props} />);
    }
  }
}

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
};

FieldInput.contextTypes = contextTypes;

export class QuickField extends React.Component {
  render() {
    const { errorMessage, ...props } = this.props;

    return (
      <FormGroup name={this.props.name} errorMessage={errorMessage}>
        <FieldInput {...props} />
      </FormGroup>
    );
  }
}

QuickField.propTypes = {
  name: PropTypes.string.isRequired,
};

class TextInput extends React.Component {
  render() {
    const { field, className, style } = this.props;

    return (
      <input
        type="text"
        className="form-control ${className}"
        style={style}
        defaultValue={field.getValue()}
        onChange={e => field.setValue(e.target.value.length ? e.target.value : null)}
      />
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.instanceOf(Field).isRequired,
};

class NumberInput extends React.Component {
  render() {
    const { field, className, style } = this.props;

    return (
      <input
        type="number"
        className="form-control ${className}"
        style={style}
        defaultValue={field.getValue()}
        onChange={e =>
          field.setValue(e.target.value.length ? Number(e.target.value) : null)
        }
      />
    );
  }
}

NumberInput.propTypes = {
  field: PropTypes.instanceOf(Field).isRequired,
};

class PasswordInput extends React.Component {
  render() {
    const { field, className, style } = this.props;

    return (
      <input
        type="password"
        className="form-control ${className}"
        style={style}
        defaultValue={field.getValue()}
        onChange={e => field.setValue(e.target.value.length ? e.target.value : null)}
      />
    );
  }
}

PasswordInput.propTypes = {
  field: PropTypes.instanceOf(Field).isRequired,
};

class TextAreaInput extends React.Component {
  render() {
    const { field } = this.props;

    return (
      <textarea
        className="form-control"
        defaultValue={field.getValue()}
        rows={field.getAtts().afFieldInput.rows}
        onChange={e => field.setValue(e.target.value.length ? e.target.value : null)}
      />
    );
  }
}

class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueHasBeenSetByUser: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.selectFirstOption();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.valueHasBeenSetByUser) {
      this.selectFirstOption(nextProps);
    }
  }

  getOptions(props) {
    const { field, options } = props || this.props;
    return options || field.getOptions() || [];
  }

  selectFirstOption(props) {
    const options = this.getOptions(props);
    if (options && options.length) {
      const { field } = this.props;
      field.setValue(options[0].value, false);
    }
  }

  onChange(e) {
    const { field } = this.props;
    field.setValue(e.target.value);
    this.setState({ valueHasBeenSetByUser: true });
  }

  render() {
    const { field } = this.props;

    return (
      <select
        className="form-control"
        defaultValue={field.getValue()}
        ref={select => this._select = select}
        onChange={this.onChange}
      >
        {this.getOptions().map(item =>
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        )}
      </select>
    );
  }
}

SelectInput.propTypes = {
  field: PropTypes.instanceOf(Field).isRequired,
};
