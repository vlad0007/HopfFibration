// qs.js

const DEGREE = Math.PI/180;

// const rs = 12; // радиус сферы Блоха
// const rB = 13.2; // радиус символа B

const rs = 7; // радиус сферы Блоха
const rB = 8.0; // радиус символа B

let meshText_B; // символ B (вектор Блоха) 

let gui;

let canvas_draw; 	// Ссылка на элемент по его идентификатору (id = "canvas_draw") для отображения 3D-модели.

let controller; // В объекте controller определяем свойства для параметров модели и их начальные значения.
				
let scene, camera, renderer, orbitControl;	// стандартные объекты three.js

// углы вращения (спин) электрона
let azimuth_electron = 0 * DEGREE;
let polar_electron = 0; // начальное значение

// углы задающие положение оси вокруг которой происходят квантовые вращения
let azimuth_axis = 0;
let polar_axis = 0;

// стрелка задающая направление вектора Блоха
let arrow_Bloch_vector;

let axis_N; // ось вращения N (для квантовых вращений)

function init()
{
	canvas_draw = document.getElementById("canvas_draw");	
	
	/////////////////////////////////////////////////////////////////////////
	// Для задания значений параметров будем использовать библиотеку dat.GUI
	// В объекте controller определяем свойства для параметров модели и их
	// начальные значения.
	/////////////////////////////////////////////////////////////////////////
    controller = new function() 
	{
		this.azimuth_electron = azimuth_electron / DEGREE;
		this.polar_electron = polar_electron / DEGREE;
		
		this.azimuth_axis = azimuth_axis / DEGREE;
		this.polar_axis = polar_axis / DEGREE;
    }();	
	
	// Создаем новый объект dat.GUI.
	gui = new dat.GUI({ autoPlace: false });
	gui.domElement.id = 'gui';
	gui_container.appendChild(gui.domElement);  // id = "gui_container"
	
    const f1 = gui.addFolder('Angles electron (°)');	
	f1.add(controller, 'polar_electron', 0.0, 180.0).onChange( function() 
	{
		orbitControl.enabled = false;
		polar_electron = (controller.polar_electron)* DEGREE;
		recalc();
		gui.updateDisplay();
		clear_rotation();
		spin_polar_background();
		// spin_az_background();
		
    });		
    f1.add(controller, 'azimuth_electron', 0.0, 360.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       azimuth_electron = (controller.azimuth_electron) * DEGREE;
	   recalc();
	   gui.updateDisplay();
	   clear_rotation();
		// spin_polar_background();
		spin_az_background();
		
    });
	f1.open();
	
	const f2 = gui.addFolder('Angles axis rotation (°)');	
	f2.add(controller, 'polar_axis', 0.0, 180.0).onChange( function() 
	{
		orbitControl.enabled = false;
		polar_axis = (controller.polar_axis)* DEGREE;
		recalc();
		gui.updateDisplay();
		clear_rotation();
		polar_background();
		// az_background();
		axis_rotation();
	});	
	f2.add(controller, 'azimuth_axis', 0.0, 360.0).onChange( function() 
	{
		orbitControl.enabled = false;
		azimuth_axis = (controller.azimuth_axis)* DEGREE;
		recalc();
		gui.updateDisplay();
		clear_rotation();
		// polar_background();
		az_background();
		axis_rotation();
	});
	f2.open();
	
	///////////////////////////////////////////////	
	// Создаем трехмерную сцену, камеру и рендерер
	///////////////////////////////////////////////
	scene = new THREE.Scene();

	const width = canvas_draw.width;
	const height = canvas_draw.height;
	const aspect = width / height;
	
	camera = new THREE.OrthographicCamera( -10, 10, 10/aspect, -10/aspect, 1, 2000 ); 
	
	camera.position.x = 200;
	camera.position.y = 240;
	camera.position.z = 200;
	
	camera.lookAt(new THREE.Vector3(0, 0, 0));	
	scene.add(camera);
	
	// Создаем renderer
	renderer = new THREE.WebGLRenderer({canvas: canvas_draw, alpha: true});
	renderer.setSize(canvas_draw.width, canvas_draw.height);

	// Элемент управления дающий возможность осматривать модели со всех сторон.
	orbitControl = new THREE.OrbitControls(camera, canvas_draw);	

