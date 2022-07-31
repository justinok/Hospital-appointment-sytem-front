const PATIENT_URL = 'http://localhost:8080/patient';
let patients = [];
var myHeaders = new Headers();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

window.addEventListener('DOMContentLoaded', () => {
    getPatients();
})
const getPatients = () => {
    fetch(PATIENT_URL)
        .then(response => response.json())
        .then(data => {
            patients = data;
            console.log(data);
            renderResult(patients);
        })
}

const patientsList = document.querySelector('#patientsList');
const renderResult = (patients) => {
    let listHTML = "";
    patients.forEach(patient =>{
        listHTML += `
      <div class="card">
        <div>id: ${patient.id}</div>
        <div>Name: ${patient.name}</div>
        <div>Numb_of_appoints: ${patient.numb_of_appoints}</div>
        <div class="options">
          <button type="button" >Editar</button>
          <button type="button" >Eliminar</button>
        </div>
      </div>
       `
    })
    patientsList.innerHTML = listHTML
}

const createPatient = () => {
    const formData = new FormData(document.querySelector('#formAdd'));

    if(!formData.get('nombre').length || !formData.get('numero de citas') || !formData.get('rason')) {
        document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
        return;
    }
    document.querySelector('#msgFormAdd').innerHTML = '';

    const patient = {
        Nombre: formData.get('nombre'),
        Color: formData.get('numero de citas'),
        Precio: formData.get('rason'),
    }

    console.log(patient)

    fetch(PATIENT_URL, {
        method: 'POST',
        body: JSON.stringify(patient),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
            document.querySelector('#formAdd').reset();
        })
        .then(response => {
            alertManager('success', response.mensaje)
            getPatients();
        })
}

const deletePatient = (id) => {

    fetch(`${PATIENT_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
        })
        .then(response => {
            alertManager('success', response.mensaje);
            closeModalConfirm();
            getPatients();
            deleteId = null;
        })

}

const confirmDelete = (res) => {
    if(res){
        deleteProduct(deleteId);
    } else {
        closeModalConfirm();
    }
}








// MODAL ADD MANAGER
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('#modalAdd');

btnAdd.onclick = () => openModalAdd();

window.onclick = function(event) {
    if (event.target == modalAdd) {
        //modalAdd.style.display = "none";
    }
}

const closeModalAdd = () => {
    modalAdd.style.display = 'none';
}

const openModalAdd = () => {
    modalAdd.style.display = 'block';
}

// MODAL ADIT MANAGER
/** --------------------------------------------------------------- */
const modalEdit = document.querySelector('#modalEdit');

const openModalEdit = () => {
    modalEdit.style.display = 'block';
}

const closeModalEdit = () => {
    modalEdit.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modalEdit) {
        //modalEdit.style.display = "none";
    }
}

// MODAL CONFIRM MANAGER
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById('modalConfirm');

window.onclick = function(event) {
    if (event.target == modalConfirm) {
        modalConfirm.style.display = "none";
    }
}

const closeModalConfirm = () => {
    modalConfirm.style.display = 'none';
}

const openModalConfirm = (id) => {
    deleteId = id;
    modalConfirm.style.display = 'block';
}


/** ALERT */
const alertManager = (typeMsg, message) => {
    const alert = document.querySelector('#alert');

    alert.innerHTML = message || 'Se produjo cambios';
    alert.classList.add(typeMsg);
    alert.style.display = 'block';

    setTimeout(() => {
        alert.style.display = 'none';
        alert.classList.remove(typeMsg);
    }, 3500);

}
Footer
