// buttons.js

let btn_spin_az_0, btn_spin_az_30, btn_spin_az_45, btn_spin_az_60,
    btn_spin_az_90, btn_spin_az_120, btn_spin_az_150, 
	btn_spin_az_180, btn_spin_az_270;
	
let btn_spin_polar_0, btn_spin_polar_30, btn_spin_polar_45,
    btn_spin_polar_60, btn_spin_polar_90, btn_spin_polar_120, 
	btn_spin_polar_150, btn_spin_polar_180;
	
let btn_axis_az_0, btn_axis_az_30, btn_axis_az_45, btn_axis_az_60,
    btn_axis_az_90, btn_axis_az_120, btn_axis_az_150, 
	btn_axis_az_180, btn_axis_az_270;
	
let btn_axis_polar_0, btn_axis_polar_30, btn_axis_polar_45,
    btn_axis_polar_60, btn_axis_polar_90, btn_axis_polar_120,
	btn_axis_polar_150, btn_axis_polar_180;
	
let btn_radio;
	
function Lbl (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#aaaaaa';
	this.id.style.color='#440000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "55px";
	this.id.style.font = '10px  "Times New Roman"';
	this.id.disabled = true;
}	

function Lbl_2 (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = div_out.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#aaddaa';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "90px";
	this.id.style.font = 'italic 14px Georgia';
	this.id.disabled = true;
}	

function AddLabels()
{	
	const lbl_spin_polar = new Lbl("Electron θ", "5px", "195px" );
	lbl_spin_polar.id.style.background='#ccccff';
	lbl_spin_polar.id.style.color='#000000';
	
	const lbl_spin_az = new Lbl("Electron φ", "65px", "195px" );
	lbl_spin_az.id.style.background='#ccccff';
	lbl_spin_az.id.style.color='#000000';
	
	const lbl_axis_polar = new Lbl("Axis θ", "132px", "195px" );
	lbl_axis_polar.id.style.background='#ccccff';	
	lbl_axis_polar.id.style.color='#000000';
	
	const lbl_axis_az = new Lbl("Axis φ", "190px", "195px" );
	lbl_axis_az.id.style.background='#ccccff';	
	lbl_axis_az.id.style.color='#000000';
	
	////////////////////////////////////////////////////////
	const lbl_thick_circle = new Lbl_2("Thick circles ", "1050px", "425px" );
	
	const lbl_axes = new Lbl_2("Axes ", "1195px", "425px" );
	lbl_axes.id.style.width = "50px";
	lbl_axes.id.style.background='#ffccff';	
	lbl_axes.id.style.color='#000000';
}

function Btn (name, left, top)
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#ccccff';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "40px";
	this.id.style.cursor = "pointer";
}	

function Btn2 (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#ccccff';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "40px";
	this.id.style.cursor = "pointer";
}	

