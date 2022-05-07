varying vec3 v_eye;
varying vec3 v_normal;

void main() {
  vec4 mPos = modelMatrix * vec4(position, 1.0);
  v_eye = normalize(mPos.xyz - cameraPosition);
  v_normal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}