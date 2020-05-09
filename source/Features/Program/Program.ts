export class Program<A extends string, U extends string> {
  private program: WebGLProgram;
  private gl: WebGL2RenderingContext;

  constructor(
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.gl = gl;
    const vertexShader = this.compileShader(
      vertexShaderSource,
      gl.VERTEX_SHADER
    );
    const fragmentShader = this.compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    // Check the link status
    const linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      const lastError = gl.getProgramInfoLog(this.program);
      throw new Error(lastError);
    }

    debugger;
  }

  use = () => {
    this.gl.useProgram(this.program);
  };

  getAttributeLocation = (name: A) => {
    return this.gl.getAttribLocation(this.program, name);
  };

  getUniformLocation = (name: U) => {
    return this.gl.getUniformLocation(this.program, name);
  };

  compileShader = (source: string, type: number) => {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const lastError = gl.getShaderInfoLog(shader);
      throw new Error(lastError);
    }
    return shader;
  };
}
