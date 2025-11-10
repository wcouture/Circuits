const WIRE_COMPONENT = "WIRE";
COMPONENT_LIST.push(WIRE_COMPONENT)

class Wire {
    constructor(startNode, endNode) {
        this.inputNodeA = startNode;
        this.outputNode = endNode;

        this.activeState = false;

        this.type = WIRE_COMPONENT;
    }

    draw() {
        push()
        stroke(this.activeState ? 'red' : 'black');
        strokeWeight(4);
        line(this.inputNodeA.x + CAMERA_DATA.x_offset, this.inputNodeA.y + CAMERA_DATA.y_offset, this.outputNode.x + CAMERA_DATA.x_offset, this.outputNode.y + CAMERA_DATA.y_offset);
        pop()
    }

    SetInputNode(node) {
        this.inputNode = node;
    }

    SetOutputNode(node) {
        this.outputNode = node;
    }

    Update() {
        if (this.inputNodeA && this.outputNode) {


            this.outputNode.SetState(this.inputNodeA.GetState());
            this.activeState = this.inputNodeA.GetState();
        }
    }
}