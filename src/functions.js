export const handlePaste = (event, setValue) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain').slice(0, 10);
    const onlyNumbers = pastedText.replace(/\D/g, ''); // Remove non-digit characters
    setValue(onlyNumbers);
};

export const handleChange = (event, setValue, setPhoneError) => {
    const inputValue = event.target.value;
    const onlyNumbers = inputValue.replace(/\D/g, ''); // Remove non-digit characters
    setValue(onlyNumbers.slice(0, 10)); // Limit to 10 digits
    if (onlyNumbers.length !== 10) {
        setPhoneError(true)
    } else if (/^[0-5]/.test(onlyNumbers)) {
        // Handle the error
        setPhoneError(true);
    } else {
        // Clear the error if the input is valid
        setPhoneError(false);
    }
};

export const onPhoneBlur = (event, setPhoneError) => {
    const inputValue = event.target.value;
    const onlyNumbers = inputValue.replace(/\D/g, ''); // Remove non-digit characters

    // Check if the first character falls between 0 and 5
    if (onlyNumbers.length !== 10) {
        setPhoneError(true)
    } else if (/^[0-5]/.test(onlyNumbers)) {
        // Handle the error
        setPhoneError(true);
    } else {
        // Clear the error if the input is valid
        setPhoneError(false);
    }
}


export const redirectToHome = () => {
    window.location.reload()
}


export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{10})$/);

    if (match) {
        const formatted = match[1].replace(/^(\d{3})(\d{3})(\d{4})$/, '+91 $1 $2 $3');
        return formatted;
    } else {
        // If input is not exactly 10 digits, return with the country code prefix
        return '+91 ' + cleaned.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
    }
};