/*
	//////// Истинные оси координат /////
	let axes = new THREE.AxesHelper(5);
	axes.position.set(19, 19, -5);
	scene.add(axes);
*/
	hopf_circles();
	create_scene();
	
	
	AddLabels();
	AddButtons();
	
	btn_rotX_plus.addEventListener("click", X_plus);
	btn_rotX_min.addEventListener("click", X_minus);
	btn_rotY_plus.addEventListener("click", Y_plus);
	btn_rotY_min.addEventListener("click", Y_minus);
	btn_rotZ_plus.addEventListener("click", Z_plus);
	btn_rotZ_min.addEventListener("click", Z_minus);
	
	btn_rotN_plus.addEventListener("click", N_plus);
	btn_rotN_min.addEventListener("click", N_minus);

	btn_X.addEventListener("click", X_Pauli);
	btn_Y.addEventListener("click", Y_Pauli);
	btn_Z.addEventListener("click", Z_Pauli);
	btn_H.addEventListener("click", Hadamard);
	
	btn_Deg2.addEventListener("click", Deg2);
	btn_Deg5.addEventListener("click", Deg5);
	btn_Deg10.addEventListener("click", Deg10);
	
	btn_clear_rotation.addEventListener("click", clear_rotation);
	btn_clear_hopf.addEventListener("click", clear_hopf);
	
	btn_thick1.addEventListener("click", Thick1);
	btn_thick2.addEventListener("click", Thick2);
	btn_thick3.addEventListener("click", Thick3);
	
	btn_check.addEventListener("click", check_axes);
	
	controller.azimuth_axis = 0;
	controller.polar_axis = 0;
	gui.updateDisplay();

	// initiate(); // загрузка png-файлов
	
	// Отображение на экран.
	render();
}	

