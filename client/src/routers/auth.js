
export const isAutentic = () =>{
    var temp = JSON.parse(localStorage.getItem('userLog'));
    console.log(temp);
    if(temp !== null){
    return true;
    } else {
    return false;
    }
}