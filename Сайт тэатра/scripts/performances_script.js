//=== Текущая вкладка меню ===

document.querySelector('a#menu__page-link-to-performances').classList.add('you-are-here')


//=== Для запросов =====

if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}


//=== Информация о представлениях ===

xmlhttp.open('GET','../xml/performances_info.xml', false)
xmlhttp.send()
xmlDocPerformancesInfo = xmlhttp.responseXML

let nPerformances = xmlDocPerformancesInfo.querySelectorAll('performance').length

xmlhttp.open('GET', '../performances_perf_block.html', false)
xmlhttp.send()
perfBlock = xmlhttp.responseText


//=== Вставка информации на страницу ===

for (let i = 0; i < nPerformances; i++)
{
    if (i != 0)
    {
        let hrSeparator = document.createElement('hr')
        hrSeparator.classList.add('main__performances__separator')
        document.querySelector('section.main__performances').appendChild(hrSeparator)
    }
    
    let newPerfBlock = document.createElement('div')
    newPerfBlock.innerHTML = perfBlock
    let xmlPerfBlock = xmlDocPerformancesInfo.querySelectorAll('performance')[i]
    newPerfBlock.querySelector('article.main__performances__performance').setAttribute('id', xmlPerfBlock.querySelector('reference').childNodes[0].nodeValue)
    newPerfBlock.querySelector('img').setAttribute('src', xmlDocPerformancesInfo.querySelectorAll('performance')[i].querySelector('image').childNodes[0].nodeValue)
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__name').innerHTML = xmlPerfBlock.querySelector('name').childNodes[0].nodeValue +
                                                                                                            ' (' + xmlPerfBlock.querySelector('age').childNodes[0].nodeValue + '+)'
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__description').innerHTML = xmlPerfBlock.querySelector('description').childNodes[0].nodeValue                                                                                                        
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__author-before').innerHTML = xmlPerfBlock.querySelector('author-before').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__author').innerHTML =xmlPerfBlock.querySelector('author').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__director-before').innerHTML = xmlPerfBlock.querySelector('director-before').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__director').innerHTML = xmlPerfBlock.querySelector('director').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__painter-before').innerHTML = xmlPerfBlock.querySelector('painter-before').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__painter').innerHTML = xmlPerfBlock.querySelector('painter').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__duration').innerHTML = xmlPerfBlock.querySelector('duration').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__price').innerHTML = xmlPerfBlock.querySelector('price').childNodes[0].nodeValue
    newPerfBlock.querySelector('p.main__performances__performance__info__grid__date').innerHTML = xmlPerfBlock.querySelector('date').childNodes[0].nodeValue
    newPerfBlock.querySelector('button').setAttribute('onclick', `buyTicket(${i})`)
    document.querySelector('section.main__performances').appendChild(newPerfBlock.querySelector('article.main__performances__performance'))
}


//=== Функция кнопки заказа билета ===

function buyTicket(i) {
    alert("Вы заказалі квіток на спектакль \"" + xmlDocPerformancesInfo.querySelectorAll('performance')[i].querySelector('name').childNodes[0].nodeValue + "\".")
}