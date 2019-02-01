var temp = '0';
var realText = '';
var realDigit = '';
var isAnswer = false;

$('.button').on('click', function(){
var text = $(this).text();
if (isAnswer) {
	realText = '0';
	temp = '0';
	isAnswer = false;
}
if (text === 'AC') {
	temp = '0';
	realText = '0';
	realDigit = '0';
} else if (!isNaN(text) || text === '.'){
	if (text !== '.' || !realText.includes('.')){
		realText = `${realText}${text}`;
	}
	console.log(realText);
} else if (text === '⌫') {
	realText = realText.slice(0, -1);
} else if ($(this).hasClass('op') && realText != 0) {
	if (temp != 0){
	temp += realText; 
	} else {
	temp = realText;
	}
	var op;
	switch(text) {
	case '+':
		op = '+';
		break;
	case '-':
		op = '-';
		break;
	case '×':
		op = '*';
		break;
	case '÷':
		op = '/';
		break;
	}
	temp += op;
	realText = '0';
} else if (text === '=' && !isAnswer) {
	temp += realText;
	var answer = eval(temp);
	isAnswer = true;
	realText = `${answer}`;
}

if(realText.includes('.')){
	realDigit = realText;
} else {
	realDigit = Number.parseFloat(realText);
	realText = realDigit.toString();
	if (isNaN(realDigit)) realDigit = 0; 
}

$('.real').text(realDigit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

$('.last').text(temp.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\B(?=(\d{3})+(?!\d))/g, ","));


$('.real').css('font-size', '56px');
while(($('.real')[0].scrollWidth) > $('.real').width()) {
	var fontSize = $('.real').css('font-size').slice(0, -2);
	fontSize = parseInt(fontSize);
	fontSize -= 2;
	$('.real').css('font-size', fontSize + 'px');
}
});