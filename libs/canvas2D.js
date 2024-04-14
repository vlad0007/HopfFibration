//	canvas2D.js
	
var DEGREE = 0.01745329251994; // значение углового градуса
var M_PI = 3.14159265358979323846;	// значение числа пи
	
// функции fx(val) и fy(val) используются для преобразования координат 
// в функциях приведенных далее в координаты холста (HTML5 canvas)
// значения SCALE, xC и yC задаются программистом
function fx(val)
{
	var res = val * SCALE + xC;
	return res;
}

function fy(val)
{
	var res = - val * SCALE + yC;
	return res;
}	

// во всех фунциях 
// width - толщина линии
// color - цвет линии или текста
//   цветов всего несколько и их названия можно определить
//       из текста функций, например, axes.

// рисует оси 
// dx и dy - размеры осей по X и Y
function axes(ctx, dx, dy, width, color)	
{
	ctx.save();
	
	if (color == "R") // красный
		ctx.strokeStyle = '#f00'; 
	else if (color == "G") // зеленый
		ctx.strokeStyle = '#0f0';
	else if (color == "B") // синий
		ctx.strokeStyle = '#00f';	
	else if (color == "Brown") // коричневый
		ctx.strokeStyle = '#A52A2A';
	else if (color == "DarkOrchid") // фиолетовый (пурпурный ??)
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") // серый
		ctx.strokeStyle = '#808080';
	else if (color == "Black") // черный
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color; // любой цвет из палитры в виде строки		
	
	ctx.lineWidth = width;
	ctx.beginPath();	
	ctx.moveTo(fx(-dx), fy(0));
	ctx.lineTo(fx(dx), fy(0));
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(fx(0), fy(-dy));
	ctx.lineTo(fx(0), fy(dy));
	ctx.stroke();
	ctx.restore();
}

// точка в виде квадрата
// size - размер точки в пикселах
function rsp(ctx, point, size, color)
{
	ctx.save();
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';	
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	
	ctx.fillRect( fx(point[0]) - size/2, fy(point[1]) - size/2, size, size);
	ctx.restore();
}	

// точка в виде окружности
// size - размер точки в пикселах
function csp(ctx, point, size, color)
{
	ctx.save();
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "W")
		ctx.fillStyle = '#fff';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), size/2, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	ctx.restore();
}		

// рисует прямую проходящую через точки pt1 и pt2
// начинается рисование прямой с точки имеющей значение координаты X равное x_begin
// заканчивается рисование прямой в точке имеющей значение координаты X равное x_end
function line(ctx, pt1, pt2, x_begin, x_end, width, color_line)
{
	ctx.save();
		
	if (color_line == "R")
		ctx.strokeStyle = '#f00';
	else if (color_line == "G")
		ctx.strokeStyle = '#0f0';
	else if (color_line == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color_line == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color_line == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color_line == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color_line == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color_line;	
	
	var point1 = lnx(pt1, pt2, x_begin);
	var point2 = lnx(pt1, pt2, x_end);

	ctx.beginPath();
	ctx.moveTo( fx(point1[0]), fy(point1[1]) );
	ctx.lineTo( fx(point2[0]), fy(point2[1]) );	
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}

// рисует окружность с центром в point с радиусом radius
function circle(ctx, point, radius, width, color_line)
{
	ctx.save();

	if (color_line == "R")
		ctx.strokeStyle = '#f00';
	else if (color_line == "G")
		ctx.strokeStyle = '#0f0';
	else if (color_line == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color_line == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color_line == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color_line == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color_line == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color_line;	

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), radius * SCALE, 0, 2 * Math.PI, false);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}

// на расстоянии от точки point рисует текст str
// расстояние задается при помощи параметров align и baseline
// отличается от text2 значением этого расстояния
function text1(ctx, str, point, align, baseline, color, font)
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = '#000';	

	if (font == null)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 3, fy(point[1]) + 2);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 5, fy(point[1]) + 2);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) + 2);
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 3, fy(point[1]) - 2);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 5, fy(point[1]) - 2);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) - 2);
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "middle";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 3, fy(point[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 5, fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}				
	}
	ctx.restore();
	return;
}		

