// rotations.js

let delta_rot = 10 * DEGREE;

// массив THREE.Vector3
let save_BS = [];
// массив THREE.Vector3
let save_XY = [];

// массив THREE.Mesh
let sphere_rotation_BS = [];

// массив THREE.Mesh
let plane_rotation_XY = [];

// массив THREE.Mesh
let massiv_spinor_lines_1 = [];
let massiv_spinor_lines_2 = [];

let spinor_line_1;
let spinor_line_2;

let pt_cross = new Point3D(0,0,0);
let pt_cross2 = new Point3D(0,0,0);

function N_plus()
{
	let theta = polar_electron; // географическая широта вектора Блоха
	let fi = azimuth_electron;  // географическая долгота вектора Блоха
	let alpha = delta_rot;      // угол на который надо совершить поворот вектора Блоха

	let alpha_grad = alpha/DEGREE;

	let t = Math.cos(alpha/2);
	let u = Math.sin(alpha/2);
	
	// axis_rotation();
	
	// проекции единичного вектора оси вращения на оси x, y, z
	let nx = Math.sin(polar_axis) * Math.cos(azimuth_axis);
	let ny = Math.sin(polar_axis) * Math.sin(azimuth_axis);
	let nz = Math.cos(polar_axis);

	let c =   Math.cos(theta/2);
	let d =   Math.sin(theta/2);

	let real_1 = t*c + u*nx*Math.sin(fi)*d - u*ny*Math.cos(fi)*d;
	let imag_1 = -u*nz*c - u*nx*d*Math.cos(fi) - u*ny*Math.sin(fi)*d;

	let real_2 = u*ny*c + d*t*Math.cos(fi) - d*u*nz*Math.sin(fi);
	let imag_2 = d*t*Math.sin(fi) + d*u*nz*Math.cos(fi) - u*nx*c;

	/////////////////////////////////////////////////////////////

	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
	let fi_1 = Math.atan2(imag_1, real_1);

//	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
//					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	let fi_2 = Math.atan2(imag_2, real_2);

	let ang_fi = fi_2 - fi_1;
		

	let ang1 = Math.acos(r1);

	polar_electron = 2*ang1;
	
	if (polar_electron > 179*DEGREE)
	{
		azimuth_electron = 0.0;
	}
	else
	{
		azimuth_electron = ang_fi;
	}
	
	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// X, Y, Z - точки на сфере Блоха
	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;
	
	// запоминаем для последующего стирания
	save_BS.push(new THREE.Vector3(X, Y, Z ));

	// перерисовываем и обновляем данные
	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;

	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;	
	gui.updateDisplay();	
}

function N_minus()
{
	let theta = polar_electron; // географическая широта вектора Блоха
	let fi = azimuth_electron;  // географическая долгота вектора Блоха
	let alpha = - delta_rot;      // угол на который надо совершить поворот вектора Блоха

	let alpha_grad = alpha/DEGREE;

	let t = Math.cos(alpha/2);
	let u = Math.sin(alpha/2);

	// axis_rotation();
	
	// проекции единичного вектора оси вращения на оси x, y, z
	let nx = Math.sin(polar_axis) * Math.cos(azimuth_axis);
	let ny = Math.sin(polar_axis) * Math.sin(azimuth_axis);
	let nz = Math.cos(polar_axis);

	let c =   Math.cos(theta/2);
	let d =   Math.sin(theta/2);

	let real_1 = t*c + u*nx*Math.sin(fi)*d - u*ny*Math.cos(fi)*d;
	let imag_1 = -u*nz*c - u*nx*d*Math.cos(fi) - u*ny*Math.sin(fi)*d;

	let real_2 = u*ny*c + d*t*Math.cos(fi) - d*u*nz*Math.sin(fi);
	let imag_2 = d*t*Math.sin(fi) + d*u*nz*Math.cos(fi) - u*nx*c;

	/////////////////////////////////////////////////////////////

	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
	let fi_1 = Math.atan2(imag_1, real_1);

//	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
//					   Math.abs(imag_2)*Math.abs(imag_2));

	let fi_2 = Math.atan2(imag_2, real_2);

	let ang_fi = fi_2 - fi_1;

	let ang1 = Math.acos(r1);

	polar_electron = 2*ang1;
	if (polar_electron > 179.8*DEGREE)
	{
		azimuth_electron = 0.0;
	}
	else
	{
		azimuth_electron = ang_fi;
	}
	
	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;
	
	// запоминаем для последующего стирания
	save_BS.push(new THREE.Vector3(X, Y, Z ));

	// перерисовываем и обновляем данные
	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;

	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;	
	gui.updateDisplay();	
}

