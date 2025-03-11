
"use strict";

const BASE_URL = "/api/routes/datoRoute.php";


const container = document.querySelector(".container");
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
	getObjects();
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
		const div = document.createElement('div');
		div.className = 'container-tilte';
		const title = document.createElement('h2');
		title.className = 'title';
		title.innerHTML = "No se encontraron registros";
		div.appendChild(title);
		fragment.appendChild(div);
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

	const ul = document.createElement('ul');
	const liName = document.createElement('li');
	liName.className = 'li-name';
	liName.innerHTML = data['nombre1'] + ' ' + data['nombre2'] + ' ' + data['apellido1'] + ' ' + data['apellido2'];
	ul.appendChild(liName);

	const liTypeId = document.createElement('li');
	liTypeId.innerHTML = data['tipo_id'] + ": " + data['id'];
	ul.appendChild(liTypeId);

	const liSexo = document.createElement('li');
	liSexo.innerHTML = 'Genero: ' + data['sexo'];
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
	idType.value = 'Tipo de identificación';
	name1.value = '';
	name2.value = '';
	lastname1.value = '';
	lastname2.value = '';
	sexo.value = 'Genero';
	date.value = '';
}

const validateData = (user) => {
	if(
		user.id.length > 0 && 
		user.tipo_id != 'Tipo de identificación' 
		&& user.nombre1.length > 0 
		&& user.apellido1.length > 0 
		&& user.sexo != 'Genero'
		&& user.fecha_nacimiento.length > 0
	){
		return true;
	}
	return false;
}

const showWarning = () => {
	warning.className = "show";
	setInterval(() => {
		warning.className = "warning";
	}, 3000);
}

btn.addEventListener("click", async (e) => {
	e.preventDefault();
	const user = getUser();
	if(validateData(user)){
		const result = await addObject(user);
		cleanContainer();
		getObjects();
		cleanInputs();
	}else{
		showWarning();
	}
});

document.querySelector('form').addEventListener('change', (event) => {
    if (event.target.name === "genero") {
        console.log("Seleccionaste:", event.target.value);
    }
});

btnReset.addEventListener("click", () => {
	cleanInputs();
});


// ####################################### API ###################################################

const getData = async () => {
    try {
        const result = await fetch(`${BASE_URL}`, {
			method: 'GET',
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

const postData = async (data) => {
    try {
		console.log(data)
        const result = await fetch(`${BASE_URL}`, {
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
        const result = await fetch(`${BASE_URL}`, {
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
        const result = await fetch(`${BASE_URL}?codigo=${codigo}`, {
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