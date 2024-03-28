export const handlePaste = (event, setValue, setPhoneError) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain');
    const modifiedValue = pastedText?.replace(/\D/g, '');
    let truncatedValue = modifiedValue?.replace(/^0+/, "");

    if (truncatedValue?.startsWith("+91") && truncatedValue?.length > 12) {
      truncatedValue = truncatedValue?.slice(3);
    } else if (truncatedValue?.startsWith("91") && truncatedValue?.length >= 12) {
      truncatedValue = truncatedValue?.slice(2);
    }
    truncatedValue = truncatedValue?.slice(0, 10);
    setValue(truncatedValue);
    if (truncatedValue.length !== 10) {
        setPhoneError(true)
    } else if (/^[0-5]/.test(truncatedValue)) {
        // Handle the error
        setPhoneError(true);
    } else {
        // Clear the error if the input is valid
        setPhoneError(false);
    }
};

export const handleChange = (event, setValue, setPhoneError) => {
    const modifiedValue = event.target.value?.replace(/\D/g, '');
    let truncatedValue = modifiedValue?.replace(/^0+/, "");
   
    if (truncatedValue?.startsWith("+91") && truncatedValue?.length > 12) {
      truncatedValue = truncatedValue?.slice(3);
    } else if (truncatedValue?.startsWith("91") && truncatedValue?.length >= 12) {
      truncatedValue = truncatedValue?.slice(2);
    }
    truncatedValue = truncatedValue?.slice(0, 10);

    setValue(truncatedValue); // Limit to 10 digits
    if (truncatedValue.length !== 10) {
        setPhoneError(true)
    } else if (/^[0-5]/.test(truncatedValue)) {
        // Handle the error
        setPhoneError(true);
    } else {
        // Clear the error if the input is valid
        setPhoneError(false);
    }
};

export const onPhoneBlur = (event, setValue, setPhoneError) => {
   handleChange(event, setValue, setPhoneError)
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