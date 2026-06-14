import { createUser, loginUser } from './userService.js';

const statusMsg = (text, isError = false) => {
    console.log(isError ? "Error: " : "Info: ", text);
    // You can extend this to update a specific <div> in your UI
    alert(text);
};

/**
 * Example Login Handler
 */
export const handleLogin = async () => {
    const idInput = document.getElementById("userIdInput");
    if (!idInput) return;

    try {
        const user = await loginUser(idInput.value);
        statusMsg(`Login Successful! Welcome ${user.name}`);
        window.location.href = "dashboard.html";
    } catch (error) {
        statusMsg(error.message, true);
    }
};

/**
 * Example Create User Handler
 */
export const handleCreateUser = async () => {
    const idInput = document.getElementById("userIdInput");
    const nameInput = document.getElementById("userNameInput");
    if (!idInput || !nameInput) return;

    try {
        await createUser(idInput.value, nameInput.value);
        statusMsg("Account created successfully. You can now login.");
    } catch (error) {
        statusMsg(error.message, true);
    }
};

// Initialize listeners if needed...