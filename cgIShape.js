//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    
    // fill in your code here.

    //Find out the increment of each subdivision
    let k = 1/subdivisions;

    //Generate the coordinates using a modified weighted average formula for 2 points
    for(let interval = 0; interval < subdivisions; interval++){
        let coordinateA = interval * k - 0.5;//find the increment per division and subtract from the start point(0.5,0.5)

        let coordinateB = (interval + 1) * k - 0.5;

        for(let second_interval = 0; second_interval < subdivisions; second_interval++){
            let coordinateC = second_interval * k - 0.5;

            let coordinateD = (second_interval + 1) * k - 0.5;

            //Based on the coordinates draw triangles
            makeTrainglesXaxis(coordinateA, coordinateB, coordinateC, coordinateD);
            makeTrainglesYaxis(coordinateA, coordinateB, coordinateC, coordinateD);
            makeTrianglesZaxis(coordinateA, coordinateB, coordinateC, coordinateD);
        }
    }
}

//Each cube face will have 2 complementary faces (one with -X the other with X)
//Function to draw triangles for each pair of faces, X, Y, Z
function makeTrainglesXaxis(A,B,C,D){
    let X = 0.5;
    addTriangle(-X, A, D, -X, B, C, -X, A, C);
    addTriangle(-X, B, D, -X, B, C, -X, A, D);

    addTriangle(X, B, C, X, A, D, X, A, C);
    addTriangle(X, B, C, X, B, D, X, A, D);
}

function makeTrainglesYaxis(A,B,C,D){
    let Y = 0.5;
    addTriangle(B, -Y, C, A, -Y, D, A, -Y, C);
    addTriangle(B, -Y, C, B, -Y, D, A, -Y, D);

    addTriangle(A, Y, D, B, Y, C, A, Y, C);
    addTriangle(B, Y, D, B, Y, C, A, Y, D);
}

function makeTrianglesZaxis(A,B,C,D){
    let Z = 0.5;
    addTriangle(B, C, -Z, A, C, -Z, A, D, -Z);
    addTriangle(B, C, -Z, A, D, -Z, B, D, -Z);

    addTriangle(A, C, Z, B, C, Z, A, D, Z);
    addTriangle(A, D, Z, B, C, Z, B, D, Z);
}

//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    // fill in your code here.

	let coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF;

	for(let interval = 0; interval < radialdivision; interval++) {

        //The cylinder top and base will only be on the X and Z axis
        let XCoordinates = [];
        let ZCoordinates = [];

        //Using the formula given in the slides find the values of the x coordinates based on the number of divisions
        XCoordinates = CosForXPoints(coordinateA, coordinateB, interval, radialdivision);

        coordinateA = XCoordinates[0];
        coordinateB = XCoordinates[1];

        //Using for the formula given in the slides find the values of z coordinates based on the number of divisions
        ZCoordinates = SinForZPoints(coordinateE, coordinateF, interval, radialdivision);

        coordinateE = ZCoordinates[0];
        coordinateF = ZCoordinates[1];

        //Use the coordinates generated to draw the triangles for the top and bottom
		drawTrianglesForDisks(coordinateA, coordinateB, coordinateE, coordinateF);
        
        //Using similar logic from the cube, draw triangles for the sides of the cylinder
		for(let second_interval = 0; second_interval < heightdivision; second_interval++) {
			coordinateC = second_interval / heightdivision - 0.5;

            coordinateD = (second_interval + 1) / heightdivision - 0.5;

            drawTrianglesForSides(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF);
			
		}
	}
}

//Function to generate the coordinates using the cos function
function CosForXPoints(A,B,interval,radialdivision){
    let PI = 3.14159265358979;

    A = 0.5 * Math.cos(interval * 2 * PI / radialdivision);

    B = 0.5 * Math.cos((interval + 1) * 2 * PI / radialdivision);

    return [A, B];
}

//Function to generate the coordinates using the sin function
function SinForZPoints(E,F,interval, radialdivision){
    let PI = 3.14159265358979;

    E = 0.5 * Math.sin(interval * 2 * PI / radialdivision);

    F = 0.5 * Math.sin((interval + 1) * 2 * PI / radialdivision);

    return [E, F];
}

function drawTrianglesForSides(A,B,C,D,E,F){
    addTriangle(A, D, E, B, D, F, A, C, E);
    addTriangle(B, D, F, B, C, F, A, C, E);
}

function drawTrianglesForDisks(A,B,E,F){
    let Y = 0.5;
    addTriangle(0, -Y, 0, A, -Y, E, B, -Y, F);
    addTriangle(B, Y, F, A, Y, E, 0, Y, 0);
}

