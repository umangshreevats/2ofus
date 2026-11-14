
export const validateSignup = (
    username: string,
    email: string,
    password: string
): string | null => {

    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(cleanUsername)) {
        return "Username must be 3–20 characters and contain only letters, numbers, and underscores.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
        return "Please enter a valid email address.";
    }

    // Password validation
    if (password.length < 8) {
        return "Password must contain at least 8 characters.";
    }


    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number.";
    }

    return null;
};
