var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Common = Matter.Common,
    Events = Matter.Events;

const sh = window.innerHeight,
    sw = window.innerWidth;

console.log(Engine);
     
var engine = Engine.create();
const world = engine.world;

var render = Render.create({
                element: document.body,
                engine: engine,
                options: {
                    width: sw,
                    height: sh,
                    wireframes: false
                }
             });

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
mouse: mouse,
constraint: {
    render: {visible: false}
}
});

render.mouse = mouse;
             
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
});

var mouseDown = false;
addEventListener('mousedown', function() {
    mouseDown = true;
});
addEventListener('mouseup', function() {
    mouseDown = false;
});

              

// Define the text and properties
const text = "CONGRATULATIONS!";
const letterWidth = 35; // Width of each letter block
const letterHeight = 55; // Height of each letter block
const startX = window.innerWidth / 2 - (text.length * letterWidth) / 2; // Center alignment
const startY = 100; // Start position (drop from top)

// Create letter bodies and add to the world
const letterBodies = text.split('').map((char, index) => {
    const xPosition = startX + index * (letterWidth + 5); // Space letters slightly
    const yPosition = startY;

    const letter = Bodies.rectangle(xPosition, yPosition, letterWidth, letterHeight, {
        restitution: 0.8, // Bounce effect
        render: {
            fillStyle: '#ff634700' // Tomato red color
        }
    });

    letter.character = char; // Attach the character to the body for rendering later
    World.add(world, letter);
    return letter;
});

let pyramid = Matter.Composites.pyramid(200, sh-600, 10, 20, 5, 5, function(x,y){
    return Matter.Bodies.rectangle(x,y,50,50, {
        friction: 0.3,
        restitution: 0.2,
        frictionAir: 0.01
    });
});

var group = Body.nextGroup(true);

var bridge = Composites.stack(160, 290, 15, 1, 0, 0, function(x, y) {
    return Bodies.rectangle(x - 20, y, 53, 20, { 
        collisionFilter: { group: group },
        chamfer: 1,
        density: 0.005,
        frictionAir: 0.05,
        render: {
            fillStyle: '#f5d266'
        }
    });
});

Composites.chain(bridge, 0.3, 0, -0.3, 0, { 
    stiffness: 0.99,
    length: 0.0001,
    render: {
        visible: false
    }
});

var bridgeCA = Constraint.create({
    pointA: { x: 140, y: 300 },
    bodyB: bridge.bodies[0],
    pointB: { x: -25, y: 0},
    length: 2,
    stiffness: 0.9
});
var bridgeCB = Constraint.create({
    pointA: { x: 660, y: 300 }, 
    bodyB: bridge.bodies[bridge.bodies.length - 1], 
    pointB: { x: 25, y: 0 },
    length: 2,
    stiffness: 0.9
})


var ground = Bodies.rectangle(sw/2, sh+50, sw + 100, 100, { isStatic: true });
var ceiling = Bodies.rectangle(sw/2, -50, sw, 100, { isStatic: true });
var wallA = Bodies.rectangle(-50, 0, 100, sh*2, { isStatic: true });
var wallB = Bodies.rectangle(sw+50, 0, 100, sh*2, { isStatic: true });


World.add(world,[ground, mouseConstraint, ceiling, wallA, wallB, pyramid, bridge, bridgeCA, bridgeCB]);

Engine.run(engine);
Render.run(render);

// Custom rendering for text
Events.on(render, 'afterRender', () => {
    const ctx = render.context;

    letterBodies.forEach((body) => {
        const { x, y } = body.position; // Get the position of the rectangle
        const angle = body.angle; // Get the rotation angle of the rectangle

        // Save the current canvas state
        ctx.save();

        // Translate to the body's position and rotate the canvas
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Draw the letter centered on the rectangle
        ctx.font = "65px Nova Mono"; // Font style for the letters
        ctx.fillStyle = "#ffffff"; // White text color
        ctx.textAlign = "center"; // Center the text horizontally
        ctx.textBaseline = "middle"; // Center the text vertically
        ctx.fillText(body.character, 0, 0); // Draw the letter at the rotated origin

        // Restore the canvas state
        ctx.restore();
    });
});