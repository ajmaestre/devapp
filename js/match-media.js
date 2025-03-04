
"use strict";

const mq = matchMedia("(max-width: 500px)");
const body = document.querySelector("body");
const contForm = document.querySelector(".container-form");

mq.addEventListener("change", () => {
	if(mq.matches){
		body.classList.add("responsive-body");
		contForm.className = ".container-form-res";
	}else{
		body.classList.remove("responsive-body");
		contForm.className = ".container-form";
	}
});