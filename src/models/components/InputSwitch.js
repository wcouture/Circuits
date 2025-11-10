const INPUT_SWITCH_COMPONENT = "INPUT_SWITCH_COMPONENT"
COMPONENT_LIST.push(INPUT_SWITCH_COMPONENT)

class InputSwitch {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.outputNode = new Node(x + 25, y)
        this.outputNode.type = COMPONENT_OUTPUT_NODE

        this.type = INPUT_SWITCH_COMPONENT

        this.state = false;
    }

    draw() {
        // Draw the switch gate body
        push();
        fill(this.state ? "green" : "grey");
        stroke(0);
        ellipseMode(CENTER);
        ellipse(this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset, 50, 50);

        // Draw label text
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.state ? "1" : "0", this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset);

        pop();
    }

    Update() {
        this.outputNode.SetState(this.state);
    }

    Toggle() {
        this.state = !this.state;
    }
}