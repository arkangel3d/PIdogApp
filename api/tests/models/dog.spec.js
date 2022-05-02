const { Dog, Image, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync());
    describe('name', () => {
      
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
      

  it('error sin weight', function(done) {
    const dog = {
      id: "12323124",
      name: "Pug",
      height: "8 - 9",
      life_span: "12 - 16"
    };
    Dog.create(dog)
     .then(() => done('No debería haberse creado'))
     .catch(() => done());
 });
 it('error sin height', function(done) {
  const dog = {
    id: "12323124",
    name: "Pug",
    weight: "4 - 7",
    life_span: "12 - 16"
  };
  Dog.create(dog)
   .then(() => done('No debería haberse creado'))
   .catch(() => done());
});

it('error sin id', function(done) {
  const dog = {
    name: "Pug",
    weight: "4 - 7",
    height: "8 - 9",
    life_span: "12 - 16",
   
  };
  Dog.create(dog)
   .then(() => done('No debería haberse creado'))
   .catch(() => done());
});

it('error id invalido', function(done) {
  const dog = {
    id: "asds123",
    name: "Pug",
    weight: "4 - 7",
    height: "8 - 9",
    life_span: "12 - 16"
  };
  Dog.create(dog)
   .then(() => done('No debería haberse creado'))
   .catch(() => done());
});
});
  });
});

