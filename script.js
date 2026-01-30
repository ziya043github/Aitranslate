document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const transformBtn = document.getElementById('transformBtn');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    transformBtn.addEventListener('click', async () => {
        const text = userInput.value.trim();

        if (!text) {
            alert('Zəhmət olmasa, bir cümlə daxil edin.');
            return;
        }

        // UI Updates for Loading State
        transformBtn.disabled = true;
        resultDiv.classList.add('hidden');
        resultDiv.innerHTML = '';
        loadingDiv.classList.remove('hidden');

        try {
            // Construct the hidden prompt
            const prompt = `Gələn cümlənin mənasını tam eyni saxlayaraq onu ingilis dilində A1, A2, B1, B2, C1 və C2 səviyyələrinə uyğun yenidən yaz. Cavabı yalnız HTML cədvəl formatında (table) qaytar, əlavə heç bir giriş və ya son söz yazma. 
            
            Cümlə: "${text}"`;

            // Call Puter.js AI Chat
            // Using puter.ai.chat(prompt) which is the standard way for v2
            const response = await puter.ai.chat(prompt);

            // Process and Display Result
            // Sometimes AI might wrap the code in markdown code blocks (```html ... ```), we should clean it if necessary
            let htmlContent = response.message.content || response; 
            
            // Basic cleanup if the AI returns markdown code blocks
            htmlContent = htmlContent.replace(/```html/g, '').replace(/```/g, '');

            resultDiv.innerHTML = htmlContent;
            resultDiv.classList.remove('hidden');

        } catch (error) {
            console.error('AI Error:', error);
            resultDiv.innerHTML = `<p style="color: #ef4444; text-align: center;">Xəta baş verdi: ${error.message || 'Bilinməyən xəta'}</p>`;
            resultDiv.classList.remove('hidden');
        } finally {
            // Reset UI State
            loadingDiv.classList.add('hidden');
            transformBtn.disabled = false;
        }
    });
});
