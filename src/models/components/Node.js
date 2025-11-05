const GENERIC_NODE = "GENERIC_NODE";
const COMPONENT_INPUT_NODE = "COMPONENT_INPUT_NODE";
const COMPONENT_OUTPUT_NODE = "COMPONENT_OUTPUT_NODE";

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.type = GENERIC_NODE;
        this.connected = false;
        
        this.state = false;
    }

    draw() {
        push();
        fill(this.state ? 'yellow' : 'grey');
        ellipse(this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset, 10, 10);
        pop();
    }

    SetState(newState) {
        this.state = newState;
    }

    GetState() {
        return this.state;
    }
}