//=== Текущая вкладка меню ===

document.querySelector('a#menu__page-link-to-news').classList.add('you-are-here')


//=== Для запросов ===

if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}


//=== Получение новостей ===

xmlhttp.open('GET','../xml/news_list.xml', false)
xmlhttp.send()
xmlDocNewsList = xmlhttp.responseXML

let nNews = xmlDocNewsList.querySelectorAll('news').length

xmlhttp.open('GET', '../news_block.html', false)
xmlhttp.send()
newsBlock = xmlhttp.responseText

//=== Вставка новостей на страницу ===

for (let i = 0; i < nNews; i++)
{
    let newNewsBlock = document.createElement('div')
    newNewsBlock.innerHTML = newsBlock
    let xmlNewsBlock = xmlDocNewsList.querySelectorAll('news')[nNews - i - 1]
    
    newNewsBlock.querySelector('img').setAttribute('src',xmlNewsBlock.querySelector('image').childNodes[0].nodeValue)
    newNewsBlock.querySelector('p.news-block__title').innerHTML = xmlNewsBlock.querySelector('title').childNodes[0].nodeValue
    newNewsBlock.querySelector('p.news-block__date').innerHTML = xmlNewsBlock.querySelector('date').childNodes[0].nodeValue

    let nParagraphs = xmlNewsBlock.querySelectorAll('paragraph').length
    for (let j = 0; j < nParagraphs; j++)
    {
        let pPar = document.createElement('p')
        pPar.innerHTML = xmlNewsBlock.querySelectorAll('paragraph')[j].childNodes[0].nodeValue
        let endOfNews = newNewsBlock.querySelector('p.news-block__date')
        newNewsBlock.querySelector('article.news-block').insertBefore(pPar, endOfNews)
    }
    document.querySelector('section.main__news').appendChild(newNewsBlock.querySelector('article.news-block'))
}