import { db, ref, set, get, child } from "./db.js";

/**
 * Create a user with a unique ID
 */
export const createUser = async (userId, name) => {
    if (!userId || !userId.trim()) throw new Error("User ID is required.");
    if (!name || !name.trim()) throw new Error("Name is required.");

    const cleanId = userId.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await getUserData(cleanId);
    if (existingUser) {
        throw new Error("User ID already taken.");
    }

    const userData = {
        name: name.trim(),
        createdAt: Date.now()
    };

    await set(ref(db, `users/${cleanId}`), userData);
    return { id: cleanId, ...userData };
};

/**
 * Custom ID Login System
 */
export const loginUser = async (userId) => {
    if (!userId || !userId.trim()) throw new Error("Please enter a User ID.");

    const cleanId = userId.trim().toLowerCase();
    const userData = await getUserData(cleanId);

    if (!userData) {
        throw new Error("User not found.");
    }

    // Store session locally for dashboard use
    localStorage.setItem("cfp_session", JSON.stringify({
        id: cleanId,
        name: userData.name
    }));

    return { id: cleanId, ...userData };
};

/**
 * Get user data by ID
 */
export const getUserData = async (userId) => {
    const cleanId = userId.trim().toLowerCase();
    const snapshot = await get(child(ref(db), `users/${cleanId}`));
    return snapshot.exists() ? snapshot.val() : null;
};