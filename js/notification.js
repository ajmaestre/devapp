
"use strict";


export class Notify{

	constructor(){
		if(!('Notification' in window)){
			console.log('Las notificaciones no están disponibles en tu navegador');
		}
	}

	getNotify = () => {
		Notification.requestPermission(() => {
			if(Notification.permission == "granted"){
				console.log('Permiso concedido');	
			}
		});
	}

	newNotification = () => {
		new Notification("Se ha agregado un nuevo usuario");
	}

}