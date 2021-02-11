class Figure {
  constructor(isRandom, array, type) {
    this.fig = new Graphics();
    this.fig.lineStyle(1, 0x000000, 1);
    this.color = getRandColor();
    this.fig.beginFill(this.color);
    this.size = Math.floor(Math.random() * 50) + 30;
    this.fig.interactive = true;
    this.fig.buttonMode = true;

    if (isRandom) {
      const randomNumber = Math.random();
      if (randomNumber < 0.33) {
        this.type = 'RECTANGLE';
      } else if (randomNumber >= 0.33 && randomNumber <= 0.66) {
        this.type = 'CIRCLE';
      } else {
        this.type = 'TRIANGLE';
      }
    } else {
      this.type = type;
    }

    switch (this.type) {
      case 'RECTANGLE':
        this.fig.drawRect(0 , 0 , this.size, this.size);
        break;
      case 'CIRCLE':
        this.fig.drawCircle(0, 0, this.size / 2);
        break;
      case 'TRIANGLE':
        this.fig.drawPolygon(
          [
            0, 0,
            this.size, 0,
            this.size / 2, this.size * Math.sqrt(3) / 2,
          ]
        );
        break;
      default:
        break;
    }
   
    this.fig.endFill();
    app.stage.addChild(this.fig);

    if (isRandom) {
      const randomX = (Math.random() * (700 - this.size * 2)) + this.size ;
      const randomY = (Math.random() * (600 - this.size * 2)) + this.size ;
      this.setPosition(randomX, randomY);
      if (array.length > 0) {
        checkNormalPosition(this, array);
      }
      this.fig.rotation = Math.random() * Math.PI * 2;
    }

    if (array.length > 0) {
      checkNormalPosition(this, array);
    }
    if (this.type !== 'CIRCLE') {
      this.fig.pivot.set(this.fig.width / 2, this.fig.height / 2);
    }
    this.x = this.fig.x;
    this.y = this.fig.y;
    this.xStart = this.x;
    this.yStart = this.y;
    this.localID = this.fig.position.scope._currentLocalID;

    this.fig.on("pointerup", ()=>this.doPointerUp());
    this.fig.on("pointerdown", ()=>this.doPointerDown());
    this.fig.on("pointerover", ()=>this.doPointerOver());
    this.fig.on("pointerout", ()=>this.doPointerOut());
  }

  setPosition(x, y) {
    this.fig.x = x;
    this.fig.y = y;
  }

  doPointerUp(){
    this.isDown = false;
    figuresArray.forEach(element => {
       element.fig.visible = true;
    });
    if(testComplite(this, baseFigures[this.type])){
      figuresArray.splice(figuresArray.indexOf(this), 1);
      this.fig.visible = false;
    }else{
      this.setPosition( this.xStart,  this.yStart);
    }
  }

  doPointerDown(){
    this.isDown = true;
    figuresArray.forEach(element => {
      if(element !== this){
       element.fig.visible = false;
      }
    });
  }

  doPointerOver(){
    this.isOver = true;
  }

  doPointerOut(){
    this.isOver = false;
    this.fig.position.scope._currentLocalID = this.localID;
  }
}

function getRandColor() {
  const rgb = [100, 100, 100].map((el) => el + Math.random() * 150);
  return PIXI.utils.rgb2hex(rgb);
}

function checkNormalPosition(figure, array) {
  while (array.some(el => testCollision(el, figure))) {
    if (figure.fig.x + figure.size < 790) {
      figure.fig.x += 10;
    } else if ((figure.fig.y + figure.size) > 290) {
      figure.fig.y = figure.size + 10;
      figure.fig.x = figure.size + 10;
    } else {
      figure.fig.y += 10;
      figure.fig.x = figure.size + 10;
    }
  }
}

function testCollision(r1, r2) {
  const dx = r1.fig.x - r2.fig.x;
  const dy = r1.fig.y - r2.fig.y;

  const distance = Math.sqrt(dx ** 2 + dy ** 2);
  const maxDistance = (r1.size / 2 + r2.size / 2) * Math.sqrt(2);

  return distance < maxDistance;
}

function testComplite(r1, r2) {
  const dx = r1.fig.x - r2.x;
  const dy = r1.fig.y - r2.y;

  const distance = Math.sqrt(dx ** 2 + dy ** 2);
  const maxDistance = r1.size / 2 + 60;

  return distance < maxDistance;
}