
function onFilter(dogId,dogs) {

    let dog = dogs.filter(dog => dog.id === parseInt(dogId));
    if(dog.length > 0) {
 
        return dog[0];
    } else {
        return null;
    }
  };
function setPagination(state){
let count = state.length;
let pagesNums = Math.ceil(count);
console.log(pagesNums)
let links = [];
let i =0
while(i<pagesNums){
    let link= state.slice(i,i+8)
     links.push(link)
     i=i+8
}
return links
}
   export {
    onFilter,
    setPagination
  }