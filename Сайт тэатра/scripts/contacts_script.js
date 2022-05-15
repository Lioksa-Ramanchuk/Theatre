// Текущая вкладка меню
document.querySelector('a#menu__page-link-to-contacts').classList.add('you-are-here')

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

// Получение контактов
xmlhttp.open('GET','../xml/contacts.xml', false)
xmlhttp.send()
xmlDocContacts = xmlhttp.responseXML

// Создание, заполнение и вставка контактов на страницу
let nDepartments = xmlDocContacts.querySelectorAll('department').length
for (let i = 0; i < nDepartments; i++) {
    let xmlDepartment = xmlDocContacts.querySelectorAll('department')[i]
    let newDepartment = document.createElement('h2')
    newDepartment.innerHTML = xmlDepartment.querySelector('department-name').childNodes[0].nodeValue
    // Вставка названия отдела на страницу
    document.querySelector('section.main__contacts').appendChild(newDepartment)
    
    let nContacts = xmlDepartment.querySelectorAll('contact').length
    for (let j = 0; j < nContacts; j++) {
        let xmlContact = xmlDepartment.querySelectorAll('contact')[j]
        // Должность
        if (xmlContact.querySelector('post')) {
            let pPost = document.createElement('p')
            pPost.classList.add('main__contacts__post')
            pPost.innerHTML = xmlContact.querySelector('post').childNodes[0].nodeValue
            // Вставка должности на страницу
            document.querySelector('section.main__contacts').appendChild(pPost)
        }
        // Имя
        let pPerson = document.createElement('p')
        pPerson.classList.add('main__contacts__person')
        pPerson.innerHTML = "<span class='main__contacts__person__name'>" +
            xmlContact.querySelector('name').childNodes[0].nodeValue + '</span'
        // Номер телефона
        if (xmlContact.querySelector('phone')) {
            if (xmlContact.querySelector('post')) pPerson.innerHTML += ','
            else pPerson.innerHTML += ':'
            pPerson.innerHTML += ' <nobr>' + xmlContact.querySelector('phone').childNodes[0].nodeValue + '</nobr>'
        }
        // Музыкальный инструмент
        if (xmlContact.querySelector('instrument')) {
            pPerson.innerHTML += ' — ' + xmlContact.querySelector('instrument').childNodes[0].nodeValue + '</nobr>'
        }
        // Вставка контакта на страницу
        document.querySelector('section.main__contacts').appendChild(pPerson)
    }
}

// Вставка формы обратной связи
xmlhttp.open('GET','../html_models/feedback_form.html', false)
xmlhttp.send()
document.querySelector('section.main__feedback').innerHTML = xmlhttp.responseText