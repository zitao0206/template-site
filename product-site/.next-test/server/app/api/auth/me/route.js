"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/me/route";
exports.ids = ["app/api/auth/me/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_lizitao_Codes_sites_product_site_src_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/me/route.ts */ \"(rsc)/./src/app/api/auth/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/me/route\",\n        pathname: \"/api/auth/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/me/route\"\n    },\n    resolvedPagePath: \"/Users/lizitao/Codes/sites/product-site/src/app/api/auth/me/route.ts\",\n    nextConfigOutput,\n    userland: _Users_lizitao_Codes_sites_product_site_src_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/me/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbWUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmxpeml0YW8lMkZDb2RlcyUyRnNpdGVzJTJGcHJvZHVjdC1zaXRlJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmxpeml0YW8lMkZDb2RlcyUyRnNpdGVzJTJGcHJvZHVjdC1zaXRlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNvQjtBQUNqRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2l0ZS8/Y2ZiMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbGl6aXRhby9Db2Rlcy9zaXRlcy9wcm9kdWN0LXNpdGUvc3JjL2FwcC9hcGkvYXV0aC9tZS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9tZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbWVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbWUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbGl6aXRhby9Db2Rlcy9zaXRlcy9wcm9kdWN0LXNpdGUvc3JjL2FwcC9hcGkvYXV0aC9tZS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9tZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/me/route.ts":
/*!**************************************!*\
  !*** ./src/app/api/auth/me/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/session */ \"(rsc)/./src/lib/session.ts\");\n\n\n// GET /api/auth/me  当前会话（App 端带 Bearer token 也能用）\nasync function GET(req) {\n    const session = await (0,_lib_session__WEBPACK_IMPORTED_MODULE_1__.readSession)(req);\n    if (!session) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"未登录\"\n        }, {\n            status: 401\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        uid: session.uid,\n        email: session.email,\n        role: session.role\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL21lL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNDO0FBRTVDLGtEQUFrRDtBQUMzQyxlQUFlRSxJQUFJQyxHQUFZO0lBQ3BDLE1BQU1DLFVBQVUsTUFBTUgseURBQVdBLENBQUNFO0lBQ2xDLElBQUksQ0FBQ0MsU0FBUztRQUNaLE9BQU9KLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFNLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzNEO0lBQ0EsT0FBT1AscURBQVlBLENBQUNLLElBQUksQ0FBQztRQUN2QkcsS0FBS0osUUFBUUksR0FBRztRQUNoQkMsT0FBT0wsUUFBUUssS0FBSztRQUNwQkMsTUFBTU4sUUFBUU0sSUFBSTtJQUNwQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zaXRlLy4vc3JjL2FwcC9hcGkvYXV0aC9tZS9yb3V0ZS50cz81OGJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgcmVhZFNlc3Npb24gfSBmcm9tIFwiQC9saWIvc2Vzc2lvblwiO1xuXG4vLyBHRVQgL2FwaS9hdXRoL21lICDlvZPliY3kvJror53vvIhBcHAg56uv5bimIEJlYXJlciB0b2tlbiDkuZ/og73nlKjvvIlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBSZXF1ZXN0KSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCByZWFkU2Vzc2lvbihyZXEpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLmnKrnmbvlvZVcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgdWlkOiBzZXNzaW9uLnVpZCxcbiAgICBlbWFpbDogc2Vzc2lvbi5lbWFpbCxcbiAgICByb2xlOiBzZXNzaW9uLnJvbGUsXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInJlYWRTZXNzaW9uIiwiR0VUIiwicmVxIiwic2Vzc2lvbiIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVpZCIsImVtYWlsIiwicm9sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/jwt.ts":
/*!************************!*\
  !*** ./src/lib/jwt.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   signSession: () => (/* binding */ signSession),\n/* harmony export */   verifySession: () => (/* binding */ verifySession)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n\nconst secret = new TextEncoder().encode(process.env.JWT_SECRET || \"dev-only-secret-please-change\");\nasync function signSession(payload) {\n    return new jose__WEBPACK_IMPORTED_MODULE_0__.SignJWT({\n        ...payload\n    }).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(\"7d\").sign(secret);\n}\nasync function verifySession(token) {\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_1__.jwtVerify)(token, secret);\n        return payload;\n    } catch  {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2p3dC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTBDO0FBUTFDLE1BQU1FLFNBQVMsSUFBSUMsY0FBY0MsTUFBTSxDQUNyQ0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUk7QUFHckIsZUFBZUMsWUFBWUMsT0FBdUI7SUFDdkQsT0FBTyxJQUFJVCx5Q0FBT0EsQ0FBQztRQUFFLEdBQUdTLE9BQU87SUFBQyxHQUM3QkMsa0JBQWtCLENBQUM7UUFBRUMsS0FBSztJQUFRLEdBQ2xDQyxXQUFXLEdBQ1hDLGlCQUFpQixDQUFDLE1BQ2xCQyxJQUFJLENBQUNaO0FBQ1Y7QUFFTyxlQUFlYSxjQUNwQkMsS0FBYTtJQUViLElBQUk7UUFDRixNQUFNLEVBQUVQLE9BQU8sRUFBRSxHQUFHLE1BQU1SLCtDQUFTQSxDQUFDZSxPQUFPZDtRQUMzQyxPQUFPTztJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zaXRlLy4vc3JjL2xpYi9qd3QudHM/MTRmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduSldULCBqd3RWZXJpZnkgfSBmcm9tIFwiam9zZVwiO1xuXG5leHBvcnQgdHlwZSBTZXNzaW9uUGF5bG9hZCA9IHtcbiAgdWlkOiBudW1iZXIgfCBudWxsOyAvLyDmma7pgJrnlKjmiLfmnIkgdWlk77yb566h55CG5ZGYL+i2hee6p+euoeeQhuWRmOS4uiBudWxsXG4gIGVtYWlsOiBzdHJpbmc7XG4gIHJvbGU6IFwidXNlclwiIHwgXCJhZG1pblwiIHwgXCJzdXBlclwiO1xufTtcblxuY29uc3Qgc2VjcmV0ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8IFwiZGV2LW9ubHktc2VjcmV0LXBsZWFzZS1jaGFuZ2VcIixcbik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduU2Vzc2lvbihwYXlsb2FkOiBTZXNzaW9uUGF5bG9hZCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgU2lnbkpXVCh7IC4uLnBheWxvYWQgfSlcbiAgICAuc2V0UHJvdGVjdGVkSGVhZGVyKHsgYWxnOiBcIkhTMjU2XCIgfSlcbiAgICAuc2V0SXNzdWVkQXQoKVxuICAgIC5zZXRFeHBpcmF0aW9uVGltZShcIjdkXCIpXG4gICAgLnNpZ24oc2VjcmV0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVNlc3Npb24oXG4gIHRva2VuOiBzdHJpbmcsXG4pOiBQcm9taXNlPFNlc3Npb25QYXlsb2FkIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYXdhaXQgand0VmVyaWZ5KHRva2VuLCBzZWNyZXQpO1xuICAgIHJldHVybiBwYXlsb2FkIGFzIHVua25vd24gYXMgU2Vzc2lvblBheWxvYWQ7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwibmFtZXMiOlsiU2lnbkpXVCIsImp3dFZlcmlmeSIsInNlY3JldCIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJzaWduU2Vzc2lvbiIsInBheWxvYWQiLCJzZXRQcm90ZWN0ZWRIZWFkZXIiLCJhbGciLCJzZXRJc3N1ZWRBdCIsInNldEV4cGlyYXRpb25UaW1lIiwic2lnbiIsInZlcmlmeVNlc3Npb24iLCJ0b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/jwt.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/session.ts":
/*!****************************!*\
  !*** ./src/lib/session.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TOKEN_COOKIE: () => (/* binding */ TOKEN_COOKIE),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   isAdmin: () => (/* binding */ isAdmin),\n/* harmony export */   readSession: () => (/* binding */ readSession)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwt */ \"(rsc)/./src/lib/jwt.ts\");\n\n\nconst TOKEN_COOKIE = \"token\";\n/**\n * 读当前会话。\n * 优先读 Authorization: Bearer xxx（给未来 iOS/Android App 用），\n * 没有再看网页的 httpOnly Cookie。\n */ async function readSession(req) {\n    const bearer = req?.headers.get(\"authorization\");\n    if (bearer?.startsWith(\"Bearer \")) {\n        return (0,_jwt__WEBPACK_IMPORTED_MODULE_1__.verifySession)(bearer.slice(7));\n    }\n    const token = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)().get(TOKEN_COOKIE)?.value;\n    if (!token) return null;\n    return (0,_jwt__WEBPACK_IMPORTED_MODULE_1__.verifySession)(token);\n}\n/** 页面里用：拿当前登录用户 */ async function getSession() {\n    return readSession();\n}\n/** 判断是否是管理员（写死账号登录后会带上 role=admin） */ async function isAdmin(req) {\n    const s = await readSession(req);\n    return s?.role === \"admin\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3Nlc3Npb24udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXVDO0FBQ29CO0FBRXBELE1BQU1FLGVBQWUsUUFBUTtBQUVwQzs7OztDQUlDLEdBQ00sZUFBZUMsWUFBWUMsR0FBYTtJQUM3QyxNQUFNQyxTQUFTRCxLQUFLRSxRQUFRQyxJQUFJO0lBQ2hDLElBQUlGLFFBQVFHLFdBQVcsWUFBWTtRQUNqQyxPQUFPUCxtREFBYUEsQ0FBQ0ksT0FBT0ksS0FBSyxDQUFDO0lBQ3BDO0lBRUEsTUFBTUMsUUFBUVYscURBQU9BLEdBQUdPLEdBQUcsQ0FBQ0wsZUFBZVM7SUFDM0MsSUFBSSxDQUFDRCxPQUFPLE9BQU87SUFDbkIsT0FBT1QsbURBQWFBLENBQUNTO0FBQ3ZCO0FBRUEsaUJBQWlCLEdBQ1YsZUFBZUU7SUFDcEIsT0FBT1Q7QUFDVDtBQUVBLG9DQUFvQyxHQUM3QixlQUFlVSxRQUFRVCxHQUFhO0lBQ3pDLE1BQU1VLElBQUksTUFBTVgsWUFBWUM7SUFDNUIsT0FBT1UsR0FBR0MsU0FBUztBQUNyQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2l0ZS8uL3NyYy9saWIvc2Vzc2lvbi50cz84ZGY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyB2ZXJpZnlTZXNzaW9uLCB0eXBlIFNlc3Npb25QYXlsb2FkIH0gZnJvbSBcIi4vand0XCI7XG5cbmV4cG9ydCBjb25zdCBUT0tFTl9DT09LSUUgPSBcInRva2VuXCI7XG5cbi8qKlxuICog6K+75b2T5YmN5Lya6K+d44CCXG4gKiDkvJjlhYjor7sgQXV0aG9yaXphdGlvbjogQmVhcmVyIHh4eO+8iOe7meacquadpSBpT1MvQW5kcm9pZCBBcHAg55So77yJ77yMXG4gKiDmsqHmnInlho3nnIvnvZHpobXnmoQgaHR0cE9ubHkgQ29va2ll44CCXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkU2Vzc2lvbihyZXE/OiBSZXF1ZXN0KTogUHJvbWlzZTxTZXNzaW9uUGF5bG9hZCB8IG51bGw+IHtcbiAgY29uc3QgYmVhcmVyID0gcmVxPy5oZWFkZXJzLmdldChcImF1dGhvcml6YXRpb25cIik7XG4gIGlmIChiZWFyZXI/LnN0YXJ0c1dpdGgoXCJCZWFyZXIgXCIpKSB7XG4gICAgcmV0dXJuIHZlcmlmeVNlc3Npb24oYmVhcmVyLnNsaWNlKDcpKTtcbiAgfVxuXG4gIGNvbnN0IHRva2VuID0gY29va2llcygpLmdldChUT0tFTl9DT09LSUUpPy52YWx1ZTtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XG4gIHJldHVybiB2ZXJpZnlTZXNzaW9uKHRva2VuKTtcbn1cblxuLyoqIOmhtemdoumHjOeUqO+8muaLv+W9k+WJjeeZu+W9leeUqOaItyAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb24oKTogUHJvbWlzZTxTZXNzaW9uUGF5bG9hZCB8IG51bGw+IHtcbiAgcmV0dXJuIHJlYWRTZXNzaW9uKCk7XG59XG5cbi8qKiDliKTmlq3mmK/lkKbmmK/nrqHnkIblkZjvvIjlhpnmrbvotKblj7fnmbvlvZXlkI7kvJrluKbkuIogcm9sZT1hZG1pbu+8iSAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQWRtaW4ocmVxPzogUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCBzID0gYXdhaXQgcmVhZFNlc3Npb24ocmVxKTtcbiAgcmV0dXJuIHM/LnJvbGUgPT09IFwiYWRtaW5cIjtcbn1cbiJdLCJuYW1lcyI6WyJjb29raWVzIiwidmVyaWZ5U2Vzc2lvbiIsIlRPS0VOX0NPT0tJRSIsInJlYWRTZXNzaW9uIiwicmVxIiwiYmVhcmVyIiwiaGVhZGVycyIsImdldCIsInN0YXJ0c1dpdGgiLCJzbGljZSIsInRva2VuIiwidmFsdWUiLCJnZXRTZXNzaW9uIiwiaXNBZG1pbiIsInMiLCJyb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/session.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();