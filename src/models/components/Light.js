const LIGHT_COMPONENT = 'LIGHT_COMPONENT';
COMPONENT_LIST.push(LIGHT_COMPONENT);

class Light {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.inputNode = new Node(this.x - 10, this.y);
        this.inputNode.type = COMPONENT_INPUT_NODE;

        this.state = false;
    }

    draw() {
        // Draw the light body
        push();
        fill(this.state ? 'yellow' : 'grey');
        stroke(0);
        ellipseMode(CENTER);
        ellipse(this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset, 20, 20);
        pop();
    }

    Update() {
        // Update the light state based on input node
        this.state = this.inputNode.GetState();
    }
}