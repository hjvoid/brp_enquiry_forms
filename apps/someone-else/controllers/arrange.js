'use strict';

var util = require('util');
//var Parent = require('hof').controllers.base;
var Parent = require('../../../lib/base-controller');

var ArrangeController = function ArrangeController() {
  Parent.apply(this, arguments);
};

util.inherits(ArrangeController, Parent);

ArrangeController.prototype.process = function process(req) {
  if (req.form.values['arrange-collection-radio'] === 'someone-else') {
    delete req.form.values['no-reason'];
    req.form.values.nominating = 'Nominate';
    this.options.next = '/reason';
  }

  if (req.form.values['arrange-collection-radio'] === 'change-person') {
    req.form.values['no-reason'] = true;
    req.form.values.nominating = 'Change';
    this.options.next = '/personal-details-no-reason';
  }

  if (req.form.values['arrange-collection-radio'] === 'cancel-request') {
    this.options.next = '/exit-cancel-request';
  }

  Parent.prototype.process.apply(this, arguments);
};

module.exports = ArrangeController;
