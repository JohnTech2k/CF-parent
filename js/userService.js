import { db, ref, set, get, child } from "./db.js";

/**
 * Create a user with a unique ID
 */
export const createUser = async (userId, name = "") => {
    if (!userId) throw new Error("User ID is required.");

    const cleanId = userId.trim().toLowerCase();
    const dbRef = ref(db);

    // Check if user already exists
    const snapshot = await get(child(dbRef, `users/${cleanId}`));
    if (snapshot.exists()) {
        throw new Error("User ID already exists.");
    }

    const userData = {
        name: name,
        createdAt: Date.now()
    };

    await set(ref(db, `users/${cleanId}`), userData);
    console.log("User created successfully:", cleanId);
    return { id: cleanId, ...userData };
};

/**
 * Custom ID Login System
 */
export const loginUser = async (userId) => {
    if (!userId) throw new Error("Please enter an ID.");

    const cleanId = userId.trim().toLowerCase();
    const userData = await getUserData(cleanId);

    if (!userData) {
        throw new Error("User not found.");
    }

    // Store session locally
    localStorage.setItem("cfp_session", JSON.stringify({
        id: cleanId,
        ...userData
    }));

    console.log("Login success:", cleanId);
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