'use strict';

var util = require('util');
var _ = require('lodash');
var Parent = require('hof').wizard.Controller;
var moment = require('moment');

var DateBaseController = function DateBaseController() {
  Parent.apply(this, arguments);
};

util.inherits(DateBaseController, Parent);

var dateFormat = 'YYYY-MM-DD';
var prettyDate = 'D MMMM YYYY';

DateBaseController.prototype.process = function process(req) {
  _.each(this.options.fields, function processEach(v, k) {
    if (
      (undefined !== req.body[k + '-year']) &&
      (undefined !== req.body[k + '-month']) &&
      (undefined !== req.body[k + '-day'])
    ) {
      var childValidators = _.intersection(v.validate, ['required']);

      var processField = function processField(key, validators) {
        this.options.fields[key] = {
          validate: _.concat(childValidators, validators),
          dependent: v.dependent
        };

        return req.form.values[key] = this.formatter(key, req.body[key]);
      }.bind(this)

      var processDateField = function processDateField(key, type) {
        return processField(key + '-' + type, ['date-' + type]);
      }

      var pad = function pad(n) {
        return (n.length < 2) ? '0' + n : n;
      };

      var year = processDateField(k, 'year');
      var month = processDateField(k, 'month');
      var day = processDateField(k, 'day');

      var date = (
        ('' !== year) &&
        ('' !== month) &&
        ('' !== day)
      ) ?
        year + '-' + pad(month) + '-' + pad(day) :
        '';

      req.form.values[k] = date;
      req.form.values[k + '-formatted'] = date === '' ?
        '' :
        moment(date, dateFormat).format(prettyDate);
    }
  }.bind(this));

  Parent.prototype.process.apply(this, arguments);
};

DateBaseController.prototype.render = function render(req) {
  console.log(req.form.errors);
  Parent.prototype.render.apply(this, arguments);
};

module.exports = DateBaseController;
