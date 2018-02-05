const apiKey = "28b6d2ae99694fecad39eb2a58e6830d"; 
const defaultSource = "al-jazeera-english";

const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');


window.addEventListener('load', async e => {
    updateNews();
    await updateSelector();
    sourceSelector.value = defaultSource;
    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed')
        }
    }
})

async function updateSelector() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await res.json();
    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}" alt="${article.title}">
                <p>${article.description}</p>
            </a>
         </div>
        `;
}