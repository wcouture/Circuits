const NOT_GATE_COMPONENT = 'NOT_GATE_COMPONENT';
COMPONENT_LIST.push(NOT_GATE_COMPONENT)

class NOTGate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.inputNodeA = new Node(x - 20, y);
        this.outputNode = new Node(x + 20, y);
        this.inputNodeA.type = COMPONENT_INPUT_NODE;
        this.outputNode.type = COMPONENT_OUTPUT_NODE;

        this.type = NOT_GATE_COMPONENT;
    }

    draw() {
        // Draw the NOT gate body
        push();
        fill(200);
        stroke(0);
        rectMode(CENTER);
        rect(this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset, 40, 30);

        // Draw label text
        fill(0);
        textAlign(CENTER, CENTER);
        text("NOT", this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset);

        pop();
    }

    Update() {
        // Update the NOT gate logic
        let input = this.inputNodeA.GetState();
        this.outputNode.SetState(!input);
    }
}