function AddButtons()
{	
	btn_spin_polar_0 = new Btn("0°", "15px", "220px" );
	btn_spin_polar_30 = new Btn("30°", "15px", "240px");
	btn_spin_polar_45 = new Btn("45°", "15px", "260px" );
	btn_spin_polar_60 = new Btn("60°", "15px", "280px" );
	btn_spin_polar_90 = new Btn("90°", "15px", "300px" );
	btn_spin_polar_120 = new Btn("120°", "15px", "320px" );
	btn_spin_polar_150 = new Btn("150°", "15px", "340px" );
	btn_spin_polar_180 = new Btn("180°", "15px", "360px" );	
	
	btn_spin_polar_0.name.addEventListener("click", spin_polar_0);
	btn_spin_polar_30.name.addEventListener("click", spin_polar_30);
	btn_spin_polar_45.name.addEventListener("click", spin_polar_45);
	btn_spin_polar_60.name.addEventListener("click", spin_polar_60);
	btn_spin_polar_90.name.addEventListener("click", spin_polar_90);
	btn_spin_polar_120.name.addEventListener("click", spin_polar_120);
	btn_spin_polar_150.name.addEventListener("click", spin_polar_150);
	btn_spin_polar_180.name.addEventListener("click", spin_polar_180);
	
	btn_spin_az_0 = new Btn("0°", "70px", "220px" );
	btn_spin_az_30 = new Btn("30°", "70px", "240px" );
	btn_spin_az_45 = new Btn("45°", "70px", "260px" );
	btn_spin_az_60 = new Btn("60°", "70px", "280px" );
	btn_spin_az_90 = new Btn("90°", "70px", "300px" );
	btn_spin_az_120 = new Btn("120°", "70px", "320px" );
	btn_spin_az_150 = new Btn("150°", "70px", "340px" );
	btn_spin_az_180 = new Btn("180°", "70px", "360px" );
	btn_spin_az_270 = new Btn("270°", "70px", "380px" );
	
	btn_spin_az_0.name.addEventListener("click", spin_az_0);
	btn_spin_az_30.name.addEventListener("click", spin_az_30);
	btn_spin_az_45.name.addEventListener("click", spin_az_45);
	btn_spin_az_60.name.addEventListener("click", spin_az_60);
	btn_spin_az_90.name.addEventListener("click", spin_az_90);
	btn_spin_az_120.name.addEventListener("click", spin_az_120);
	btn_spin_az_150.name.addEventListener("click", spin_az_150);
	btn_spin_az_180.name.addEventListener("click", spin_az_180);
	btn_spin_az_270.name.addEventListener("click", spin_az_270);	

	//////////////////////////////////////////////////////////////////
	
	btn_axis_polar_0 = new Btn2("0°", "140px", "220px" );
	btn_axis_polar_30 = new Btn2("30°", "140px", "240px" );
	btn_axis_polar_45 = new Btn2("45°", "140px", "260px" );
	btn_axis_polar_60 = new Btn2("60°", "140px", "280px" );
	btn_axis_polar_90 = new Btn2("90°", "140px", "300px" );
	btn_axis_polar_120 = new Btn2("120°", "140px", "320px" );
	btn_axis_polar_150 = new Btn2("150°", "140px", "340px" );
	btn_axis_polar_180 = new Btn2("180°", "140px", "360px" );
	
	btn_axis_polar_0.name.addEventListener("click", axis_polar_0);
	btn_axis_polar_30.name.addEventListener("click", axis_polar_30);
	btn_axis_polar_45.name.addEventListener("click", axis_polar_45);
	btn_axis_polar_60.name.addEventListener("click", axis_polar_60);
	btn_axis_polar_90.name.addEventListener("click", axis_polar_90);
	btn_axis_polar_120.name.addEventListener("click", axis_polar_120);
	btn_axis_polar_150.name.addEventListener("click", axis_polar_150);
	btn_axis_polar_180.name.addEventListener("click", axis_polar_180);	
	
	btn_axis_az_0 = new Btn2("0°", "195px", "220px" );
	btn_axis_az_30 = new Btn2("30°", "195px", "240px" );
	btn_axis_az_45 = new Btn2("45°", "195px", "260px" );
	btn_axis_az_60 = new Btn2("60°", "195px", "280px" );
	btn_axis_az_90 = new Btn2("90°", "195px", "300px" );
	btn_axis_az_120 = new Btn2("120°", "195px", "320px" );
	btn_axis_az_150 = new Btn2("150°", "195px", "340px" );
	btn_axis_az_180 = new Btn2("180°", "195px", "360px" );
	btn_axis_az_270 = new Btn2("270°", "195px", "380px" );
	
	btn_axis_az_0.name.addEventListener("click", axis_az_0);
	btn_axis_az_30.name.addEventListener("click", axis_az_30);
	btn_axis_az_45.name.addEventListener("click", axis_az_45);
	btn_axis_az_60.name.addEventListener("click", axis_az_60);
	btn_axis_az_90.name.addEventListener("click", axis_az_90);5
	btn_axis_az_120.name.addEventListener("click", axis_az_120);
	btn_axis_az_150.name.addEventListener("click", axis_az_150);
	btn_axis_az_180.name.addEventListener("click", axis_az_180);
	btn_axis_az_270.name.addEventListener("click", axis_az_270);
}

/////////////////////////////////////////////////////////////////////

