// ==UserScript==
// @name         Mi Horario Uninorte
// @namespace    https://github.com/retamozor/horarios_uninorte
// @version      1.6
// @description  Genera tu horario uninorte
// @author       Rafael
// @match        https://pomelo.uninorte.edu.co/mihorario/*
// @require	     https://github.com/retamozor/horarios_uninorte/raw/main/dist/assets/index-G5iuPrKL.js
// @resource     AppStyles https://github.com/retamozor/horarios_uninorte/raw/main/dist/assets/index-8Ma1GzRX.css
// @updateURL    https://github.com/retamozor/horarios_uninorte/raw/main/tampermonkey.js
// @downloadURL  https://github.com/retamozor/horarios_uninorte/raw/main/tampermonkey.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
  'use strict';
  GM_addStyle(GM_getResourceText('AppStyles'));
})();