function X_plus()
{
	let theta = polar_electron; // географическая широта вектора Блоха
	let fi = azimuth_electron;  // географическая долгота вектора Блоха
	let alpha = delta_rot;      // угол на который надо совершить поворот вектора Блоха

	//   Находим произведение квадратной  матрицы (2x2) [  a    i· b ] 
	//                                                  [i· b     a   ]
	//          на матрицу столбец (2x1) [c, d·exp(i*fi) ]
	//
	//           a    i· b                        c
	//  матрицу             умножаем на матрицу
	//           i· b   a                       d· exp(i· fi)
	
	let a =   Math.cos(alpha/2);
	let b = - Math.sin(alpha/2);  // !! берем со знаком "-"
	
	let c =   Math.cos(theta/2);
	let d =   Math.sin(theta/2);
	
	let real_1 = a*c - b*d*Math.sin(fi); // действительная часть верхнего элемента результ. матрицы
	let imag_1 = b*d*Math.cos(fi);       // мнимая часть верхнего элемента результ. матрицы
	
	let real_2 = a*d*Math.cos(fi);       // действительная часть нижнего элемента результ. матрицы
	let imag_2 = b*c + a*d*Math.sin(fi); // мнимая часть нижнего элемента результ. матрицы
	
	// верхний элемент в показат. форме
	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	let fi_1 = Math.atan2(imag_1, real_1);
	
	// нижний элемент в показат. форме
	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	let fi_2 = Math.atan2(imag_2, real_2);	
	
	// приращение угла
	let ang_fi = (fi_2 - fi_1);
	
	let ang1 = Math.asin(r2);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;
	
	// запоминаем для последующего стирания
	save_BS.push(new THREE.Vector3(X, Y, Z ));

	// перерисовываем и обновляем данные
	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;

	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;	
	gui.updateDisplay();
}

function X_minus()
{
	let theta = polar_electron;
	let fi = azimuth_electron;
	let alpha = - delta_rot;
	
	let a =   Math.cos(alpha/2);
	let b = - Math.sin(alpha/2);
	
	let c =   Math.cos(theta/2);
	let d =   Math.sin(theta/2);
	
	let real_1 = a*c - b*d*Math.sin(fi);
	let imag_1 = b*d*Math.cos(fi);
	
	let real_2 = a*d*Math.cos(fi);
	let imag_2 = b*c + a*d*Math.sin(fi);	
	
	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	let fi_1 = Math.atan2(imag_1, real_1);
	
	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	let fi_2 = Math.atan2(imag_2, real_2);	
	
	let ang_fi = (fi_2 - fi_1);
	
	// ang2 = Math.acos(r1);
	let ang1 = Math.asin(r2);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;

	save_BS.push(new THREE.Vector3(X, Y, Z ));

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	
	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;
	gui.updateDisplay();
}

function Y_plus()
{
	let theta = polar_electron;
	let fi = azimuth_electron;
	let alpha = delta_rot;
	
	let a =   Math.cos(alpha/2);
	let b =   Math.sin(alpha/2);
	
	let c =   Math.cos(theta/2);
	let d =   Math.sin(theta/2);
	
	let real_1 = a*c - b*d*Math.cos(fi);
	let imag_1 = - b*d*Math.sin(fi); // !!!!!
	
	let real_2 = b*c + a*d*Math.cos(fi);
	let imag_2 = a*d*Math.sin(fi);
	
	
	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	let fi_1 = Math.atan2(imag_1, real_1);
	
	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	let fi_2 = Math.atan2(imag_2, real_2);	
	
	let ang_fi = fi_2 - fi_1;
	
	let ang1 = Math.acos(r1);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;
	
	save_BS.push(new THREE.Vector3(X, Y, Z ));

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	
	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	

	controller.azimuth_electron = angle_azim;
	gui.updateDisplay();
}

