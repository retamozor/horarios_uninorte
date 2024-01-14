import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const id = "root2";
let root = document.getElementById(id);
if (root === null) {
	root = document.createElement("div");
	root.setAttribute("id", id);
	document.body.appendChild(root);
}


ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
