'use strict';

const CONTACT_LIST = [];
const ERROR_MESSAGE = 'Заполните все поля, пожалуйста.🥺';

refreshTable();

document.querySelector('#table-element-phone').addEventListener('keyup', function () {
    this.value = this.value.replace(/[^\d]/g, '');
});
document.querySelector('#table-element-name').addEventListener('keyup', function () {
    this.value = this.value.replace(/[^A-Za-zА-Яа-яЁёІі\s]/g, '');
});
document.querySelector('#table-element-surname').addEventListener('keyup', function () {
    this.value = this.value.replace(/[^A-Za-zА-Яа-яЁёІі\s]/g, '');
});

document.getElementById('add-to-table-button').addEventListener('click', onAddToTableClick);

function onAddToTableClick() {
    const nameInput = document.getElementById('table-element-name');
    const surnameInput = document.getElementById('table-element-surname');
    const phoneInput = document.getElementById('table-element-phone');

    const elementFormName = nameInput.value.trim();
    const elementFormSurname = surnameInput.value.trim();
    const elementFormPhone = phoneInput.value.trim();

    if (elementFormName.length && elementFormSurname.length && elementFormPhone.length) {
        CONTACT_LIST.push({
            name: nameInput.value,
            surname: surnameInput.value,
            phone: phoneInput.value
        });

        nameInput.value = '';
        surnameInput.value = '';
        phoneInput.value = '';

        refreshTable();
    }
    else {
        alert(ERROR_MESSAGE);
    }
}

function refreshTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    for (const contact of CONTACT_LIST) {
        const row = document.createElement('tr');
        for (const propertyName in contact) {
            const tableCell = document.createElement('td');
            tableCell.innerText = contact[propertyName];

            row.appendChild(tableCell);
        }
        tbody.appendChild(row);
    }
}