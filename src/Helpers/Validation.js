function isNullOrWhitespace(input) {
    return !input || !input.trim();
}

const hasDigit = string => /\d/.test(string);
const hasLowerCaseLetter = string => /[a-z]/.test(string);
const hasUpperCaseLetter = string => /[A-Z]/.test(string);
const hasSpecialCharacter = string => /[#$^+=!*()@%&]/.test(string);

function validateUsername(username) {
    if (isNullOrWhitespace(username)) {
        return { message: 'Username is required.', error: true };
    }

    if (username.length > 64) {
        return { message: "Username mustn't be longer than 64 characters", error: true };
    }

    return { error: false, message: '' };
}

function validateNickname(nickname) {
    if (isNullOrWhitespace(nickname)) {
        return { message: 'Nickname is required.', error: true };
    }

    if (nickname.length > 64) {
        return { message: "Nickname mustn't be longer than 64 characters", error: true };
    }

    return { error: false, message: '' };
}

function validatePassword(password) {
    if (isNullOrWhitespace(password)) {
        return { message: 'Password is required.', error: true };
    }

    if (password.length < 8) {
        return { message: 'Password must be at least 8 characters long.', error: true };
    }

    if (password.length > 512) {
        return { message: "Password mustn't be longer than 512 characters.", error: true };
    }

    if (!hasDigit(password)) {
        return { message: 'Password must contain at least one digit.', error: true };
    }

    if (!hasLowerCaseLetter(password)) {
        return { message: 'Password must contain at least one lower case letter.', error: true };
    }

    if (!hasUpperCaseLetter(password)) {
        return { message: 'Password must contain at least one upper case letter.', error: true };
    }

    if (!hasSpecialCharacter(password)) {
        return { message: 'Password must contain at least one special character.', error: true };
    }

    return { error: false, message: '' };
}

export { validateUsername, validateNickname, validatePassword };