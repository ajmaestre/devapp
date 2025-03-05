
"use strict";

import { Notify } from './notification.js';
import '../env.js';

const notify = new Notify();
notify.getNotify();


const container = document.querySelector(".container");
const divSvg = document.querySelector("#div-svg");
const warning = document.querySelector(".warning");
const btn = document.querySelector("#btn");
const btnReset = document.querySelector("#btnReset");

const key = document.querySelector("#key");
const idType = document.querySelector("#typeid");
const id = document.querySelector("#id");
const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
const lastname1 = document.querySelector("#lastname1");
const lastname2= document.querySelector("#lastname2");
const sexo = document.querySelector("#sexo");
const date = document.querySelector("#date");


const numInit = 6;
let count = 0;

const addObject = async (object) => {
	if(!object.codigo) {
		// REGISTRAR
		const result = await postData(object);
	}
	else {
		// ACTUALIZAR
		const result = await putData(object);
	}
}

const deleteObject = async (key) => {
	// DELETE
	const result = await deleteData(key);
}

const cleanContainer = () =>{
	count = 0;
	container.replaceChildren([]);
}

const getObjects = async () => {
	const fragment = document.createDocumentFragment();
	// OBTENER DATOS
	const users = await getData();
	if(users.length == 0){
		const title = document.createElement('h1');
		title.innerHTML = "No hay datos";
		fragment.appendChild(title);
	}else{
		for(let i = 0; i < users.length; i++){
			if(users[count] != undefined){
				const card = insertData(users[count]);
				fragment.appendChild(card);
				count++;
			}else{
				break;
			}
		}
	}
	container.appendChild(fragment);
}

const insertData = (data) => {
	const card = document.createElement('div');
	card.className = 'card';
	card.id = `card${data['id']}`;
	card.addEventListener("dragstart", (e) => {
		divSvg.className = 'div-svg-show';
		e.dataTransfer.setData("user", data['codigo']);
	});

	card.addEventListener("drag", (e) => {
		divSvg.className = 'div-svg-show';
		card.style.transform = `translate(${e.layerX}px, ${e.layerY}px)`;
	});

	card.addEventListener("dragend", (e) => {
		divSvg.className = 'div-svg';
		card.style.transform = `translate(${0}px, ${0}px)`;
	});

	const ul = document.createElement('ul');
	const liName = document.createElement('li');
	liName.innerHTML = 'Nombre: ' + data['nombre1'] + ' ' + data['nombre2'] + ' ' + data['apellido1'] + ' ' + data['apellido2'];
	ul.appendChild(liName);

	const liTypeId = document.createElement('li');
	liTypeId.innerHTML = 'Tipo de id: ' + data['tipo_id'];
	ul.appendChild(liTypeId);

	const liId = document.createElement('li');
	liId.innerHTML = 'Id: ' + data['id'];
	ul.appendChild(liId);

	const liSexo = document.createElement('li');
	liSexo.innerHTML = 'Sexo: ' + data['sexo'];
	ul.appendChild(liSexo);

	const liDate = document.createElement('li');
	liDate.innerHTML = 'Fecha de nacimiento: ' + data['fecha_nacimiento'];
	ul.appendChild(liDate);

	const btnDelete = document.createElement('button');
	btnDelete.innerHTML = 'Eliminar';
	btnDelete.className = 'btnCard';
	btnDelete.addEventListener("click", (e) => {
		e.preventDefault();
		deleteObject(data['codigo']);
		cleanContainer();
		getObjects(numInit);
	});
	const btnUpdate = document.createElement('button');
	btnUpdate.innerHTML = 'Modificar';
	btnUpdate.className = 'btnCard';
	btnUpdate.classList.add('btn-update');
	btnUpdate.addEventListener("click", (e) => {
		e.preventDefault();
		chargeData(data);
	});
	const divBtn = document.createElement('div');
	divBtn.className = 'div-btn';
	divBtn.appendChild(btnUpdate);
	divBtn.appendChild(btnDelete);

	card.appendChild(ul);
	card.appendChild(divBtn);
	return card;
}

const chargeData = (data) => {
	key.value = data['codigo'];
	idType.value = data['tipo_id'];
	id.value = data['id'];
	name1.value = data['nombre1'];
	name2.value = data['nombre2'];
	lastname1.value = data['apellido1'];
	lastname2.value = data['apellido2'];
	sexo.value = data['sexo'];
	date.value = data['fecha_nacimiento'];
}

const getUser = () => {
	const user = {
		"codigo": key.value,
		"id": id.value,
		"tipo_id": idType.value,
		"nombre1": name1.value,
		"nombre2": name2.value,
		"apellido1": lastname1.value,
		"apellido2": lastname2.value,
		"sexo": sexo.value,
		"fecha_nacimiento": date.value
	}
	return user;
}

const cleanInputs = () => {
	key.value = '';
	id.value = '';
	idType.value = '';
	name1.value = '';
	name2.value = '';
	lastname1.value = '';
	lastname2.value = '';
	sexo.value = '';
	date.value = '';
}

const showWarning = () => {
	warning.className = "show";
	setInterval(() => {
		warning.className = "warning";
	}, 3000);
}

btn.addEventListener("click", () => {
	const user = getUser();
	if(user.id.length > 0 && user.tipo_id.length > 0 && user.nombre1.length > 0 && user.apellido1.length > 0 && user.fecha_nacimiento.length > 0){
		addObject(user);
		cleanContainer();
		getObjects();
		cleanInputs();
		notify.newNotification();
	}else{
		showWarning();
	}
});

btnReset.addEventListener("click", () => {
	cleanInputs();
});

divSvg.addEventListener("dragenter", () => {
	
});

divSvg.addEventListener("dragover", (e) => {
	e.preventDefault();
});

divSvg.addEventListener("drop", (e) => {
	const user = e.dataTransfer.getData("user");
	divSvg.className = 'div-svg-show';
	deleteObject(Number.parseInt(user));
	cleanContainer();
	getObjects();
});

divSvg.addEventListener("dragleave", () => {

});


// ####################################### API ###################################################

const getData = async () => {
    try {
        const result = await fetch(`${window.ENV.API_URL}/routes/datoRoute.php`);
        const res = await result.json()
        return res;
    } catch (err) {
        console.log(err)
    }
}

const postData = async (data) => {
    try {
        const result = await fetch(`${window.ENV.API_URL}/routes/datoRoute.php`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
        const res = await result.json()
        return res;
    } catch (err) {
        console.log(err)
    }
}

const putData = async (data) => {
    try {
        const result = await fetch(`${window.ENV.API_URL}/routes/datoRoute.php`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
        const res = await result.json()
        return res;
    } catch (err) {
        console.log(err)
    }
}

const deleteData = async (codigo) => {
    try {
        const result = await fetch(`${window.ENV.API_URL}/routes/datoRoute.php?codigo=${codigo}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
        const res = await result.json()
        return res;
    } catch (err) {
        console.log(err)
    }
}

// ############################################################################################3

getObjects();