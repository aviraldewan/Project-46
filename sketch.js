var Play = 1;
var end = 0;
var gameState = Play;
var pl,pi,bgi;
var bg_sound,gi,gGroup,g,ground,c,ci,cGroup;
var e = 50;

function preload()
{
  bgi = loadImage("bg.jpg");
  pi = loadImage("p.png");
  bg_sound = loadSound("rain.mp3");
  gi = loadImage("gball.png");
  ci = loadImage("cash.png");
}

function setup() {
  createCanvas(1400,650);
  pl = createSprite(5915, 1130, 50, 50);
  pl.addImage(pi);
  pl.scale = 0.4;

  pl.setCollider("rectangle",0,0,30,30);
  pl.debug = false; 

  ground = createSprite(pl.x,pl.y + 10,displayWidth,10);
  ground.visible = false;

  gGroup = createGroup();
  cGroup = createGroup();

}

function draw() {
  background(0);  
  image(bgi,480,-displayHeight*2,displayWidth*4,displayHeight*4);

  camera.position.x = pl.x;
  camera.position.y = pl.y;

  pl.width = displayWidth;

  fill('white');
  textSize(20);
  text("Energy: " + e,pl.x - 650,pl.y - 275);

  if (gameState === Play)
  {
      spawnG();
      spawnC();

      if (frameCount % 40 === 0)
      {
        bg_sound.play();
      }

      if (keyDown("left_arrow"))
      {
        pl.x -= 5;
        e -= 0.5;
      }
      else if (keyDown("right_arrow"))
      {
        pl.x += 5;
        e -= 0.5;
      }
      if (gGroup.isTouching(pl))
      {
        e++;
        g.destroy();
      }

      if (keyDown("space") && pl.y < 1140)
      {
        pl.velocityY -= 3;
      }
      
      pl.velocityY += 0.8;

      pl.collide(ground);

      if (e < 5)
      {
        gameState = end;
      }
      if (cGroup.isTouching(pl))
      {
        gameState = end;
      }
      if (pl.x >= 6300 && pl.y >= 1300)
      {
        pl.x = pl.x - 80;
        pl.y = 1129;
      }
}

if (gameState === end)
{
    fill('yellow');
    textSize(40);
    text("Game Over!",pl.x,pl.y - 100);
    gGroup.destroyEach();
    cGroup.destroyEach();
}

  drawSprites();
}

function spawnG()
{
  if (frameCount % 60 === 0)
  {
    g = createSprite(random(pl.x - 10,pl.x - 400),pl.y,7,7);
    g.addImage(gi);
    g.scale = 0.1;
    g.lifetime = 200;
    gGroup.add(g);
  }
}

function spawnC()
{
  if (frameCount % 80 === 0)
  {
    c = createSprite(random(pl.x - 100,pl.x - 400),pl.y,7,7);
    c.addImage(ci);
    c.scale = 0.2;
    c.velocityX = 1;
    c.lifetime = 200;
    cGroup.add(c);
  }
}