function spin_az_0() 
{ 
   azimuth_electron = 0 * DEGREE;
   recalc();
   controller.azimuth_electron = 0;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_0.id.style.background = '#ffaaaa';
}
function spin_az_30() 
{ 
   azimuth_electron = 30 * DEGREE;
   recalc();
   controller.azimuth_electron = 30;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_30.id.style.background = '#ffaaaa';
}
function spin_az_45() 
{ 
   azimuth_electron = 45 * DEGREE;
   recalc();
   controller.azimuth_electron = 45;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_45.id.style.background = '#ffaaaa';
}
function spin_az_60() 
{ 
   azimuth_electron = 60 * DEGREE;
   recalc();
   controller.azimuth_electron = 60;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_60.id.style.background = '#ffaaaa';
}
function spin_az_90() 
{ 
   azimuth_electron = 90 * DEGREE;
   recalc();
   controller.azimuth_electron = 90;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_90.id.style.background = '#ffaaaa';
}
function spin_az_120() 
{ 
   azimuth_electron = 120 * DEGREE;
   recalc();
   controller.azimuth_electron = 120;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_120.id.style.background = '#ffaaaa';
}
function spin_az_150() 
{ 
   azimuth_electron = 150 * DEGREE;
   recalc();
   controller.azimuth_electron = 150;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_150.id.style.background = '#ffaaaa';
}
function spin_az_180() 
{ 
   azimuth_electron = 180 * DEGREE;
   recalc();
   controller.azimuth_electron = 180;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_180.id.style.background = '#ffaaaa';
}
function spin_az_270() 
{ 
   azimuth_electron = 270 * DEGREE;
   recalc();
   controller.azimuth_electron = 270;
   gui.updateDisplay();
   spin_az_background();
   btn_spin_az_270.id.style.background = '#ffaaaa';
}

////////////////////////////////

function spin_polar_0() 
{ 
   polar_electron = 0 * DEGREE;
   recalc();
   controller.polar_electron = 0;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_0.id.style.background = '#ffaaaa';
}
function spin_polar_30() 
{ 
	polar_electron = 30 * DEGREE;
	recalc();
	controller.polar_electron = 30;
	gui.updateDisplay();
	spin_polar_background();
	btn_spin_polar_30.id.style.background = '#ffaaaa';
}
function spin_polar_45() 
{ 
   polar_electron = 45 * DEGREE;
   recalc();
   controller.polar_electron = 45;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_45.id.style.background = '#ffaaaa';
}
function spin_polar_60() 
{ 
   polar_electron = 60 * DEGREE;
   recalc();
   controller.polar_electron = 60;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_60.id.style.background = '#ffaaaa';
}
function spin_polar_90() 
{ 
   polar_electron = 90 * DEGREE;
   recalc();
   controller.polar_electron = 90;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_90.id.style.background = '#ffaaaa';
}
function spin_polar_120() 
{ 
   polar_electron = 120 * DEGREE;
   recalc();
   controller.polar_electron = 120;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_120.id.style.background = '#ffaaaa';
}
function spin_polar_150() 
{ 
   polar_electron = 150 * DEGREE;
   recalc();
   controller.polar_electron = 150;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_150.id.style.background = '#ffaaaa';
}
function spin_polar_180() 
{ 
   polar_electron = 180 * DEGREE;
   recalc();
   controller.polar_electron = 180;
   gui.updateDisplay();
   spin_polar_background();
   btn_spin_polar_180.id.style.background = '#ffaaaa';
}

//////////////////////////////

