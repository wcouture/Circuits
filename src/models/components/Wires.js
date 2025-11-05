const WIRE_COMPONENT = "WIRE";
COMPONENT_LIST.push(WIRE_COMPONENT)

class Wire {
    constructor(startNode, endNode) {
        this.startX = startNode.x;
        this.startY = startNode.y;
        this.endX = endNode.x;
        this.endY = endNode.y;

        this.inputNode = startNode;
        this.outputNode = endNode;

        this.activeState = false;
    }

    draw() {
        push()
        stroke(this.activeState ? 'red' : 'black');
        strokeWeight(4);
        line(this.startX + CAMERA_DATA.x_offset, this.startY + CAMERA_DATA.y_offset, this.endX + CAMERA_DATA.x_offset, this.endY + CAMERA_DATA.y_offset);
        pop()
    }

    SetInputNode(node) {
        this.inputNode = node;
    }

    SetOutputNode(node) {
        this.outputNode = node;
    }

    Update() {
        if (this.inputNode && this.outputNode) {


            this.outputNode.SetState(this.inputNode.GetState());
            this.activeState = this.inputNode.GetState();
        }
    }
}