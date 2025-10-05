document.getElementById('generate-btn').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    if (!textInput) {
        resultDiv.innerHTML = 'Please enter some text.';
        return;
    }

    resultDiv.innerHTML = '';
    loadingDiv.classList.remove('hidden');

    try {
        const formData = new FormData();
        formData.append('text', textInput);

        const response = await fetch('/analogy', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred.');
        }

        const data = await response.json();
        resultDiv.innerHTML = data.analogy;
    } catch (error) {
        resultDiv.innerHTML = 'An error occurred while generating the analogy.';
        console.error(error);
    } finally {
        loadingDiv.classList.add('hidden');
    }
});
