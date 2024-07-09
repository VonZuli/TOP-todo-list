"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["generateID"],{

/***/ "./src/scripts/generateID.js":
/*!***********************************!*\
  !*** ./src/scripts/generateID.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAccountId: () => (/* binding */ generateAccountId),
/* harmony export */   generateId: () => (/* binding */ generateId)
/* harmony export */ });

const generateId = () => {
  const id = new Date().getTime()
  const itemId = id.toString(16).slice(2);

  return itemId
}

const generateAccountId = () =>{
  const id = new Date().getTime()
  const accountId = id.toString(16).slice(2);

  return accountId
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/scripts/generateID.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVJRC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zY3JpcHRzL2dlbmVyYXRlSUQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVJZCA9ICgpID0+IHtcbiAgY29uc3QgaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICBjb25zdCBpdGVtSWQgPSBpZC50b1N0cmluZygxNikuc2xpY2UoMik7XG5cbiAgcmV0dXJuIGl0ZW1JZFxufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVBY2NvdW50SWQgPSAoKSA9PntcbiAgY29uc3QgaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICBjb25zdCBhY2NvdW50SWQgPSBpZC50b1N0cmluZygxNikuc2xpY2UoMik7XG5cbiAgcmV0dXJuIGFjY291bnRJZFxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==