/*Made by: Harikesh Pallantla, Lendi*/

var mySceneTLX;        
var mySceneTLY;        
var mySceneBRX;        
var mySceneBRY;        
var mySceneW;          
var mySceneH;          
var myCenterX;         
var myCenterY;
var num1,numberLabel1,num2,numberLabel2,minNumber,maxNumber,numberStep,resultLabel,answerLablel,quizLabel,computeLabel,nextLabel;
var hundredElements1 = [];
var tenElements1 = [];
var oneElements1 = [];
var hundredElements2 = [];
var tenElements2 = [];
var oneElements2 = [];
var hundred1,hundred2,one1,one2,ten1,ten2;
var num1Element,num2Element;
var ans;

var helpContent;
function initialiseHelp() {
    var helpContent;
    helpContent="";
    helpContent = helpContent + "<h2>Three digit addition using money</h2>";
    helpContent = helpContent + "<h3><u>About the experiment</u></h3>";
    helpContent = helpContent + "<p>In this experiment,we are trying to perform addtion of 3 digited numbers using money.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<h4>Click on start button to start the animation</h4>";
    helpContent = helpContent + "<p>Counting will start</p>";
    helpContent = helpContent + "<h4>Click on Reset button to reset animation</h4>";
    helpContent = helpContent + "<h4>Click on |>>| button to make animation rate faster than normal</h4>";
    helpContent = helpContent + "<h4>Click on |<<| button to make animation rate slower than normal</h4>";
    helpContent = helpContent + "<h4>Click on stop button to stop the animation</h4>";
    helpContent = helpContent + "<h3> Happy Experimenting !!!! </h3>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
    infoContent =  "";
    infoContent = infoContent + "<h2>Three digit addition using money</h2>";
    infoContent = infoContent + "<h3><u>About the experiment</u></h3>";
    infoContent = infoContent + "<p>In this experiment we will show addition of 2 numbers</p>";
    infoContent = infoContent + "<p>We will be using 2 numbers in the form of money</p>";
    infoContent = infoContent + "<p>Number1 is the first number in the addition and Number 2 is the second number in the addition.</p>";
    infoContent = infoContent + "<p>finally result will be displayed at the bottom left corner.</p>";
    infoContent = infoContent + "<p>This is three digit addition.So,the maximum values for number1 and number2 are 999</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    mySceneTLX = -10.0;
    mySceneTLY = 10.0;
    mySceneBRX = 10.0;
    mySceneBRY = -10.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myCenterZ  = -2.0;
    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEscene.add(new THREE.AmbientLight(0x606060));
    document.getElementById("start").addEventListener("click", startanim);
    document.getElementById("stop").addEventListener("click",stopanim);
    document.getElementById(">>").addEventListener("click",speedUp);
    document.getElementById("<<").addEventListener("click",speedDown);
}

function loadFont() {
    loader = new THREE.FontLoader();
    loader.load("fonts/optimer.json", function(response){
        font = response;  
    });
}

var scalar = 0.3;
function speedUp() {
    if (scalar <= 1.2){
        scalar = scalar*2;
    }
}
function speedDown() {
    if (scalar>0.075) {
        scalar = scalar/2;
    }
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("Three digit addition using money");
    PIEsetDeveloperName("Harikesh Pallantla");
    initialiseInfo();
    initialiseHelp();
    initialiseScene();
    loadFont();
    setSlider();
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
}

function getGeometry(num,size) {
    geometry = new THREE.TextGeometry(num,{
        font: font,
        size: size,
        height  : 0.01,
        curveSegments : 3
    });
    return geometry;
}

