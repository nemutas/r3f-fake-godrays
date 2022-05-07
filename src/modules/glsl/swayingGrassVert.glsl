uniform float u_time;
uniform float u_sway;
varying float v_pz;
varying vec3 v_gPos;

#include './cnoise31.glsl'

const float PI = 3.14159265358979;

void main() {
	vec3 pos = position.xyz;
	v_pz = pos.z;

	vec3 base = vec3(pos.x, pos.y, 0.0);
	vec4 baseGP = instanceMatrix * vec4(base, 1.0);
	float noise = cnoise31(baseGP.xyz * vec3(0.1) + u_time * 0.5);
	noise = smoothstep(-1.0, 1.0, noise);

	float swingX = sin(u_time * 2.0 + noise * 2.0 * PI) * pow(v_pz, 2.0);
	float swingY = cos(u_time * 2.0 + noise * 2.0 * PI) * pow(v_pz, 2.0);
	pos.x += swingX * u_sway;
	pos.y += swingY * u_sway;

  vec4 globalPosition = instanceMatrix * vec4(pos, 1.0);
	vec4 mPos = modelMatrix * globalPosition;
  v_gPos = globalPosition.xyz;
  
	gl_Position = projectionMatrix * viewMatrix * mPos;
}