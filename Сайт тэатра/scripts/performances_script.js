// Текущая вкладка меню
document.querySelector('a#menu__page-link-to-performances').classList.add('you-are-here')

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

// Получение информации о представлениях 
xmlhttp.open('GET','../xml/performances_info.xml', false)
xmlhttp.send()
xmlDocPerformancesInfo = xmlhttp.responseXML

xmlhttp.open('GET', '../html_models/performances_perf_block.html', false)
xmlhttp.send()
perfBlock = xmlhttp.responseText

// Заполнение шаблона представления и вставка блока на страницу
let nPerformances = xmlDocPerformancesInfo.querySelectorAll('performance').length
for (let i = 0; i < nPerformances; i++) {
    if (i) {
        let hrSeparator = document.createElement('hr')
        hrSeparator.classList.add('main__performances-article__separator')
        document.querySelector('article.main__performances-article').appendChild(hrSeparator)
    }
    let newPerfBlock = document.createElement('div')
    newPerfBlock.innerHTML = perfBlock
    let xmlPerfBlock = xmlDocPerformancesInfo.querySelectorAll('performance')[i]
    newPerfBlock.querySelector('div.performance-block').setAttribute('id', `performance${i}`)
    newPerfBlock.querySelector('figure.performance-block__image img').setAttribute('src',
        xmlDocPerformancesInfo.querySelectorAll('performance')[i].querySelector('image').childNodes[0].nodeValue)
    newPerfBlock.querySelector('p.performance-block__grid__name').innerHTML =
        xmlPerfBlock.querySelector('name').childNodes[0].nodeValue +
        ' (' + xmlPerfBlock.querySelector('age').childNodes[0].nodeValue + '+)'
    newPerfBlock.querySelector('p.performance-block__grid__description').innerHTML =
        xmlPerfBlock.querySelector('description').childNodes[0].nodeValue                                                                                                        
    newPerfBlock.querySelector('p.performance-block__grid__author-before').innerHTML =
        xmlPerfBlock.querySelector('author-before').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__author').innerHTML =
        xmlPerfBlock.querySelector('author').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__director-before').innerHTML =
        xmlPerfBlock.querySelector('director-before').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__director').innerHTML =
        xmlPerfBlock.querySelector('director').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__painter-before').innerHTML =
        xmlPerfBlock.querySelector('painter-before').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__painter').innerHTML =
        xmlPerfBlock.querySelector('painter').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__duration').innerHTML =
        xmlPerfBlock.querySelector('duration').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__price').innerHTML =
        xmlPerfBlock.querySelector('price').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.performance-block__grid__date').innerHTML =
        xmlPerfBlock.querySelector('date').childNodes[0].nodeValue
    newPerfBlock.querySelector('button').setAttribute('onclick', `buyTicket(${i})`)
    // Вставка блока представления
    document.querySelector('article.main__performances-article').appendChild(
        newPerfBlock.querySelector('div.performance-block'))
}

// Функция кнопки заказа билета 
function buyTicket(i) {
    alert("Вы заказалі квіток на спектакль \"" +
        xmlDocPerformancesInfo.querySelectorAll('performance')[i].querySelector('name').childNodes[0].nodeValue +
        "\".")
}