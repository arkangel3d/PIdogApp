/* eslint-disable import/no-extraneous-dependencies */
//const { expect } = require('chai');
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:3001";

const agent = session(app);





describe("GET /dogs", () => {
  
  it("should get 200", () => agent.get("/dogs/").expect(200));
  
  it("should get obj name id", () =>
    agent.get("/dogs/254").then((res) => {
      const { name, id } = res._body;
      expect({ name, id }).to.be.deep.equal({
        name: "Welsh Springer Spaniel",
        id: 254,
      });
    })
  );

  it("should tt be equal obj name id", () => agent.get("/dogs/34345345").then((res) => 
    expect(res._body).to.be.deep.equal({ msg: "id no encontrado"})
  ));

  it('should get dogs by name', () => {
    return agent.get('/dogs?name=york').then((res) => {
      const { id, name } = res._body[0];
      expect({ id, name }).to.be.deep.equal({ id: 264, name: 'Yorkshire Terrier'})
    });
  });
  it("dog no encontrado por name", ()=>{
    return agent.get('/dogs?name=firulais').then((res)=>{
      
      expect(res.text).equal('No se encuentra raza')
    })
  });

  it('post dog', () => {
    const dog = {
      name: "Pug test",
      weight: "4 - 7",
      height: "8 - 9",
      life_span: "12 - 16",
      temperament: ["stubborn","Outgoing", "Happy","Dignified","Proud"],
      image: "https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg",
    };
    return agent.post('/dog')
    .send(dog)
    .then(expect(201))
    
  });
});