function Y_minus()
{
	let theta = polar_electron;
	let fi = azimuth_electron;
	let alpha = - delta_rot;
	
	let a =   Math.cos(alpha/2);
	let b =   Math.sin(alpha/2);
	
	let c =   Math.cos(theta/2);
	let d =   Math.sin(theta/2);
	
	let real_1 = a*c - b*d*Math.cos(fi);
	let imag_1 = - b*d*Math.sin(fi);
	
	let real_2 = b*c + a*d*Math.cos(fi);
	let imag_2 = a*d*Math.sin(fi);
	
	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	let fi_1 = Math.atan2(imag_1, real_1);
	
	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	let fi_2 = Math.atan2(imag_2, real_2);	
	
	let ang_fi = fi_2 - fi_1;
	
	let ang1 = Math.acos(r1);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;
	
	save_BS.push(new THREE.Vector3(X, Y, Z ));

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	
	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;

	gui.updateDisplay();
}

function Z_plus()
{
	azimuth_electron = azimuth_electron + delta_rot;

	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;

	save_BS.push(new THREE.Vector3(X, Y, Z ));   

	recalc();

	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim < 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;
	gui.updateDisplay();		
}

function Z_minus()
{
	azimuth_electron = azimuth_electron - delta_rot;

	let spinor_x = rs * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	let spinor_y = rs * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	let spinor_z = rs * Math.cos(polar_electron);

	// приводим в соответствие системы координат
	let X = - spinor_x;
	let Y =   spinor_z;
	let Z =   spinor_y;

	save_BS.push(new THREE.Vector3(X, Y, Z ));   

	recalc();

	let angle_azim = azimuth_electron/DEGREE;

	if (angle_azim <= 0)
	{
		let n = Math.abs(Math.ceil(angle_azim/360));
		angle_azim = 360 + angle_azim + 360 * n;
	}
	if (angle_azim > 360)
	{
		let n = Math.floor(angle_azim/360);
		let angle_azim = angle_azim - 360 * n;
	}	
	controller.azimuth_electron = angle_azim;
	gui.updateDisplay();		
}

function Deg2()
{	
	let bt = document.getElementById('btn_Deg2');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_Deg5');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_Deg10');
	bt.style.background = '#bbbbbb';
	
	delta_rot = DEGREE*2;
	recalc();
}

function Deg5()
{	
	let bt = document.getElementById('btn_Deg5');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_Deg10');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_Deg2');
	bt.style.background = '#bbbbbb';
	
	delta_rot = DEGREE*5;
	recalc();
}

function Deg10()
{		
	let bt = document.getElementById('btn_Deg10');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_Deg5');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_Deg2');
	bt.style.background = '#bbbbbb';
	
	delta_rot = DEGREE*10;
	recalc();
}

function clear_rotation()
{	
	let i = 0;
	for (i = 0; i < sphere_rotation_BS.length; i++)
	{
		scene.remove(sphere_rotation_BS[i]);
	}
	
	for (i = 0; i < plane_rotation_XY.length; i++)
	{
		scene.remove(plane_rotation_XY[i]);
	}

	for (i = 0; i < massiv_spinor_lines_1.length; i++)
	{
		scene.remove(massiv_spinor_lines_1[i]);
	}	
	
	for (i = 0; i < massiv_spinor_lines_2.length; i++)
	{
		scene.remove(massiv_spinor_lines_2[i]);
	}	
	save_BS.length = 0;
	sphere_rotation_BS.length = 0;
	save_XY.length = 0;
	plane_rotation_XY.length = 0;
	massiv_spinor_lines_1.length = 0;
	massiv_spinor_lines_2.length = 0;
	recalc();
	
	scene.remove(axis_N);
}

