function wrapperAppend(content){
	document.querySelector('.wrapper').innerHTML += content;
}

for(let i=2;i<=9;i++){
	var html = '';

	html += '<div class="grid white">';

	html += '<div class="left">'
	html += '<div class="big">' + i + '</div>';

	for(let j=1;j<=3;j++){
	html += '<div class="row99">' + i + '×' + j + ' = ' + i*j + '</div>'
	}

	html += '</div>';
	html += '<div class="right">';

	for(let j=4;j<=9;j++){
	html += '<div class="row99">' + i + '×' + j + ' = ' + i*j + '</div>'
	}

	html += '</div>';

	html += '</div>'

	wrapperAppend(html);
}