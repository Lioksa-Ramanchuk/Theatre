// Текущая вкладка меню
document.querySelector('a#menu__page-link-to-theatre').classList.add('you-are-here')

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

// Получение галереи
xmlhttp.open('GET','../xml/gallery_images_list.xml', false)
xmlhttp.send()
xmlDocGallery = xmlhttp.responseXML

var images = xmlDocGallery.querySelectorAll('image')
var imageIndex = 1
showImage(imageIndex)

// Функция определения фонового изображения
function showImage(n) {
    if (n > images.length) {imageIndex = 1}
    if (n < 1) {imageIndex = images.length}
    imgSource = images[imageIndex - 1].childNodes[0].nodeValue
    document.querySelector('figure.gallery').setAttribute('style', `background-image: url(${imgSource});`)
}

// Функция для получения следующего (предыдущего) фонового изображения
function nextImage(n) {
    showImage(imageIndex += n)
}

// Представления
xmlhttp.open('GET','../xml/performances_info.xml', false)
xmlhttp.send()
xmlDocPerformancesInfo = xmlhttp.responseXML

xmlhttp.open('GET','../html_models/main_perf_block.html', false)
xmlhttp.send()
mainPerfBlock = xmlhttp.responseText

var nPerformances = xmlDocPerformancesInfo.querySelectorAll('performance').length
for (let i = 0; (i < 6) && (i < nPerformances); i++)
{
    let newPerfBlock = document.createElement('div')
    newPerfBlock.innerHTML = mainPerfBlock
    let xmlPerfBlock = xmlDocPerformancesInfo.querySelectorAll('performance')[i]
    newPerfBlock.querySelector('a.performance-block').setAttribute('href',
        `theatre-performances.html#performance${i}`)
    newPerfBlock.querySelector('figure.performance-block__image img').setAttribute('src',
        xmlPerfBlock.querySelector('image').childNodes[0].nodeValue)
    newPerfBlock.querySelector('p.performance-block__name').innerHTML =
        xmlPerfBlock.querySelector('name').childNodes[0].nodeValue +
        " (" + xmlPerfBlock.querySelector('age').childNodes[0].nodeValue + "+)"
    newPerfBlock.querySelector('p.performance-block__author').innerHTML =
        xmlPerfBlock.querySelector('author').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__description').innerHTML =
        xmlPerfBlock.querySelector('description').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__date').innerHTML =
        xmlPerfBlock.querySelector('date').childNodes[0].nodeValue
    document.querySelector('div.main__performances-article__div').appendChild(
        newPerfBlock.querySelector('a.performance-block'))
}

// Новости
xmlhttp.open('GET','../xml/news_list.xml', false)
xmlhttp.send()
xmlDocNewsList = xmlhttp.responseXML

xmlhttp.open('GET','../html_models/main_news_block.html', false)
xmlhttp.send()
mainNewsBlock = xmlhttp.responseText

let nNews = xmlDocNewsList.querySelectorAll('news').length
for (let i = nNews - 1, j = 0; (i >= 0) && (j < 2); i--, j++)
{
    let newNewsBlock = document.createElement('div')
    newNewsBlock.innerHTML = mainNewsBlock
    let xmlNewsBlock = xmlDocNewsList.querySelectorAll('news')[i]
    newNewsBlock.querySelector('a.news-block').setAttribute('href',
        `theatre-news.html#news${i}`)
    newNewsBlock.querySelector('p.news-block__date').innerHTML =
        xmlNewsBlock.querySelector('date').childNodes[0].nodeValue
    newNewsBlock.querySelector('h2.news-block__title').innerHTML =
        xmlNewsBlock.querySelector('title').childNodes[0].nodeValue
    newNewsBlock.querySelector('p.news-block__text').innerHTML =
        xmlNewsBlock.querySelector('paragraph').childNodes[0].nodeValue
    document.querySelector('div.main__news-article__div').appendChild(
        newNewsBlock.querySelector('a.news-block'))
}

// Форма обратной связи
xmlhttp.open('GET','../html_models/feedback_form.html', false)
xmlhttp.send()
document.querySelector('article.main__feedback-article').innerHTML += xmlhttp.responseText