'use strict';

module.exports = {
  name: 'not-arrived',
  baseUrl: '/not-arrived',
  params: '/:action?',
  steps: {
    '/post-office-collect': {
      next: '/consignment-number',
      behaviours: [require('./behaviours/change-path')],
      template: 'collection.html',
      fields: [
        'collection'
      ]
    },
    '/consignment-number': {
      next: '/letter-received',
      template: 'consignment-number.html',
      fields: [
        'consignment-number-radio', 
        'consingment-number'
      ],
      condition: req => {
        console.log(req);
      },
      backLink: 'post-office-collect',
    },
    '/letter-received': {
      behaviours: [require('./behaviours/letter-received')],
      fields: [
        'received',
        'delivery-date',
        'no-letter'
      ],
      backLink: 'consignment-number',
      next: '/same-address',
      forks: [{
        target: '/letter-not-received',
        condition: {
          field: 'received',
          value: 'no'
        }
      }, {
        target: '/letter-lost',
        condition: {
          field: 'delivery-date',
          value: 'null'
        }
      }]
    },
    '/letter-lost': {},
    '/letter-not-received': {},
    '/on-the-way': {
      prereqs: ['/letter-received']
    },
    '/same-address': {
      template: 'same-address-details.html',
      fields: [
        'address-match',
        'delivery-details',
        'address-house-number',
        'address-street',
        'address-town',
        'address-county',
        'address-postcode',
        'case-id'
      ],
      backLink: 'letter-received',
      next: '/personal-details'
    },
    '/personal-details': {
      fields: [
        'fullname',
        'date-of-birth',
        'nationality',
        'passport'
      ],
      backLink: 'same-address',
      next: '/contact-details'
    },
    '/contact-details': {
      fields: [
        'email',
        'use-address',
        'contact-address-house-number',
        'contact-address-street',
        'contact-address-town',
        'contact-address-county',
        'contact-address-postcode',
        'phone'
      ],
      backLink: 'personal-details',
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete', require('../common/behaviours/email')],
      fields: [
        'org-help',
        'rep-name',
        'rep-email',
        'org-type'
      ],
      backLink: 'contact-details',
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false,
      clearSession: true
    }
  }
};
