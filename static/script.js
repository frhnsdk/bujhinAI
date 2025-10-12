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

        // Ask user for caption using a simple prompt.
        const caption = window.prompt('Enter caption for the PDF (this will be used as the title and part of the filename):', '');
        // If user pressed cancel, caption will be null -> abort.
        if (caption === null) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const resultDiv = document.getElementById('result');
        const resultText = resultDiv.innerText || '';
        const inputText = document.getElementById('text-input').value || '';

        if (!resultText.trim()) {
            alert('There is no analogy to download.');
            return;
        }

        // Layout parameters
        const margin = 10;
        const maxLineWidth = 180; // approximate width for splitTextToSize
        let cursorY = 10;
        const lineHeight = 8;

        // Helper: add text with automatic page breaks
        function addLines(lines) {
            for (let i = 0; i < lines.length; i++) {
                // add page if needed
                const pageHeight = doc.internal.pageSize.getHeight();
                if (cursorY + lineHeight > pageHeight - margin) {
                    doc.addPage();
                    cursorY = margin;
                }
                doc.text(lines[i], margin, cursorY);
                cursorY += lineHeight;
            }
        }

        // 1. Caption
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        addLines(doc.splitTextToSize('1. Caption', maxLineWidth));
        doc.setFont('helvetica', 'normal');
        cursorY += 2;
        addLines(doc.splitTextToSize(caption || ' ', maxLineWidth));

        cursorY += 6;
        // 2. Definition (use input as definition)
        doc.setFont('helvetica', 'bold');
        addLines(doc.splitTextToSize('2. Definition', maxLineWidth));
        doc.setFont('helvetica', 'normal');
        cursorY += 2;
        addLines(doc.splitTextToSize(inputText || ' ', maxLineWidth));

        cursorY += 6;
        // 3. Generated response
        doc.setFont('helvetica', 'bold');
        addLines(doc.splitTextToSize('3. Generated response', maxLineWidth));
        doc.setFont('helvetica', 'normal');
        cursorY += 2;
        addLines(doc.splitTextToSize(resultText || ' ', maxLineWidth));

        // sanitize filename
        const safe = (caption || 'download').replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 60) || 'download';
        const filename = `${safe}_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;

        doc.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF.');
    }
});
