const BASE = "http://localhost:3000/api";

export async function api(path, { method = "GET", body, headers = {} } = {}) {
	const res = await fetch(`${BASE}${path}`, {
		method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	if (!res.ok) {
		let msg = "Request failed";
		try {
			const data = await res.json();
			msg = data.error || msg;
		} catch {
			console.log("error");
		}
		throw new Error(msg);
	}

	if (res.status === 204) return null;
	return res.json();
}
