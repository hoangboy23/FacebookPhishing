import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Submit from "./pages/Submit";
import Verify from "./pages/Verify";
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/home' element={<Home />} />
				<Route path='/verify' element={<Verify />} />
				<Route path='/submit' element={<Submit />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
