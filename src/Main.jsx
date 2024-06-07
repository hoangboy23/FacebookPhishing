import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});
document.addEventListener("copy", (e) => {
	e.preventDefault();
});
ReactDOM.createRoot(document.getElementById("root")).render(
	<div>
		<App />
		<ToastContainer autoClose={1500} draggable closeOnClick />
	</div>,
);
