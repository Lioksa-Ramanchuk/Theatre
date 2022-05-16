// Текущая вкладка меню
document.querySelector('a#menu__page-link-to-news').classList.add('you-are-here')

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

// Получение новостной информации
xmlhttp.open('GET','../xml/news_list.xml', false)
xmlhttp.send()
xmlDocNewsList = xmlhttp.responseXML

// Получение шаблона структуры новости
xmlhttp.open('GET', '../html_models/news_news_block.html', false)
xmlhttp.send()
newsBlock = xmlhttp.responseText

// Вставка новостей на страницу
let nNews = xmlDocNewsList.querySelectorAll('news').length
for (let i = nNews - 1; i >= 0; i--) {
    // Метка перед новостью
    let newsLink = document.createElement('a')
    newsLink.setAttribute('name', `news${i}`)
    newsLink.classList.add('main__news-article__link-to-news')
    document.querySelector('article.main__news-article').appendChild(newsLink)
    // Заполнение новостного блока
    let xmlNewsBlock = xmlDocNewsList.querySelectorAll('news')[i]
    let newNewsBlock = document.createElement('div')
    newNewsBlock.innerHTML = newsBlock
    newNewsBlock.querySelector('h2.news-block__title').innerHTML =
        xmlNewsBlock.querySelector('title').childNodes[0].nodeValue
    newNewsBlock.querySelector('figure.news-block__image img').setAttribute('src',
        xmlNewsBlock.querySelector('image').childNodes[0].nodeValue)
    newNewsBlock.querySelector('p.news-block__date').innerHTML =
        xmlNewsBlock.querySelector('date').childNodes[0].nodeValue
    let newsDate = newNewsBlock.querySelector('p.news-block__date')
    let nParagraphs = xmlNewsBlock.querySelectorAll('paragraph').length
    for (let j = 0; j < nParagraphs; j++) {
        let pPar = document.createElement('p')
        pPar.classList.add('news-block__text')
        pPar.innerHTML = xmlNewsBlock.querySelectorAll('paragraph')[j].childNodes[0].nodeValue
        newNewsBlock.querySelector('article.news-block').insertBefore(pPar, newsDate)
    }
    // Вставка новостного блока на страницу
    document.querySelector('article.main__news-article').appendChild(
        newNewsBlock.querySelector('article.news-block'))
}