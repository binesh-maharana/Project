const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const convertButton = document.getElementById('convertBtn');

convertButton.addEventListener('click', () => {
    const celsiusValue = parseFloat(celsiusInput.value);
    const fahrenheitValue = (celsiusValue * 9/5) + 32;
    
    fahrenheitInput.value = fahrenheitValue.toFixed(2);
});

fahrenheitInput.addEventListener('input', () => {
    const fahrenheitValue = parseFloat(fahrenheitInput.value);
    const celsiusValue = (fahrenheitValue - 32) * 5/9;
    
    celsiusInput.value = celsiusValue.toFixed(2);
});
