const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,720'],
            defaultViewport: {
                width: 1280,
                height: 720,
                deviceScaleFactor: 2
            }
        });
        const page = await browser.newPage();

        console.log('Navigating to pitch deck...');
        // Ensure server is running on 3001
        await page.goto('http://localhost:3001/pitch-deck', { waitUntil: 'domcontentloaded', timeout: 120000 });

        // Wait for carousel container
        await page.waitForSelector('[data-slot="carousel-content"]', { timeout: 30000 });

        // Wait a bit for images/fonts
        await new Promise(r => setTimeout(r, 2000));

        // Get total slides
        // Based on page.tsx: <div ...><span>{current}</span><span>/</span><span>{count}</span></div>
        const totalSlides = await page.evaluate(() => {
            // Find the element containing the slide count (it's the last span in the tabular-nums div)
            const countSpan = document.querySelector('.tabular-nums span:last-child');
            return countSpan ? parseInt(countSpan.textContent) : 0;
        });

        console.log(`Found ${totalSlides} slides.`);
        if (totalSlides === 0) {
            console.error('Could not detect total slides. Exiting.');
            await browser.close();
            return;
        }

        const pdfDoc = await PDFDocument.create();

        // Controls selector (using the data attribute we added)
        const controlsSelector = '[data-slide-controls="true"]';

        // Hide controls globally first (opacity 0 keeps it interactive but invisible)
        await page.addStyleTag({ content: `${controlsSelector} { opacity: 0 !important; }` });

        // Focus the body/carousel to ensure keyboard events work
        await page.click('body');

        for (let i = 0; i < totalSlides; i++) {
            console.log(`Processing slide ${i + 1}/${totalSlides}...`);

            // Wait for any animation
            await new Promise(r => setTimeout(r, 2000));

            // Screenshot
            const screenshotBuffer = await page.screenshot({
                fullPage: false, // viewport is 1920x1080
                omitBackground: true
            });

            // Add to PDF
            const image = await pdfDoc.embedPng(screenshotBuffer);
            const pagePdf = pdfDoc.addPage([1280, 720]);
            pagePdf.drawImage(image, {
                x: 0,
                y: 0,
                width: 1280,
                height: 720,
            });

            // Navigate Next using exposed API
            if (i < totalSlides - 1) {
                // @ts-ignore
                await page.evaluate(() => {
                    if (window.pitchDeckApi) {
                        window.pitchDeckApi.scrollNext();
                    }
                });
            }
        }

        // Save PDF
        const pdfBytes = await pdfDoc.save();
        const outputPath = path.resolve(process.cwd(), 'pitch-deck.pdf');
        fs.writeFileSync(outputPath, pdfBytes);

        console.log(`Success! PDF saved to: ${outputPath}`);

        await browser.close();

    } catch (e) {
        console.error('Error generating PDF:', e);
        process.exit(1);
    }
})();
