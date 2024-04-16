
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 500;

function createCircle(x, y, r, color) {
    let circle = GOval(x-r, y-r, 2*r, 2*r);
    circle.setColor(color);
    return circle;
}
function Coyote(){
    let gw = GWindow(GWINDOW_WIDTH, GWINDOW_HEIGHT);
    
    for (let i = 0; i < 5; i++){
        let line = GLine(50 +100 * i, 50, 50 + 100 * i, 450);
        gw.add(line); 
    }
    for (let j = 0; j < 5; j++){
        let line = GLine(50, 50 + 100*j, 450, 50 + 100*j);
        gw.add(line);
    }

    for (let i = 0; i < 2; i++){
        for (let j = 0; j < 2; j++){
            let line1 = GLine(50 + 200*i, 50 + 200*j, 250 + 200*i, 250 + 200*j);
            let line2 = GLine(250 + 200*i, 50 + 200*j, 50 + 200*i, 250 + 200*j);
            gw.add(line1);
            gw.add(line2);
        }
    }
    
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            let circle = createCircle(50 + 100 * i, 50 + 100 * j, 20, "Black");
            if ((j < 2) || (j === 2 && (i===0 || i===4)) ) {
                circle.setFillColor("Blue");
            } else if (j === 2 && i === 2) {
                circle.setFillColor('Red');
            } else {
                circle.setFillColor("White");
            }
            circle.setFilled(true);
            gw.add(circle);
        }
    }

    let blueCaught = 0;
    let trashLabel = GLabel(blueCaught + ' Blue', 420,485);
    gw.add(trashLabel);

    let nextColor = "White";
    let cLabel = GLabel("Holding " + nextColor, 50,25);
    gw.add(cLabel);

    let trash = createCircle(480, 480, 20, "Black");
    trash.setFillColor("White");
    gw.add(trash);

    let clickAction =
     function(e) {
        selected = gw.getElementAt(e.getX(), e.getY());
        touchLine = selected.getWidth() == 400 || selected.getHeight() == 400 || selected.getWidth() == 200
        if ((selected != trashLabel && selected != cLabel) && !touchLine) {
            let selectedColor = selected.getFillColor();
            if (!(nextColor != "White" && selectedColor != "White")) { //don't turn red/blue into red/blue
                if (selected == trash && nextColor == "Blue") { //place blue in trash
                    blueCaught += 1;
                    gw.remove(trashLabel);
                    let trashLabel1 = GLabel(blueCaught + ' Blue', 420,485);
                    gw.add(trashLabel1);
                    trashLabel = trashLabel1;
                    nextColor = "White";
                } else if (selected != trash) { //turn selected into holding color
                    selected.setFillColor(nextColor);
                    nextColor = selectedColor; //hold selected color
                }
                gw.remove(cLabel);
                let cLabel1 = GLabel("Holding " + nextColor,50,25);
                gw.add(cLabel1);
                cLabel = cLabel1;
            }
        }

    };
    gw.addEventListener("click", clickAction);
}