function axis_az_0() 
{
	azimuth_axis = 0 * DEGREE;
	recalc();
	controller.azimuth_axis = 0;
	gui.updateDisplay();
	az_background();
	btn_axis_az_0.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_30() 
{
	azimuth_axis = 30 * DEGREE;
	recalc();
	controller.azimuth_axis = 30;
	gui.updateDisplay();
	az_background();
	btn_axis_az_30.id.style.background = '#ffaaaa';
	axis_rotation();
}

function axis_az_45() 
{
	azimuth_axis = 45 * DEGREE;
	recalc();
	controller.azimuth_axis = 45;
	gui.updateDisplay();
	az_background();
	btn_axis_az_45.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_60() 
{
	azimuth_axis = 60 * DEGREE;
	recalc();
	controller.azimuth_axis = 60;
	gui.updateDisplay();
	az_background();
	btn_axis_az_60.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_90() 
{
	azimuth_axis = 90 * DEGREE;
	recalc();
	controller.azimuth_axis = 90;
	gui.updateDisplay();
	az_background();
	btn_axis_az_90.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_120() 
{
	azimuth_axis = 120 * DEGREE;
	recalc();
	controller.azimuth_axis = 120;
	gui.updateDisplay();
	az_background();
	btn_axis_az_120.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_150() 
{
	azimuth_axis = 150 * DEGREE;
	recalc();
	controller.azimuth_axis = 150;
	gui.updateDisplay();
	az_background();
	btn_axis_az_150.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_180() 
{
	azimuth_axis = 180 * DEGREE;
	recalc();
	controller.azimuth_axis = 180;
	gui.updateDisplay();
	az_background();
	btn_axis_az_180.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_az_270() 
{
	azimuth_axis = 270 * DEGREE;
	recalc();
	controller.azimuth_axis = 270;
	gui.updateDisplay();
	az_background();
	btn_axis_az_270.id.style.background = '#ffaaaa';
	axis_rotation();
}
///////////////////////////////////
function axis_polar_0() 
{
	polar_axis = 0 * DEGREE;
	recalc();
	controller.polar_axis = 0;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_0.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_30() 
{
	polar_axis = 30 * DEGREE;
	recalc();
	controller.polar_axis = 30;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_30.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_45() 
{ 
	polar_axis = 45 * DEGREE;
	recalc();
	controller.polar_axis = 45;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_45.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_60() 
{	
	polar_axis = 60 * DEGREE;
	recalc();
	controller.polar_axis = 60;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_60.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_90() 
{ 
	polar_axis = 90 * DEGREE;
	recalc();
	controller.polar_axis = 90;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_90.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_120() 
{
	polar_axis = 120 * DEGREE;
	recalc();
	controller.polar_axis = 120;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_120.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_150() 
{
	polar_axis = 150 * DEGREE;
	recalc();
	controller.polar_axis = 150;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_150.id.style.background = '#ffaaaa';
	axis_rotation();
}
function axis_polar_180() 
{
	polar_axis = 180 * DEGREE;
	recalc();
	controller.polar_axis = 180;
	gui.updateDisplay();
	polar_background();
	btn_axis_polar_180.id.style.background = '#ffaaaa';
	axis_rotation();
}

function az_background()
{
	const color = '#ccccff';
	btn_axis_az_0.id.style.background = color;
	btn_axis_az_30.id.style.background = color;
	btn_axis_az_45.id.style.background = color;
	btn_axis_az_60.id.style.background = color;
	btn_axis_az_90.id.style.background = color;
	btn_axis_az_120.id.style.background = color;
	btn_axis_az_150.id.style.background = color;
	btn_axis_az_180.id.style.background = color;
	btn_axis_az_270.id.style.background = color;
}

function polar_background()
{
	const color = '#ccccff';
	btn_axis_polar_0.id.style.background = color;
	btn_axis_polar_30.id.style.background = color;
	btn_axis_polar_45.id.style.background = color;
	btn_axis_polar_60.id.style.background = color;
	btn_axis_polar_90.id.style.background = color;
	btn_axis_polar_120.id.style.background = color;
	btn_axis_polar_150.id.style.background = color;
	btn_axis_polar_180.id.style.background = color;
}

function spin_az_background()
{
	const color = '#ccccff';
	btn_spin_az_0.id.style.background = color;
	btn_spin_az_30.id.style.background = color;
	btn_spin_az_45.id.style.background = color;
	btn_spin_az_60.id.style.background = color;
	btn_spin_az_90.id.style.background = color;
	btn_spin_az_120.id.style.background = color;
	btn_spin_az_150.id.style.background = color;
	btn_spin_az_180.id.style.background = color;
	btn_spin_az_270.id.style.background = color;
}


function spin_polar_background()
{
	const color = '#ccccff';
	btn_spin_polar_0.id.style.background = color;
	btn_spin_polar_30.id.style.background = color;
	btn_spin_polar_45.id.style.background = color;
	btn_spin_polar_60.id.style.background = color;
	btn_spin_polar_90.id.style.background = color;
	btn_spin_polar_120.id.style.background = color;
	btn_spin_polar_150.id.style.background = color;
	btn_spin_polar_180.id.style.background = color;
}

