import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/http";

export default function Login({ onLogin }) {
	const nav = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setErr("");
		setLoading(true);
		try {
			const user = await api("/auth/login", { method: "POST", body: form });
			onLogin(user); // {id,email,role}
			nav("/");
		} catch (e2) {
			setErr(e2.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-xl font-semibold mb-4">Welcome back</h1>
			<form onSubmit={submit} className="space-y-3 bg-white p-4 rounded-lg border">
				{err && <div className="text-red-600 text-sm">{err}</div>}
				<input
					type="email"
					placeholder="Email"
					value={form.email}
					onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
					required
					className="border rounded-md px-3 py-2 w-full"
				/>
				<input
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
					required
					className="border rounded-md px-3 py-2 w-full"
				/>
				<button
					disabled={loading}
					className="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
				>
					{loading ? "Please wait…" : "Login"}
				</button>
			</form>
		</div>
	);
}
