import { useEffect, useState } from "react";
import { api } from "../api/http";
import ProductList from "../components/ProductList";

export default function Products() {
	const [items, setItems] = useState([]);
	const [err, setErr] = useState("");

	const load = async () => {
		setErr("");
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

	return (
		<div>
			<h1 className="text-xl font-semibold mb-4">Products</h1>
			{err && <div className="text-red-600 text-sm mb-3">{err}</div>}
			<ProductList items={items} isAdmin={false} />
		</div>
	);
}
