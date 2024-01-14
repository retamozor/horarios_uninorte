import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const id = "root2";
let root = document.getElementById(id);
if (root === null) {
	root = document.createElement("div");
	root.setAttribute("id", id);
	document.body.appendChild(root);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    errorElement: <></>
  },
  {
    path: "/mihorario/inicio",
    element: <App />,
  },
]);

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
