import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import Admin from "./pages/Admin.jsx";
import { api } from "./api/http.js";

export default function App() {
	const [user, setUser] = useState(null);
	const [booting, setBooting] = useState(true);
	const onLogout = async () => {
		try {
			await api("/auth/logout", { method: "POST" });
		} catch {
			console.log("error");
		}
		setUser(null);
	};
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const me = await api("/auth/me");
				if (mounted) setUser(me);
			} catch {
				// no session;
			} finally {
				if (mounted) setBooting(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);
	if (booting) {
		return <div className="min-h-screen grid place-items-center">Loading…</div>;
	}
	return (
		<div className="min-h-screen bg-neutral-50 text-neutral-900">
			<Nav user={user} onLogout={onLogout} />
			<div className="max-w-6xl mx-auto px-4 py-6">
				<Routes>
					<Route path="/" element={<Products />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login onLogin={setUser} />} />
					<Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to="/login" replace />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</div>
		</div>
	);
}
