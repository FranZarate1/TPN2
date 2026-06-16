async function convertir(){

const valor=

document

.getElementById("valor")

.value;


const unidad=

document

.getElementById("unidad")

.value;


let url="";


if(unidad==="kg"){

url=

`/convert/kg/${valor}`;

}

else{

url=

`/convert/lb/${valor}`;

}


const response=

await fetch(url);


const data=

await response.json();


if(data.error){

document

.getElementById("resultado")

.innerHTML=

data.error;

return;

}


if(unidad==="kg"){

document

.getElementById("resultado")

.innerHTML=

`${data.kg} kg =

${data.lb} lb`;

}

else{

document

.getElementById("resultado")

.innerHTML=

`${data.lb} lb =

${data.kg} kg`;

}

}