function X_Pauli()
{
	polar_electron = Math.PI - polar_electron;
	azimuth_electron = -azimuth_electron;
	
	recalc();
	controller.polar_electron = polar_electron / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function Y_Pauli()
{
	polar_electron = Math.PI - polar_electron;
	azimuth_electron = Math.PI - azimuth_electron;

	recalc();
	// controller.polar_electron = 2 * ang1 / DEGREE;
	controller.polar_electron = polar_electron / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function Z_Pauli()
{
	polar_electron = polar_electron;
	azimuth_electron = Math.PI + azimuth_electron;	

	recalc();
	// controller.polar_electron = 2 * ang1 / DEGREE;
	controller.polar_electron = polar_electron / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function Hadamard()
{
	let theta = polar_electron;
	let fi = azimuth_electron;
	
	let k = 1 / Math.sqrt(2);
	// после умножения на матрицу Адамара получаем вектор из одного столбца и двух строк в нем
	let real_1 = k * Math.cos(theta/2) + k * Math.sin(theta/2) * Math.cos(fi);  // real первая строка
	let imag_1 = k * Math.sin(theta/2) * Math.sin(fi);                          // imgine  первая строка
	let real_2 = k * Math.cos(theta/2) - k * Math.sin(theta/2) * Math.cos(fi);  // real вторая строка
	let imag_2 = - k * Math.sin(theta/2) * Math.sin(fi);                        // imgine вторая строка
	
	// переводим в экспоненциальную форму обе строки
	let r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	let fi_1 = Math.atan2(imag_1, real_1);
	
	let r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	let fi_2 = Math.atan2(imag_2, real_2);	
	
	let ang_fi = fi_2 - fi_1;  // находим азимут вектора Блоха
	
	let ang1 = Math.acos(r1); // находим половину угла наклона (географическая широта) 
	//ang2 = Math.asin(r2); // находим ang2, для того чтобы 
	                      // проверить, что ang1 = ang2
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function rotation_all_points()
{
	
	let points;
	
	// квантовые вращения на сфере Блоха	
	// let spinor_teta = 0.5 * polar_electron;
	let spinor_teta = polar_electron;
	// let spinor_fi = azimuth_electron + Math.PI/2;
	let spinor_fi = azimuth_electron;

	let spinor_x = rs * Math.sin(spinor_teta) * Math.cos(spinor_fi);
	let spinor_y = rs * Math.sin(spinor_teta) * Math.sin(spinor_fi);
	let spinor_z = rs * Math.cos(spinor_teta);
	//console.log("****SPIN x = ", spinor_x);
	//console.log("****SPIN y = ", spinor_y);
	//console.log("****SPIN z = ", spinor_z);	
	//console.log("******");	
	
	let X = spinor_y;
	let Y = spinor_z;
	let Z = spinor_x;

	if (polar_electron > 179*DEGREE)
	{
		pt_cross[0] = 200;
		pt_cross[1] = 0;
		pt_cross[2] = 200;  
		
		pt_cross2[0] = 200;
		pt_cross2[1] = 0;
		pt_cross2[2] = 200;
	}
	else
	{
		let line_sp = new Line3D(new Point3D(0, -rs, 0), new Point3D(X, Y, Z));
		let line_sp2 = new Line3D(new Point3D(0, -1, 0), new Point3D(X/rs, Y/rs, Z/rs));
	
		let pt1 = new Point3D(0, 0, 0);
		let pt2 = new Point3D(1, 0, 0);
		let pt3 = new Point3D(0, 0, 1);
		let plane = new Plane3D();
		plane.CreatePlaneThreePoints(pt1, pt2, pt3);
		pt_cross = line_sp.IntersectionLinePlane(plane);
	
		pt_cross2 = line_sp2.IntersectionLinePlane(plane);
	}
	
	console.log("pt_cross[0] = ", pt_cross[0]);
	console.log("pt_cross[1] = ", pt_cross[1]);
	console.log("pt_cross[2] = ", pt_cross[2]);	
	console.log("******");	
		
	// scene.remove(spinor_line_1);
	// scene.remove(spinor_line_2);

	const material_line = new THREE.LineBasicMaterial( { color: 0xff0000 } );
	points = [];
	points.push( new THREE.Vector3(0, -rs, 0 ) );
	points.push( new THREE.Vector3(pt_cross[0], pt_cross[1], pt_cross[2]));
	let geometry_line = new THREE.BufferGeometry().setFromPoints( points );
	spinor_line_1 = new THREE.Line( geometry_line, material_line  );
	scene.add( spinor_line_1 );
	
	points = [];
	points.push( new THREE.Vector3(X, Y, Z) );
	points.push( new THREE.Vector3(pt_cross[0], pt_cross[1], pt_cross[2]));
	geometry_line = new THREE.BufferGeometry().setFromPoints( points );
	spinor_line_2 = new THREE.Line( geometry_line, material_line  );
	scene.add( spinor_line_2 );
	
	massiv_spinor_lines_1.push(spinor_line_1);
	massiv_spinor_lines_2.push(spinor_line_2);
	
	const rs_pt_BS = 0.20; // // радиус точки на сфере Блоха	
	const pointGeometry_BS = new THREE.SphereGeometry(rs_pt_BS, 8, 8);	
	const pointMaterial_BS = new THREE.MeshBasicMaterial({color: 0x990000});
	let pt_BS = new THREE.Mesh(pointGeometry_BS, pointMaterial_BS);
	pt_BS.position.set(X, Y, Z);	
	save_BS.push(new THREE.Vector3(X, Y, Z));

	const rs_pt_XY = 0.20; // // радиус точки на плоскости XY
	const pointGeometry_XY = new THREE.SphereGeometry(rs_pt_XY, 8, 8);
	const pointMaterial_XY = new THREE.MeshBasicMaterial({color: 0x0000ff});
	let pt_XY = new THREE.Mesh(pointGeometry_XY, pointMaterial_XY);
	pt_XY.position.set(pt_cross[0], pt_cross[1], pt_cross[2]);	
	save_XY.push(new THREE.Vector3(pt_cross[0], pt_cross[1], pt_cross[2]));
	
	print_complex();  // Вывод текста в левой части окна
	
	let i = 0;
	for (i = 0; i < save_BS.length; i++)
	{
		let pt_BS = new THREE.Mesh(pointGeometry_BS, pointMaterial_BS);

		// position the sphere
		let point_i = save_BS[i];
		
		pt_BS.position.x = point_i.x;
		pt_BS.position.y = point_i.y;
		pt_BS.position.z = point_i.z;
		
		// сохраняем текущую точку из массива save_BS в массиве sphere_rotation_BS
		// чтобы потом можно ее стереть
		sphere_rotation_BS.push(pt_BS);
		// отображаем текущую точку из массива save_BS на сцене
		scene.add(pt_BS);
	}
	
	for (i = 0; i < save_XY.length; i++)
	{
		pt_XY = new THREE.Mesh(pointGeometry_XY, pointMaterial_XY);

		// position the plane
		let point_i = save_XY[i];  // текущая (в цикле for) точка взятая из массива save_XY 
		
		pt_XY.position.x = point_i.x;
		pt_XY.position.y = point_i.y;
		pt_XY.position.z = point_i.z;
		
		// сохраняем текущую точку из массива save_XY в массиве plane_rotation_XY
		// чтобы потом можно ее стереть
		plane_rotation_XY.push(pt_XY);
		// отображаем текущую точку из массива save_XY на сцене
		scene.add(pt_XY);
	}
}

function print_complex()
{
	const elem = document.getElementById('canvas_draw');
	
	// Ссылка на элемент id = "canvas_draw_hud". Двумерный канвас для отображения текста в левой части окна.
	// Положение canvas_draw_hud совпадает с положением canvas_draw. 
	// Но у canvas_draw z-index = 1, а у canvas_draw_hud z-index = 0.	
	const canvas_draw_hud = document.getElementById("canvas_draw_hud");
	
	// контекст для рисования на холсте в левой части окна.	
	const ctx_canvas_draw_hud = canvas_draw_hud.getContext('2d');
	if (!ctx_canvas_draw_hud) 
	{
		console.log('Failed to get rendering context');
		return;
	}		
	
	ctx_canvas_draw_hud.clearRect(0, 0, elem.width, elem.height);
	
	let cos_teta = Math.cos(polar_electron/2);
	let sin_teta = Math.sin(polar_electron/2);
	let b = Math.sin(polar_electron/2) * Math.cos(azimuth_electron);
	let c = Math.sin(polar_electron/2) * Math.sin(azimuth_electron);
	
	let text_cos_teta = roundNumber(cos_teta, 3);
	let text_sin_teta = roundNumber(sin_teta, 3);
	
	ctx_canvas_draw_hud.font = 'bold 18px "Times New Roman"';
	let text_color = "#000";
	let value_color = "#00f";
	ctx_canvas_draw_hud.fillStyle = text_color;
	
	let azimuth_electron_DEGREE = azimuth_electron/DEGREE;

	if (azimuth_electron_DEGREE < 0)
	{
		let n = Math.abs(Math.ceil(azimuth_electron_DEGREE/360));
		azimuth_electron_DEGREE = 360 + azimuth_electron_DEGREE + 360 * n;
	}
	if (azimuth_electron_DEGREE > 360)
	{
		let n = Math.floor(azimuth_electron_DEGREE/360);
		azimuth_electron_DEGREE = azimuth_electron_DEGREE - 360 * n;
	}	
	
	let fi = roundNumber(azimuth_electron_DEGREE, 0) + "°) · |1〉";
	
	let rez = "|ψ〉  =  " + 
				"(" + text_cos_teta + ") · |0〉 " + " + " +
			" (" + text_sin_teta + ") ";
	rez = rez + "· exp(i·" + fi;
	
	ctx_canvas_draw_hud.fillText(rez, 50, 490);	
	
	//////////////////////////////////////////////////
	// complex plane
	//////////////////////////////////////////////////
	if (polar_electron > 179.0 * DEGREE)
	{	
		ctx_canvas_draw_hud.font = 'bold 18px "Times New Roman"'; 
		ctx_canvas_draw_hud.fillStyle = "#ff0000";	
		ctx_canvas_draw_hud.fillText("ζ = ∞ ", 150, 515);
		return;
	}

	// точки пересечения прямой с плоскостью OXY
	let y = pt_cross2[0];  // x
	let z = pt_cross2[1];  // y //////!!!!!!
	let x = pt_cross2[2];  // z

	let text_y = roundNumber(y, 3);
	let text_z = roundNumber(z, 3);	
	let text_x = roundNumber(x, 3);	
	
	let text_x_abs = Math.abs(roundNumber(x, 3));
	let text_y_abs = Math.abs(roundNumber(y, 3));
	
	if (x >= 0)
	{
		text_x_abs = text_x_abs;
	}
	else
	{
		text_x_abs = "- " + text_x_abs;
	}
	
	if (y >= 0)
	{
		text_y_abs = " + " + text_y_abs;
	}
	else
	{
		text_y_abs = " - " + text_y_abs;
	}
	
	ctx_canvas_draw_hud.font = 'bold 18px "Times New Roman"'; 
	ctx_canvas_draw_hud.fillStyle = "#000000";
	//ctx_canvas_draw_hud.fillText("ζ = " + text_pp_x + " - " + text_pp_y_abs + "·i", 480, 515);
	
	ctx_canvas_draw_hud.fillText("ζ = " + text_x_abs + text_y_abs + "·i", 150, 515);
}

function axis_rotation()
{
	// let gamma = polar_axis;
	// let omega = azimuth_axis;

	let nx = Math.sin(polar_axis) * Math.cos(azimuth_axis);
	let ny = Math.sin(polar_axis) * Math.sin(azimuth_axis);
	let nz = Math.cos(polar_axis);

	scene.remove(axis_N);
	
	const lineMaterial = new THREE.LineBasicMaterial({ color: 0x880088 });

	const rs1 = 1.1*rs;
	let startVector = new THREE.Vector3( -rs1*ny, -rs1*nz, -rs1*nx );
	let endVector = new THREE.Vector3( rs1*ny, rs1*nz, rs1*nx );
	
	let linePoints = [];
	linePoints.push(startVector, endVector);

	  // Create Tube Geometry
	let tubeGeometry = new THREE.TubeGeometry
	(		
		new THREE.CatmullRomCurve3(linePoints),
		256,// path segments
		0.1,// THICKNESS
		4, //Roundness of Tube
		false //closed
	);

	axis_N = new THREE.Line(tubeGeometry, lineMaterial);
	scene.add(axis_N);
}