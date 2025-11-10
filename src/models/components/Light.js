const LIGHT_COMPONENT = 'LIGHT_COMPONENT';
COMPONENT_LIST.push(LIGHT_COMPONENT);

class Light {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.inputNodeA = new Node(this.x - 15, this.y);
        this.inputNodeA.type = COMPONENT_INPUT_NODE;

        this.state = false;
        this.type = LIGHT_COMPONENT;
    }

    draw() {
        // Draw the light body
        push();
        fill(this.state ? 'yellow' : 'grey');
        stroke(0);
        ellipseMode(CENTER);
        ellipse(this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset, 30, 30);

        textAlign(CENTER, CENTER)
        fill("black")
        text(this.state ? "1" : "0", this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset)
        pop();
    }

    Update() {
        // Update the light state based on input node
        this.state = this.inputNodeA.GetState();
    }
}