exports.seed = function(knex, Promise) {
    return knex('customers').del()
      .then(function () {
        return knex('customers').insert([
        {
          name: 'George Mammo',
          address1: '100 Queen St West',
          address2: 'Unit 1',
          city: 'Toronto',
          province: 'Ontario',
          zip: 'M5H 2N2',
          country: 'Canada',
          phone: '(416) 392-2489',
          email: '311@toronto.ca'
        }
        ]);
      });
  };