import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ParentGate-Tlgf8oSd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Ebeveyn kontrolü: 13 yaş altı kullanıcıda satın alma ekranı açılmadan önce
* bir yetişkinin çözebileceği basit bir çarpma sorusu sorar.
*/
function ParentGate({ tr, onPass, onCancel }) {
	const [a, b] = (0, import_react.useMemo)(() => [12 + Math.floor(Math.random() * 8), 6 + Math.floor(Math.random() * 4)], []);
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [wrong, setWrong] = (0, import_react.useState)(false);
	const check = () => {
		if (Number(answer) === a * b) onPass();
		else setWrong(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[90] grid place-items-center bg-background/90 p-6",
		role: "dialog",
		"aria-label": tr ? "Ebeveyn kontrolü" : "Parent check",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-3xl border bg-card p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: tr ? "Bir yetişkine sor" : "Ask a grown-up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: tr ? "Satın alma için bir yetişkinin bu soruyu cevaplaması gerekir." : "A grown-up needs to answer this question to make a purchase."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-display text-3xl font-bold text-gold",
					children: [
						a,
						" × ",
						b,
						" = ?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: answer,
					onChange: (e) => {
						setAnswer(e.target.value.replace(/\D/g, ""));
						setWrong(false);
					},
					inputMode: "numeric",
					"aria-label": tr ? "Cevap" : "Answer",
					className: "mt-4 w-full rounded-2xl border bg-background px-4 py-3 text-center text-lg"
				}),
				wrong && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-destructive",
					children: tr ? "Cevap doğru değil." : "That is not correct."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCancel,
						className: "rounded-full border py-3 text-sm font-semibold",
						children: tr ? "Vazgeç" : "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: check,
						disabled: !answer,
						className: "rounded-full bg-neon py-3 text-sm font-bold text-primary-foreground disabled:opacity-50",
						children: tr ? "Devam" : "Continue"
					})]
				})
			]
		})
	});
}
//#endregion
export { ParentGate as t };
