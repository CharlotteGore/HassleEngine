// Nothing to see here
import { Program } from "../source/Features/Program/Program";
import vertSrc from "./shaders/vertex.glsl";
import fragSrc from "./shaders/fragment.glsl";

// I don't think these can be an enum like this,
// something more sophisticated that indicates the type
// of the attribute would be handy too.
enum Attributes {
  Position = "a_position",
}

// same goes for uniforms, the type is important
// and necessary information and we need to get that
// into the typescript world.
enum Uniforms {
  Resolution = "u_resolution",
  Color = "u_color",
}

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2", { alpha: false });

const program = new Program<Attributes, Uniforms>(gl, vertSrc, fragSrc);

const aPosLocation = program.getAttributeLocation(Attributes.Position);
const uColLocation = program.getUniformLocation(Uniforms.Color);
const uRezLocation = program.getUniformLocation(Uniforms.Resolution);

// During initialization you make a VAO for every individual thing
// you want to draw. I guess technically if everything is basically a simple
// quad then you just need one VAO for those (No, they will have different initial UVs,
// so you only have a shared VAO for identical sprites, and then we're into instanced
// territory.

// if we're smart we can load all the textures at once and leave them
// bound and never need to rebind those.

// one obvious optimisation is to merge all the static geometry on a
// specific layer together, but let's deal with this later.

// After that we just need to load up the uniforms for each thing.
// I would recommend moving the UV tampering stuff from the old
// engine into the shader and make the x and y offsets a uniform.

// init: compile all

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(aPosLocation);

const aPosBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, aPosBuffer);
gl.vertexAttribPointer(aPosLocation, 2, gl.FLOAT, false, 0, 0);
