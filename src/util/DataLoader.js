
function SaveCircuit(outputFile) {
    let outputData = {
        nodes: NODES,
        components: COMPONENTS
    }
    
    let data = JSON.stringify(outputData)
    
    var blob = new Blob([data], {type: 'text/plain'})
    var link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = outputFile + ".txt"
    link.click()
}

function OnFileLoad(e, NODES, COMPONENTS) {
    let fileText = e.target.result;

    let uploadData = JSON.parse(fileText)

    for (let i = 0; i < uploadData.nodes.length; i++) {
        const loadedNode = uploadData.nodes[i]
        const newNode = new Node(loadedNode.x, loadedNode.y)
        newNode.type = loadedNode.type;
        newNode.connected = loadedNode.connected;

        NODES.push(newNode)
    }

    for (let i = 0; i < uploadData.components.length; i++) {
        const loadedComponent = uploadData.components[i];
        var newComponent = null;

        switch(loadedComponent.type) {
            case WIRE_COMPONENT:
                newComponent = new Wire(null, null)
                break;
            case AND_GATE_COMPONENT:
                newComponent = new ANDGate(loadedComponent.x, loadedComponent.y)
                break;
            case OR_GATE_COMPONENT:
                newComponent = new ORGate(loadedComponent.x, loadedComponent.y)
                break;
            case NOT_GATE_COMPONENT:
                newComponent = new NOTGate(loadedComponent.x, loadedComponent.y)
                break;
            case LIGHT_COMPONENT:
                newComponent = new Light(loadedComponent.x, loadedComponent.y)
                break;
        }


        if (loadedComponent.inputNodeA) {
            // Get needed node's ID
            let inNodeAId = loadedComponent.inputNodeA.id ?? -1;

            // Find node with ID in list
            let inNodeA = NODES.find( (v, i) => {
                return v.id == inNodeAId;
            })

            // Assign node to component slot
            newComponent.inputNodeA = inNodeA
        }


        if (loadedComponent.inputNodeB) {
            // Get needed node's ID
            let inNodeBId = loadedComponent.inputNodeB.id ?? -1;
            
            // Find node with ID in list
            let inNodeB = NODES.find( (v, i) => {
                return v.id == inNodeBId;
            })
        
            // Assign node to component slot
            newComponent.inputNodeB = inNodeB
        }
        
        
        if (loadedComponent.outputNode) {
            // Get needed node's ID
            let outNodeId = loadedComponent.outputNode.id ?? -1;

            // Find node with ID in list
            let outNode = NODES.find( (v, i) => {
                return v.id == outNodeId;
            })
                    
            // Assign node to component slot
            newComponent.outputNode = outNode
        }

        COMPONENTS.push(newComponent)
    }
}

function LoadCircuit() {
    var fileInput = document.createElement('input')
    fileInput.type = 'file'

    fileInput.addEventListener("change", (e) => {
        const reader = new FileReader();

        reader.onload = OnFileLoad;

        reader.readAsText(e.target.files[0])
    })

    fileInput.click()
}