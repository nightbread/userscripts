'use strict';
// ==UserScript==
// @name         GitHub No CoC
// @namespace    http://theguardian.com/
// @version      0.0.1
// @description  Remove Code of Conduct tab in new repository view.
// @author       nightbread
// @match        https://github.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
document.querySelector('[data-content="Code of conduct"]')?.parentElement?.parentElement?.remove();
