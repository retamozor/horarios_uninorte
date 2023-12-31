// ==UserScript==
// @name         Mi App de React
// @namespace    https://github.com/retamozor/horarios_uninorte/
// @version      0.2
// @description  Inserta tu App de React en la página
// @author       Rafael
// @match        https://pomelo.uninorte.edu.co/mihorario/*
// @require	     https://github.com/retamozor/horarios_uninorte/raw/main/dist/assets/index-40Hxu3xF.js
// @resource     AppStyles https://github.com/retamozor/horarios_uninorte/raw/main/dist/assets/index-N1PiZmuu.css
// @updateURL    https://github.com/retamozor/horarios_uninorte/raw/main/tampermonkey.js
// @downloadURL  https://github.com/retamozor/horarios_uninorte/main/tampermonkey.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
  'use strict';
  GM_addStyle(GM_getResourceText('AppStyles'));
})();
