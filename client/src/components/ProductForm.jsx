import { useState } from "react";

export default function ProductForm({ initial, onSubmit, submitLabel = "Save" }) {
	const [form, setForm] = useState(initial || { name: "", description: "", price: "", stock: "" });
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErr("");
		setLoading(true);
		try {
			await onSubmit({
				...form,
				price: Number(form.price),
				stock: Number(form.stock),
			});
			// Reset if creating new
			if (!initial) setForm({ name: "", description: "", price: "", stock: "" });
		} catch (e2) {
			setErr(e2.message || "Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg border">
			{err && <div className="text-red-600 text-sm">{err}</div>}
			<div className="grid sm:grid-cols-2 gap-3">
				<input
					name="name"
					placeholder="Name"
					value={form.name}
					onChange={handleChange}
					className="border rounded-md px-3 py-2 w-full"
					required
				/>
				<input
					name="price"
					type="number"
					step="0.01"
					placeholder="Price"
					value={form.price}
					onChange={handleChange}
					className="border rounded-md px-3 py-2 w-full"
					required
				/>
			</div>
			<div className="grid sm:grid-cols-2 gap-3">
				<input
					name="stock"
					type="number"
					placeholder="Stock"
					value={form.stock}
					onChange={handleChange}
					className="border rounded-md px-3 py-2 w-full"
					required
				/>
				<input
					name="description"
					placeholder="Description"
					value={form.description}
					onChange={handleChange}
					className="border rounded-md px-3 py-2 w-full"
					required
				/>
			</div>
			<button
				disabled={loading}
				className="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
			>
				{loading ? "Please wait…" : submitLabel}
			</button>
		</form>
	);
}
