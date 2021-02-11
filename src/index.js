const app = new PIXI.Application({
  width: 800,
  height: 800,
  antialias: true,
  transparent: false,
  resolution: 1,
});

app.stage.interactive = true;

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x999999;
app.renderer.autoResize = true;

const Graphics = PIXI.Graphics;

const topRect = new Graphics();
topRect.lineStyle(1, 0x000000, 1);
topRect.beginFill(0xffffff);
topRect.drawRect(0, 0, 800, 600);
app.stage.addChild(topRect);

const baseCircle = new Graphics();
baseCircle.lineStyle(1, 0x000000, 1);
baseCircle.beginFill(0xffffff);
baseCircle.drawCircle(0, 0, 60);
baseCircle.x = 150;
baseCircle.y = 750 - 60;
app.stage.addChild(baseCircle);


const baseTriangle = new Graphics();
baseTriangle.lineStyle(1, 0x000000, 1);
baseTriangle.beginFill(0xffffff);
baseTriangle.drawPolygon([
  0, 0,
  120, 0,
  60, - (60 * Math.sqrt(3)),
]);
baseTriangle.x = 340;
baseTriangle.y = 750;
app.stage.addChild(baseTriangle);

const baseRect = new Graphics();
baseRect.lineStyle(1, 0x000000, 1);
baseRect.beginFill(0xffffff);
baseRect.drawRect(0, -120, 120, 120);
baseRect.x = 610;
baseRect.y = 750;
baseRect.endFill();
app.stage.addChild(baseRect);

const baseFigures = {
  RECTANGLE: baseRect,
  CIRCLE: baseCircle,
  TRIANGLE: baseTriangle,
}

const figureCount = Math.random() * 4 + 6;
const figuresArray = [];

for (let i = 0; i < figureCount; i += 1) {
  figuresArray.push(new Figure(true, figuresArray, 'RECTANGLE'));
}

app.stage.on("pointermove", moveFigure);

function moveFigure(e){
  figuresArray.forEach(element => {
    if(element.isDown){
      let pos = e.data.global;
      element.setPosition(pos.x, pos.y);
    }
  });
}