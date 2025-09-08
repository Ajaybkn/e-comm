import { Link, useLocation } from "react-router-dom";

export default function Nav({ user, onLogout }) {
	const { pathname } = useLocation();
	const LinkBtn = ({ to, children }) => (
		<Link
			to={to}
			className={`px-3 py-1.5 rounded-md text-sm font-medium ${
				pathname === to ? "bg-neutral-900 text-white" : "text-neutral-800 hover:bg-neutral-200"
			}`}
		>
			{children}
		</Link>
	);
	return (
		<header className="border-b bg-white">
			<nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-lg">MiniShop</span>
					<LinkBtn to="/">Products</LinkBtn>
					{user?.role === "admin" && <LinkBtn to="/admin">Admin</LinkBtn>}
				</div>
				<div className="flex items-center gap-2">
					{!user && (
						<>
							<LinkBtn to="/login">Login</LinkBtn>
							<LinkBtn to="/register">Register</LinkBtn>
						</>
					)}
					{user && (
						<>
							<span className="text-sm text-neutral-600 hidden sm:inline">
								{user.email} ({user.role})
							</span>
							<button
								onClick={onLogout}
								className="px-3 py-1.5 cursor-pointer rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
							>
								Logout
							</button>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