// на расстоянии от точки point рисует текст str
// расстояние задается при помощи параметров align и baseline
// отличается от text1 значением этого расстояния
function text2(ctx, str, point, align, baseline, color, font)
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else 
		ctx.fillStyle = color;		
	
	if (font == undefined)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 5, fy(point[1]) + 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 8, fy(point[1]) + 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) + 5);
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 5, fy(point[1]) - 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 8, fy(point[1]) - 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) - 5);
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "middle";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 5, fy(point[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 8, fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}				
	}
	ctx.restore();
	return;
}		

// рисует отрезок от pt1 до pt2
function line_segment(ctx, pt1, pt2, width, color)
{
	ctx.save();
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;	
	
	ctx.beginPath();
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

// стрелка в точке point с углом ang
function arrow(ctx, point, ang, scale, color) 
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "W")
		ctx.fillStyle = '#fff';		
	else
		ctx.fillStyle = color;		

	ctx.translate(fx(point[0]), fy(point[1]));
	ctx.scale(scale, scale);
	ctx.rotate(ang);
	ctx.beginPath();
	ctx.moveTo(-15, 50);
	ctx.lineTo(15, 50);
	ctx.lineTo(0, 0);
	ctx.lineTo(-15, 50);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}
																

// Рисует отрезок от pt1 до pt2 со стрелкой в точке pt2
function segment_arrow(ctx, pt1, pt2, width, scale, color)
{
	ctx.save();
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;	
	
	ctx.beginPath();
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	var ang = Math.atan2(pt1[0] - pt2[0], pt1[1] - pt2[1]);
	ang = ang + M_PI;
	//ctx.fillStyle = '#000';
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	
	
	arr(ctx, pt2, ang, scale) ;
	
	ctx.restore();	
}

// Рисует отрезок от pt1 до pt2 с двумя стрелками в точках pt1 и pt2
function segment_two_arrow(ctx, pt1, pt2, width, scale, color)
{
	ctx.save();
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;	
	
	ctx.beginPath();
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	var ang1 = Math.atan2(pt1[0] - pt2[0], pt1[1] - pt2[1]);
	var ang2 = ang1 + M_PI;
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = '#000';	
	
	arr(ctx, pt1, ang1, scale) ;
	arr(ctx, pt2, ang2, scale) ;
	
	ctx.restore();	
}

// вспомогательная функция для отрисовки острия стрелки 
function arr(ctx, point, ang, scale) 
{
	ctx.save();
	ctx.translate(fx(point[0]), fy(point[1]));
	ctx.scale(scale, scale);
	ctx.rotate(ang);
	ctx.beginPath();
	ctx.moveTo(-15, 50);
	ctx.lineTo(15, 50);
	ctx.lineTo(0, 0);
	ctx.lineTo(-15, 50);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

// Рисует угловую дугу с радиусом заданным в единицах с учетом масштабирования SCALE
// point - центр дуги
// ang_b - начальный угол дуги
// ang_e - конечный угол дуги
// вращение (отсет углов) осуществляется против часовой стрелки
function draw_angle(ctx, point, ang_b, ang_e, radius, width, color)
{
	ctx.save();
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), radius*SCALE, -ang_b, -ang_e, true);
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

// Рисует угловую дугу с радиусом заданным в единицах с учетом масштабирования SCALE
// str - текст с названием дуги
// point - центр дуги
// ang_b - начальный угол дуги
// ang_e - конечный угол дуги
// вращение (отсет углов) осуществляется против часовой стрелки
function draw_angle_txt(ctx, point, ang_b, ang_e, radius, str, align, baseline, width, color, font)
{
	ctx.save();
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;
	
	if (font == undefined)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), radius*SCALE, -ang_b, -ang_e, true);
	ctx.lineWidth = width;
	ctx.stroke();
	
	//ang_b + (ang_e - ang_b)/2
	var p_mid = new Point2D(point[0] + radius * Math.cos(ang_b + (ang_e - ang_b)/2), point[1] + radius * Math.sin(ang_b + (ang_e - ang_b)/2));
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(p_mid[0]) + 5, fy(p_mid[1]) + 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(p_mid[0]) - 8, fy(p_mid[1]) + 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(p_mid[0]), fy(p_mid[1]) + 5);
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(p_mid[0]) + 5, fy(p_mid[1]) - 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(p_mid[0]) - 8, fy(p_mid[1]) - 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(p_mid[0]), fy(p_mid[1]) - 5);
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "middle";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(p_mid[0]) + 5, fy(p_mid[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(p_mid[0]) - 8, fy(p_mid[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(p_mid[0]), fy(p_mid[1]));
			ctx.restore();
			return;
		}				
	}
	
	ctx.restore();	
}

