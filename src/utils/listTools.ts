
export function sum(arr) {
  return arr.reduce(function(prev, curr, idx, arr){
    return prev + curr;
  },0);
}

export function getList(number){
  if(number){
  return Array.from({length:number},(item, index)=> index+1)
  }
  return [0]
}
