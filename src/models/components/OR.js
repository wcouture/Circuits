const OR_GATE_COMPONENT = "OR_GATE";
COMPONENT_LIST.push(OR_GATE_COMPONENT)

class ORGate {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.inputNodeA = new Node(x - 20, y - 10);
        this.inputNodeB = new Node(x - 20, y + 10);
        this.outputNode = new Node(x + 20, y);

        this.inputNodeA.type = COMPONENT_INPUT_NODE;
        this.inputNodeB.type = COMPONENT_INPUT_NODE;
        this.outputNode.type = COMPONENT_OUTPUT_NODE;
    }

    draw() {
        // Draw the AND gate body
        push();
        fill(200);
        stroke(0);
        rectMode(CENTER);
        rect(this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset, 40, 30);

        // Draw label text
        fill(0);
        textAlign(CENTER, CENTER);
        text("OR", this.x + CAMERA_DATA.x_offset, this.y + CAMERA_DATA.y_offset);

        pop();
    } 

    Update() {
        // Update the AND gate logic
        let inputA = this.inputNodeA.GetState();
        let inputB = this.inputNodeB.GetState();
        this.outputNode.SetState(inputA || inputB);
    }
    

}