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
    dependent: {
      field: 'consignment-number-radio',
      value: 'yes'
    }
  }
};
