"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import stylesheets
require("./style.css");
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    console.log(formData);
    var text = formData.get('defineword');
    console.log(text);
    return false; // prevent reload
};
