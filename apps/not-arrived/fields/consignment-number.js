'use strict';

module.exports = {
  'consignment-number-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['inline', 'form-group'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      {
        value: 'yes',
        toggle: 'consignment-number-fieldset'
      },
      {value: 'no'}
    ]
  },
  'consignment-number': {
    validate: ['required'],
    dependent: {
      field: 'consignment-number-radio',
      value: 'yes'
    }
  }
};
