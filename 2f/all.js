var handHour = document.querySelector('.hour');
var handMin = document.querySelector('.minute');
var handSec = document.querySelector('.second');

function tick(){
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	var ms = time.getMilliseconds()

	var degHour = (hour / 12 * 360) + ((minute / 60) * 30);
	var degMin = (minute / 60 * 360) + ((second / 60) * 6);
	var degSec = (second / 60 * 360);
	if(ms > 500) degSec += 3;

	handHour.style.transform = 'rotate('+(degHour+90)+'deg)';
	handMin.style.transform = 'rotate('+(degMin+90)+'deg)';
	handSec.style.transform = 'rotate('+(degSec+90)+'deg)';
}

tick();

setInterval(tick, 500);

var angles = [300, 330, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270];

for(let i=0;i<12;i++){
	var div = document.createElement('div');
	div.innerText = i + 1;
	div.className = 'number num-outside';
	div.style.left = (Math.cos(angles[i]*Math.PI/180) * 110 + 155) + 'px';
	div.style.top = (Math.sin(angles[i]*Math.PI/180) * 110 + 152) + 'px';
	document.querySelector('.clock-face').appendChild(div);

	div = document.createElement('div');
	div.className = 'ticker';
	div.style.left = (Math.cos(angles[i]*Math.PI/180) * 128 + 150) + 'px';
	div.style.top = (Math.sin(angles[i]*Math.PI/180) * 128 + 160) + 'px';
	div.style.transform = 'rotate('+ (angles[i]) +'deg)';
	document.querySelector('.clock-face').appendChild(div);

	div = document.createElement('div');
	div.className = 'diamond';
	div.style.left = (Math.cos((angles[i]+15)*Math.PI/180) * 130 + 160) + 'px';
	div.style.top = (Math.sin((angles[i]+15)*Math.PI/180) * 130 + 160) + 'px';
	div.style.transform = 'rotate('+ (angles[i]) +'deg)';
	document.querySelector('.clock-face').appendChild(div);

	div = document.createElement('div');
	div.innerText = i + 13;
	div.className = 'number num-outside';
	div.style.left = (Math.cos(angles[i]*Math.PI/180) * 150 + 155) + 'px';
	div.style.top = (Math.sin(angles[i]*Math.PI/180) * 150 + 152) + 'px';
	document.querySelector('.clock-face').appendChild(div);
}

for(let i=0;i<360;i++){
	if( i%5 === 0) continue;
	if( i%3 === 0) continue;


	var angle = 5 * i;
	div = document.createElement('div');
	div.className = 'dot';
	div.style.left = (Math.cos(angle*Math.PI/180) * 128 + 161) + 'px';
	div.style.top = (Math.sin(angle*Math.PI/180) * 128 + 161) + 'px';
	document.querySelector('.clock-face').appendChild(div);
}