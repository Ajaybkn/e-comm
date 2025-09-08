import { useEffect } from "react";

export default function Modal({ open, title, onClose, children }) {
	useEffect(() => {
		function onKey(e) {
			if (e.key === "Escape") onClose?.();
		}
		if (open) document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
			<div role="dialog" aria-modal="true" className="absolute inset-0 flex items-center justify-center p-4">
				<div className="w-full max-w-lg bg-white rounded-lg shadow-xl">
					<div className="flex items-center justify-between p-4 border-b">
						<h3 className="text-lg font-semibold">{title}</h3>
						<button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-neutral-100">
							✕
						</button>
					</div>
					<div className="p-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
