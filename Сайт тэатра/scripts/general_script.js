if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}


//==== Хэдер ==========

xmlhttp.open('GET','../nav_menu.html', false)
xmlhttp.send()
document.querySelector("header").insertAdjacentHTML('afterbegin', xmlhttp.responseText)


//==== Футер ==========

xmlhttp.open('GET','../footer.html', false)
xmlhttp.send()
document.querySelector("footer").insertAdjacentHTML('afterbegin', xmlhttp.responseText)