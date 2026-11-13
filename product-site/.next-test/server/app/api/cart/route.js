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
exports.id = "app/api/cart/route";
exports.ids = ["app/api/cart/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_lizitao_Codes_sites_product_site_src_app_api_cart_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/cart/route.ts */ \"(rsc)/./src/app/api/cart/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cart/route\",\n        pathname: \"/api/cart\",\n        filename: \"route\",\n        bundlePath: \"app/api/cart/route\"\n    },\n    resolvedPagePath: \"/Users/lizitao/Codes/sites/product-site/src/app/api/cart/route.ts\",\n    nextConfigOutput,\n    userland: _Users_lizitao_Codes_sites_product_site_src_app_api_cart_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/cart/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjYXJ0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjYXJ0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2FydCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmxpeml0YW8lMkZDb2RlcyUyRnNpdGVzJTJGcHJvZHVjdC1zaXRlJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmxpeml0YW8lMkZDb2RlcyUyRnNpdGVzJTJGcHJvZHVjdC1zaXRlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNpQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2l0ZS8/NmNiNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbGl6aXRhby9Db2Rlcy9zaXRlcy9wcm9kdWN0LXNpdGUvc3JjL2FwcC9hcGkvY2FydC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2FydC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NhcnRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NhcnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbGl6aXRhby9Db2Rlcy9zaXRlcy9wcm9kdWN0LXNpdGUvc3JjL2FwcC9hcGkvY2FydC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY2FydC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/cart/route.ts":
/*!***********************************!*\
  !*** ./src/app/api/cart/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/session */ \"(rsc)/./src/lib/session.ts\");\n\n\n\n// GET /api/cart  当前登录用户的购物车列表\n// 顺带返回总件数 / 总金额，前端右上角角标直接用 totalQuantity\nasync function GET(req) {\n    const session = await (0,_lib_session__WEBPACK_IMPORTED_MODULE_2__.readSession)(req);\n    if (!session) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"未登录\"\n        }, {\n            status: 401\n        });\n    }\n    // 管理员是写死账号，uid 为 null，没有购物车\n    if (session.uid === null) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"管理员账号不支持购物车\"\n        }, {\n            status: 403\n        });\n    }\n    const items = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.cartItem.findMany({\n        where: {\n            userId: session.uid\n        },\n        include: {\n            product: {\n                select: {\n                    id: true,\n                    title: true,\n                    price: true,\n                    imageUrl: true,\n                    stock: true,\n                    status: true\n                }\n            }\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n    // 已下架的条目仍然返回（前端可以标\"已下架\"），但不计入角标和金额\n    const validItems = items.filter((item)=>item.product.status === \"PUBLISHED\");\n    // itemCount = 商品种类数（不同商品各算 1），导航栏角标用它\n    const itemCount = validItems.length;\n    const totalQuantity = validItems.reduce((sum, item)=>sum + item.quantity, 0);\n    const totalPrice = validItems.reduce((sum, item)=>sum + item.quantity * item.product.price, 0);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        items,\n        itemCount,\n        totalQuantity,\n        totalPrice\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9jYXJ0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDTDtBQUNNO0FBRTVDLDhCQUE4QjtBQUM5Qix5Q0FBeUM7QUFDbEMsZUFBZUcsSUFBSUMsR0FBWTtJQUNwQyxNQUFNQyxVQUFVLE1BQU1ILHlEQUFXQSxDQUFDRTtJQUNsQyxJQUFJLENBQUNDLFNBQVM7UUFDWixPQUFPTCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBTSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMzRDtJQUNBLDRCQUE0QjtJQUM1QixJQUFJSCxRQUFRSSxHQUFHLEtBQUssTUFBTTtRQUN4QixPQUFPVCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBYyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuRTtJQUVBLE1BQU1FLFFBQVEsTUFBTVQsK0NBQU1BLENBQUNVLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDO1FBQzNDQyxPQUFPO1lBQUVDLFFBQVFULFFBQVFJLEdBQUc7UUFBQztRQUM3Qk0sU0FBUztZQUNQQyxTQUFTO2dCQUNQQyxRQUFRO29CQUNOQyxJQUFJO29CQUNKQyxPQUFPO29CQUNQQyxPQUFPO29CQUNQQyxVQUFVO29CQUNWQyxPQUFPO29CQUNQZCxRQUFRO2dCQUNWO1lBQ0Y7UUFDRjtRQUNBZSxTQUFTO1lBQUVDLFdBQVc7UUFBTztJQUMvQjtJQUVBLG1DQUFtQztJQUNuQyxNQUFNQyxhQUFhZixNQUFNZ0IsTUFBTSxDQUFDLENBQUNDLE9BQVNBLEtBQUtYLE9BQU8sQ0FBQ1IsTUFBTSxLQUFLO0lBQ2xFLHNDQUFzQztJQUN0QyxNQUFNb0IsWUFBWUgsV0FBV0ksTUFBTTtJQUNuQyxNQUFNQyxnQkFBZ0JMLFdBQVdNLE1BQU0sQ0FBQyxDQUFDQyxLQUFLTCxPQUFTSyxNQUFNTCxLQUFLTSxRQUFRLEVBQUU7SUFDNUUsTUFBTUMsYUFBYVQsV0FBV00sTUFBTSxDQUNsQyxDQUFDQyxLQUFLTCxPQUFTSyxNQUFNTCxLQUFLTSxRQUFRLEdBQUdOLEtBQUtYLE9BQU8sQ0FBQ0ksS0FBSyxFQUN2RDtJQUdGLE9BQU9wQixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1FBQUVJO1FBQU9rQjtRQUFXRTtRQUFlSTtJQUFXO0FBQ3pFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zaXRlLy4vc3JjL2FwcC9hcGkvY2FydC9yb3V0ZS50cz9hYjQ4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmVhZFNlc3Npb24gfSBmcm9tIFwiQC9saWIvc2Vzc2lvblwiO1xuXG4vLyBHRVQgL2FwaS9jYXJ0ICDlvZPliY3nmbvlvZXnlKjmiLfnmoTotK3nianovabliJfooahcbi8vIOmhuuW4pui/lOWbnuaAu+S7tuaVsCAvIOaAu+mHkemine+8jOWJjeerr+WPs+S4iuinkuinkuagh+ebtOaOpeeUqCB0b3RhbFF1YW50aXR5XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgcmVhZFNlc3Npb24ocmVxKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwi5pyq55m75b2VXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgfVxuICAvLyDnrqHnkIblkZjmmK/lhpnmrbvotKblj7fvvIx1aWQg5Li6IG51bGzvvIzmsqHmnInotK3nianovaZcbiAgaWYgKHNlc3Npb24udWlkID09PSBudWxsKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwi566h55CG5ZGY6LSm5Y+35LiN5pSv5oyB6LSt54mp6L2mXCIgfSwgeyBzdGF0dXM6IDQwMyB9KTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gYXdhaXQgcHJpc21hLmNhcnRJdGVtLmZpbmRNYW55KHtcbiAgICB3aGVyZTogeyB1c2VySWQ6IHNlc3Npb24udWlkIH0sXG4gICAgaW5jbHVkZToge1xuICAgICAgcHJvZHVjdDoge1xuICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgICBwcmljZTogdHJ1ZSxcbiAgICAgICAgICBpbWFnZVVybDogdHJ1ZSxcbiAgICAgICAgICBzdG9jazogdHJ1ZSxcbiAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gIH0pO1xuXG4gIC8vIOW3suS4i+aetueahOadoeebruS7jeeEtui/lOWbnu+8iOWJjeerr+WPr+S7peagh1wi5bey5LiL5p62XCLvvInvvIzkvYbkuI3orqHlhaXop5LmoIflkozph5Hpop1cbiAgY29uc3QgdmFsaWRJdGVtcyA9IGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5wcm9kdWN0LnN0YXR1cyA9PT0gXCJQVUJMSVNIRURcIik7XG4gIC8vIGl0ZW1Db3VudCA9IOWVhuWTgeenjeexu+aVsO+8iOS4jeWQjOWVhuWTgeWQhOeulyAx77yJ77yM5a+86Iiq5qCP6KeS5qCH55So5a6DXG4gIGNvbnN0IGl0ZW1Db3VudCA9IHZhbGlkSXRlbXMubGVuZ3RoO1xuICBjb25zdCB0b3RhbFF1YW50aXR5ID0gdmFsaWRJdGVtcy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgaXRlbS5xdWFudGl0eSwgMCk7XG4gIGNvbnN0IHRvdGFsUHJpY2UgPSB2YWxpZEl0ZW1zLnJlZHVjZShcbiAgICAoc3VtLCBpdGVtKSA9PiBzdW0gKyBpdGVtLnF1YW50aXR5ICogaXRlbS5wcm9kdWN0LnByaWNlLFxuICAgIDAsXG4gICk7XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgaXRlbXMsIGl0ZW1Db3VudCwgdG90YWxRdWFudGl0eSwgdG90YWxQcmljZSB9KTtcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJyZWFkU2Vzc2lvbiIsIkdFVCIsInJlcSIsInNlc3Npb24iLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ1aWQiLCJpdGVtcyIsImNhcnRJdGVtIiwiZmluZE1hbnkiLCJ3aGVyZSIsInVzZXJJZCIsImluY2x1ZGUiLCJwcm9kdWN0Iiwic2VsZWN0IiwiaWQiLCJ0aXRsZSIsInByaWNlIiwiaW1hZ2VVcmwiLCJzdG9jayIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJ2YWxpZEl0ZW1zIiwiZmlsdGVyIiwiaXRlbSIsIml0ZW1Db3VudCIsImxlbmd0aCIsInRvdGFsUXVhbnRpdHkiLCJyZWR1Y2UiLCJzdW0iLCJxdWFudGl0eSIsInRvdGFsUHJpY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/cart/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/jwt.ts":
/*!************************!*\
  !*** ./src/lib/jwt.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   signSession: () => (/* binding */ signSession),\n/* harmony export */   verifySession: () => (/* binding */ verifySession)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n\nconst secret = new TextEncoder().encode(process.env.JWT_SECRET || \"dev-only-secret-please-change\");\nasync function signSession(payload) {\n    return new jose__WEBPACK_IMPORTED_MODULE_0__.SignJWT({\n        ...payload\n    }).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(\"7d\").sign(secret);\n}\nasync function verifySession(token) {\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_1__.jwtVerify)(token, secret);\n        return payload;\n    } catch  {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2p3dC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTBDO0FBUTFDLE1BQU1FLFNBQVMsSUFBSUMsY0FBY0MsTUFBTSxDQUNyQ0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUk7QUFHckIsZUFBZUMsWUFBWUMsT0FBdUI7SUFDdkQsT0FBTyxJQUFJVCx5Q0FBT0EsQ0FBQztRQUFFLEdBQUdTLE9BQU87SUFBQyxHQUM3QkMsa0JBQWtCLENBQUM7UUFBRUMsS0FBSztJQUFRLEdBQ2xDQyxXQUFXLEdBQ1hDLGlCQUFpQixDQUFDLE1BQ2xCQyxJQUFJLENBQUNaO0FBQ1Y7QUFFTyxlQUFlYSxjQUNwQkMsS0FBYTtJQUViLElBQUk7UUFDRixNQUFNLEVBQUVQLE9BQU8sRUFBRSxHQUFHLE1BQU1SLCtDQUFTQSxDQUFDZSxPQUFPZDtRQUMzQyxPQUFPTztJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zaXRlLy4vc3JjL2xpYi9qd3QudHM/MTRmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduSldULCBqd3RWZXJpZnkgfSBmcm9tIFwiam9zZVwiO1xuXG5leHBvcnQgdHlwZSBTZXNzaW9uUGF5bG9hZCA9IHtcbiAgdWlkOiBudW1iZXIgfCBudWxsOyAvLyDmma7pgJrnlKjmiLfmnIkgdWlk77yb566h55CG5ZGYL+i2hee6p+euoeeQhuWRmOS4uiBudWxsXG4gIGVtYWlsOiBzdHJpbmc7XG4gIHJvbGU6IFwidXNlclwiIHwgXCJhZG1pblwiIHwgXCJzdXBlclwiO1xufTtcblxuY29uc3Qgc2VjcmV0ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8IFwiZGV2LW9ubHktc2VjcmV0LXBsZWFzZS1jaGFuZ2VcIixcbik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduU2Vzc2lvbihwYXlsb2FkOiBTZXNzaW9uUGF5bG9hZCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgU2lnbkpXVCh7IC4uLnBheWxvYWQgfSlcbiAgICAuc2V0UHJvdGVjdGVkSGVhZGVyKHsgYWxnOiBcIkhTMjU2XCIgfSlcbiAgICAuc2V0SXNzdWVkQXQoKVxuICAgIC5zZXRFeHBpcmF0aW9uVGltZShcIjdkXCIpXG4gICAgLnNpZ24oc2VjcmV0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVNlc3Npb24oXG4gIHRva2VuOiBzdHJpbmcsXG4pOiBQcm9taXNlPFNlc3Npb25QYXlsb2FkIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYXdhaXQgand0VmVyaWZ5KHRva2VuLCBzZWNyZXQpO1xuICAgIHJldHVybiBwYXlsb2FkIGFzIHVua25vd24gYXMgU2Vzc2lvblBheWxvYWQ7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwibmFtZXMiOlsiU2lnbkpXVCIsImp3dFZlcmlmeSIsInNlY3JldCIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJzaWduU2Vzc2lvbiIsInBheWxvYWQiLCJzZXRQcm90ZWN0ZWRIZWFkZXIiLCJhbGciLCJzZXRJc3N1ZWRBdCIsInNldEV4cGlyYXRpb25UaW1lIiwic2lnbiIsInZlcmlmeVNlc3Npb24iLCJ0b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/jwt.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// 开发环境热更新会重复 new PrismaClient，这里用全局单例兜住\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsd0NBQXdDO0FBQ3hDLE1BQU1DLGtCQUFrQkM7QUFFakIsTUFBTUMsU0FBU0YsZ0JBQWdCRSxNQUFNLElBQUksSUFBSUgsd0RBQVlBLEdBQUc7QUFFbkUsSUFBSUksSUFBcUMsRUFBRTtJQUN6Q0gsZ0JBQWdCRSxNQUFNLEdBQUdBO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zaXRlLy4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuLy8g5byA5Y+R546v5aKD54Ot5pu05paw5Lya6YeN5aSNIG5ldyBQcmlzbWFDbGllbnTvvIzov5nph4znlKjlhajlsYDljZXkvovlhZzkvY9cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYT86IFByaXNtYUNsaWVudCB9O1xuXG5leHBvcnQgY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcbn1cbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.ts&appDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flizitao%2FCodes%2Fsites%2Fproduct-site&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();