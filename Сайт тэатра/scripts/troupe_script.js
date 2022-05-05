//=== Текущая вкладка меню ===

document.querySelector('a#menu__page-link-to-troupe').classList.add('you-are-here')


//=== Для запросов ===

if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}


//=== Получение состава труппы ===

xmlhttp.open('GET','../xml/troupe_list.xml', false)
xmlhttp.send()
xmlDocTroupeList = xmlhttp.responseXML

let nStaff = xmlDocTroupeList.querySelectorAll('staff').length

//=== Вставка труппы на страницу ===

for (let i = 0; i < nStaff; i++)
{
    let newPerson = document.createElement('figure')
    newPerson.appendChild(document.createElement('img'))
    newPerson.appendChild(document.createElement('figcaption'))
    newPerson.querySelector('img').setAttribute('style', 'background-image: url("' + xmlDocTroupeList.querySelectorAll('staff')[i].querySelector('image').childNodes[0].nodeValue + '");')
    newPerson.querySelector('figcaption').innerHTML = xmlDocTroupeList.querySelectorAll('staff')[i].querySelector('name').childNodes[0].nodeValue
    document.querySelector('section.main__troupe').appendChild(newPerson)
}