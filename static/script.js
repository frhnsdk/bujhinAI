document.getElementById('generate-btn').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const downloadBtn = document.getElementById('download-pdf-btn');

    if (!textInput) {
        resultDiv.innerHTML = 'Please enter some text.';
        return;
    }

    resultDiv.innerHTML = '';
    loadingDiv.classList.remove('hidden');
    downloadBtn.classList.add('hidden');

    try {
        const formData = new FormData();
        formData.append('text', textInput);

        console.log('Fetching analogy...');
        const response = await fetch('/analogy', {
            method: 'POST',
            body: formData
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`An error occurred: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Analogy data:', data);
        resultDiv.innerHTML = data.analogy;
        downloadBtn.classList.remove('hidden');
        console.log('Download button should be visible now.');
    } catch (error) {
        resultDiv.innerHTML = 'An error occurred while generating the analogy.';
        console.error('Error fetching or processing analogy:', error);
    } finally {
        loadingDiv.classList.add('hidden');
    }
});

document.getElementById('download-pdf-btn').addEventListener('click', () => {
    try {
        if (window.jspdf === undefined) {
            console.error('jsPDF library not found.');
            alert('Error: jsPDF library not found.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const resultDiv = document.getElementById('result');
        const resultText = resultDiv.innerText;

        if (!resultText.trim()) {
            alert('There is no analogy to download.');
            return;
        }

        const splitText = doc.splitTextToSize(resultText, 180);
        doc.text(splitText, 10, 10);
        doc.save('analogy.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF.');
    }
});
