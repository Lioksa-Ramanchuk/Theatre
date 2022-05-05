//=== Текущая вкладка меню ===

document.querySelector('a#menu__page-link-to-theatre').classList.add('you-are-here')


//=== Для запросов =====

if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

//=== Галерея ==========

xmlhttp.open('GET','../xml/gallery_images_list.xml', false)
xmlhttp.send()
xmlDocGallery = xmlhttp.responseXML

var slides = xmlDocGallery.querySelectorAll('image')

var slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function showSlides(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  imgSource = slides[slideIndex - 1].childNodes[0].nodeValue
  document.querySelector('.gallery').setAttribute('style', `background-image: url(${imgSource});`)
}


//=== Представления ====

xmlhttp.open('GET','../xml/performances_info.xml', false)
xmlhttp.send()
xmlDocPerformancesInfo = xmlhttp.responseXML

xmlhttp.open('GET','../main_perf_block.html', false)
xmlhttp.send()
mainPerfBlock = xmlhttp.responseText

var nPerformances = xmlDocPerformancesInfo.querySelectorAll('performance').length

for (let i = 0; (i < 6) && (i < nPerformances); i++)
{
    let newPerfBlock = document.createElement('div')
    newPerfBlock.innerHTML = mainPerfBlock
    let xmlPerfBlock = xmlDocPerformancesInfo.querySelectorAll('performance')[i]
    newPerfBlock.querySelector('a.main__performances-section__performance-block').setAttribute('href', 'theatre-performances.html#' + xmlPerfBlock.querySelector('reference').childNodes[0].nodeValue)
    newPerfBlock.querySelector('a.main__performances-section__performance-block img').setAttribute('src', xmlPerfBlock.querySelector('image').childNodes[0].nodeValue)
    newPerfBlock.querySelector('p.main__performances-section__performance-block__name').innerHTML = xmlPerfBlock.querySelector('name').childNodes[0].nodeValue +
                                                                                                " (" + xmlPerfBlock.querySelector('age').childNodes[0].nodeValue + "+)"
    newPerfBlock.querySelector('p.main__performances-section__performance-block__author').innerHTML = xmlPerfBlock.querySelector('author').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances-section__performance-block__description').innerHTML = xmlPerfBlock.querySelector('description').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances-section__performance-block__date').innerHTML = xmlPerfBlock.querySelector('date').childNodes[0].nodeValue
    document.querySelector('section#main__performances-section').insertBefore(newPerfBlock.querySelector('a.main__performances-section__performance-block'), document.querySelector('a#main__performances-section__link-to-performances'))
}


//=== Новости ==========

xmlhttp.open('GET','../xml/news_list.xml', false)
xmlhttp.send()
xmlDocNewsList = xmlhttp.responseXML

xmlhttp.open('GET','../news_block.html', false)
xmlhttp.send()
mainNewsBlock = xmlhttp.responseText

let nNews = xmlDocNewsList.querySelectorAll('news').length

for (let i = nNews - 1, j = 0; (i >= 0) && (j < 2); i--, j++)
{
    let newNewsBlock = document.createElement('div')
    newNewsBlock.innerHTML = mainNewsBlock
    let xmlNewsBlock = xmlDocNewsList.querySelectorAll('news')[i]
    newNewsBlock.querySelector('img').setAttribute('src', xmlNewsBlock.querySelector('image').childNodes[0].nodeValue)
    newNewsBlock.querySelector('p.news-block__title').innerHTML = xmlNewsBlock.querySelector('title').childNodes[0].nodeValue
    newNewsBlock.querySelector('p.news-block__date').innerHTML = xmlNewsBlock.querySelector('date').childNodes[0].nodeValue
    
    let nParagraphs = xmlNewsBlock.querySelectorAll('paragraph').length
    for (let k = 0; k < nParagraphs; k++)
    {
        let par = document.createElement('p')
        par.innerHTML = xmlNewsBlock.querySelectorAll('paragraph')[k].childNodes[0].nodeValue
        newNewsBlock.querySelector('article.news-block').insertBefore(par, newNewsBlock.querySelector('p.news-block__date'))
    }
    document.querySelector('section#main__news-section').insertBefore(newNewsBlock.querySelector('article.news-block'), document.querySelector('a#main__news-section__link-to-news'))
}


//== Форма обратной связи ===

xmlhttp.open('GET','../feedback_form.html', false)
xmlhttp.send()
document.querySelector('section#main__feedback-section').innerHTML = xmlhttp.responseText