function create_scene()
{	
	let x, y, z;

	const sphereGeometry = new THREE.SphereGeometry(rs, 36, 18);
	//const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xaabbff, opacity: 0.75, transparent: true });
	
	const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xaabbff, opacity: 0.25, transparent: true });
	
	
	sphereMaterial.side = THREE.FrontSide;
	sphereMaterial.shading = THREE.FlatShading;
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // главная сфера программы

	// position the sphere
	sphere.position.x = 0;
	sphere.position.y = 0;
	sphere.position.z = 0;
	
	scene.add(sphere);
	
	// Три окружности на сфере (sphere)
	const curve = new THREE.EllipseCurve(
		0,  0,            // ax, aY
		rs, rs,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false,            // aClockwise
		0                 // aRotation
	);

	const points_ellipse = curve.getPoints( 50 );
	const geometry_ellipse = new THREE.BufferGeometry().setFromPoints( points_ellipse );
	const material_ellipse = new THREE.LineBasicMaterial( { color : 0x0000ff } );
	
	const ellipse_1 = new THREE.Line( geometry_ellipse, material_ellipse );
	const ellipse_2 = new THREE.Line( geometry_ellipse, material_ellipse );
	const ellipse_3 = new THREE.Line( geometry_ellipse, material_ellipse );
	
	ellipse_1.position.x = 0;
	ellipse_1.position.y = 0;
	ellipse_1.position.z = 0;
	ellipse_1.rotation.x = Math.PI/2;
	
	ellipse_2.position.x = 0;
	ellipse_2.position.y = 0;
	ellipse_2.position.z = 0;
	ellipse_2.rotation.y = Math.PI/2;
	
	ellipse_3.position.x = 0;
	ellipse_3.position.y = 0;
	ellipse_3.position.z = 0;
	ellipse_3.rotation.z = Math.PI/2;
	
	scene.add(ellipse_1);
	scene.add(ellipse_2);
	scene.add(ellipse_3);
	
	//////////////////////////////////////////////////////////////////////////////
	// текст "Complex Plane" на горизонтальной плоскости
	let complexText = new THREE.Object3D();
	complexText.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xffaaaa, // 0x44bb44
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	complexText.children[0].visible = true; // делаем видимой
	
	generateGeometry( complexText, "Complex Plane" );
	complexText.scale.set(0.3, 0.2, 0.1);	
	x = -1.2 * rs;
	y = 0; 
	z = -1.2 * rs;
	complexText.position.set(x, y, z);	
	complexText.rotation.x = -Math.PI / 2;
	complexText.rotation.z = Math.PI / 4;
	scene.add(complexText);
	
	////////////////////////////////////////////////////////////////////////////////
	
	// Axes X, Y, Z;
	const color_axes = 0x0000aa; // цвет текста 3D символов осей
	const axis_length = 15;
	let points = [];
	
	const material_axis = new THREE.LineBasicMaterial( { color: 0x000000 } );
	
	// Axis X
	points = [];
	points.push( new THREE.Vector3(0, 0,  5*axis_length ) );
	points.push( new THREE.Vector3(0, 0, - 5*axis_length) );
	const geometry_axis_X = new THREE.BufferGeometry().setFromPoints( points );
	const axis_X = new THREE.Line(geometry_axis_X, material_axis);
	scene.add(axis_X);

	// Axis Y
	points = [];
	points.push( new THREE.Vector3( 5 * axis_length, 0, 0 ) );
	points.push( new THREE.Vector3(- 5 * axis_length, 0, 0 ) );
	const geometry_axis_Y = new THREE.BufferGeometry().setFromPoints( points );
	const axis_Y = new THREE.Line(geometry_axis_Y, material_axis);
	scene.add(axis_Y);	

	// Axis Z
	points = [];
	points.push( new THREE.Vector3(0,  axis_length, 0 ) );
	points.push( new THREE.Vector3(0, - rs - 0.8, 0 ) );
	const geometry_axis_Z = new THREE.BufferGeometry().setFromPoints( points );
	const axis_Z = new THREE.Line(geometry_axis_Z, material_axis);
	scene.add(axis_Z);
	
	// Cones - стрелки на осях X, Y, Z
	const geometry_cone = new THREE.ConeGeometry( 0.2, 1, 8 );
	const material_cone = new THREE.MeshBasicMaterial( {color: 0x000000} );
	const cone_X = new THREE.Mesh( geometry_cone, material_cone );
	const cone_Y = new THREE.Mesh( geometry_cone, material_cone );
	const cone_Z = new THREE.Mesh( geometry_cone, material_cone );
	
	cone_X.position.set(0, 0, axis_length);
	cone_X.rotation.x = Math.PI / 2;	
	scene.add(cone_X);
	
	cone_Y.position.set(axis_length, 0, 0);
	cone_Y.rotation.x = Math.PI / 2;
	cone_Y.rotation.z = Math.PI * 3 / 2;
	scene.add(cone_Y );
	
	cone_Z.position.set(0, axis_length, 0);
	scene.add(cone_Z);
	
	// Наименование осей координат
	// X
	const meshText_X = new THREE.Object3D();
	meshText_X.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_X.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_X, "X" );
	meshText_X.scale.set(0.12, 0.12, 0.12);	
	x = 0;
	y = 0; 
	z = axis_length + 1.2;
	meshText_X.position.set(x, y, z);
	
	// Y
	const meshText_Y = new THREE.Object3D();
	meshText_Y.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Y.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_Y, "Y" );
	meshText_Y.scale.set(0.12, 0.12, 0.12);	
	x = axis_length + 1.2;
	y = 0; 
	z = 0;
	meshText_Y.position.set(x, y, z);
	
	// Z
	const meshText_Z = new THREE.Object3D();
	meshText_Z.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Z.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_Z, "Z" );
	meshText_Z.scale.set(0.12, 0.12, 0.12);	
	x = 0;
	y = axis_length + 1.2;
	z = 0;
	meshText_Z.position.set(x, y, z);
	
	scene.add(meshText_X); 
	scene.add(meshText_Y); 
	scene.add(meshText_Z);
	
	// На комплексной плоскости дополнительно именуем оси координат
	// +X
	const meshText_X_plus = new THREE.Object3D();
	meshText_X_plus.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_X_plus.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_X_plus, "+X" );
	meshText_X_plus.scale.set(0.2, 0.2, 0.1);	
	x = 0;
	y = 0; 
	z = 80; //2*axis_length + 1.2;
	meshText_X_plus.position.set(x, y, z);
	
	// +Y
	const meshText_Y_plus = new THREE.Object3D();
	meshText_Y_plus.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Y_plus.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_Y_plus, "+Y" );
	meshText_Y_plus.scale.set(0.2, 0.2, 0.1);	
	x = 80; //2*axis_length + 1.2;
	y = 0; 
	z = 0;
	meshText_Y_plus.position.set(x, y, z);
	
	// -X
	const meshText_X_minus = new THREE.Object3D();
	meshText_X_minus.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_X_minus.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_X_minus, "-X" );
	meshText_X_minus.scale.set(0.2, 0.2, 0.1);	
	x = 0;
	y = 0; 
	z = - 80; //2*axis_length + 1.2;
	meshText_X_minus.position.set(x, y, z);
	
	// -Y
	const meshText_Y_minus = new THREE.Object3D();
	meshText_Y_minus.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Y_minus.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_Y_minus, "-Y" );
	meshText_Y_minus.scale.set(0.2, 0.2, 0.1);	
	x = - 80; //2*axis_length + 1.2;
	y = 0; 
	z = 0;
	meshText_Y_minus.position.set(x, y, z);
	
	scene.add(meshText_X_plus);
	scene.add(meshText_X_minus);
	scene.add(meshText_Y_plus);
	scene.add(meshText_Y_minus);
	
	//-----------------------------------------------------------------
	
	// Обозначения точек пересечения осей координат с главной сферой Блоха
	
	// "|0>"
	const meshText_0 = new THREE.Object3D();
	meshText_0.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x880000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_0.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_0, "|0>" );
	meshText_0.scale.set(0.15, 0.15, 0.05);	
	x = 0.2;
	y = rs + 0.9;
	z = -0.5;
	meshText_0.position.set(x, y, z);
	
	// "|1>"
	const meshText_1 = new THREE.Object3D();
	meshText_1.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x880000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_1.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_1, "|1>" );
	meshText_1.scale.set(0.15, 0.15, 0.05);	
	x = 0;
	y = - rs - 1.2;
	z = 0;
	meshText_1.position.set(x, y, z);
	
	// "+i"
	const meshText_plus_i = new THREE.Object3D();
	meshText_plus_i.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: color_axes, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_plus_i.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_plus_i, "+i" );
	meshText_plus_i.scale.set(0.15, 0.15, 0.05);	
	x = rs + 1.0;
	y = 0.70;
	z = 0;
	meshText_plus_i.position.set(x, y, z);
	
	// "-i"
	const meshText_minus_i = new THREE.Object3D();
	meshText_minus_i.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: color_axes, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_minus_i.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_minus_i, "-i" );
	meshText_minus_i.scale.set(0.15, 0.15, 0.05);	
	x = - rs - 1.0;
	y = 0.70;
	z = 0;
	meshText_minus_i.position.set(x, y, z);
	
	scene.add(meshText_0); "|0>"		
	scene.add(meshText_1);
	scene.add(meshText_plus_i);
	scene.add(meshText_minus_i);
	
	// Стрелка задающее направление вектора "B" (вектора Блоха - spin_arrow)
	const spin_arrow = new THREE.Shape();

	diam1 = 0.05;
	diam2 = 0.3;
	length_1 = rs - 1;
	length_2 = rs;
	length_3 = rs - 3;

	spin_arrow.moveTo( 0, diam1 );
	spin_arrow.lineTo( length_3, diam1 );
	spin_arrow.lineTo( length_3, diam2 );
	spin_arrow.lineTo( length_2, 0 );
	spin_arrow.lineTo( length_3, -diam2 );
	spin_arrow.lineTo( length_3, -diam1 );
	spin_arrow.lineTo( 0, -diam1 );
	spin_arrow.lineTo( 0, diam1 );	
	
	const extrudeSettings = {
	  depth: 0.2,
	  bevelEnabled: false
	};

	const geometry_spin_arrow = new THREE.ExtrudeGeometry( spin_arrow, extrudeSettings );
	const material_spin_arrow = new THREE.MeshBasicMaterial( { color: 0xaa0000 } );
	arrow_Bloch_vector = new THREE.Mesh( geometry_spin_arrow, material_spin_arrow ) ;
	arrow_Bloch_vector.position.set(0, 0, 0);
	
	arrow_Bloch_vector.rotation.y = azimuth_electron + Math.PI/2;
	arrow_Bloch_vector.rotation.z = polar_electron + Math.PI/2;	
	
	scene.add( arrow_Bloch_vector );
	
	// Отображаем символ "B" на 3D-холсте
	meshText_B = new THREE.Object3D();
	meshText_B.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, sside: THREE.DoubleSide})));
			
	meshText_B.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_B, "B" );
	meshText_B.scale.set(0.15, 0.15, 0.15);	
	x = rB * Math.sin(polar_electron) * Math.sin(azimuth_electron) + 0.5;
	y = rB * Math.cos(polar_electron);
	z = rB * Math.sin(polar_electron) * Math.cos(azimuth_electron); 
	//meshText_B.rotation.z = -Math.PI/2;
	meshText_B.position.set(x, y, z);	
	// scene.add(meshText_B);
	
	//******************************************************************************************
	
	// Сферы - маленькие точки пересечения осей со сферой S-G 
	const spGeometry = new THREE.SphereGeometry(0.2, 6, 6);
	const spMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
	
	const up = new THREE.Mesh(spGeometry, spMaterial);
	const down = new THREE.Mesh(spGeometry, spMaterial);
	const left = new THREE.Mesh(spGeometry, spMaterial);
	const right = new THREE.Mesh(spGeometry, spMaterial);
	const back = new THREE.Mesh(spGeometry, spMaterial);
	const forward = new THREE.Mesh(spGeometry, spMaterial);	
	
	up.position.set(    0,   rs,  0);
	down.position.set(  0,   -rs, 0);
	left.position.set(  -rs, 0,   0);	
	right.position.set( rs,  0,   0);
	back.position.set(  0,   0,   -rs); 
	forward.position.set(0,  0,   rs);
	
	scene.add(up);
	scene.add(down);
	scene.add(left);
	scene.add(right);
	scene.add(back);
	scene.add(forward);
	
	// plane_OXY - комплексная плоскость
	const geometry_plane = new THREE.PlaneGeometry( 150, 150 );
	// const material_plane = new THREE.MeshPhongMaterial( {color: 0x44bb44, side: THREE.DoubleSide, opacity: 0.2, transparent: true } );
	const material_plane = new THREE.MeshPhongMaterial( {color: 0xfffffe, side: THREE.DoubleSide, opacity: 0.2, transparent: true } );
	const plane_OXY = new THREE.Mesh( geometry_plane, material_plane );
	
	plane_OXY.position.x = 0;
	plane_OXY.position.y = 0;
	plane_OXY.position.z = 0;
	
	plane_OXY.rotation.x = Math.PI/2;
	scene.add( plane_OXY );
	
	// свет
	const light_1 = new THREE.PointLight( 0xffffff, 0.8, 0 );
	light_1.position.set( 100, 200, 100 );
	scene.add( light_1 );

	const light_2 = new THREE.PointLight( 0xffffff, 0.8, 0 );
	light_2.position.set( - 100, - 200, - 100 );
	scene.add( light_2 );
	
	/////////////////////////////////////////////////////////////////////
	print_complex();  // Вывод текста в левой части окна
	
	let bt = document.getElementById('btn_Deg10');
	bt.style.background = '#44dd44';
}

