'use strict';

const ERROR_MESSAGE = 'Заполните все поля, пожалуйста.🥺';
const CONTACT_ITEM_SELECTOR = '.contact-item';
const DELETE_BUTTON_CLASS = 'delete-button';


const contactForm = document.querySelector('#contact-form');
const inputs = document.querySelectorAll('.form-input');
const contactItemTemplate = document.querySelector('#contactItemTemplate').innerHTML;
const contactList = document.querySelector("#contact-list");

contactForm.addEventListener('submit', onContactBtnSubmit);

contactList.addEventListener('click', onContactListClick)

function onContactBtnSubmit(e) {
    e.preventDefault();

    const contact = getContact();

    if (!isContactValid(contact)) {
       warning();
        return;
    }

    addNewContact(contact);
    clearContact();
}

function onContactListClick(event) {
    if (event.target.classList.contains(DELETE_BUTTON_CLASS)) {
        const contactItem = getContactItem(event.target);

        removeContact(contactItem);
    }
}

function getContact() {
    const contact = {};

    inputs.forEach(input => {
        contact[input.name] = input.value;
    })

    return contact;
}

function isContactValid(contact) {
    return !isEmpty(contact.name)
        && !isEmpty(contact.surname)
        && isPhone(contact.phone)
}

function isPhone(phone) {
    return !isEmpty(phone) && !isNaN(phone);
}

function isEmpty(str) {
    return typeof str === 'string' && str.trim() === '';
}

function addNewContact(contact) {
    let contactItemHTML = contactItemTemplate;
    for (let property in contact) {
        contactItemHTML = contactItemHTML.replace(`{{${property}}}`, contact[property]);
    }
    contactList.insertAdjacentHTML('beforeend', contactItemHTML);
}

function clearContact() {
    contactForm.reset();
}

function getContactItem(el) {
    return el.closest(CONTACT_ITEM_SELECTOR);
}

function removeContact(contactItem) {
    contactItem.remove();
}

function warning() {
    alert(ERROR_MESSAGE);
}