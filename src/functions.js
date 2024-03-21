export const handlePaste = (event, setValue) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain').slice(0, 10);
    const onlyNumbers = pastedText.replace(/\D/g, ''); // Remove non-digit characters
    setValue(onlyNumbers);
};

export const handleChange = (event, setValue) => {
    const inputValue = event.target.value;
    const onlyNumbers = inputValue.replace(/\D/g, ''); // Remove non-digit characters
    setValue(onlyNumbers.slice(0, 10)); // Limit to 10 digits
};

export const redirectToHome = () => {
    window.location.reload()
}