function recalc()
{
	let x, y, z;
	
	arrow_Bloch_vector.rotation.z = polar_electron + Math.PI/2;
	arrow_Bloch_vector.rotation.y = azimuth_electron + Math.PI/2;
	
	scene.remove(meshText_B);
	x = rB * Math.sin(polar_electron) * Math.sin(azimuth_electron) + 0.5;
	y = rB * Math.cos(polar_electron);
	z = rB * Math.sin(polar_electron) * Math.cos(azimuth_electron); 
	//meshText_B.rotation.z = -Math.PI/2;
	meshText_B.position.set(x, y, z);

	// scene.add(meshText_B);

	// квантовые вращения на сфере Блоха
	rotation_all_points();
	
	recalc_hopf_circles()
}

//////////////////////////////////////////////////////////////
// 3D-Text
//////////////////////////////////////////////////////////////
const loaderText = new THREE.FontLoader(); // загрузчик шрифтов

// характеристики создаваемого 3D текста
function create_text(txt)
{
	const t =
	{
		text : txt,          // текст номера, который небходимо отобразить
		size : 6,            // размер текста (высота символа)
		height : 1,          // толщина текста
		curveSegments : 12,  // количество точек (сегментов) 
              // кривой при рисовании буквы, отвечающие за качество изображения
		//     font : "gentilis",   // название шрифта
		bevelEnabled : false // включение фаски (при true)
	};	
	return t;
}
	
// Создание текста для оцифровки вершин огранки.			
function generateGeometry(meshText, text)
{
	const data = create_text(text);
	loaderText.load
	( 
		//'../libs/helvetiker_regular.typeface.js', // шрифт
		//'../libs/optimer_regular.typeface.js',
		//'../libs/bitstream_vera_sans_mono_roman.typeface.js',
		//'../libs/gentilis_regular.typeface.json',
		'libs/helvetiker_regular.typeface.json',
		function ( font ) 
		{
			const geometryText = new THREE.TextGeometry
			( 
				data.text, 
				{
					font: font,
					size: data.size,
					height: data.height,
					curveSegments: data.curveSegments,
					bevelEnabled: data.bevelEnabled
				} 
			);
			geometryText.center();
			meshText.children[ 0 ].geometry.dispose(); 
			meshText.children[ 0 ].geometry = geometryText;			
		}
	);
}


	
function roundNumber(num, places) 
{
	return ( Math.round(num * Math.pow(10, places)) / Math.pow(10, places) );
}	
	
function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}

function render() 
{
	orbitControl.enabled = true;
	renderer.render(scene, camera);		
	requestAnimationFrame(render);
}


window.onload = init;
