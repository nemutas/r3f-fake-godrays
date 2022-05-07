uniform float u_lightProgress;

varying float v_pz;
varying vec3 v_gPos;

void main() {
	vec3 color = mix(vec3(0.0), vec3(0.68, 0.89, 0.40), v_pz);
  
  vec2 p = v_gPos.xz;
  p.y *= 0.8;
  float len = length(p);
  float dark = 1.0 - smoothstep(0.0, 2.5 * u_lightProgress, len);
  color *= dark;
  
	gl_FragColor = vec4(color, 1.0);
}