function getNumber()
{  
    var min = 100;
    var max = 999;
    var decimalPlaces = 0;

    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

function setSliderVariables()
{
    numberLabel1 = "Number 1";
    numberLabel2 = "Number 2";
    resultLabel  = "Your Answer";
    answerLablel = "Actual Answer";
    computeLabel = "Compute";
    nextLabel    = "Next Example";
    quizLabel    = "Quiz Me!"

    num1 = getNumber();
    num2 = getNumber();

    minNumber  = 100;
    maxNumber  = 999;
    numberStep = 1;
}
function getNumber1(newValue)
{
    num1 = newValue;
}

function getNumber2(newValue)
{
    num2 = newValue;
}
function setSlider()
{
    setSliderVariables();
    PIEaddInputSlider(numberLabel1, num1, getNumber1, minNumber, maxNumber, numberStep);
    PIEaddInputSlider(numberLabel2, num2, getNumber2, minNumber, maxNumber, numberStep);
    PIEaddDisplayText(numberLabel1, num1);
    PIEaddDisplayText(numberLabel2, num2);
    PIEaddDualCommand(computeLabel,computeExpt);
    PIEaddDualCommand(nextLabel,nextExpt);
    // PIEaddDualCommand(quizLabel,quizExpt);  
}

function computeExpt() {
    // document.getElementById("start").click();
    // startanim();
    PIEstartAnimation();
    startanim();
}

function nextExpt() {
    resetExperiment();
    num1 = getNumber();
    num2 = getNumber();
    PIEchangeInputSlider(numberLabel1,num1);
    PIEchangeInputSlider(numberLabel2,num2);
    // document.getElementById("stop").click();
}
function removeElements() {
    if(num1Element) {
        PIEremoveElement(num1Element);
    }
    if(num2Element) {
        PIEremoveElement(num2Element);
    }
    if(hundred1) {
        PIEremoveElement(hundred1);
    }
    if(hundred2) {
        PIEremoveElement(hundred2);
    }
    if(hundredElements1) {
        for(var i=0;i<9;i++) {
            PIEremoveElement(hundredElements1[i]);
        }
    }
    if(hundredElements2) {
        for(var i=0;i<9;i++) {
            PIEremoveElement(hundredElements2[i]);
        }
    }
    if(ten1) {
        PIEremoveElement(ten1);
    }
    if(ten2) {
        PIEremoveElement(ten2);
    }
    if(tenElements1) {
        for(var i=0;i<9;i++)
            PIEremoveElement(tenElements1[i]);
    }
    if(tenElements2) {
        for(var i=0;i<9;i++)
            PIEremoveElement(tenElements2[i])
    }
    if(one1) {
        PIEremoveElement(one1);
    }
    if(one2) {
        PIEremoveElement(one2);
    }
    if(tenElements1) {
        for(var i=0;i<9;i++)
            PIEremoveElement(oneElements1[i]);
    }
    if(oneElements2) {
        for(var i=0;i<9;i++)
            PIEremoveElement(oneElements2[i])
    }
    if(ans) {
        PIEremoveElement(ans);
    }
}
function startanim() {
    PIEstartAnimation();
    removeElements();
    material = new THREE.MeshBasicMaterial({color:'#000'});
    num1Element = new THREE.Mesh(getGeometry(num1,1.2), material);
    num1Element.position.set(myCenterX-20,myCenterY+7,myCenterZ);
    PIEaddElement(num1Element);
    num2Element = new THREE.Mesh(getGeometry(num2,1.2), material);
    num2Element.position.set(myCenterX-20,myCenterY,myCenterZ);
    PIEaddElement(num2Element);
    add100();
    add10();
    add1();
    
}
function add100() {
    var geometry = new THREE.PlaneGeometry(7,3);
    var imgUtils = THREE.ImageUtils.loadTexture('images/100.jpg',{},function(){PIErender();});
    var meshMaterial = new THREE.MeshBasicMaterial(
    { 
        transparent: true, 
        map: imgUtils,
        side: THREE.DoubleSide
    });
    var x=0;
    var y=0;
    for(var i=0;i<Math.floor(num1/100);i++)
    {
        hundredElements1[i] = new THREE.Mesh(geometry, meshMaterial);
        hundredElements1[i].position.set(myCenterX-11+x,myCenterY+8-y,myCenterZ);
        PIEaddElement(hundredElements1[i]);
        x += 0.2;
        y += 0.2;
    }
    material = new THREE.MeshBasicMaterial({color:'#FF3E0D'});
    hundred1 = new THREE.Mesh(getGeometry(Math.floor(num1/100),1), material);
    hundred1.position.set(myCenterX-11,myCenterY+3.5,myCenterZ);
    PIEaddElement(hundred1);
    x=0,y=0;
    for(var i=0;i<Math.floor(num2/100);i++) {
        hundredElements2[i] = new THREE.Mesh(geometry, meshMaterial);
        hundredElements2[i].position.set(myCenterX-11+x,myCenterY+1.5-y,myCenterZ);
        PIEaddElement(hundredElements2[i]);
        x += 0.2;
        y += 0.2;
    }
    hundred2 = new THREE.Mesh(getGeometry(Math.floor(num2/100),1), material);
    hundred2.position.set(myCenterX-11,myCenterY-3,myCenterZ);
    PIEaddElement(hundred2);
}
function add10() {
    var geometry = new THREE.PlaneGeometry(7,3);
    var imgUtils = THREE.ImageUtils.loadTexture('images/10.jpg',{},function(){PIErender();});
    var meshMaterial = new THREE.MeshBasicMaterial(
    { 
        transparent: true, 
        map: imgUtils,
        side: THREE.DoubleSide
    });
    var x=0;
    var y=0;
    for(var i=0;i<Math.floor(num1/10%10);i++)
    {
        tenElements1[i] = new THREE.Mesh(geometry, meshMaterial);
        tenElements1[i].position.set(myCenterX-1+x,myCenterY+8-y,myCenterZ);
        PIEaddElement(tenElements1[i]);
        x += 0.2;
        y += 0.2;
    }
    material = new THREE.MeshBasicMaterial({color:'#FF3E0D'});
    ten1 = new THREE.Mesh(getGeometry(Math.floor(num1/10%10),1), material);
    ten1.position.set(myCenterX-1,myCenterY+3.5,myCenterZ);
    PIEaddElement(ten1);
    x=0,y=0;
    for(var i=0;i<Math.floor(num2/10%10);i++) {
        tenElements2[i] = new THREE.Mesh(geometry, meshMaterial);
        tenElements2[i].position.set(myCenterX-1+x,myCenterY+1.5-y,myCenterZ);
        PIEaddElement(tenElements2[i]);
        x += 0.2;
        y += 0.2;
    }
    ten2 = new THREE.Mesh(getGeometry(Math.floor(num2/10%10),1), material);
    ten2.position.set(myCenterX-1,myCenterY-3,myCenterZ);
    PIEaddElement(ten2);
}
function add1() {
    // var geometry = new THREE.PlaneGeometry(7,3);
    var geometry = new THREE.RingGeometry( 0.001,1.3, 32 );
    var imgUtils = THREE.ImageUtils.loadTexture('images/1.png',{},function(){PIErender();});
    var meshMaterial = new THREE.MeshBasicMaterial(
    { 
        transparent: true, 
        map: imgUtils,
        side: THREE.DoubleSide
    });
    var x=0;
    var y=0;
    for(var i=0;i<Math.floor(num1%10);i++)
    {
        oneElements1[i] = new THREE.Mesh(geometry, meshMaterial);
        oneElements1[i].position.set(myCenterX+7+x,myCenterY+8,myCenterZ);
        PIEaddElement(oneElements1[i]);
        x += 0.8;
        y += 0.2;
    }
    material = new THREE.MeshBasicMaterial({color:'#FF3E0D'});
    one1 = new THREE.Mesh(getGeometry(Math.floor(num1%10),1), material);
    one1.position.set(myCenterX+8,myCenterY+3.5,myCenterZ);
    PIEaddElement(one1);
    x=0,y=0;
    for(var i=0;i<Math.floor(num2%10);i++) {
        oneElements2[i] = new THREE.Mesh(geometry, meshMaterial);
        oneElements2[i].position.set(myCenterX+7+x,myCenterY+1.5,myCenterZ);
        PIEaddElement(oneElements2[i]);
        x += 0.8;
        y += 0.2;
    }
    one2 = new THREE.Mesh(getGeometry(Math.floor(num2%10),1), material);
    one2.position.set(myCenterX+8,myCenterY-3,myCenterZ);
    PIEaddElement(one2);
}
function stopanim() {
    PIEstopAnimation();
}
function resetExperiment() {
    PIEstopAnimation();
    removeElements();
}
var count = 0;
function answer() {
    material = new THREE.MeshBasicMaterial({color:'#FFF'});
    PIEremoveElement(ans);        
    ans = new THREE.Mesh(getGeometry((num1+num2),1.2), material);
    ans.position.set(myCenterX-20,myCenterY-7,myCenterZ);
    PIEaddElement(ans);
}
function updateExperimentElements(t, dt) {
    if(oneElements1[0]) {
        if(oneElements1[0].position.y>myCenterY-6) {
            oneElements1[0].position.y -= 0.2;
            oneElements1[0].rotation.y -= 0.2;
        } else {
            oneElements1[0].rotation.y = 0;
        }
    }
    oneT = 0;
    for(var i=1;i<9;i++) {
        if(oneElements1[i]) {
            if(oneElements1[i].position.y>myCenterY-6 && t>oneT+2000) {
                oneElements1[i].position.y -= 0.2;
                oneElements1[i].rotation.y -= 0.2;
                oneT += 3500;
            } else {
                oneElements1[i].rotation.y = 0;
            }
        } else {
            break;
        }
    }
    if(oneElements2[0]) {
        if(oneElements2[0].position.y>myCenterY-7 && t>6000+oneT) {
            oneElements2[0].position.y -= 0.2;
            oneElements2[0].rotation.y -= 0.2;
        } else {
            oneElements2[0].rotation.y = 0;
        }
    }
    for(var i=1;i<9;i++) {
        if(oneElements2[i]) {
            if(oneElements2[i].position.y>myCenterY-7 && t>oneT+7000) {
                oneElements2[i].position.y -= 0.2;
                oneElements2[i].rotation.y -= 0.2;
                oneT += 3500;
            } else {
                oneElements2[i].rotation.y = 0;
            }
        } else {
            break;
        }
    }
    if(tenElements1[0]) {
        if(tenElements1[0].position.y>myCenterY-6 && t>10000+oneT) {
            tenElements1[0].position.y -= 0.2;
            tenElements1[0].rotation.z += 0.5;
        } else {
            tenElements1[0].rotation.z = 0;
        }
    }
    for(var i=1;i<9;i++) {
        if(tenElements1[i]) {
            if(tenElements1[i].position.y>myCenterY-6 && t>oneT+13000) {
                tenElements1[i].position.y -= 0.2;
                tenElements1[i].rotation.z += 0.5;
                oneT += 3500;
            } else {
                tenElements1[i].rotation.z = 0;
            }
        } else {
            break;
        }
    }
    if(tenElements2[0]) {
        if(tenElements2[0].position.y>myCenterY-7 && t>15000+oneT) {
            console.log("done");
            tenElements2[0].position.y -= 0.2;
            tenElements2[0].rotation.z -= 0.5;
        } else {
            tenElements2[0].rotation.z = 0;
        }
    }
    for(var i=1;i<9;i++) {
        if(tenElements2[i]) {
            if(tenElements2[i].position.y>myCenterY-7 && t>oneT+18000) {
                tenElements2[i].position.y -= 0.2;
                tenElements2[i].rotation.z -= 0.5;
                oneT += 3500;
            } else {
                tenElements2[i].rotation.z = 0;
            }
        } else {
            break;
        }
    }

    if(hundredElements1[0]) {
        if(hundredElements1[0].position.y>myCenterY-6 && t>20000+oneT) {
            hundredElements1[0].position.y -= 0.2;
            hundredElements1[0].rotation.y += 0.5;
        } else {
            hundredElements1[0].rotation.y = 0;
        }
    }
    for(var i=1;i<9;i++) {
        if(hundredElements1[i]) {
            if(hundredElements1[i].position.y>myCenterY-6 && t>oneT+24000) {
                hundredElements1[i].position.y -= 0.2;
                hundredElements1[i].rotation.y += 0.5;
                oneT += 3500;
            } else {
                hundredElements1[i].rotation.y = 0;
            }
        } else {
            break;
        }
    }
    if(hundredElements2[0]) {
        if(hundredElements2[0].position.y>myCenterY-7 && t>26000+oneT) {
            hundredElements2[0].position.y -= 0.2;
            hundredElements2[0].rotation.y -= 0.5;
        } else {
            hundredElements2[0].rotation.y = 0;
        }
    }
    for(var i=1;i<9;i++) {
        if(hundredElements2[i]) {
            if(hundredElements2[i].position.y>myCenterY-7 && t>oneT+28000) {
                hundredElements2[i].position.y -= 0.2;
                hundredElements2[i].rotation.y -= 0.5;
                oneT += 3500;
            } else {
                hundredElements2[i].rotation.y = 0;
            }
        } else {
            if(t>oneT+32000)
                answer();
            break;
        }
    }
}