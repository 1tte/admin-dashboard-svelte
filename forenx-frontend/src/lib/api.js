export const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (name, email, password) => {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    return res.json();
};

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const getMe = async (token) => {
    const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token in the request
        },
    });

    return res.json();
};
