let uploadedFile;
let macroParts = [];

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    uploadedFile = fileInput.files[0];
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result;
        document.getElementById('editor').value = content;
        displayMacroParts(content);
    };
    reader.readAsText(uploadedFile);
}

function displayMacroParts(content) {
    const lines = content.split('\n');
    const macroContentDiv = document.getElementById('macroContent');
    macroContentDiv.innerHTML = '';

    lines.forEach((line, index) => {
        const parts = line.split('\t');
        if (parts.length > 1) {
            const partDescription = parts[1].trim();
            const part = parts[0].trim();
            const partDiv = document.createElement('div');
            partDiv.classList.add('macro-part');
            partDiv.textContent = part;
            partDiv.title = partDescription;
            partDiv.onclick = () => {
                document.getElementById('editor').setSelectionRange(macroParts[index].start, macroParts[index].end);
            };
            macroContentDiv.appendChild(partDiv);
            macroParts.push({ start: line.indexOf(part), end: line.indexOf(part) + part.length });
        }
    });
}

function enableEditing() {
    document.getElementById('editor').readOnly = false;
}

function saveChanges() {
    if (!uploadedFile) {
        alert('Please upload a file first.');
        return;
    }

    const editedContent = document.getElementById('editor').value;
    const editedFile = new Blob([editedContent], { type: 'text/plain' });
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = window.URL.createObjectURL(editedFile);
    downloadLink.style.display = 'block';
}