//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.

    let coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF;

    //A cone only has a base on the X-Z plane so only one triangle fucntion is required
    for(let interval = 0; interval < radialdivision; interval++) {
        let XCoordinates = [];
        let ZCoordinates = [];
        let Y = 0.5;

        XCoordinates = CosForXPoints(coordinateA, coordinateB, interval, radialdivision);

        coordinateA = XCoordinates[0];
        coordinateB = XCoordinates[1];

        ZCoordinates = SinForZPoints(coordinateE, coordinateF, interval, radialdivision);

        coordinateE = ZCoordinates[0];
        coordinateF = ZCoordinates[1];

		addTriangle(coordinateA, -Y, coordinateE, coordinateB, -Y, coordinateF, 0, -Y, 0);

		//The height division determine the increment in distance but only along the Y axis
        coordinateC = -0.5;
        coordinateD = 1 / heightdivision;

        //Corresponding X and Z coordinates for incremented Y coordinates
		increment_coordinateA = -coordinateA / heightdivision;
        increment_coordinateB = -coordinateB / heightdivision;

		increment_coordinateE = -coordinateE / heightdivision;
		increment_coordinateF = -coordinateF / heightdivision;
		 
		for(let second_interval = 0; second_interval < heightdivision - 1; second_interval++) {

			drawTriangleForConeSides(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF);
		}

        //Draw triangle for the top of the cone 
		addTriangle(coordinateA, coordinateC, coordinateE, 0, 0.5, 0, coordinateB, coordinateC, coordinateF);
	}
}

//Draw Triangles for the sides of the cone, including the increment in the Y coordinate
function drawTriangleForConeSides(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF){
    addTriangle(coordinateA, coordinateC, coordinateE, 
        coordinateA + increment_coordinateA, coordinateC + coordinateD, coordinateE + increment_coordinateE,
        coordinateB, coordinateC, coordinateF);
    addTriangle(coordinateA + increment_coordinateA, coordinateC + coordinateD, coordinateE + increment_coordinateE,
        coordinateB + increment_coordinateB, coordinateC + coordinateD, coordinateF + increment_coordinateF,
        coordinateB, coordinateC, coordinateE );
    
    coordinateA += increment_coordinateA;
    coordinateB += increment_coordinateB;
    coordinateE += increment_coordinateE;
    coordinateF += increment_coordinateF;
    coordinateC += coordinateD;
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
    let PI = 3.14159265358979;

    let coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF;
    let coordinateG, coordinateH, coordinateI, coordinateJ, coordinateK, coordinateL;

    //Subdivision formula for latitude and longitude
    let Xlatitude = PI / stacks; 
    let Ylongitude = 2 * PI / slices; 

    for(let interval = 0; interval < stacks; interval++) {

        let latitudeAngle = Xlatitude * interval;
        
        for(let second_interval = 0; second_interval < slices; second_interval++) {

            let longitudeAngle = Ylongitude * second_interval;

            let BasicViewPoints = [];
            let TopViewPoints = [];
            let BottomViewPoints = [];
            let ExternalViewPoints = [];

            //Functions to draw triangles for the sphere in all combinations of the formula given in the slides
            BasicViewPoints = SphereBasicView(coordinateA, coordinateB, coordinateC, latitudeAngle, longitudeAngle);
            
            coordinateA = BasicViewPoints[0];
            coordinateB = BasicViewPoints[1];
            coordinateC = BasicViewPoints[2];

            TopViewPoints = SphereTopView(coordinateD, coordinateE, coordinateF, latitudeAngle, longitudeAngle, Xlatitude);

            coordinateD = TopViewPoints[0];
            coordinateE = TopViewPoints[1];
            coordinateF = TopViewPoints[2];

            BottomViewPoints = SphereBottomView(coordinateG, coordinateH, coordinateI, latitudeAngle, longitudeAngle, Xlatitude, Ylongitude);

            coordinateG = BottomViewPoints[0];
            coordinateH = BottomViewPoints[1];
            coordinateI = BottomViewPoints[2];

            ExternalViewPoints = SphereExternalView(coordinateJ, coordinateK, coordinateL, latitudeAngle, longitudeAngle, Ylongitude);

            coordinateJ = ExternalViewPoints[0];
            coordinateK = ExternalViewPoints[1];
            coordinateL = ExternalViewPoints[2];

            addTriangle(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF, coordinateG, coordinateH, coordinateI);
            addTriangle(coordinateA, coordinateB, coordinateC, coordinateG, coordinateH, coordinateI, coordinateJ, coordinateK, coordinateL);
      
        }

    }
}

//Function to generate the coordinates of points based off of the formula given in the slides
function SphereBasicView(A,B,C, latitudeAngle, longitudeAngle){
    A = 0.5 * Math.sin(latitudeAngle) * Math.cos(longitudeAngle);
    B = 0.5 * Math.cos(latitudeAngle);
    C = 0.5 * Math.sin(latitudeAngle) * Math.sin(longitudeAngle);

    return [A, B, C];
}

function SphereTopView(D,E,F, latitudeAngle, longitudeAngle, Xlatitude){
    D = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.cos(longitudeAngle);
    E = 0.5 * Math.cos(latitudeAngle + Xlatitude);
    F = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.sin(longitudeAngle);

    return [D, E, F];
}

function SphereBottomView(G,H,I, latitudeAngle, longitudeAngle, Xlatitude, Ylongitude){
    G = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.cos(longitudeAngle + Ylongitude);
    H = 0.5 * Math.cos(latitudeAngle + Xlatitude);
    I = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.sin(longitudeAngle + Ylongitude);

    return[G, H, I];

}

function SphereExternalView(J,K,L, latitudeAngle, longitudeAngle, Ylongitude){
    J = 0.5 * Math.sin(latitudeAngle) * Math.cos(longitudeAngle + Ylongitude);
    K = 0.5 * Math.cos(latitudeAngle);
    L = 0.5 * Math.sin(latitudeAngle) * Math.sin(longitudeAngle + Ylongitude);

    return[J, K, L];

}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

