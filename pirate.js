function drawBtnLayers() {
	var tplBtns = [];
	var tplHelp = [];
	for (let layer of layers) {
		if (layer.interactive=='y') {
			tplBtns.push('<button class="btn btn-primary btn-layer" data-id="'+layer.id+'" type="button" title="Select Layer '+layer.name+'"><span class="glyphicon glyphicon-book" aria-hidden="true"></span> '+layer.name+'</button>');
			tplHelp.push('<kbd>'+layer.name+'</kbd>');
		}
	}
	buttons_layer.innerHTML = tplBtns.join(' ');
	buttons_layer_help.innerHTML = tplHelp.join(', ');
	
	buttonLayer = buttons_layer.querySelectorAll("button");
	for (let button of buttonLayer) {
		button.addEventListener("click", function(){
			buttonLayer.forEach(function(el) { 
				el.classList.remove("btn-active");
			});
			this.classList.add("btn-active");
			clicked_disc = parseInt(this.getAttribute("data-id"));
		});
	}	
	
	var aBtn = buttons_layer.querySelector("button:first-child");
	aBtn.classList.add("btn-active");
	clicked_disc = parseInt(aBtn.getAttribute("data-id"));	
}

function get_center() {
    var rect = discs[0].getBoundingClientRect();
    var x1 = rect.x + rect.width / 2;
    var y1 = rect.y + rect.height / 2;
    return [x1, y1];
}

function compute_angle(x3, y3) {
    var x1, y1;
    [x1, y1] = get_center();
    var x2 = down_pos[0];
    var y2 = down_pos[1];
    return Math.atan2(y3 - y1, x3 - x1) - Math.atan2(y2 - y1, x2 - x1);
}

function modulo(n, m) {
    return ((n % m) + m) % m;
}

function clamp_angle(angle) {
    var two_pi = Math.PI * 2;
    return angle % two_pi;
}

function snap_angle(angle) {
    var a = modulo(angle, sector_width);
    var sector = Math.floor(angle / sector_width);
    a = (Math.cos(Math.PI * (a / sector_width - 1)) + 1) * sector_width / 2;
    if (a < snap_width) {
        a = 0;
    }
    if (a > sector_width - snap_width) {
        a = sector_width;
    }
    return sector * sector_width + a;
}

function degrees(radians) {
    return radians * 180 / Math.PI;
}

function set_rotate(element, radians) {
	if (element.tagName == 'DIV') {
        element.style.transform = 'rotate(' + degrees(radians) + 'deg)';
    }
}

function handle_down(evt) {
    if (evt.type == 'mousedown') {
        down_pos = [evt.clientX, evt.clientY];
    } else if (evt.type == 'touchstart') {
        down_pos = [evt.touches[0].clientX, evt.touches[0].clientY];
    }
    var turnable = evt.target.closest('.turnable');
	
	if (wheelSizes) {
		var cx, cy;
		[cx, cy] = get_center();
		var rect = discs[0].getBoundingClientRect();	
		var scale = (rect.left + rect.right) / layers[0].width;
		scale = Math.min(1, scale);
		var distance = Math.sqrt((down_pos[0] - cx)**2 + (down_pos[1] - cy)**2);		
		
		var layer_clicked = 1;
		for (let w of wheelSizes) {
			if (distance > w * scale) layer_clicked -= 1;
		}
        clicked_disc = layer_clicked;
		// buttonLayer[layer_clicked].click();
	}

    evt.preventDefault();
    evt.stopPropagation();
	
	var i = clicked_disc;
	// if (discs[i].classList.contains('anim')) discs[i].classList.toggle("anim");	
}

function handle_move(evt) {
    if (down_pos !== undefined) {
        var x, y;
        if (evt.type == 'mousemove') {
            evt.preventDefault();
            [x, y] = [evt.clientX, evt.clientY];
        } else if (evt.type == 'touchmove') {
            [x, y] = [evt.touches[0].clientX, evt.touches[0].clientY];
        }
        var angle_delta = compute_angle(x, y);
        var i = clicked_disc;
        current_angles[i] = clamp_angle(snap_angle(saved_angles[i] + angle_delta));
        set_rotate(discs[i], current_angles[i]);
        evt.stopPropagation();
    }
}

function handle_up(evt) {
    for (let i=0; i<3; i++) {
        saved_angles[i] = current_angles[i];
    }
    down_pos = undefined;
    //clicked_disc = undefined;
	//var i = clicked_disc;
	//discs[i].classList.remove("anim");
}


function updateContainerSize() {
	var rect = discs[0].getBoundingClientRect();
	disc_container_inside.style.width = rect.width + 'px';
	disc_container_inside.style.height = rect.height + 'px';
	//console.log(rect);
}

function wheelRotateAnim(isPositive) {	
	var num = isPositive ? 1 : -1;
	var i = clicked_disc;
	if (!discs[i].classList.contains('anim')) discs[i].classList.toggle("anim");
	current_angles[i] = saved_angles[i] + (num * sector_width);
	set_rotate(discs[i], current_angles[i]);
	handle_up();
}

function doKey(e) {
	//console.log(e.code);
	if (e.code == 'ArrowRight') wheelRotateAnim(true);
	if (e.code == 'ArrowLeft') wheelRotateAnim(false);
}

for (let disc of discs) {
    disc.addEventListener('mousedown', handle_down);
    disc.addEventListener('touchstart', handle_down);
}

window.addEventListener('mouseup', handle_up);
window.addEventListener('touchend', handle_up);

window.addEventListener('mousemove', handle_move);
window.addEventListener('touchmove', handle_move);

window.addEventListener('keydown', doKey);

// drawBtnLayers();
updateContainerSize();