const COMPONENTS = [];
const NODES = [];

var mode = SIMULATION_MODE;
var selectedComponent = WIRE_COMPONENT;

const BUILD_MODE_DATA = {
  startNode: null,
  endNode: null
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function draw() {
  update();
  drawNodes();
  drawUI()
}

function drawNodes() {
  push();
  scale(CAMERA_DATA.zoom);
  background(BACKGROUND_COLOR);
  for (let comp of COMPONENTS) {
    comp.draw();
  }

  for (let node of NODES) {
    node.draw();
  }
  pop()
}

function drawUI() {
  // Tool Mode
  push()
    textSize(26)
    textStyle(BOLD)
    fill('black');
    text(mode, 10, 30);
  pop()


  // Selected Component
  push()
    textSize(18)
    let tWidth = 0
    for(let i = 0; i < COMPONENT_LIST.length; i++) {
      if (selectedComponent == COMPONENT_LIST[i]) {
        fill('red')
      } else {
        fill('black')
      }

      let itemText = (i + 1) + ". " + COMPONENT_LIST[i]
      text(itemText, 10 + tWidth + (i * 20), SCREEN_HEIGHT - 20)
      tWidth += textWidth(itemText)
    }
  pop()

  // Zoom and position
  push()
    textSize(26)
    textStyle(BOLD)
    fill('black')

    let zoomText = "Zoom: " + CAMERA_DATA.zoom.toFixed(2)
    let zoomTextLength = textWidth(zoomText)

    text(zoomText, SCREEN_WIDTH - zoomTextLength - 10, 30)

    let positionText = "(" + -CAMERA_DATA.x_offset + ", " + -CAMERA_DATA.y_offset + ")"
    let positionTextLength = textWidth(positionText)

    text(positionText, SCREEN_WIDTH - positionTextLength - 10, 60)
  pop()

}

function update() {
  switch(mode) {
    case BUILD_MODE:
      // Handle build mode updates
      break;
    case SIMULATION_MODE:
      // Handle simulation mode updates
      for (let comp of COMPONENTS) {
        comp.Update();
      }
      break;
  }

  if (keyIsPressed) {
    if (ZOOM_KEYS.indexOf(key) >= 0)
      zoomCamera()
    if (TRANSFORM_KEYS.indexOf(key) >= 0)
      transformCamera()
  }
}

function nodeClicked(x, y) {
  for (let i = 0; i < NODES.length; i++) {
    let d = dist(x, y, NODES[i].x, NODES[i].y);
    if (d < 5) {
      return NODES[i];
    }
  }
  return null;
}

function handleBuildMode() {
  var newComponent = null;

  switch(selectedComponent) {
    case WIRE_COMPONENT:
      // Handle wire building logic

      if (BUILD_MODE_DATA.startNode === null) {
        // Check if clicking on existing node
        let existingNode = nodeClicked((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
        if (existingNode && existingNode.type !== COMPONENT_INPUT_NODE) {
          BUILD_MODE_DATA.startNode = existingNode;
        } else if (!existingNode) {
          // create new node at mouse position
          BUILD_MODE_DATA.startNode = new Node((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
          NODES.push(BUILD_MODE_DATA.startNode);
        }

      } else if (BUILD_MODE_DATA.endNode === null) {
        // Check if clicking on existing node
        let existingNode = nodeClicked((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
        if (existingNode && existingNode.type === COMPONENT_INPUT_NODE && !existingNode.connected) {
          BUILD_MODE_DATA.endNode = existingNode;
          BUILD_MODE_DATA.endNode.connected = true;
        } else if (!existingNode) {
          // create new node at mouse position and create wire
          BUILD_MODE_DATA.endNode = new Node((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
        } else {
          return; // Can't connect to non-input node
        }
        
        NODES.push(BUILD_MODE_DATA.endNode);
        COMPONENTS.push(new Wire(BUILD_MODE_DATA.startNode, BUILD_MODE_DATA.endNode));

        // Reset the build mode data
        BUILD_MODE_DATA.startNode = null;
        BUILD_MODE_DATA.endNode = null;
      }

      return;
    case AND_GATE_COMPONENT:
      // Create AND gate at mouse position
      newComponent = new ANDGate((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
      break;
    case OR_GATE_COMPONENT:
      // Create OR gate at mouse position
      newComponent = new ORGate((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
      break;
    case NOT_GATE_COMPONENT:
      // Create NOT gate at mouse position
      newComponent = new NOTGate((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
      NODES.push(newComponent.inputNode);
      break;
    case LIGHT_COMPONENT:
      // Create light at mouse position
      newComponent = new Light((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
      NODES.push(newComponent.inputNode);
      break;
    default:
      break;
  }

  if (newComponent.inputNodeA)
    NODES.push(newComponent.inputNodeA);
  if (newComponent.inputNodeB)
    NODES.push(newComponent.inputNodeB);
  if (newComponent.outputNode)
    NODES.push(newComponent.outputNode);
  
  if (newComponent)
    COMPONENTS.push(newComponent);
}

function handleSimulationMode() {
  // Handle simulation mode logic if needed
  let clickedNode = nodeClicked((mouseX - CAMERA_DATA.x_offset) / CAMERA_DATA.zoom, (mouseY - CAMERA_DATA.y_offset) / CAMERA_DATA.zoom);
  if (clickedNode) {
    // Toggle the state of the clicked node
    clickedNode.SetState(!clickedNode.GetState());
  }
}

function clearTempBuildData() {
  let index = NODES.indexOf(BUILD_MODE_DATA.startNode);
  if (index !== -1) {
    NODES.splice(index, 1);
  }
    
  index = NODES.indexOf(BUILD_MODE_DATA.endNode);
  if (index !== -1) {
    NODES.splice(index, 1);
  }

  BUILD_MODE_DATA.startNode = null;
  BUILD_MODE_DATA.endNode = null;
}

function switchSelectedComponent() {
  if (key == 1) {
    selectedComponent = WIRE_COMPONENT;
  }
  else if (key == 2) {
    selectedComponent = AND_GATE_COMPONENT;
  }
  else if (key == 3) {
    selectedComponent = OR_GATE_COMPONENT;
  }
  else if (key == 4) {
    selectedComponent = NOT_GATE_COMPONENT;
  }
  else if (key == 5) {
    selectedComponent = LIGHT_COMPONENT;
  }

  clearTempBuildData();
}

function transformCamera() {
  if (keyIsDown(UP_ARROW)) {
    CAMERA_DATA.y_offset += 10;
  } else if (keyIsDown(DOWN_ARROW)) {
    CAMERA_DATA.y_offset -= 10;
  } else if (keyIsDown(LEFT_ARROW)) {
    CAMERA_DATA.x_offset += 10;
  } else if (keyIsDown(RIGHT_ARROW)) {
    CAMERA_DATA.x_offset -= 10;
  }
}

function zoomCamera() {
  console.log("zooming camera")
  if (keyIsDown(RIGHT_BRACKET)) {
    CAMERA_DATA.zoom *= 1.05;
    CAMERA_DATA.zoom = parseFloat(CAMERA_DATA.zoom.toFixed(2))
  } else if (keyIsDown(LEFT_BRACKET)) {
    CAMERA_DATA.zoom /= 1.05;
    CAMERA_DATA.zoom = parseFloat(CAMERA_DATA.zoom.toFixed(2))
  }
}

function switchMode(newMode) {
  if (newMode === 'b' || newMode === 'B') {
    mode = BUILD_MODE
  } else if (newMode === 's' || newMode === 'S') {
    clearTempBuildData()
    mode = SIMULATION_MODE
  }
}

function keyPressed() {
  if (COMPONENT_KEYS.indexOf(key) >= 0) {
   switchSelectedComponent();
  }
  else if (MODE_SWITCH_KEYS.indexOf(key) >= 0) {
    switchMode(key)
  }
  else {
    console.log("Key pressed: " + key);
  }
}

function mousePressed() {
  switch(mode) {
    case BUILD_MODE:
      // Handle build mode mouse press
      handleBuildMode();
      break;
    case SIMULATION_MODE:
      // Handle simulation mode mouse press
      handleSimulationMode();
      break;
  }
}