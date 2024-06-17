function generatePassword(length, useLower, useUpper, useDigits, useSymbols) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allCharacters = '';
    if (useLower) allCharacters += lower;
    if (useUpper) allCharacters += upper;
    if (useDigits) allCharacters += digits;
    if (useSymbols) allCharacters += symbols;

    if (!allCharacters) {
        alert('At least one character set must be selected.');
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const char = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        password += char;
    }

    return password;
}

function checkPasswordStrength(password) {
    const strength = {
        0: 'Very Weak',
        1: 'Weak',
        2: 'Fair',
        3: 'Good',
        4: 'Strong'
    };

    let score = 0;
    if (password.length > 6) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/.test(password)) score++;

    return strength[score];
}

document.getElementById('generate').addEventListener('click', () => {
    const length = parseInt(document.getElementById('length').value);
    const useLower = document.getElementById('lowercase').checked;
    const useUpper = document.getElementById('uppercase').checked;
    const useDigits = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    if (length < 4 || length > 20) {
        alert('Password length must be between 4 and 20.');
        return;
    }

    const password = generatePassword(length, useLower, useUpper, useDigits, useSymbols);
    document.getElementById('password').value = password;

    const strength = checkPasswordStrength(password);
    document.getElementById('password-strength').textContent = `Strength: ${strength}`;
});

const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    passwordInput.select();
    document.execCommand('copy');
    copyBtn.classList.add('copied');
    setTimeout(() => {
        copyBtn.classList.remove('copied');
    }, 2000);
});