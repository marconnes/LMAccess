import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* Mais rotas aqui */}
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
