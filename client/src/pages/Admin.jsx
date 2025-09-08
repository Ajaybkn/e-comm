import { useEffect, useState, useMemo } from "react";
import { api } from "../api/http";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";

export default function Admin() {
	const [items, setItems] = useState([]);
	const [err, setErr] = useState("");

	// Modal state
	const [isOpen, setOpen] = useState(false);
	const [mode, setMode] = useState("create"); // 'create' | 'edit'
	const [current, setCurrent] = useState(null); // product being edited

	const title = useMemo(() => (mode === "edit" ? "Edit product" : "Add product"), [mode]);

	const load = async () => {
		try {
			const data = await api("/products");
			setItems(data);
		} catch (e) {
			setErr(e.message);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const openCreate = () => {
		setMode("create");
		setCurrent(null);
		setOpen(true);
	};

	const openEdit = (p) => {
		setMode("edit");
		setCurrent(p);
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
		setCurrent(null);
	};

	const createProduct = async (payload) => {
		await api("/products", { method: "POST", body: payload });
		await load();
		closeModal();
	};

	const updateProduct = async (payload) => {
		await api(`/products/${current.id}`, { method: "PUT", body: payload });
		await load();
		closeModal();
	};

	const deleteProduct = async (p) => {
		if (!confirm(`Delete ${p.name}?`)) return;
		await api(`/products/${p.id}`, { method: "DELETE" });
		await load();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Admin</h1>
				<button onClick={openCreate} className="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">
					+ Add product
				</button>
			</div>

			{err && <div className="text-red-600 text-sm">{err}</div>}

			<div>
				<h2 className="font-medium mb-2">All products</h2>
				<ProductList items={items} isAdmin onEdit={openEdit} onDelete={deleteProduct} />
			</div>

			<Modal open={isOpen} title={title} onClose={closeModal}>
				{mode === "edit" ? (
					<ProductForm initial={current} onSubmit={updateProduct} submitLabel="Update" />
				) : (
					<ProductForm onSubmit={createProduct} submitLabel="Create" />
				)}
			</Modal>
		</div>
	);
}
