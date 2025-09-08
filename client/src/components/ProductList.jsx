export default function ProductList({ items = [], onEdit, onDelete, isAdmin }) {
	if (!items.length) {
		return <div className="text-neutral-500">No products found.</div>;
	}
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
			{items.map((p) => (
				<li key={p.id} className="bg-white border rounded-lg p-4">
					<div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
						{/* <img src={p.thumbnail} alt={p.name} className="w-full h-48 object-cover" /> */}

						<div className="p-4 flex flex-col justify-between h-48">
							<div>
								<h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
								<p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.description}</p>
							</div>

							<div className="mt-4 flex items-center justify-between">
								<span className="text-xl font-bold text-green-600">₹{Number(p.price).toFixed(2)}</span>
								<span className="text-sm text-gray-500">Stock: {p.stock}</span>
							</div>
						</div>
					</div>

					{isAdmin && (
						<div className="mt-3 flex gap-2">
							<button
								onClick={() => onEdit(p)}
								className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
							>
								Edit
							</button>
							<button
								onClick={() => onDelete(p)}
								className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
							>
								Delete
							</button>
						</div>
					)}
				</li>
			))}
		</ul>
	);
}
