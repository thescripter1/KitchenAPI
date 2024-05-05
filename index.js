




const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const PORT = 8080;

async function getWebsiteSource(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    
    try {
        await page.goto(url, { ignoreHTTPSErrors: true, timeout: 60000, waitUntil: 'domcontentloaded' });

        const sourceCode = await page.content();
        return sourceCode;
    } catch (error) {
        throw new Error(`Error navigating to ${url}: ${error.message}`);
    } finally {
        await browser.close();
    }
}

app.get('/source/:url(*)', (req, res) => {
    const { url } = req.params;

    getWebsiteSource(url)
        .then(source => {
            //console.log(source);
            const conten = giveContentBack(source, url); // Annahme: askgpt() gibt die JSON-Antwort zurück
            //console.log("LAbeberrabarer"+gptResponse+"Ende")
            res.status(200).send(conten);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Seite:', error);
  });
});

app.get('/prompt/:prompt', (req, res) => {
    const { prompt } = req. params;
    const antwort = askgpt(prompt);

    res.status(200).send(antwort);
});



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

function giveContentBack(html) {
    const example_json = {
        "Titel": html,
    }
    return(example_json)
}


function askgpt(prompt) {
    const example_json = {
        "Promt": prompt
    };
    
    return example_json;
}