function radius_arrow(ctx, center, radius, ang, width, scale, color)
{
	ctx.save();
	
	var pt = new Point2D(center[0] + radius*Math.cos(ang), center[1] + radius*Math.sin(ang));
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;	
	
	ctx.beginPath();
	ctx.moveTo(fx(center[0]), fy(center[1]));
	ctx.lineTo(fx(pt[0]), fy(pt[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	var ang1 = Math.atan2(center[0] - pt[0], center[1] - pt[1]);
	ang1 = ang1 + M_PI;
	//ctx.fillStyle = '#000';
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = '#000';	
	
	arr(ctx, pt, ang1, scale) ;
	
	ctx.restore();	
	
	return pt;
}

// рисует эллипс с центром в точке с координатами (x, y)
// a и b - размеры полуосей эллипса
function drawEllipse(ctx, x, y, a, b, width, color_line)
{
	ctx.save();
	
	// Запоминаем положение системы координат (CК) и масштаб
	if (color_line == "R")
		ctx.strokeStyle = '#f00';
	else if (color_line == "G")
		ctx.strokeStyle = '#0f0';
	else if (color_line == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color_line == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color_line == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color_line == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color_line == "Black") 
		ctx.strokeStyle = '#000';	
	else if (color_line == "Maroon")
		ctx.strokeStyle = '#800000';
	else if (color_line == "Purple")
		ctx.strokeStyle = '#800080';
	else
		ctx.strokeStyle = color_line;	
	
	ctx.lineWidth = width;
	
	ctx.beginPath();

	// Переносим СК в центр будущего эллипса
	ctx.translate(fx(x), fy(y));

	/*
	* Масштабируем по х.
	* Теперь нарисованная окружность вытянется в a / b раз
	* и станет эллипсом
	*/

	ctx.scale(a / b, 1);

	// Рисуем окружность, которая благодаря масштабированию станет эллипсом
	ctx.arc(0, 0, b*SCALE, 0, Math.PI * 2, true);

	ctx.closePath();
	ctx.stroke();
	// Восстанавливаем СК и масштаб
	ctx.restore();
}			

// Вспомогательная функция для удлинения отрезка pt1-pt2.
// Возвращает точку pt имеющую заданную координату x.
// Точка pt лежит на прямой проходящей через точки pt1 и pt2.
function lnx(pt1, pt2, x)
{
	var k = (pt2[1] - pt1[1])/(pt2[0] - pt1[0]);
	if (x > 0)
	{
		var pt = [pt1[0] + x, pt1[1] + k*x];
		return pt;
	}
	else
	{
		var pt = [pt1[0] + x, pt1[1] + k*x];
		return pt;				
	}
}

// формирует числовое представление
// используется для вывода чисел на экран
function roundNumber(num, places) 
{
	var t =  Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
	return t;
}

function fill_polygon(ctx, arr, n, color)
{
	// закраска области внутри рундиста
	
	ctx.save();
	
	ctx.beginPath();
	ctx.moveTo(fx(arr[0][0]), fy(arr[0][1]));
	for (i = 0; i < (n - 1); i++)
	{
		ctx.lineTo(fx(arr[i][0]), fy(arr[i][1]));
	}
	ctx.closePath();
	ctx.lineWidth = 0.1;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
	
	ctx.restore();
}

// рисует дугу
function arc(ctx, point, radius, width, color_line, angle_begin, angle_end)
{
	ctx.save();

	if (color_line == "R")
		ctx.strokeStyle = '#f00';
	else if (color_line == "G")
		ctx.strokeStyle = '#0f0';
	else if (color_line == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color_line == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color_line == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color_line == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color_line == "Black") 
		ctx.strokeStyle = '#000';	
	else if (color_line == "Maroon")
		ctx.strokeStyle = '#800000';
	else if (color_line == "Purple")
		ctx.strokeStyle = '#800080';
	else
		ctx.strokeStyle = '#000';	

	ctx.beginPath();
	var DEGREE = 0.01745329251994;
	var begin = angle_begin * DEGREE;
	var end = angle_end * DEGREE;
	ctx.arc(fx(point[0]), fy(point[1]), radius * SCALE, -begin, -end, true);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}