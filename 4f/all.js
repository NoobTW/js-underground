var $timezone = document.querySelectorAll('.timezone');

var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function tick(){
	console.log('tick')
	var theDate = new Date();

	Array.from($timezone).forEach($tz => {
		var timezone = $tz.getAttribute('data-timezone');
		var d = theDate.toLocaleString('zh-TW', { timeZone: timezone, hour12: false });
		console.log(d);

		var date = d.split(' ')[0];
		var dates = date.split('/');

		var time = (d.split(' ')[1]).slice(0, 5);

		$tz.querySelector('.zone-date').innerText = `${dates[2]} ${months[dates[1] - 1]}, ${dates[0]}`;
		$tz.querySelector('.time').innerText = time;
	})
}

tick();

setInterval(tick, 10000);