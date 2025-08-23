const balloon=document.getElementById('breathBalloon');
const text=document.getElementById('breathText');
if(balloon&&text){
  let state=0;
  function cycle(){
    state=(state+1)%4;
    if(state===0){balloon.style.transform='scale(1)';text.textContent='Inspira (4)';}
    if(state===1){text.textContent='Segura (4)';}
    if(state===2){balloon.style.transform='scale(0.6)';text.textContent='Expira (6)';}
    if(state===3){text.textContent='Pausa';}
  }
  setInterval(cycle,4000);
}