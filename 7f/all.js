let ctx;
let color = '#000';

const cursor = (size, color) => {
	const s = (~~size);
	$('#canvas').css('cursor', `url('data:image/svg+xml;utf8,<svg fill="${encodeURIComponent(color)}" height="${s}" viewBox="0 0 ${s} ${s}" width="${s}" xmlns="http://www.w3.org/2000/svg"><circle r="${s/2}" cx="${s/2}" cy="${s/2}" /></svg>') ${s/2} ${s/2}, auto`);
}

function init(canvas, width, height, fillColor = '#E8E8E8') {
	ctx = canvas.getContext("2d");
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.history = [];
	ctx.step = -1;

	ctx.undo = () => {
		if (ctx.step > 0) {
			ctx.step--;
			const canvasPic = new Image();
			canvasPic.src = ctx.history[ctx.step];
			canvasPic.onload = () => {
				ctx.drawImage(canvasPic, 0, 0);
			}
		}
	}

	ctx.redo = () => {
		if (ctx.step < ctx.history.length - 1) {
			ctx.step++;
			const canvasPic = new Image();
			canvasPic.src = ctx.history[ctx.step];
			canvasPic.onload = () => {
				ctx.drawImage(canvasPic, 0, 0);
			}
		}
	}

	ctx.prevX = 0;
	ctx.prevY = 0;
	ctx.currX = 0;
	ctx.currY = 0;

	ctx.clear = () => {
		ctx.fillStyle = fillColor;
		ctx.fillRect(0, 0, width, height);
		cursor($('#size').val(), color);
		ctx.step++;
		ctx.history.push(canvas.toDataURL());
	}

	ctx.clear();

	ctx.draw = () => {
		ctx.beginPath();
		ctx.moveTo(ctx.prevX, ctx.prevY);
		ctx.lineTo(ctx.currX, ctx.currY);
		ctx.strokeStyle = color || '#ff4500';
		ctx.lineWidth = ~~$('#size').val() || 10;
		ctx.stroke();
		ctx.closePath();
	};

	ctx.updatePosition = (x, y) => {
		ctx.prevX = ctx.currX;
		ctx.prevY = ctx.currY;
		ctx.currX = x;
		ctx.currY = y;
	}

	$('#canvas').on('mousemove', (e) => {
		const x = e.clientX - canvas.offsetLeft;
		const y = e.clientY - canvas.offsetTop;
		$('#position').text(`${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} × ${y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
		if (!ctx.isDrawing) {
			return;
		}
		ctx.updatePosition(x, y);
		ctx.draw();
	});
	$('#canvas').on('mousedown', (e) => {
		ctx.updatePosition(e);
		ctx.isDrawing = true;
	});
	$('#canvas').on('mouseup', () => {
		ctx.isDrawing = false;
		ctx.step++;
		if (ctx.step < ctx.history.length) {
			ctx.history.length = ctx.history.length;
		}
		ctx.history.push(canvas.toDataURL());
	});
	$('#canvas').on('mouseenter', () => {
		$('#position').show();
	});
	$('#canvas').on('mouseout', () => {
		$('#position').hide();
	});
}

init($('#canvas')[0], $('#canvas').width(), $('#canvas').height(), '#E8E8E8');

$('#clearAll').on('click', () => {
	ctx.clear();
});

$('.color').on('click', function() {
	color = $(this).css('background-color')
	cursor($('#size').val(), color);
	$(this).text('✓').siblings().text('');
});

$('#size').on('change', () => {
	cursor($('#size').val(), color);
})

$('#undo').on('click', ctx.undo);
$('#redo').on('click', ctx.redo);
$('#save').on('click', () => {
	const link = document.createElement('a');
	link.setAttribute('download', 'MintyPaper.png');
	link.setAttribute('href', $('#canvas')[0].toDataURL('image/png').replace('image/png', 'image/octet-stream'));
	link.click();
});

$('.header-hide').on('click', () => {
	if ($('header').height() > 10) {
		$('header').css('height', '1px');
		$('.button').hide();
		$('.header-hide').html('<i class="fas fa-angle-down"></i>');
	} else {
		$('header').css('height', '4rem');
		$('.button').show();
		$('.header-hide').html('<i class="fas fa-angle-up"></i>');
	}
});

$('.footer-hide').on('click', () => {
	if ($('footer').height() > 10) {
		$('footer').css('height', '0px');
		$('footer').css('padding', '0');
		$('footer .widgets').hide();
		$('.footer-hide').html('<i class="fas fa-angle-up"></i>');
	} else {
		$('footer').css('height', 'auto');
		$('footer').css('padding', '1rem 2rem');
		$('footer .widgets').show();
		$('.footer-hide').html('<i class="fas fa-angle-down"></i>');
	}
})