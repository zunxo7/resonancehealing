import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColorA: new THREE.Color('#5BB0BA'),
    uColorB: new THREE.Color('#7661A4'),
    uBoost: 0,
  },
  /* vertex */`
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uBoost;
    varying vec3 vNormal;

    vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);
      const vec4 D=vec4(0.,.5,1.,2.);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=1.-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(
        i.z+vec4(0.,i1.z,i2.z,1.))
        +i.y+vec4(0.,i1.y,i2.y,1.))
        +i.x+vec4(0.,i1.x,i2.x,1.));
      float n_=.142857142857;
      vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);
      vec4 y_=floor(j-7.*x_);
      vec4 x=x_*ns.x+ns.yyyy;
      vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);
      vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.+1.;
      vec4 s1=floor(b1)*2.+1.;
      vec4 sh=-step(h,vec4(0.));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);
      vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z);
      vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
      m=m*m;
      return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    void main(){
      vNormal=normalize(normalMatrix*normal);
      float speed = 0.2 + uBoost * 0.6;
      float scale = 2.5 + uBoost * 1.5;
      float amp   = 0.3 + uBoost * 0.35;
      float displacement=snoise(position*scale+uTime*speed)*amp;
      float mouseDist=distance(position.xy,uMouse*2.);
      displacement-=smoothstep(0.,1.5,mouseDist)*(0.3+uBoost*0.4);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position+normal*displacement,1.);
    }
  `,
  /* fragment */`
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uBoost;
    varying vec3 vNormal;
    void main(){
      float fresnel=pow(1.+dot(vNormal,vec3(0.,0.,1.)),2.);
      vec3 color=mix(uColorA,uColorB,vNormal.y*.5+.5);
      gl_FragColor=vec4(color+fresnel*(0.15+uBoost*0.25),1.);
    }
  `
)

extend({ FluidMaterial })

function FluidMesh({ boostRef }) {
  const matRef = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uTime = clock.getElapsedTime()
    matRef.current.uMouse.lerp(mouse.current, 0.05)
    // Decay boost
    if (boostRef.current > 0) {
      boostRef.current = Math.max(0, boostRef.current - 0.018)
    }
    matRef.current.uBoost = boostRef.current
  })

  return (
    <mesh>
      <icosahedronGeometry args={[1.5, 64]} />
      <fluidMaterial
        ref={matRef}
        key={FluidMaterial.key}
        uColorA={new THREE.Color('#5BB0BA')}
        uColorB={new THREE.Color('#7661A4')}
        transparent={false}
      />
    </mesh>
  )
}

export default function ResonanceOrb({ className = '' }) {
  const boostRef = useRef(0)

  const handleClick = () => {
    boostRef.current = 1
  }

  return (
    <div
      onClick={handleClick}
      className={className}
      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <Suspense fallback={null}>
          <FluidMesh boostRef={boostRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
