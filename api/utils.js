let idGenerator=(name,life_span) =>{
    let num1 = Number(life_span.slice(0,1));
    let num2 = name.length;
    let num3 = Math.floor(Math.random()*10)
    let num4 = Math.floor(Math.random()*100)
    console.log(num1, num2)
     return 300+num2+num1*num3*num4
    }


module.exports = {
    idGenerator,
}