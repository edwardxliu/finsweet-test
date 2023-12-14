"use strict";(()=>{var xt=document.querySelector("#magic");console.log(xt);Ac();var ot={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:.2,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3,SHADING:!0,COLORFUL:!0,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!1,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1};function xo(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}var Rn=[],_o=[];Rn.push(new xo);var Sc=If(xt),Q=Sc.gl,an=Sc.ext;Uf()&&(ot.DYE_RESOLUTION=512);an.supportLinearFiltering||(ot.DYE_RESOLUTION=512,ot.SHADING=!1,ot.BLOOM=!1,ot.SUNRAYS=!1);function If(i){var e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},t=i.getContext("webgl2",e),n=!!t;n||(t=i.getContext("webgl",e)||i.getContext("experimental-webgl",e));var r,s;n?(t.getExtension("EXT_color_buffer_float"),s=t.getExtension("OES_texture_float_linear")):(r=t.getExtension("OES_texture_half_float"),s=t.getExtension("OES_texture_half_float_linear")),t.clearColor(0,0,0,1);var a=n?t.HALF_FLOAT:r.HALF_FLOAT_OES,o,c,h;return n?(o=ui(t,t.RGBA16F,t.RGBA,a),c=ui(t,t.RG16F,t.RG,a),h=ui(t,t.R16F,t.RED,a)):(o=ui(t,t.RGBA,t.RGBA,a),c=ui(t,t.RGBA,t.RGBA,a),h=ui(t,t.RGBA,t.RGBA,a)),{gl:t,ext:{formatRGBA:o,formatRG:c,formatR:h,halfFloatTexType:a,supportLinearFiltering:s}}}function ui(i,e,t,n){if(!Df(i,e,t,n))switch(e){case i.R16F:return ui(i,i.RG16F,i.RG,n);case i.RG16F:return ui(i,i.RGBA16F,i.RGBA,n);default:return null}return{internalFormat:e,format:t}}function Df(i,e,t,n){var r=i.createTexture();i.bindTexture(i.TEXTURE_2D,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,e,4,4,0,t,n,null);var s=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,s),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,r,0);var a=i.checkFramebufferStatus(i.FRAMEBUFFER);return a==i.FRAMEBUFFER_COMPLETE}function Uf(){return/Mobi|Android/i.test(navigator.userAgent)}var So=function(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]};So.prototype.setKeywords=function(e){for(var t=0,n=0;n<e.length;n++)t+=bd(e[n]);var r=this.programs[t];if(r==null){var s=Ot(Q.FRAGMENT_SHADER,this.fragmentShaderSource,e);r=Mc(this.vertexShader,s),this.programs[t]=r}r!=this.activeProgram&&(this.uniforms=bc(r),this.activeProgram=r)};So.prototype.bind=function(){Q.useProgram(this.activeProgram)};var Wt=function(e,t){this.uniforms={},this.program=Mc(e,t),this.uniforms=bc(this.program)};Wt.prototype.bind=function(){Q.useProgram(this.program)};function Mc(i,e){var t=Q.createProgram();if(Q.attachShader(t,i),Q.attachShader(t,e),Q.linkProgram(t),!Q.getProgramParameter(t,Q.LINK_STATUS))throw Q.getProgramInfoLog(t);return t}function bc(i){for(var e=[],t=Q.getProgramParameter(i,Q.ACTIVE_UNIFORMS),n=0;n<t;n++){var r=Q.getActiveUniform(i,n).name;e[r]=Q.getUniformLocation(i,r)}return e}function Ot(i,e,t){e=Of(e,t);var n=Q.createShader(i);if(Q.shaderSource(n,e),Q.compileShader(n),!Q.getShaderParameter(n,Q.COMPILE_STATUS))throw Q.getShaderInfoLog(n);return n}function Of(i,e){if(e==null)return i;var t="";return e.forEach(function(n){t+="#define "+n+`
`}),t+i}var $t=Ot(Q.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Nf=Ot(Q.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Ff=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),Bf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),zf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),kf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),Vf=Ot(Q.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),Hf=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,Gf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),Wf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),Xf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),Yf=Ot(Q.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),qf=Ot(Q.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),Zf=Ot(Q.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),Jf=Ot(Q.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,an.supportLinearFiltering?null:["MANUAL_FILTERING"]),Kf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),$f=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),jf=Ot(Q.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
`),Qf=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),ed=Ot(Q.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),Rt=function(){return Q.bindBuffer(Q.ARRAY_BUFFER,Q.createBuffer()),Q.bufferData(Q.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),Q.STATIC_DRAW),Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER,Q.createBuffer()),Q.bufferData(Q.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),Q.STATIC_DRAW),Q.vertexAttribPointer(0,2,Q.FLOAT,!1,0,0),Q.enableVertexAttribArray(0),function(i){Q.bindFramebuffer(Q.FRAMEBUFFER,i),Q.drawElements(Q.TRIANGLES,6,Q.UNSIGNED_SHORT,0)}}(),Ut,dt,vo,yo,hi,Mo,Di=[],Ns,Tc,Kr=new Wt(Nf,Ff),mc=new Wt($t,Bf),uo=new Wt($t,zf),gc=new Wt($t,kf),_c=new Wt($t,Vf),Ls=new Wt($t,Gf),$r=new Wt($t,Wf),Is=new Wt($t,Xf),vc=new Wt($t,Yf),fo=new Wt($t,qf),ci=new Wt($t,Zf),An=new Wt($t,Jf),po=new Wt($t,Kf),mo=new Wt($t,$f),tr=new Wt($t,jf),Ds=new Wt($t,Qf),Us=new Wt($t,ed),nr=new So($t,Hf);function wc(){var i=Fs(ot.SIM_RESOLUTION),e=Fs(ot.DYE_RESOLUTION),t=an.halfFloatTexType,n=an.formatRGBA,r=an.formatRG,s=an.formatR,a=an.supportLinearFiltering?Q.LINEAR:Q.NEAREST;Ut==null?Ut=go(e.width,e.height,n.internalFormat,n.format,t,a):Ut=yc(Ut,e.width,e.height,n.internalFormat,n.format,t,a),dt==null?dt=go(i.width,i.height,r.internalFormat,r.format,t,a):dt=yc(dt,i.width,i.height,r.internalFormat,r.format,t,a),vo=On(i.width,i.height,s.internalFormat,s.format,t,Q.NEAREST),yo=On(i.width,i.height,s.internalFormat,s.format,t,Q.NEAREST),hi=go(i.width,i.height,s.internalFormat,s.format,t,Q.NEAREST),td(),nd()}function td(){var i=Fs(ot.BLOOM_RESOLUTION),e=an.halfFloatTexType,t=an.formatRGBA,n=an.supportLinearFiltering?Q.LINEAR:Q.NEAREST;Mo=On(i.width,i.height,t.internalFormat,t.format,e,n),Di.length=0;for(var r=0;r<ot.BLOOM_ITERATIONS;r++){var s=i.width>>r+1,a=i.height>>r+1;if(s<2||a<2)break;var o=On(s,a,t.internalFormat,t.format,e,n);Di.push(o)}}function nd(){var i=Fs(ot.SUNRAYS_RESOLUTION),e=an.halfFloatTexType,t=an.formatR,n=an.supportLinearFiltering?Q.LINEAR:Q.NEAREST;Ns=On(i.width,i.height,t.internalFormat,t.format,e,n),Tc=On(i.width,i.height,t.internalFormat,t.format,e,n)}function On(i,e,t,n,r,s){Q.activeTexture(Q.TEXTURE0);var a=Q.createTexture();Q.bindTexture(Q.TEXTURE_2D,a),Q.texParameteri(Q.TEXTURE_2D,Q.TEXTURE_MIN_FILTER,s),Q.texParameteri(Q.TEXTURE_2D,Q.TEXTURE_MAG_FILTER,s),Q.texParameteri(Q.TEXTURE_2D,Q.TEXTURE_WRAP_S,Q.CLAMP_TO_EDGE),Q.texParameteri(Q.TEXTURE_2D,Q.TEXTURE_WRAP_T,Q.CLAMP_TO_EDGE),Q.texImage2D(Q.TEXTURE_2D,0,t,i,e,0,n,r,null);var o=Q.createFramebuffer();Q.bindFramebuffer(Q.FRAMEBUFFER,o),Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,a,0),Q.viewport(0,0,i,e),Q.clear(Q.COLOR_BUFFER_BIT);var c=1/i,h=1/e;return{texture:a,fbo:o,width:i,height:e,texelSizeX:c,texelSizeY:h,attach:function(f){return Q.activeTexture(Q.TEXTURE0+f),Q.bindTexture(Q.TEXTURE_2D,a),f}}}function go(i,e,t,n,r,s){var a=On(i,e,t,n,r,s),o=On(i,e,t,n,r,s);return{width:i,height:e,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,get read(){return a},set read(c){a=c},get write(){return o},set write(c){o=c},swap:function(){var h=a;a=o,o=h}}}function id(i,e,t,n,r,s,a){var o=On(e,t,n,r,s,a);return mc.bind(),Q.uniform1i(mc.uniforms.uTexture,i.attach(0)),Rt(o.fbo),o}function yc(i,e,t,n,r,s,a){return i.width==e&&i.height==t||(i.read=id(i.read,e,t,n,r,s,a),i.write=On(e,t,n,r,s,a),i.width=e,i.height=t,i.texelSizeX=1/e,i.texelSizeY=1/t),i}function rd(){var i=[];ot.SHADING&&i.push("SHADING"),ot.BLOOM&&i.push("BLOOM"),ot.SUNRAYS&&i.push("SUNRAYS"),nr.setKeywords(i)}rd();wc();Rc(parseInt(Math.random()*20)+5);var xc=Date.now(),Os=0;Ec();function Ec(){var i=sd();Ac()&&wc(),ad(i),od(),ot.PAUSED||ld(i),cd(null),requestAnimationFrame(Ec)}function sd(){var i=Date.now(),e=(i-xc)/1e3;return e=Math.min(e,.016666),xc=i,e}function Ac(){var i=Nn(xt.clientWidth),e=Nn(xt.clientHeight);return xt.width!=i||xt.height!=e?(xt.width=i,xt.height=e,!0):!1}function ad(i){ot.COLORFUL&&(Os+=i*ot.COLOR_UPDATE_SPEED,Os>=1&&(Os=Md(Os,0,1),Rn.forEach(function(e){e.color=bo()})))}function od(){_o.length>0&&Rc(_o.pop()),Rn.forEach(function(i){i.moved&&(i.moved=!1,gd(i))})}function ld(i){Q.disable(Q.BLEND),Q.viewport(0,0,dt.width,dt.height),mo.bind(),Q.uniform2f(mo.uniforms.texelSize,dt.texelSizeX,dt.texelSizeY),Q.uniform1i(mo.uniforms.uVelocity,dt.read.attach(0)),Rt(yo.fbo),tr.bind(),Q.uniform2f(tr.uniforms.texelSize,dt.texelSizeX,dt.texelSizeY),Q.uniform1i(tr.uniforms.uVelocity,dt.read.attach(0)),Q.uniform1i(tr.uniforms.uCurl,yo.attach(1)),Q.uniform1f(tr.uniforms.curl,ot.CURL),Q.uniform1f(tr.uniforms.dt,i),Rt(dt.write.fbo),dt.swap(),po.bind(),Q.uniform2f(po.uniforms.texelSize,dt.texelSizeX,dt.texelSizeY),Q.uniform1i(po.uniforms.uVelocity,dt.read.attach(0)),Rt(vo.fbo),uo.bind(),Q.uniform1i(uo.uniforms.uTexture,hi.read.attach(0)),Q.uniform1f(uo.uniforms.value,ot.PRESSURE),Rt(hi.write.fbo),hi.swap(),Ds.bind(),Q.uniform2f(Ds.uniforms.texelSize,dt.texelSizeX,dt.texelSizeY),Q.uniform1i(Ds.uniforms.uDivergence,vo.attach(0));for(var e=0;e<ot.PRESSURE_ITERATIONS;e++)Q.uniform1i(Ds.uniforms.uPressure,hi.read.attach(1)),Rt(hi.write.fbo),hi.swap();Us.bind(),Q.uniform2f(Us.uniforms.texelSize,dt.texelSizeX,dt.texelSizeY),Q.uniform1i(Us.uniforms.uPressure,hi.read.attach(0)),Q.uniform1i(Us.uniforms.uVelocity,dt.read.attach(1)),Rt(dt.write.fbo),dt.swap(),An.bind(),Q.uniform2f(An.uniforms.texelSize,dt.texelSizeX,dt.texelSizeY),an.supportLinearFiltering||Q.uniform2f(An.uniforms.dyeTexelSize,dt.texelSizeX,dt.texelSizeY);var t=dt.read.attach(0);Q.uniform1i(An.uniforms.uVelocity,t),Q.uniform1i(An.uniforms.uSource,t),Q.uniform1f(An.uniforms.dt,i),Q.uniform1f(An.uniforms.dissipation,ot.VELOCITY_DISSIPATION),Rt(dt.write.fbo),dt.swap(),Q.viewport(0,0,Ut.width,Ut.height),an.supportLinearFiltering||Q.uniform2f(An.uniforms.dyeTexelSize,Ut.texelSizeX,Ut.texelSizeY),Q.uniform1i(An.uniforms.uVelocity,dt.read.attach(0)),Q.uniform1i(An.uniforms.uSource,Ut.read.attach(1)),Q.uniform1f(An.uniforms.dissipation,ot.DENSITY_DISSIPATION),Rt(Ut.write.fbo),Ut.swap()}function cd(i){ot.BLOOM&&dd(Ut.read,Mo),ot.SUNRAYS&&(pd(Ut.read,Ut.write,Ns),md(Ns,Tc,1)),i==null||!ot.TRANSPARENT?(Q.blendFunc(Q.ONE,Q.ONE_MINUS_SRC_ALPHA),Q.enable(Q.BLEND)):Q.disable(Q.BLEND);var e=i==null?Q.drawingBufferWidth:i.width,t=i==null?Q.drawingBufferHeight:i.height;Q.viewport(0,0,e,t);var n=i==null?null:i.fbo;ot.TRANSPARENT||hd(n,Sd(ot.BACK_COLOR)),i==null&&ot.TRANSPARENT&&ud(n),fd(n,e,t)}function hd(i,e){gc.bind(),Q.uniform4f(gc.uniforms.color,e.r,e.g,e.b,1),Rt(i)}function ud(i){_c.bind(),Q.uniform1f(_c.uniforms.aspectRatio,xt.width/xt.height),Rt(i)}function fd(i,e,t){nr.bind(),ot.SHADING&&Q.uniform2f(nr.uniforms.texelSize,1/e,1/t),Q.uniform1i(nr.uniforms.uTexture,Ut.read.attach(0)),ot.BLOOM&&Q.uniform1i(nr.uniforms.uBloom,Mo.attach(1)),ot.SUNRAYS&&Q.uniform1i(nr.uniforms.uSunrays,Ns.attach(3)),Rt(i)}function dd(i,e){if(!(Di.length<2)){var t=e;Q.disable(Q.BLEND),Ls.bind();var n=ot.BLOOM_THRESHOLD*ot.BLOOM_SOFT_KNEE+1e-4,r=ot.BLOOM_THRESHOLD-n,s=n*2,a=.25/n;Q.uniform3f(Ls.uniforms.curve,r,s,a),Q.uniform1f(Ls.uniforms.threshold,ot.BLOOM_THRESHOLD),Q.uniform1i(Ls.uniforms.uTexture,i.attach(0)),Q.viewport(0,0,t.width,t.height),Rt(t.fbo),$r.bind();for(var o=0;o<Di.length;o++){var c=Di[o];Q.uniform2f($r.uniforms.texelSize,t.texelSizeX,t.texelSizeY),Q.uniform1i($r.uniforms.uTexture,t.attach(0)),Q.viewport(0,0,c.width,c.height),Rt(c.fbo),t=c}Q.blendFunc(Q.ONE,Q.ONE),Q.enable(Q.BLEND);for(var h=Di.length-2;h>=0;h--){var u=Di[h];Q.uniform2f($r.uniforms.texelSize,t.texelSizeX,t.texelSizeY),Q.uniform1i($r.uniforms.uTexture,t.attach(0)),Q.viewport(0,0,u.width,u.height),Rt(u.fbo),t=u}Q.disable(Q.BLEND),Is.bind(),Q.uniform2f(Is.uniforms.texelSize,t.texelSizeX,t.texelSizeY),Q.uniform1i(Is.uniforms.uTexture,t.attach(0)),Q.uniform1f(Is.uniforms.intensity,ot.BLOOM_INTENSITY),Q.viewport(0,0,e.width,e.height),Rt(e.fbo)}}function pd(i,e,t){Q.disable(Q.BLEND),vc.bind(),Q.uniform1i(vc.uniforms.uTexture,i.attach(0)),Q.viewport(0,0,e.width,e.height),Rt(e.fbo),fo.bind(),Q.uniform1f(fo.uniforms.weight,ot.SUNRAYS_WEIGHT),Q.uniform1i(fo.uniforms.uTexture,e.attach(0)),Q.viewport(0,0,t.width,t.height),Rt(t.fbo)}function md(i,e,t){Kr.bind();for(var n=0;n<t;n++)Q.uniform2f(Kr.uniforms.texelSize,i.texelSizeX,0),Q.uniform1i(Kr.uniforms.uTexture,i.attach(0)),Rt(e.fbo),Q.uniform2f(Kr.uniforms.texelSize,0,i.texelSizeY),Q.uniform1i(Kr.uniforms.uTexture,e.attach(0)),Rt(i.fbo)}function gd(i){var e=i.deltaX*ot.SPLAT_FORCE,t=i.deltaY*ot.SPLAT_FORCE;Cc(i.texcoordX,i.texcoordY,e,t,i.color)}function Rc(i){for(var e=0;e<i;e++){var t=bo();t.r*=10,t.g*=10,t.b*=10;var n=Math.random(),r=Math.random(),s=1e3*(Math.random()-.5),a=1e3*(Math.random()-.5);Cc(n,r,s,a,t)}}function Cc(i,e,t,n,r){Q.viewport(0,0,dt.width,dt.height),ci.bind(),Q.uniform1i(ci.uniforms.uTarget,dt.read.attach(0)),Q.uniform1f(ci.uniforms.aspectRatio,xt.width/xt.height),Q.uniform2f(ci.uniforms.point,i,e),Q.uniform3f(ci.uniforms.color,t,n,0),Q.uniform1f(ci.uniforms.radius,_d(ot.SPLAT_RADIUS/100)),Rt(dt.write.fbo),dt.swap(),Q.viewport(0,0,Ut.width,Ut.height),Q.uniform1i(ci.uniforms.uTarget,Ut.read.attach(0)),Q.uniform3f(ci.uniforms.color,r.r,r.g,r.b),Rt(Ut.write.fbo),Ut.swap()}function _d(i){var e=xt.width/xt.height;return e>1&&(i*=e),i}xt.addEventListener("mousedown",function(i){var e=Nn(i.offsetX),t=Nn(i.offsetY),n=Rn.find(function(r){return r.id==-1});n==null&&(n=new xo),Pc(n,-1,e,t)});xt.addEventListener("mousemove",function(i){var e=Rn[0];if(e.down){var t=Nn(i.offsetX),n=Nn(i.offsetY);Lc(e,t,n)}});window.addEventListener("mouseup",function(){Ic(Rn[0])});xt.addEventListener("touchstart",function(i){i.preventDefault();for(var e=i.targetTouches;e.length>=Rn.length;)Rn.push(new xo);for(var t=0;t<e.length;t++){var n=Nn(e[t].pageX),r=Nn(e[t].pageY);Pc(Rn[t+1],e[t].identifier,n,r)}});xt.addEventListener("touchmove",function(i){i.preventDefault();for(var e=i.targetTouches,t=0;t<e.length;t++){var n=Rn[t+1];if(n.down){var r=Nn(e[t].pageX),s=Nn(e[t].pageY);Lc(n,r,s)}}},!1);window.addEventListener("touchend",function(i){for(var e=i.changedTouches,t=function(r){var s=Rn.find(function(a){return a.id==e[r].identifier});s!=null&&Ic(s)},n=0;n<e.length;n++)t(n)});window.addEventListener("keydown",function(i){i.code==="KeyP"&&(ot.PAUSED=!ot.PAUSED),i.key===" "&&_o.push(parseInt(Math.random()*20)+5)});function Pc(i,e,t,n){i.id=e,i.down=!0,i.moved=!1,i.texcoordX=t/xt.width,i.texcoordY=1-n/xt.height,i.prevTexcoordX=i.texcoordX,i.prevTexcoordY=i.texcoordY,i.deltaX=0,i.deltaY=0,i.color=bo()}function Lc(i,e,t){i.prevTexcoordX=i.texcoordX,i.prevTexcoordY=i.texcoordY,i.texcoordX=e/xt.width,i.texcoordY=1-t/xt.height,i.deltaX=vd(i.texcoordX-i.prevTexcoordX),i.deltaY=yd(i.texcoordY-i.prevTexcoordY),i.moved=Math.abs(i.deltaX)>0||Math.abs(i.deltaY)>0}function Ic(i){i.down=!1}function vd(i){var e=xt.width/xt.height;return e<1&&(i*=e),i}function yd(i){var e=xt.width/xt.height;return e>1&&(i/=e),i}function bo(){var i=xd(Math.random(),1,1);return i.r*=.15,i.g*=.15,i.b*=.15,i}function xd(i,e,t){var n,r,s,a,o,c,h,u;switch(a=Math.floor(i*6),o=i*6-a,c=t*(1-e),h=t*(1-o*e),u=t*(1-(1-o)*e),a%6){case 0:n=t,r=u,s=c;break;case 1:n=h,r=t,s=c;break;case 2:n=c,r=t,s=u;break;case 3:n=c,r=h,s=t;break;case 4:n=u,r=c,s=t;break;case 5:n=t,r=c,s=h;break}return{r:n,g:r,b:s}}function Sd(i){var e={r:i.r/255,g:i.g/255,b:i.b/255};return e}function Md(i,e,t){var n=t-e;return n==0?e:(i-e)%n+e}function Fs(i){var e=Q.drawingBufferWidth/Q.drawingBufferHeight;e<1&&(e=1/e);var t=Math.round(i),n=Math.round(i*e);return Q.drawingBufferWidth>Q.drawingBufferHeight?{width:n,height:t}:{width:t,height:n}}function Nn(i){var e=window.devicePixelRatio||1;return Math.floor(i*e)}function bd(i){if(i.length==0)return 0;for(var e=0,t=0;t<i.length;t++)e=(e<<5)-e+i.charCodeAt(t),e|=0;return e}var Dc=document.getElementsByClassName("item-link"),Uc=document.getElementsByClassName("popup-close"),Td=document.getElementsByClassName("popup-background");for(Fn=0;Fn<Uc.length;Fn++)Uc[Fn].addEventListener("click",Oc),Td[Fn].addEventListener("click",Oc);var Fn;for(Fn=0;Fn<Dc.length;Fn++)Dc[Fn].addEventListener("click",wd);var Fn;function wd(i){for(var e=i&&i.target||event&&event.srcElement;e&&!e.classList.contains("grid-item");)e=e.parentNode;e.getElementsByClassName("popup-video")[1].play()}function Oc(i){for(var e=i&&i.target||event&&event.srcElement;e&&!e.classList.contains("popup-inner");)e=e.parentNode;e.getElementsByClassName("popup-video")[1].pause()}var Hl="159",Ji={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ki={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ed=0,Nc=1,Ad=2;var Tu=0,wu=1,Rd=2,Jn=3,Si=0,dn=1,Kn=2;var vi=0,br=1,da=2,Fc=3,Bc=4,Cd=5,zi=100,Pd=101,Ld=102,zc=103,kc=104,Id=200,Dd=201,Ud=202,Od=203,rl=204,sl=205,Nd=206,Fd=207,Bd=208,zd=209,kd=210,Vd=211,Hd=212,Gd=213,Wd=214,Xd=0,Yd=1,qd=2,pa=3,Zd=4,Jd=5,Kd=6,$d=7,Ya=0,jd=1,Qd=2,yi=0,ep=1,tp=2,np=3,Gl=4,ip=5,Vc="attached",rp="detached",Eu=300,Er=301,Ar=302,ls=303,al=304,qa=306,Rr=1e3,fn=1001,ol=1002,jt=1003,Hc=1004;var To=1005;var yn=1006,sp=1007;var cs=1008;var xi=1009,ap=1010,op=1011,Wl=1012,Au=1013,_i=1014,$n=1015,hs=1016,Ru=1017,Cu=1018,Vi=1020,lp=1021,xn=1023,cp=1024,hp=1025,Hi=1026,Cr=1027,up=1028,Pu=1029,fp=1030,Lu=1031,Iu=1033,wo=33776,Eo=33777,Ao=33778,Ro=33779,Gc=35840,Wc=35841,Xc=35842,Yc=35843,Du=36196,qc=37492,Zc=37496,Jc=37808,Kc=37809,$c=37810,jc=37811,Qc=37812,eh=37813,th=37814,nh=37815,ih=37816,rh=37817,sh=37818,ah=37819,oh=37820,lh=37821,Co=36492,ch=36494,hh=36495,dp=36283,uh=36284,fh=36285,dh=36286;var ma=2300,ga=2301,Po=2302,ph=2400,mh=2401,gh=2402,pp=2500;var Uu=3e3,Gi=3001,mp=3200,gp=3201,Za=0,_p=1,Sn="",St="srgb",ei="srgb-linear",Xl="display-p3",Ja="display-p3-linear",_a="linear",Mt="srgb",va="rec709",ya="p3";var ir=7680;var _h=519,vp=512,yp=513,xp=514,Ou=515,Sp=516,Mp=517,bp=518,Tp=519,vh=35044;var yh="300 es",ll=1035,jn=2e3,xa=2001,zn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xh=1234567,rs=Math.PI/180,Pr=180/Math.PI;function Ri(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function zt(i,e,t){return Math.max(e,Math.min(t,i))}function Yl(i,e){return(i%e+e)%e}function wp(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Ep(i,e,t){return i!==e?(t-i)/(e-i):0}function ss(i,e,t){return(1-t)*i+t*e}function Ap(i,e,t,n){return ss(i,e,1-Math.exp(-t*n))}function Rp(i,e=1){return e-Math.abs(Yl(i,e*2)-e)}function Cp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Pp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Lp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ip(i,e){return i+Math.random()*(e-i)}function Dp(i){return i*(.5-Math.random())}function Up(i){i!==void 0&&(xh=i);let e=xh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Op(i){return i*rs}function Np(i){return i*Pr}function cl(i){return(i&i-1)===0&&i!==0}function Fp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Sa(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bp(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),h=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),S=a((n-e)/2);switch(r){case"XYX":i.set(o*u,c*f,c*d,o*h);break;case"YZY":i.set(c*d,o*u,c*f,o*h);break;case"ZXZ":i.set(c*f,c*d,o*u,o*h);break;case"XZX":i.set(o*u,c*S,c*p,o*h);break;case"YXY":i.set(c*p,o*u,c*S,o*h);break;case"ZYZ":i.set(c*S,c*p,o*u,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function yr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function on(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Yt={DEG2RAD:rs,RAD2DEG:Pr,generateUUID:Ri,clamp:zt,euclideanModulo:Yl,mapLinear:wp,inverseLerp:Ep,lerp:ss,damp:Ap,pingpong:Rp,smoothstep:Cp,smootherstep:Pp,randInt:Lp,randFloat:Ip,randFloatSpread:Dp,seededRandom:Up,degToRad:Op,radToDeg:Np,isPowerOfTwo:cl,ceilPowerOfTwo:Fp,floorPowerOfTwo:Sa,setQuaternionFromProperEuler:Bp,normalize:on,denormalize:yr},nt=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ut=class i{constructor(e,t,n,r,s,a,o,c,h){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,h)}set(e,t,n,r,s,a,o,c,h){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],h=n[1],u=n[4],f=n[7],d=n[2],p=n[5],S=n[8],y=r[0],m=r[3],l=r[6],v=r[1],g=r[4],_=r[7],b=r[2],P=r[5],I=r[8];return s[0]=a*y+o*v+c*b,s[3]=a*m+o*g+c*P,s[6]=a*l+o*_+c*I,s[1]=h*y+u*v+f*b,s[4]=h*m+u*g+f*P,s[7]=h*l+u*_+f*I,s[2]=d*y+p*v+S*b,s[5]=d*m+p*g+S*P,s[8]=d*l+p*_+S*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],h=e[7],u=e[8];return t*a*u-t*o*h-n*s*u+n*o*c+r*s*h-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],h=e[7],u=e[8],f=u*a-o*h,d=o*c-u*s,p=h*s-a*c,S=t*f+n*d+r*p;if(S===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/S;return e[0]=f*y,e[1]=(r*h-u*n)*y,e[2]=(o*n-r*a)*y,e[3]=d*y,e[4]=(u*t-r*c)*y,e[5]=(r*s-o*t)*y,e[6]=p*y,e[7]=(n*c-h*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let c=Math.cos(s),h=Math.sin(s);return this.set(n*c,n*h,-n*(c*a+h*o)+a+e,-r*h,r*c,-r*(-h*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Lo.makeScale(e,t)),this}rotate(e){return this.premultiply(Lo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Lo=new ut;function Nu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zp(){let i=us("canvas");return i.style.display="block",i}var Sh={};function as(i){i in Sh||(Sh[i]=!0,console.warn(i))}var Mh=new ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),bh=new ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Bs={[ei]:{transfer:_a,primaries:va,toReference:i=>i,fromReference:i=>i},[St]:{transfer:Mt,primaries:va,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ja]:{transfer:_a,primaries:ya,toReference:i=>i.applyMatrix3(bh),fromReference:i=>i.applyMatrix3(Mh)},[Xl]:{transfer:Mt,primaries:ya,toReference:i=>i.convertSRGBToLinear().applyMatrix3(bh),fromReference:i=>i.applyMatrix3(Mh).convertLinearToSRGB()}},kp=new Set([ei,Ja]),yt={enabled:!0,_workingColorSpace:ei,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kp.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=Bs[e].toReference,r=Bs[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Bs[i].primaries},getTransfer:function(i){return i===Sn?_a:Bs[i].transfer}};function Tr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Io(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var rr,Ma=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{rr===void 0&&(rr=us("canvas")),rr.width=e.width,rr.height=e.height;let n=rr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=rr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=us("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Tr(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tr(t[n]/255)*255):t[n]=Tr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Vp=0,ba=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Ri(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Do(r[a].image)):s.push(Do(r[a]))}else s=Do(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Do(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ma.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Hp=0,Qt=class i extends zn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=fn,r=fn,s=yn,a=cs,o=xn,c=xi,h=i.DEFAULT_ANISOTROPY,u=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=Ri(),this.name="",this.source=new ba(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(as("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Gi?St:Sn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Eu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rr:e.x=e.x-Math.floor(e.x);break;case fn:e.x=e.x<0?0:1;break;case ol:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rr:e.y=e.y-Math.floor(e.y);break;case fn:e.y=e.y<0?0:1;break;case ol:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return as("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===St?Gi:Uu}set encoding(e){as("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Gi?St:Sn}};Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Eu;Qt.DEFAULT_ANISOTROPY=1;var pt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,h=c[0],u=c[4],f=c[8],d=c[1],p=c[5],S=c[9],y=c[2],m=c[6],l=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-y)<.01&&Math.abs(S-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+y)<.1&&Math.abs(S+m)<.1&&Math.abs(h+p+l-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let g=(h+1)/2,_=(p+1)/2,b=(l+1)/2,P=(u+d)/4,I=(f+y)/4,z=(S+m)/4;return g>_&&g>b?g<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(g),r=P/n,s=I/n):_>b?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=P/r,s=z/r):b<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),n=I/s,r=z/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-S)*(m-S)+(f-y)*(f-y)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(m-S)/v,this.y=(f-y)/v,this.z=(d-u)/v,this.w=Math.acos((h+p+l-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hl=class extends zn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(as("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Gi?St:Sn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Qt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ba(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ti=class extends hl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ta=class extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ul=class extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ft=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],h=n[r+1],u=n[r+2],f=n[r+3],d=s[a+0],p=s[a+1],S=s[a+2],y=s[a+3];if(o===0){e[t+0]=c,e[t+1]=h,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=S,e[t+3]=y;return}if(f!==y||c!==d||h!==p||u!==S){let m=1-o,l=c*d+h*p+u*S+f*y,v=l>=0?1:-1,g=1-l*l;if(g>Number.EPSILON){let b=Math.sqrt(g),P=Math.atan2(b,l*v);m=Math.sin(m*P)/b,o=Math.sin(o*P)/b}let _=o*v;if(c=c*m+d*_,h=h*m+p*_,u=u*m+S*_,f=f*m+y*_,m===1-o){let b=1/Math.sqrt(c*c+h*h+u*u+f*f);c*=b,h*=b,u*=b,f*=b}}e[t]=c,e[t+1]=h,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],c=n[r+1],h=n[r+2],u=n[r+3],f=s[a],d=s[a+1],p=s[a+2],S=s[a+3];return e[t]=o*S+u*f+c*p-h*d,e[t+1]=c*S+u*d+h*f-o*p,e[t+2]=h*S+u*p+o*d-c*f,e[t+3]=u*S-o*f-c*d-h*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,h=o(n/2),u=o(r/2),f=o(s/2),d=c(n/2),p=c(r/2),S=c(s/2);switch(a){case"XYZ":this._x=d*u*f+h*p*S,this._y=h*p*f-d*u*S,this._z=h*u*S+d*p*f,this._w=h*u*f-d*p*S;break;case"YXZ":this._x=d*u*f+h*p*S,this._y=h*p*f-d*u*S,this._z=h*u*S-d*p*f,this._w=h*u*f+d*p*S;break;case"ZXY":this._x=d*u*f-h*p*S,this._y=h*p*f+d*u*S,this._z=h*u*S+d*p*f,this._w=h*u*f-d*p*S;break;case"ZYX":this._x=d*u*f-h*p*S,this._y=h*p*f+d*u*S,this._z=h*u*S-d*p*f,this._w=h*u*f+d*p*S;break;case"YZX":this._x=d*u*f+h*p*S,this._y=h*p*f+d*u*S,this._z=h*u*S-d*p*f,this._w=h*u*f-d*p*S;break;case"XZY":this._x=d*u*f-h*p*S,this._y=h*p*f-d*u*S,this._z=h*u*S+d*p*f,this._w=h*u*f+d*p*S;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],h=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-h)*p,this._z=(a-r)*p}else if(n>o&&n>f){let p=2*Math.sqrt(1+n-o-f);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+h)/p}else if(o>f){let p=2*Math.sqrt(1+o-n-f);this._w=(s-h)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+f-n-o);this._w=(a-r)/p,this._x=(s+h)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,h=t._z,u=t._w;return this._x=n*u+a*o+r*h-s*c,this._y=r*u+a*c+s*o-n*h,this._z=s*u+a*h+n*c-r*o,this._w=a*u-n*o-r*c-s*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this._onChangeCallback(),this}let h=Math.sqrt(c),u=Math.atan2(h,o),f=Math.sin((1-t)*u)/h,d=Math.sin(t*u)/h;return this._w=a*f+this._w*d,this._x=n*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},j=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Th.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Th.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,h=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+c*h+a*f-o*u,this.y=n+c*u+o*h-s*f,this.z=r+c*f+s*u-a*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uo.copy(this).projectOnVector(e),this.sub(Uo)}reflect(e){return this.sub(Uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Uo=new j,Th=new Ft,Mi=class{constructor(e=new j(1/0,1/0,1/0),t=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Cn):Cn.fromBufferAttribute(s,a),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(e.matrixWorld),this.union(zs)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jr),ks.subVectors(this.max,jr),sr.subVectors(e.a,jr),ar.subVectors(e.b,jr),or.subVectors(e.c,jr),fi.subVectors(ar,sr),di.subVectors(or,ar),Ui.subVectors(sr,or);let t=[0,-fi.z,fi.y,0,-di.z,di.y,0,-Ui.z,Ui.y,fi.z,0,-fi.x,di.z,0,-di.x,Ui.z,0,-Ui.x,-fi.y,fi.x,0,-di.y,di.x,0,-Ui.y,Ui.x,0];return!Oo(t,sr,ar,or,ks)||(t=[1,0,0,0,1,0,0,0,1],!Oo(t,sr,ar,or,ks))?!1:(Vs.crossVectors(fi,di),t=[Vs.x,Vs.y,Vs.z],Oo(t,sr,ar,or,ks))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Gn=[new j,new j,new j,new j,new j,new j,new j,new j],Cn=new j,zs=new Mi,sr=new j,ar=new j,or=new j,fi=new j,di=new j,Ui=new j,jr=new j,ks=new j,Vs=new j,Oi=new j;function Oo(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Oi.fromArray(i,s);let o=r.x*Math.abs(Oi.x)+r.y*Math.abs(Oi.y)+r.z*Math.abs(Oi.z),c=e.dot(Oi),h=t.dot(Oi),u=n.dot(Oi);if(Math.max(-Math.max(c,h,u),Math.min(c,h,u))>o)return!1}return!0}var Gp=new Mi,Qr=new j,No=new j,ni=class{constructor(e=new j,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Gp.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qr.subVectors(e,this.center);let t=Qr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Qr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(No.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qr.copy(e.center).add(No)),this.expandByPoint(Qr.copy(e.center).sub(No))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Wn=new j,Fo=new j,Hs=new j,pi=new j,Bo=new j,Gs=new j,zo=new j,ii=class{constructor(e=new j,t=new j(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Fo.copy(e).add(t).multiplyScalar(.5),Hs.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Fo);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Hs),o=pi.dot(this.direction),c=-pi.dot(Hs),h=pi.lengthSq(),u=Math.abs(1-a*a),f,d,p,S;if(u>0)if(f=a*c-o,d=a*o-c,S=s*u,f>=0)if(d>=-S)if(d<=S){let y=1/u;f*=y,d*=y,p=f*(f+a*d+2*o)+d*(a*f+d+2*c)+h}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+h;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+h;else d<=-S?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+h):d<=S?(f=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+h):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+h);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Fo).addScaledVector(Hs,d),p}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);let n=Wn.dot(this.direction),r=Wn.dot(Wn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c,h=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return h>=0?(n=(e.min.x-d.x)*h,r=(e.max.x-d.x)*h):(n=(e.max.x-d.x)*h,r=(e.min.x-d.x)*h),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,n,r,s){Bo.subVectors(t,e),Gs.subVectors(n,e),zo.crossVectors(Bo,Gs);let a=this.direction.dot(zo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,e);let c=o*this.direction.dot(Gs.crossVectors(pi,Gs));if(c<0)return null;let h=o*this.direction.dot(Bo.cross(pi));if(h<0||c+h>a)return null;let u=-o*pi.dot(zo);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},je=class i{constructor(e,t,n,r,s,a,o,c,h,u,f,d,p,S,y,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,h,u,f,d,p,S,y,m)}set(e,t,n,r,s,a,o,c,h,u,f,d,p,S,y,m){let l=this.elements;return l[0]=e,l[4]=t,l[8]=n,l[12]=r,l[1]=s,l[5]=a,l[9]=o,l[13]=c,l[2]=h,l[6]=u,l[10]=f,l[14]=d,l[3]=p,l[7]=S,l[11]=y,l[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/lr.setFromMatrixColumn(e,0).length(),s=1/lr.setFromMatrixColumn(e,1).length(),a=1/lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),h=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let d=a*u,p=a*f,S=o*u,y=o*f;t[0]=c*u,t[4]=-c*f,t[8]=h,t[1]=p+S*h,t[5]=d-y*h,t[9]=-o*c,t[2]=y-d*h,t[6]=S+p*h,t[10]=a*c}else if(e.order==="YXZ"){let d=c*u,p=c*f,S=h*u,y=h*f;t[0]=d+y*o,t[4]=S*o-p,t[8]=a*h,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-S,t[6]=y+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*u,p=c*f,S=h*u,y=h*f;t[0]=d-y*o,t[4]=-a*f,t[8]=S+p*o,t[1]=p+S*o,t[5]=a*u,t[9]=y-d*o,t[2]=-a*h,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*u,p=a*f,S=o*u,y=o*f;t[0]=c*u,t[4]=S*h-p,t[8]=d*h+y,t[1]=c*f,t[5]=y*h+d,t[9]=p*h-S,t[2]=-h,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,p=a*h,S=o*c,y=o*h;t[0]=c*u,t[4]=y-d*f,t[8]=S*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-h*u,t[6]=p*f+S,t[10]=d-y*f}else if(e.order==="XZY"){let d=a*c,p=a*h,S=o*c,y=o*h;t[0]=c*u,t[4]=-f,t[8]=h*u,t[1]=d*f+y,t[5]=a*u,t[9]=p*f-S,t[2]=S*f-p,t[6]=o*u,t[10]=y*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wp,e,Xp)}lookAt(e,t,n){let r=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),mi.crossVectors(n,gn),mi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),mi.crossVectors(n,gn)),mi.normalize(),Ws.crossVectors(gn,mi),r[0]=mi.x,r[4]=Ws.x,r[8]=gn.x,r[1]=mi.y,r[5]=Ws.y,r[9]=gn.y,r[2]=mi.z,r[6]=Ws.z,r[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],h=n[12],u=n[1],f=n[5],d=n[9],p=n[13],S=n[2],y=n[6],m=n[10],l=n[14],v=n[3],g=n[7],_=n[11],b=n[15],P=r[0],I=r[4],z=r[8],C=r[12],D=r[1],Z=r[5],K=r[9],ie=r[13],V=r[2],q=r[6],ne=r[10],ae=r[14],ue=r[3],me=r[7],fe=r[11],Me=r[15];return s[0]=a*P+o*D+c*V+h*ue,s[4]=a*I+o*Z+c*q+h*me,s[8]=a*z+o*K+c*ne+h*fe,s[12]=a*C+o*ie+c*ae+h*Me,s[1]=u*P+f*D+d*V+p*ue,s[5]=u*I+f*Z+d*q+p*me,s[9]=u*z+f*K+d*ne+p*fe,s[13]=u*C+f*ie+d*ae+p*Me,s[2]=S*P+y*D+m*V+l*ue,s[6]=S*I+y*Z+m*q+l*me,s[10]=S*z+y*K+m*ne+l*fe,s[14]=S*C+y*ie+m*ae+l*Me,s[3]=v*P+g*D+_*V+b*ue,s[7]=v*I+g*Z+_*q+b*me,s[11]=v*z+g*K+_*ne+b*fe,s[15]=v*C+g*ie+_*ae+b*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],h=e[13],u=e[2],f=e[6],d=e[10],p=e[14],S=e[3],y=e[7],m=e[11],l=e[15];return S*(+s*c*f-r*h*f-s*o*d+n*h*d+r*o*p-n*c*p)+y*(+t*c*p-t*h*d+s*a*d-r*a*p+r*h*u-s*c*u)+m*(+t*h*f-t*o*p-s*a*f+n*a*p+s*o*u-n*h*u)+l*(-r*o*u-t*c*f+t*o*d+r*a*f-n*a*d+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],h=e[7],u=e[8],f=e[9],d=e[10],p=e[11],S=e[12],y=e[13],m=e[14],l=e[15],v=f*m*h-y*d*h+y*c*p-o*m*p-f*c*l+o*d*l,g=S*d*h-u*m*h-S*c*p+a*m*p+u*c*l-a*d*l,_=u*y*h-S*f*h+S*o*p-a*y*p-u*o*l+a*f*l,b=S*f*c-u*y*c-S*o*d+a*y*d+u*o*m-a*f*m,P=t*v+n*g+r*_+s*b;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/P;return e[0]=v*I,e[1]=(y*d*s-f*m*s-y*r*p+n*m*p+f*r*l-n*d*l)*I,e[2]=(o*m*s-y*c*s+y*r*h-n*m*h-o*r*l+n*c*l)*I,e[3]=(f*c*s-o*d*s-f*r*h+n*d*h+o*r*p-n*c*p)*I,e[4]=g*I,e[5]=(u*m*s-S*d*s+S*r*p-t*m*p-u*r*l+t*d*l)*I,e[6]=(S*c*s-a*m*s-S*r*h+t*m*h+a*r*l-t*c*l)*I,e[7]=(a*d*s-u*c*s+u*r*h-t*d*h-a*r*p+t*c*p)*I,e[8]=_*I,e[9]=(S*f*s-u*y*s-S*n*p+t*y*p+u*n*l-t*f*l)*I,e[10]=(a*y*s-S*o*s+S*n*h-t*y*h-a*n*l+t*o*l)*I,e[11]=(u*o*s-a*f*s-u*n*h+t*f*h+a*n*p-t*o*p)*I,e[12]=b*I,e[13]=(u*y*r-S*f*r+S*n*d-t*y*d-u*n*m+t*f*m)*I,e[14]=(S*o*r-a*y*r-S*n*c+t*y*c+a*n*m-t*o*m)*I,e[15]=(a*f*r-u*o*r+u*n*c-t*f*c-a*n*d+t*o*d)*I,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,h=s*a,u=s*o;return this.set(h*a+n,h*o-r*c,h*c+r*o,0,h*o+r*c,u*o+n,u*c-r*a,0,h*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,h=s+s,u=a+a,f=o+o,d=s*h,p=s*u,S=s*f,y=a*u,m=a*f,l=o*f,v=c*h,g=c*u,_=c*f,b=n.x,P=n.y,I=n.z;return r[0]=(1-(y+l))*b,r[1]=(p+_)*b,r[2]=(S-g)*b,r[3]=0,r[4]=(p-_)*P,r[5]=(1-(d+l))*P,r[6]=(m+v)*P,r[7]=0,r[8]=(S+g)*I,r[9]=(m-v)*I,r[10]=(1-(d+y))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=lr.set(r[0],r[1],r[2]).length(),a=lr.set(r[4],r[5],r[6]).length(),o=lr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Pn.copy(this);let h=1/s,u=1/a,f=1/o;return Pn.elements[0]*=h,Pn.elements[1]*=h,Pn.elements[2]*=h,Pn.elements[4]*=u,Pn.elements[5]*=u,Pn.elements[6]*=u,Pn.elements[8]*=f,Pn.elements[9]*=f,Pn.elements[10]*=f,t.setFromRotationMatrix(Pn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=jn){let c=this.elements,h=2*s/(t-e),u=2*s/(n-r),f=(t+e)/(t-e),d=(n+r)/(n-r),p,S;if(o===jn)p=-(a+s)/(a-s),S=-2*a*s/(a-s);else if(o===xa)p=-a/(a-s),S=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=jn){let c=this.elements,h=1/(t-e),u=1/(n-r),f=1/(a-s),d=(t+e)*h,p=(n+r)*u,S,y;if(o===jn)S=(a+s)*f,y=-2*f;else if(o===xa)S=s*f,y=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=y,c[14]=-S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},lr=new j,Pn=new je,Wp=new j(0,0,0),Xp=new j(1,1,1),mi=new j,Ws=new j,gn=new j,wh=new je,Eh=new Ft,hn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],h=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-zt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eh.setFromEuler(this),this.setFromQuaternion(Eh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hn.DEFAULT_ORDER="XYZ";var fs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Yp=0,Ah=new j,cr=new Ft,Xn=new je,Xs=new j,es=new j,qp=new j,Zp=new Ft,Rh=new j(1,0,0),Ch=new j(0,1,0),Ph=new j(0,0,1),Jp={type:"added"},Kp={type:"removed"},bt=class i extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new j,t=new hn,n=new Ft,r=new j(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new je},normalMatrix:{value:new ut}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Rh,e)}rotateY(e){return this.rotateOnAxis(Ch,e)}rotateZ(e){return this.rotateOnAxis(Ph,e)}translateOnAxis(e,t){return Ah.copy(e).applyQuaternion(this.quaternion),this.position.add(Ah.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rh,e)}translateY(e){return this.translateOnAxis(Ch,e)}translateZ(e){return this.translateOnAxis(Ph,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xs.copy(e):Xs.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(es,Xs,this.up):Xn.lookAt(Xs,es,this.up),this.quaternion.setFromRotationMatrix(Xn),r&&(Xn.extractRotation(r.matrixWorld),cr.setFromRotationMatrix(Xn),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Jp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kp)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,qp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,Zp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++){let o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let h=0,u=c.length;h<u;h++){let f=c[h];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,h=this.material.length;c<h;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),h=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),S=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),S.length>0&&(n.nodes=S)}return n.object=r,n;function a(o){let c=[];for(let h in o){let u=o[h];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};bt.DEFAULT_UP=new j(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ln=new j,Yn=new j,ko=new j,qn=new j,hr=new j,ur=new j,Lh=new j,Vo=new j,Ho=new j,Go=new j,Ys=!1,xr=class i{constructor(e=new j,t=new j,n=new j){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ln.subVectors(e,t),r.cross(Ln);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Ln.subVectors(r,t),Yn.subVectors(n,t),ko.subVectors(e,t);let a=Ln.dot(Ln),o=Ln.dot(Yn),c=Ln.dot(ko),h=Yn.dot(Yn),u=Yn.dot(ko),f=a*h-o*o;if(f===0)return s.set(-2,-1,-1);let d=1/f,p=(h*c-o*u)*d,S=(a*u-o*c)*d;return s.set(1-p-S,S,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qn),qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getUV(e,t,n,r,s,a,o,c){return Ys===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ys=!0),this.getInterpolation(e,t,n,r,s,a,o,c)}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,qn),c.setScalar(0),c.addScaledVector(s,qn.x),c.addScaledVector(a,qn.y),c.addScaledVector(o,qn.z),c}static isFrontFacing(e,t,n,r){return Ln.subVectors(n,t),Yn.subVectors(e,t),Ln.cross(Yn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Ln.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Ys===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ys=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;hr.subVectors(r,n),ur.subVectors(s,n),Vo.subVectors(e,n);let c=hr.dot(Vo),h=ur.dot(Vo);if(c<=0&&h<=0)return t.copy(n);Ho.subVectors(e,r);let u=hr.dot(Ho),f=ur.dot(Ho);if(u>=0&&f<=u)return t.copy(r);let d=c*f-u*h;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(hr,a);Go.subVectors(e,s);let p=hr.dot(Go),S=ur.dot(Go);if(S>=0&&p<=S)return t.copy(s);let y=p*h-c*S;if(y<=0&&h>=0&&S<=0)return o=h/(h-S),t.copy(n).addScaledVector(ur,o);let m=u*S-p*f;if(m<=0&&f-u>=0&&p-S>=0)return Lh.subVectors(s,r),o=(f-u)/(f-u+(p-S)),t.copy(r).addScaledVector(Lh,o);let l=1/(m+y+d);return a=y*l,o=d*l,t.copy(n).addScaledVector(hr,a).addScaledVector(ur,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},qs={h:0,s:0,l:0};function Wo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=yt.workingColorSpace){return this.r=e,this.g=t,this.b=n,yt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=yt.workingColorSpace){if(e=Yl(e,1),t=zt(t,0,1),n=zt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Wo(a,s,e+1/3),this.g=Wo(a,s,e),this.b=Wo(a,s,e-1/3)}return yt.toWorkingColorSpace(this,r),this}setStyle(e,t=St){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){let n=Fu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}copyLinearToSRGB(e){return this.r=Io(e.r),this.g=Io(e.g),this.b=Io(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return yt.fromWorkingColorSpace(nn.copy(this),e),Math.round(zt(nn.r*255,0,255))*65536+Math.round(zt(nn.g*255,0,255))*256+Math.round(zt(nn.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.fromWorkingColorSpace(nn.copy(this),t);let n=nn.r,r=nn.g,s=nn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,h,u=(o+a)/2;if(o===a)c=0,h=0;else{let f=a-o;switch(h=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=h,e.l=u,e}getRGB(e,t=yt.workingColorSpace){return yt.fromWorkingColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=St){yt.fromWorkingColorSpace(nn.copy(this),e);let t=nn.r,n=nn.g,r=nn.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(qs);let n=ss(gi.h,qs.h,t),r=ss(gi.s,qs.s,t),s=ss(gi.l,qs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new Je;Je.NAMES=Fu;var $p=0,Dn=class extends zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=br,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rl,this.blendDst=sl,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=pa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ir,this.stencilZFail=ir,this.stencilZPass=ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==br&&(n.blending=this.blending),this.side!==Si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==rl&&(n.blendSrc=this.blendSrc),this.blendDst!==sl&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_h&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ir&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ir&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ir&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Lr=class extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Nt=new j,Zs=new nt,Mn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn('THREE.BufferAttribute: "updateRange" is deprecated and removed in r169. Use "addUpdateRange()" instead.'),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zs.fromBufferAttribute(this,t),Zs.applyMatrix3(e),this.setXY(t,Zs.x,Zs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yr(t,this.array)),t}setX(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yr(t,this.array)),t}setY(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yr(t,this.array)),t}setW(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),n=on(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),n=on(n,this.array),r=on(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),n=on(n,this.array),r=on(r,this.array),s=on(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vh&&(e.usage=this.usage),e}};var Ir=class extends Mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var wa=class extends Mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ct=class extends Mn{constructor(e,t,n){super(new Float32Array(e),t,n)}};var jp=0,vn=new je,Xo=new bt,fr=new j,_n=new Mi,ts=new Mi,Xt=new j,rn=class i extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nu(e)?wa:Ir)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ut().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,n){return vn.makeTranslation(e,t,n),this.applyMatrix4(vn),this}scale(e,t,n){return vn.makeScale(e,t,n),this.applyMatrix4(vn),this}lookAt(e){return Xo.lookAt(e),Xo.updateMatrix(),this.applyMatrix4(Xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ct(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ni);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new j,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(_n.min,ts.min),_n.expandByPoint(Xt),Xt.addVectors(_n.max,ts.max),_n.expandByPoint(Xt)):(_n.expandByPoint(ts.min),_n.expandByPoint(ts.max))}_n.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Xt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)Xt.fromBufferAttribute(o,h),c&&(fr.fromBufferAttribute(e,h),Xt.add(fr)),r=Math.max(r,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,h=[],u=[];for(let D=0;D<o;D++)h[D]=new j,u[D]=new j;let f=new j,d=new j,p=new j,S=new nt,y=new nt,m=new nt,l=new j,v=new j;function g(D,Z,K){f.fromArray(r,D*3),d.fromArray(r,Z*3),p.fromArray(r,K*3),S.fromArray(a,D*2),y.fromArray(a,Z*2),m.fromArray(a,K*2),d.sub(f),p.sub(f),y.sub(S),m.sub(S);let ie=1/(y.x*m.y-m.x*y.y);isFinite(ie)&&(l.copy(d).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(ie),v.copy(p).multiplyScalar(y.x).addScaledVector(d,-m.x).multiplyScalar(ie),h[D].add(l),h[Z].add(l),h[K].add(l),u[D].add(v),u[Z].add(v),u[K].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let D=0,Z=_.length;D<Z;++D){let K=_[D],ie=K.start,V=K.count;for(let q=ie,ne=ie+V;q<ne;q+=3)g(n[q+0],n[q+1],n[q+2])}let b=new j,P=new j,I=new j,z=new j;function C(D){I.fromArray(s,D*3),z.copy(I);let Z=h[D];b.copy(Z),b.sub(I.multiplyScalar(I.dot(Z))).normalize(),P.crossVectors(z,Z);let ie=P.dot(u[D])<0?-1:1;c[D*4]=b.x,c[D*4+1]=b.y,c[D*4+2]=b.z,c[D*4+3]=ie}for(let D=0,Z=_.length;D<Z;++D){let K=_[D],ie=K.start,V=K.count;for(let q=ie,ne=ie+V;q<ne;q+=3)C(n[q+0]),C(n[q+1]),C(n[q+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let r=new j,s=new j,a=new j,o=new j,c=new j,h=new j,u=new j,f=new j;if(e)for(let d=0,p=e.count;d<p;d+=3){let S=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,S),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,S),c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,m),o.add(u),c.add(u),h.add(u),n.setXYZ(S,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){let h=o.array,u=o.itemSize,f=o.normalized,d=new h.constructor(c.length*u),p=0,S=0;for(let y=0,m=c.length;y<m;y++){o.isInterleavedBufferAttribute?p=c[y]*o.data.stride+o.offset:p=c[y]*u;for(let l=0;l<u;l++)d[S++]=h[p++]}return new Mn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=r[o],h=e(c,n);t.setAttribute(o,h)}let s=this.morphAttributes;for(let o in s){let c=[],h=s[o];for(let u=0,f=h.length;u<f;u++){let d=h[u],p=e(d,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let h=a[o];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(e[h]=c[h]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let h=n[c];e.data.attributes[c]=h.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],u=[];for(let f=0,d=h.length;f<d;f++){let p=h[f];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let h in r){let u=r[h];this.setAttribute(h,u.clone(t))}let s=e.morphAttributes;for(let h in s){let u=[],f=s[h];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[h]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let h=0,u=a.length;h<u;h++){let f=a[h];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ih=new je,Ni=new ii,Js=new ni,Dh=new j,dr=new j,pr=new j,mr=new j,Yo=new j,Ks=new j,$s=new nt,js=new nt,Qs=new nt,Uh=new j,Oh=new j,Nh=new j,ea=new j,ta=new j,cn=class extends bt{constructor(e=new rn,t=new Lr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Ks.set(0,0,0);for(let c=0,h=s.length;c<h;c++){let u=o[c],f=s[c];u!==0&&(Yo.fromBufferAttribute(f,e),a?Ks.addScaledVector(Yo,u):Ks.addScaledVector(Yo.sub(t),u))}t.add(Ks)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(s),Ni.copy(e.ray).recast(e.near),!(Js.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(Js,Dh)===null||Ni.origin.distanceToSquared(Dh)>(e.far-e.near)**2))&&(Ih.copy(s).invert(),Ni.copy(e.ray).applyMatrix4(Ih),!(n.boundingBox!==null&&Ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ni)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,h=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let S=0,y=d.length;S<y;S++){let m=d[S],l=a[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=v,b=g;_<b;_+=3){let P=o.getX(_),I=o.getX(_+1),z=o.getX(_+2);r=na(this,l,e,n,h,u,f,P,I,z),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let S=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=S,l=y;m<l;m+=3){let v=o.getX(m),g=o.getX(m+1),_=o.getX(m+2);r=na(this,a,e,n,h,u,f,v,g,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let S=0,y=d.length;S<y;S++){let m=d[S],l=a[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let _=v,b=g;_<b;_+=3){let P=_,I=_+1,z=_+2;r=na(this,l,e,n,h,u,f,P,I,z),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let S=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);for(let m=S,l=y;m<l;m+=3){let v=m,g=m+1,_=m+2;r=na(this,a,e,n,h,u,f,v,g,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Qp(i,e,t,n,r,s,a,o){let c;if(e.side===dn?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Si,o),c===null)return null;ta.copy(o),ta.applyMatrix4(i.matrixWorld);let h=t.ray.origin.distanceTo(ta);return h<t.near||h>t.far?null:{distance:h,point:ta.clone(),object:i}}function na(i,e,t,n,r,s,a,o,c,h){i.getVertexPosition(o,dr),i.getVertexPosition(c,pr),i.getVertexPosition(h,mr);let u=Qp(i,e,t,n,dr,pr,mr,ea);if(u){r&&($s.fromBufferAttribute(r,o),js.fromBufferAttribute(r,c),Qs.fromBufferAttribute(r,h),u.uv=xr.getInterpolation(ea,dr,pr,mr,$s,js,Qs,new nt)),s&&($s.fromBufferAttribute(s,o),js.fromBufferAttribute(s,c),Qs.fromBufferAttribute(s,h),u.uv1=xr.getInterpolation(ea,dr,pr,mr,$s,js,Qs,new nt),u.uv2=u.uv1),a&&(Uh.fromBufferAttribute(a,o),Oh.fromBufferAttribute(a,c),Nh.fromBufferAttribute(a,h),u.normal=xr.getInterpolation(ea,dr,pr,mr,Uh,Oh,Nh,new j),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:h,normal:new j,materialIndex:0};xr.getNormal(dr,pr,mr,f.normal),u.face=f}return u}var ds=class i extends rn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],h=[],u=[],f=[],d=0,p=0;S("z","y","x",-1,-1,n,t,e,a,s,0),S("z","y","x",1,-1,n,t,-e,a,s,1),S("x","z","y",1,1,e,n,t,r,a,2),S("x","z","y",1,-1,e,n,-t,r,a,3),S("x","y","z",1,-1,e,t,n,r,s,4),S("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Ct(h,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(f,2));function S(y,m,l,v,g,_,b,P,I,z,C){let D=_/I,Z=b/z,K=_/2,ie=b/2,V=P/2,q=I+1,ne=z+1,ae=0,ue=0,me=new j;for(let fe=0;fe<ne;fe++){let Me=fe*Z-ie;for(let Le=0;Le<q;Le++){let le=Le*D-K;me[y]=le*v,me[m]=Me*g,me[l]=V,h.push(me.x,me.y,me.z),me[y]=0,me[m]=0,me[l]=P>0?1:-1,u.push(me.x,me.y,me.z),f.push(Le/I),f.push(1-fe/z),ae+=1}}for(let fe=0;fe<z;fe++)for(let Me=0;Me<I;Me++){let Le=d+Me+q*fe,le=d+Me+q*(fe+1),ye=d+(Me+1)+q*(fe+1),Pe=d+(Me+1)+q*fe;c.push(Le,le,Pe),c.push(le,ye,Pe),ue+=6}o.addGroup(p,ue,C),p+=ue,d+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Dr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function ln(i){let e={};for(let t=0;t<i.length;t++){let n=Dr(i[t]);for(let r in n)e[r]=n[r]}return e}function em(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Bu(i){return i.getRenderTarget()===null?i.outputColorSpace:yt.workingColorSpace}var tm={clone:Dr,merge:ln},nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ri=class extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nm,this.fragmentShader=im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dr(e.uniforms),this.uniformsGroups=em(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ea=class extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Lt=class extends Ea{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pr*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(rs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,h=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/h,r*=a.width/c,n*=a.height/h}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},gr=-90,_r=1,fl=class extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Lt(gr,_r,e,t);r.layers=this.layers,this.add(r);let s=new Lt(gr,_r,e,t);s.layers=this.layers,this.add(s);let a=new Lt(gr,_r,e,t);a.layers=this.layers,this.add(a);let o=new Lt(gr,_r,e,t);o.layers=this.layers,this.add(o);let c=new Lt(gr,_r,e,t);c.layers=this.layers,this.add(c);let h=new Lt(gr,_r,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(let h of t)this.remove(h);if(e===jn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xa)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,h,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),S=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,h),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=S,n.texture.needsPMREMUpdate=!0}},Aa=class extends Qt{constructor(e,t,n,r,s,a,o,c,h,u){e=e!==void 0?e:[],t=t!==void 0?t:Er,super(e,t,n,r,s,a,o,c,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},dl=class extends ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(as("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Gi?St:Sn),this.texture=new Aa(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:yn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ds(5,5,5),s=new ri({name:"CubemapFromEquirect",uniforms:Dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:vi});s.uniforms.tEquirect.value=t;let a=new cn(r,s),o=t.minFilter;return t.minFilter===cs&&(t.minFilter=yn),new fl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},qo=new j,rm=new j,sm=new ut,In=class{constructor(e=new j(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=qo.subVectors(n,t).cross(rm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(qo),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sm.getNormalMatrix(e),r=this.coplanarPoint(qo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fi=new ni,ia=new j,ps=class{constructor(e=new In,t=new In,n=new In,r=new In,s=new In,a=new In){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=jn){let n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],S=r[9],y=r[10],m=r[11],l=r[12],v=r[13],g=r[14],_=r[15];if(n[0].setComponents(c-s,d-h,m-p,_-l).normalize(),n[1].setComponents(c+s,d+h,m+p,_+l).normalize(),n[2].setComponents(c+a,d+u,m+S,_+v).normalize(),n[3].setComponents(c-a,d-u,m-S,_-v).normalize(),n[4].setComponents(c-o,d-f,m-y,_-g).normalize(),t===jn)n[5].setComponents(c+o,d+f,m+y,_+g).normalize();else if(t===xa)n[5].setComponents(o,f,y,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ia.x=r.normal.x>0?e.max.x:e.min.x,ia.y=r.normal.y>0?e.max.y:e.min.y,ia.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ia)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function zu(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function am(i,e){let t=e.isWebGL2,n=new WeakMap;function r(h,u){let f=h.array,d=h.usage,p=f.byteLength,S=i.createBuffer();i.bindBuffer(u,S),i.bufferData(u,f,d),h.onUploadCallback();let y;if(f instanceof Float32Array)y=i.FLOAT;else if(f instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)y=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)y=i.SHORT;else if(f instanceof Uint32Array)y=i.UNSIGNED_INT;else if(f instanceof Int32Array)y=i.INT;else if(f instanceof Int8Array)y=i.BYTE;else if(f instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:S,type:y,bytesPerElement:f.BYTES_PER_ELEMENT,version:h.version,size:p}}function s(h,u,f){let d=u.array,p=u._updateRange,S=u.updateRanges;if(i.bindBuffer(f,h),p.count===-1&&S.length===0&&i.bufferSubData(f,0,d),S.length!==0){for(let y=0,m=S.length;y<m;y++){let l=S[y];t?i.bufferSubData(f,l.start*d.BYTES_PER_ELEMENT,d,l.start,l.count):i.bufferSubData(f,l.start*d.BYTES_PER_ELEMENT,d.subarray(l.start,l.start+l.count))}u.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(h){return h.isInterleavedBufferAttribute&&(h=h.data),n.get(h)}function o(h){h.isInterleavedBufferAttribute&&(h=h.data);let u=n.get(h);u&&(i.deleteBuffer(u.buffer),n.delete(h))}function c(h,u){if(h.isGLBufferAttribute){let d=n.get(h);(!d||d.version<h.version)&&n.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);let f=n.get(h);if(f===void 0)n.set(h,r(h,u));else if(f.version<h.version){if(f.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,h,u),f.version=h.version}}return{get:a,remove:o,update:c}}var pl=class i extends rn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),h=o+1,u=c+1,f=e/o,d=t/c,p=[],S=[],y=[],m=[];for(let l=0;l<u;l++){let v=l*d-a;for(let g=0;g<h;g++){let _=g*f-s;S.push(_,-v,0),y.push(0,0,1),m.push(g/o),m.push(1-l/c)}}for(let l=0;l<c;l++)for(let v=0;v<o;v++){let g=v+h*l,_=v+h*(l+1),b=v+1+h*(l+1),P=v+1+h*l;p.push(g,_,P),p.push(_,b,P)}this.setIndex(p),this.setAttribute("position",new Ct(S,3)),this.setAttribute("normal",new Ct(y,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,fm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ym=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Pm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Im=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Um=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,zm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,km=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ym=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Jm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Km=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$m=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,eg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ng=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ig=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ag=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,og=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ug=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,dg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,pg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_g=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Mg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,bg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Tg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ig=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Og=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ng=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$g=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,e0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,t0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,s0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,a0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,o0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,c0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,d0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,p0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,m0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,S0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,w0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,A0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,R0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,L0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,O0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,N0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,B0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,z0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:om,alphahash_pars_fragment:lm,alphamap_fragment:cm,alphamap_pars_fragment:hm,alphatest_fragment:um,alphatest_pars_fragment:fm,aomap_fragment:dm,aomap_pars_fragment:pm,batching_pars_vertex:mm,batching_vertex:gm,begin_vertex:_m,beginnormal_vertex:vm,bsdfs:ym,iridescence_fragment:xm,bumpmap_pars_fragment:Sm,clipping_planes_fragment:Mm,clipping_planes_pars_fragment:bm,clipping_planes_pars_vertex:Tm,clipping_planes_vertex:wm,color_fragment:Em,color_pars_fragment:Am,color_pars_vertex:Rm,color_vertex:Cm,common:Pm,cube_uv_reflection_fragment:Lm,defaultnormal_vertex:Im,displacementmap_pars_vertex:Dm,displacementmap_vertex:Um,emissivemap_fragment:Om,emissivemap_pars_fragment:Nm,colorspace_fragment:Fm,colorspace_pars_fragment:Bm,envmap_fragment:zm,envmap_common_pars_fragment:km,envmap_pars_fragment:Vm,envmap_pars_vertex:Hm,envmap_physical_pars_fragment:eg,envmap_vertex:Gm,fog_vertex:Wm,fog_pars_vertex:Xm,fog_fragment:Ym,fog_pars_fragment:qm,gradientmap_pars_fragment:Zm,lightmap_fragment:Jm,lightmap_pars_fragment:Km,lights_lambert_fragment:$m,lights_lambert_pars_fragment:jm,lights_pars_begin:Qm,lights_toon_fragment:tg,lights_toon_pars_fragment:ng,lights_phong_fragment:ig,lights_phong_pars_fragment:rg,lights_physical_fragment:sg,lights_physical_pars_fragment:ag,lights_fragment_begin:og,lights_fragment_maps:lg,lights_fragment_end:cg,logdepthbuf_fragment:hg,logdepthbuf_pars_fragment:ug,logdepthbuf_pars_vertex:fg,logdepthbuf_vertex:dg,map_fragment:pg,map_pars_fragment:mg,map_particle_fragment:gg,map_particle_pars_fragment:_g,metalnessmap_fragment:vg,metalnessmap_pars_fragment:yg,morphcolor_vertex:xg,morphnormal_vertex:Sg,morphtarget_pars_vertex:Mg,morphtarget_vertex:bg,normal_fragment_begin:Tg,normal_fragment_maps:wg,normal_pars_fragment:Eg,normal_pars_vertex:Ag,normal_vertex:Rg,normalmap_pars_fragment:Cg,clearcoat_normal_fragment_begin:Pg,clearcoat_normal_fragment_maps:Lg,clearcoat_pars_fragment:Ig,iridescence_pars_fragment:Dg,opaque_fragment:Ug,packing:Og,premultiplied_alpha_fragment:Ng,project_vertex:Fg,dithering_fragment:Bg,dithering_pars_fragment:zg,roughnessmap_fragment:kg,roughnessmap_pars_fragment:Vg,shadowmap_pars_fragment:Hg,shadowmap_pars_vertex:Gg,shadowmap_vertex:Wg,shadowmask_pars_fragment:Xg,skinbase_vertex:Yg,skinning_pars_vertex:qg,skinning_vertex:Zg,skinnormal_vertex:Jg,specularmap_fragment:Kg,specularmap_pars_fragment:$g,tonemapping_fragment:jg,tonemapping_pars_fragment:Qg,transmission_fragment:e0,transmission_pars_fragment:t0,uv_pars_fragment:n0,uv_pars_vertex:i0,uv_vertex:r0,worldpos_vertex:s0,background_vert:a0,background_frag:o0,backgroundCube_vert:l0,backgroundCube_frag:c0,cube_vert:h0,cube_frag:u0,depth_vert:f0,depth_frag:d0,distanceRGBA_vert:p0,distanceRGBA_frag:m0,equirect_vert:g0,equirect_frag:_0,linedashed_vert:v0,linedashed_frag:y0,meshbasic_vert:x0,meshbasic_frag:S0,meshlambert_vert:M0,meshlambert_frag:b0,meshmatcap_vert:T0,meshmatcap_frag:w0,meshnormal_vert:E0,meshnormal_frag:A0,meshphong_vert:R0,meshphong_frag:C0,meshphysical_vert:P0,meshphysical_frag:L0,meshtoon_vert:I0,meshtoon_frag:D0,points_vert:U0,points_frag:O0,shadow_vert:N0,shadow_frag:F0,sprite_vert:B0,sprite_frag:z0},Oe={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},Bn={basic:{uniforms:ln([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:ln([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Je(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:ln([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:ln([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:ln([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new Je(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:ln([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:ln([Oe.points,Oe.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:ln([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:ln([Oe.common,Oe.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:ln([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:ln([Oe.sprite,Oe.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:ln([Oe.common,Oe.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:ln([Oe.lights,Oe.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Bn.physical={uniforms:ln([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var ra={r:0,b:0,g:0};function k0(i,e,t,n,r,s,a){let o=new Je(0),c=s===!0?0:1,h,u,f=null,d=0,p=null;function S(m,l){let v=!1,g=l.isScene===!0?l.background:null;g&&g.isTexture&&(g=(l.backgroundBlurriness>0?t:e).get(g)),g===null?y(o,c):g&&g.isColor&&(y(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),g&&(g.isCubeTexture||g.mapping===qa)?(u===void 0&&(u=new cn(new ds(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:Dr(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=l.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,u.material.toneMapped=yt.getTransfer(g.colorSpace)!==Mt,(f!==g||d!==g.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,f=g,d=g.version,p=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(h===void 0&&(h=new cn(new pl(2,2),new ri({name:"BackgroundMaterial",uniforms:Dr(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(h)),h.material.uniforms.t2D.value=g,h.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,h.material.toneMapped=yt.getTransfer(g.colorSpace)!==Mt,g.matrixAutoUpdate===!0&&g.updateMatrix(),h.material.uniforms.uvTransform.value.copy(g.matrix),(f!==g||d!==g.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=g,d=g.version,p=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null))}function y(m,l){m.getRGB(ra,Bu(i)),n.buffers.color.setClear(ra.r,ra.g,ra.b,l,a)}return{getClearColor:function(){return o},setClearColor:function(m,l=1){o.set(m),c=l,y(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,y(o,c)},render:S}}function V0(i,e,t,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},c=m(null),h=c,u=!1;function f(V,q,ne,ae,ue){let me=!1;if(a){let fe=y(ae,ne,q);h!==fe&&(h=fe,p(h.object)),me=l(V,ae,ne,ue),me&&v(V,ae,ne,ue)}else{let fe=q.wireframe===!0;(h.geometry!==ae.id||h.program!==ne.id||h.wireframe!==fe)&&(h.geometry=ae.id,h.program=ne.id,h.wireframe=fe,me=!0)}ue!==null&&t.update(ue,i.ELEMENT_ARRAY_BUFFER),(me||u)&&(u=!1,z(V,q,ne,ae),ue!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(ue).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(V){return n.isWebGL2?i.bindVertexArray(V):s.bindVertexArrayOES(V)}function S(V){return n.isWebGL2?i.deleteVertexArray(V):s.deleteVertexArrayOES(V)}function y(V,q,ne){let ae=ne.wireframe===!0,ue=o[V.id];ue===void 0&&(ue={},o[V.id]=ue);let me=ue[q.id];me===void 0&&(me={},ue[q.id]=me);let fe=me[ae];return fe===void 0&&(fe=m(d()),me[ae]=fe),fe}function m(V){let q=[],ne=[],ae=[];for(let ue=0;ue<r;ue++)q[ue]=0,ne[ue]=0,ae[ue]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ne,attributeDivisors:ae,object:V,attributes:{},index:null}}function l(V,q,ne,ae){let ue=h.attributes,me=q.attributes,fe=0,Me=ne.getAttributes();for(let Le in Me)if(Me[Le].location>=0){let ye=ue[Le],Pe=me[Le];if(Pe===void 0&&(Le==="instanceMatrix"&&V.instanceMatrix&&(Pe=V.instanceMatrix),Le==="instanceColor"&&V.instanceColor&&(Pe=V.instanceColor)),ye===void 0||ye.attribute!==Pe||Pe&&ye.data!==Pe.data)return!0;fe++}return h.attributesNum!==fe||h.index!==ae}function v(V,q,ne,ae){let ue={},me=q.attributes,fe=0,Me=ne.getAttributes();for(let Le in Me)if(Me[Le].location>=0){let ye=me[Le];ye===void 0&&(Le==="instanceMatrix"&&V.instanceMatrix&&(ye=V.instanceMatrix),Le==="instanceColor"&&V.instanceColor&&(ye=V.instanceColor));let Pe={};Pe.attribute=ye,ye&&ye.data&&(Pe.data=ye.data),ue[Le]=Pe,fe++}h.attributes=ue,h.attributesNum=fe,h.index=ae}function g(){let V=h.newAttributes;for(let q=0,ne=V.length;q<ne;q++)V[q]=0}function _(V){b(V,0)}function b(V,q){let ne=h.newAttributes,ae=h.enabledAttributes,ue=h.attributeDivisors;ne[V]=1,ae[V]===0&&(i.enableVertexAttribArray(V),ae[V]=1),ue[V]!==q&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,q),ue[V]=q)}function P(){let V=h.newAttributes,q=h.enabledAttributes;for(let ne=0,ae=q.length;ne<ae;ne++)q[ne]!==V[ne]&&(i.disableVertexAttribArray(ne),q[ne]=0)}function I(V,q,ne,ae,ue,me,fe){fe===!0?i.vertexAttribIPointer(V,q,ne,ue,me):i.vertexAttribPointer(V,q,ne,ae,ue,me)}function z(V,q,ne,ae){if(n.isWebGL2===!1&&(V.isInstancedMesh||ae.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();let ue=ae.attributes,me=ne.getAttributes(),fe=q.defaultAttributeValues;for(let Me in me){let Le=me[Me];if(Le.location>=0){let le=ue[Me];if(le===void 0&&(Me==="instanceMatrix"&&V.instanceMatrix&&(le=V.instanceMatrix),Me==="instanceColor"&&V.instanceColor&&(le=V.instanceColor)),le!==void 0){let ye=le.normalized,Pe=le.itemSize,Ne=t.get(le);if(Ne===void 0)continue;let Ve=Ne.buffer,Ke=Ne.type,Qe=Ne.bytesPerElement,He=n.isWebGL2===!0&&(Ke===i.INT||Ke===i.UNSIGNED_INT||le.gpuType===Au);if(le.isInterleavedBufferAttribute){let Ye=le.data,re=Ye.stride,et=le.offset;if(Ye.isInstancedInterleavedBuffer){for(let Fe=0;Fe<Le.locationSize;Fe++)b(Le.location+Fe,Ye.meshPerAttribute);V.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=Ye.meshPerAttribute*Ye.count)}else for(let Fe=0;Fe<Le.locationSize;Fe++)_(Le.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,Ve);for(let Fe=0;Fe<Le.locationSize;Fe++)I(Le.location+Fe,Pe/Le.locationSize,Ke,ye,re*Qe,(et+Pe/Le.locationSize*Fe)*Qe,He)}else{if(le.isInstancedBufferAttribute){for(let Ye=0;Ye<Le.locationSize;Ye++)b(Le.location+Ye,le.meshPerAttribute);V.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Ye=0;Ye<Le.locationSize;Ye++)_(Le.location+Ye);i.bindBuffer(i.ARRAY_BUFFER,Ve);for(let Ye=0;Ye<Le.locationSize;Ye++)I(Le.location+Ye,Pe/Le.locationSize,Ke,ye,Pe*Qe,Pe/Le.locationSize*Ye*Qe,He)}}else if(fe!==void 0){let ye=fe[Me];if(ye!==void 0)switch(ye.length){case 2:i.vertexAttrib2fv(Le.location,ye);break;case 3:i.vertexAttrib3fv(Le.location,ye);break;case 4:i.vertexAttrib4fv(Le.location,ye);break;default:i.vertexAttrib1fv(Le.location,ye)}}}}P()}function C(){K();for(let V in o){let q=o[V];for(let ne in q){let ae=q[ne];for(let ue in ae)S(ae[ue].object),delete ae[ue];delete q[ne]}delete o[V]}}function D(V){if(o[V.id]===void 0)return;let q=o[V.id];for(let ne in q){let ae=q[ne];for(let ue in ae)S(ae[ue].object),delete ae[ue];delete q[ne]}delete o[V.id]}function Z(V){for(let q in o){let ne=o[q];if(ne[V.id]===void 0)continue;let ae=ne[V.id];for(let ue in ae)S(ae[ue].object),delete ae[ue];delete ne[V.id]}}function K(){ie(),u=!0,h!==c&&(h=c,p(h.object))}function ie(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:K,resetDefaultState:ie,dispose:C,releaseStatesOfGeometry:D,releaseStatesOfProgram:Z,initAttributes:g,enableAttribute:_,disableUnusedAttributes:P}}function H0(i,e,t,n){let r=n.isWebGL2,s;function a(u){s=u}function o(u,f){i.drawArrays(s,u,f),t.update(f,s,1)}function c(u,f,d){if(d===0)return;let p,S;if(r)p=i,S="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),S="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[S](s,u,f,d),t.update(f,s,d)}function h(u,f,d){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let S=0;S<d;S++)this.render(u[S],f[S]);else{p.multiDrawArraysWEBGL(s,u,0,f,0,d);let S=0;for(let y=0;y<d;y++)S+=f[y];t.update(S,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=h}function G0(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let h=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),S=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),y=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),l=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),g=d>0,_=a||e.has("OES_texture_float"),b=g&&_,P=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:h,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:m,maxVaryings:l,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:_,floatVertexTextures:b,maxSamples:P}}function W0(i){let e=this,t=null,n=0,r=!1,s=!1,a=new In,o=new ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let p=f.length!==0||d||n!==0||r;return r=d,n=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){let S=f.clippingPlanes,y=f.clipIntersection,m=f.clipShadows,l=i.get(f);if(!r||S===null||S.length===0||s&&!m)s?u(null):h();else{let v=s?0:n,g=v*4,_=l.clippingState||null;c.value=_,_=u(S,d,g,p);for(let b=0;b!==g;++b)_[b]=t[b];l.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function h(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,p,S){let y=f!==null?f.length:0,m=null;if(y!==0){if(m=c.value,S!==!0||m===null){let l=p+y*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<l)&&(m=new Float32Array(l));for(let g=0,_=p;g!==y;++g,_+=4)a.copy(f[g]).applyMatrix4(v,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function X0(i){let e=new WeakMap;function t(a,o){return o===ls?a.mapping=Er:o===al&&(a.mapping=Ar),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===ls||o===al)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let h=new dl(c.height/2);return h.fromEquirectangularTexture(i,a),e.set(a,h),a.addEventListener("dispose",r),t(h.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Ur=class extends Ea{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,a=s+h*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Sr=4,Fh=[.125,.215,.35,.446,.526,.582],ki=20,Zo=new Ur,Bh=new Je,Jo=null,Ko=0,$o=0,Bi=(1+Math.sqrt(5))/2,vr=1/Bi,zh=[new j(1,1,1),new j(-1,1,1),new j(1,1,-1),new j(-1,1,-1),new j(0,Bi,vr),new j(0,Bi,-vr),new j(vr,0,Bi),new j(-vr,0,Bi),new j(Bi,vr,0),new j(-Bi,vr,0)],Ra=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Jo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jo,Ko,$o),e.scissorTest=!1,sa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Er||e.mapping===Ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:hs,format:xn,colorSpace:ei,depthBuffer:!1},r=kh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y0(s)),this._blurMaterial=q0(s,e,t)}return r}_compileMaterial(e){let t=new cn(this._lodPlanes[0],e);this._renderer.compile(t,Zo)}_sceneToCubeUV(e,t,n,r){let o=new Lt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Bh),u.toneMapping=yi,u.autoClear=!1;let p=new Lr({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),S=new cn(new ds,p),y=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(Bh),y=!0);for(let l=0;l<6;l++){let v=l%3;v===0?(o.up.set(0,c[l],0),o.lookAt(h[l],0,0)):v===1?(o.up.set(0,0,c[l]),o.lookAt(0,h[l],0)):(o.up.set(0,c[l],0),o.lookAt(0,0,h[l]));let g=this._cubeSize;sa(r,v*g,l>2?g:0,g,g),u.setRenderTarget(r),y&&u.render(S,o),u.render(e,o)}S.geometry.dispose(),S.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Er||e.mapping===Ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vh());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new cn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;sa(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Zo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zh[(r-1)%zh.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let c=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,f=new cn(this._lodPlanes[r],h),d=h.uniforms,p=this._sizeLods[n]-1,S=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ki-1),y=s/S,m=isFinite(s)?1+Math.floor(u*y):ki;m>ki&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ki}`);let l=[],v=0;for(let I=0;I<ki;++I){let z=I/y,C=Math.exp(-z*z/2);l.push(C),I===0?v+=C:I<m&&(v+=2*C)}for(let I=0;I<l.length;I++)l[I]=l[I]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=l,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:g}=this;d.dTheta.value=S,d.mipInt.value=g-n;let _=this._sizeLods[r],b=3*_*(r>g-Sr?r-g+Sr:0),P=4*(this._cubeSize-_);sa(t,b,P,3*_,2*_),c.setRenderTarget(t),c.render(f,Zo)}};function Y0(i){let e=[],t=[],n=[],r=i,s=i-Sr+1+Fh.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);t.push(o);let c=1/o;a>i-Sr?c=Fh[a-i+Sr-1]:a===0&&(c=0),n.push(c);let h=1/(o-2),u=-h,f=1+h,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,S=6,y=3,m=2,l=1,v=new Float32Array(y*S*p),g=new Float32Array(m*S*p),_=new Float32Array(l*S*p);for(let P=0;P<p;P++){let I=P%3*2/3-1,z=P>2?0:-1,C=[I,z,0,I+2/3,z,0,I+2/3,z+1,0,I,z,0,I+2/3,z+1,0,I,z+1,0];v.set(C,y*S*P),g.set(d,m*S*P);let D=[P,P,P,P,P,P];_.set(D,l*S*P)}let b=new rn;b.setAttribute("position",new Mn(v,y)),b.setAttribute("uv",new Mn(g,m)),b.setAttribute("faceIndex",new Mn(_,l)),e.push(b),r>Sr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function kh(i,e,t){let n=new ti(i,e,t);return n.texture.mapping=qa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sa(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function q0(i,e,t){let n=new Float32Array(ki),r=new j(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Vh(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Hh(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function ql(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Z0(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,h=c===ls||c===al,u=c===Er||c===Ar;if(h||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new Ra(i)),f=h?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{let f=o.image;if(h&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new Ra(i));let d=h?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0,h=6;for(let u=0;u<h;u++)o[u]!==void 0&&c++;return c===h}function s(o){let c=o.target;c.removeEventListener("dispose",s);let h=e.get(c);h!==void 0&&(e.delete(c),h.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function J0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function K0(i,e,t,n){let r={},s=new WeakMap;function a(f){let d=f.target;d.index!==null&&e.remove(d.index);for(let S in d.attributes)e.remove(d.attributes[S]);for(let S in d.morphAttributes){let y=d.morphAttributes[S];for(let m=0,l=y.length;m<l;m++)e.remove(y[m])}d.removeEventListener("dispose",a),delete r[d.id];let p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){let d=f.attributes;for(let S in d)e.update(d[S],i.ARRAY_BUFFER);let p=f.morphAttributes;for(let S in p){let y=p[S];for(let m=0,l=y.length;m<l;m++)e.update(y[m],i.ARRAY_BUFFER)}}function h(f){let d=[],p=f.index,S=f.attributes.position,y=0;if(p!==null){let v=p.array;y=p.version;for(let g=0,_=v.length;g<_;g+=3){let b=v[g+0],P=v[g+1],I=v[g+2];d.push(b,P,P,I,I,b)}}else if(S!==void 0){let v=S.array;y=S.version;for(let g=0,_=v.length/3-1;g<_;g+=3){let b=g+0,P=g+1,I=g+2;d.push(b,P,P,I,I,b)}}else return;let m=new(Nu(d)?wa:Ir)(d,1);m.version=y;let l=s.get(f);l&&e.remove(l),s.set(f,m)}function u(f){let d=s.get(f);if(d){let p=f.index;p!==null&&d.version<p.version&&h(f)}else h(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function $0(i,e,t,n){let r=n.isWebGL2,s;function a(p){s=p}let o,c;function h(p){o=p.type,c=p.bytesPerElement}function u(p,S){i.drawElements(s,S,o,p*c),t.update(S,s,1)}function f(p,S,y){if(y===0)return;let m,l;if(r)m=i,l="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),l="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[l](s,S,o,p*c,y),t.update(S,s,y)}function d(p,S,y){if(y===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let l=0;l<y;l++)this.render(p[l]/c,S[l]);else{m.multiDrawElementsWEBGL(s,S,0,o,p,0,y);let l=0;for(let v=0;v<y;v++)l+=S[v];t.update(l,s,1)}}this.setMode=a,this.setIndex=h,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function j0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Q0(i,e){return i[0]-e[0]}function e_(i,e){return Math.abs(e[1])-Math.abs(i[1])}function t_(i,e,t){let n={},r=new Float32Array(8),s=new WeakMap,a=new pt,o=[];for(let h=0;h<8;h++)o[h]=[h,0];function c(h,u,f){let d=h.morphTargetInfluences;if(e.isWebGL2===!0){let p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,S=p!==void 0?p.length:0,y=s.get(u);if(y===void 0||y.count!==S){let V=function(){K.dispose(),s.delete(u),u.removeEventListener("dispose",V)};y!==void 0&&y.texture.dispose();let v=u.morphAttributes.position!==void 0,g=u.morphAttributes.normal!==void 0,_=u.morphAttributes.color!==void 0,b=u.morphAttributes.position||[],P=u.morphAttributes.normal||[],I=u.morphAttributes.color||[],z=0;v===!0&&(z=1),g===!0&&(z=2),_===!0&&(z=3);let C=u.attributes.position.count*z,D=1;C>e.maxTextureSize&&(D=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);let Z=new Float32Array(C*D*4*S),K=new Ta(Z,C,D,S);K.type=$n,K.needsUpdate=!0;let ie=z*4;for(let q=0;q<S;q++){let ne=b[q],ae=P[q],ue=I[q],me=C*D*4*q;for(let fe=0;fe<ne.count;fe++){let Me=fe*ie;v===!0&&(a.fromBufferAttribute(ne,fe),Z[me+Me+0]=a.x,Z[me+Me+1]=a.y,Z[me+Me+2]=a.z,Z[me+Me+3]=0),g===!0&&(a.fromBufferAttribute(ae,fe),Z[me+Me+4]=a.x,Z[me+Me+5]=a.y,Z[me+Me+6]=a.z,Z[me+Me+7]=0),_===!0&&(a.fromBufferAttribute(ue,fe),Z[me+Me+8]=a.x,Z[me+Me+9]=a.y,Z[me+Me+10]=a.z,Z[me+Me+11]=ue.itemSize===4?a.w:1)}}y={count:S,texture:K,size:new nt(C,D)},s.set(u,y),u.addEventListener("dispose",V)}let m=0;for(let v=0;v<d.length;v++)m+=d[v];let l=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(i,"morphTargetBaseInfluence",l),f.getUniforms().setValue(i,"morphTargetInfluences",d),f.getUniforms().setValue(i,"morphTargetsTexture",y.texture,t),f.getUniforms().setValue(i,"morphTargetsTextureSize",y.size)}else{let p=d===void 0?0:d.length,S=n[u.id];if(S===void 0||S.length!==p){S=[];for(let g=0;g<p;g++)S[g]=[g,0];n[u.id]=S}for(let g=0;g<p;g++){let _=S[g];_[0]=g,_[1]=d[g]}S.sort(e_);for(let g=0;g<8;g++)g<p&&S[g][1]?(o[g][0]=S[g][0],o[g][1]=S[g][1]):(o[g][0]=Number.MAX_SAFE_INTEGER,o[g][1]=0);o.sort(Q0);let y=u.morphAttributes.position,m=u.morphAttributes.normal,l=0;for(let g=0;g<8;g++){let _=o[g],b=_[0],P=_[1];b!==Number.MAX_SAFE_INTEGER&&P?(y&&u.getAttribute("morphTarget"+g)!==y[b]&&u.setAttribute("morphTarget"+g,y[b]),m&&u.getAttribute("morphNormal"+g)!==m[b]&&u.setAttribute("morphNormal"+g,m[b]),r[g]=P,l+=P):(y&&u.hasAttribute("morphTarget"+g)===!0&&u.deleteAttribute("morphTarget"+g),m&&u.hasAttribute("morphNormal"+g)===!0&&u.deleteAttribute("morphNormal"+g),r[g]=0)}let v=u.morphTargetsRelative?1:1-l;f.getUniforms().setValue(i,"morphTargetBaseInfluence",v),f.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function n_(i,e,t,n){let r=new WeakMap;function s(c){let h=n.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function o(c){let h=c.target;h.removeEventListener("dispose",o),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:a}}var Ca=class extends Qt{constructor(e,t,n,r,s,a,o,c,h,u){if(u=u!==void 0?u:Hi,u!==Hi&&u!==Cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Hi&&(n=_i),n===void 0&&u===Cr&&(n=Vi),super(null,r,s,a,o,c,u,n,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:jt,this.minFilter=c!==void 0?c:jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ku=new Qt,Vu=new Ca(1,1);Vu.compareFunction=Ou;var Hu=new Ta,Gu=new ul,Wu=new Aa,Gh=[],Wh=[],Xh=new Float32Array(16),Yh=new Float32Array(9),qh=new Float32Array(4);function Vr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Gh[r];if(s===void 0&&(s=new Float32Array(r),Gh[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ka(i,e){let t=Wh[e];t===void 0&&(t=new Int32Array(e),Wh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function i_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function r_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function s_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function a_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function o_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;qh.set(n),i.uniformMatrix2fv(this.addr,!1,qh),Vt(t,n)}}function l_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;Yh.set(n),i.uniformMatrix3fv(this.addr,!1,Yh),Vt(t,n)}}function c_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;Xh.set(n),i.uniformMatrix4fv(this.addr,!1,Xh),Vt(t,n)}}function h_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function u_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function f_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function d_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function p_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function m_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function g_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function __(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function v_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s=this.type===i.SAMPLER_2D_SHADOW?Vu:ku;t.setTexture2D(e||s,r)}function y_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Gu,r)}function x_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Wu,r)}function S_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Hu,r)}function M_(i){switch(i){case 5126:return i_;case 35664:return r_;case 35665:return s_;case 35666:return a_;case 35674:return o_;case 35675:return l_;case 35676:return c_;case 5124:case 35670:return h_;case 35667:case 35671:return u_;case 35668:case 35672:return f_;case 35669:case 35673:return d_;case 5125:return p_;case 36294:return m_;case 36295:return g_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return v_;case 35679:case 36299:case 36307:return y_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return S_}}function b_(i,e){i.uniform1fv(this.addr,e)}function T_(i,e){let t=Vr(e,this.size,2);i.uniform2fv(this.addr,t)}function w_(i,e){let t=Vr(e,this.size,3);i.uniform3fv(this.addr,t)}function E_(i,e){let t=Vr(e,this.size,4);i.uniform4fv(this.addr,t)}function A_(i,e){let t=Vr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function R_(i,e){let t=Vr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function C_(i,e){let t=Vr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function P_(i,e){i.uniform1iv(this.addr,e)}function L_(i,e){i.uniform2iv(this.addr,e)}function I_(i,e){i.uniform3iv(this.addr,e)}function D_(i,e){i.uniform4iv(this.addr,e)}function U_(i,e){i.uniform1uiv(this.addr,e)}function O_(i,e){i.uniform2uiv(this.addr,e)}function N_(i,e){i.uniform3uiv(this.addr,e)}function F_(i,e){i.uniform4uiv(this.addr,e)}function B_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||ku,s[a])}function z_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Gu,s[a])}function k_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Wu,s[a])}function V_(i,e,t){let n=this.cache,r=e.length,s=Ka(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Hu,s[a])}function H_(i){switch(i){case 5126:return b_;case 35664:return T_;case 35665:return w_;case 35666:return E_;case 35674:return A_;case 35675:return R_;case 35676:return C_;case 5124:case 35670:return P_;case 35667:case 35671:return L_;case 35668:case 35672:return I_;case 35669:case 35673:return D_;case 5125:return U_;case 36294:return O_;case 36295:return N_;case 36296:return F_;case 35678:case 36198:case 36298:case 36306:case 35682:return B_;case 35679:case 36299:case 36307:return z_;case 35680:case 36300:case 36308:case 36293:return k_;case 36289:case 36303:case 36311:case 36292:return V_}}var ml=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=M_(t.type)}},gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=H_(t.type)}},_l=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},jo=/(\w+)(\])?(\[|\.)?/g;function Zh(i,e){i.seq.push(e),i.map[e.id]=e}function G_(i,e,t){let n=i.name,r=n.length;for(jo.lastIndex=0;;){let s=jo.exec(n),a=jo.lastIndex,o=s[1],c=s[2]==="]",h=s[3];if(c&&(o=o|0),h===void 0||h==="["&&a+2===r){Zh(t,h===void 0?new ml(o,i,e):new gl(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new _l(o),Zh(t,f)),t=f}}}var wr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);G_(s,a,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Jh(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var W_=37297,X_=0;function Y_(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function q_(i){let e=yt.getPrimaries(yt.workingColorSpace),t=yt.getPrimaries(i),n;switch(e===t?n="":e===ya&&t===va?n="LinearDisplayP3ToLinearSRGB":e===va&&t===ya&&(n="LinearSRGBToLinearDisplayP3"),i){case ei:case Ja:return[n,"LinearTransferOETF"];case St:case Xl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Kh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Y_(i.getShaderSource(e),a)}else return r}function Z_(i,e){let t=q_(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function J_(i,e){let t;switch(e){case ep:t="Linear";break;case tp:t="Reinhard";break;case np:t="OptimizedCineon";break;case Gl:t="ACESFilmic";break;case ip:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function K_(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(is).join(`
`)}function $_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function j_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function is(i){return i!==""}function $h(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(i){return i.replace(Q_,tv)}var ev=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function tv(i,e){let t=ht[e];if(t===void 0){let n=ev.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return vl(t)}var nv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qh(i){return i.replace(nv,iv)}function iv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eu(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function rv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===wu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Rd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function sv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Er:case Ar:e="ENVMAP_TYPE_CUBE";break;case qa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function av(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ar:e="ENVMAP_MODE_REFRACTION";break}return e}function ov(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ya:e="ENVMAP_BLENDING_MULTIPLY";break;case jd:e="ENVMAP_BLENDING_MIX";break;case Qd:e="ENVMAP_BLENDING_ADD";break}return e}function lv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function cv(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=rv(t),h=sv(t),u=av(t),f=ov(t),d=lv(t),p=t.isWebGL2?"":K_(t),S=$_(s),y=r.createProgram(),m,l,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(is).join(`
`),m.length>0&&(m+=`
`),l=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(is).join(`
`),l.length>0&&(l+=`
`)):(m=[eu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),l=[p,eu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?ht.tonemapping_pars_fragment:"",t.toneMapping!==yi?J_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Z_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(is).join(`
`)),a=vl(a),a=$h(a,t),a=jh(a,t),o=vl(o),o=$h(o,t),o=jh(o,t),a=Qh(a),o=Qh(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,l=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);let g=v+m+a,_=v+l+o,b=Jh(r,r.VERTEX_SHADER,g),P=Jh(r,r.FRAGMENT_SHADER,_);r.attachShader(y,b),r.attachShader(y,P),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function I(Z){if(i.debug.checkShaderErrors){let K=r.getProgramInfoLog(y).trim(),ie=r.getShaderInfoLog(b).trim(),V=r.getShaderInfoLog(P).trim(),q=!0,ne=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,b,P);else{let ae=Kh(r,b,"vertex"),ue=Kh(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Program Info Log: `+K+`
`+ae+`
`+ue)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(ie===""||V==="")&&(ne=!1);ne&&(Z.diagnostics={runnable:q,programLog:K,vertexShader:{log:ie,prefix:m},fragmentShader:{log:V,prefix:l}})}r.deleteShader(b),r.deleteShader(P),z=new wr(r,y),C=j_(r,y)}let z;this.getUniforms=function(){return z===void 0&&I(this),z};let C;this.getAttributes=function(){return C===void 0&&I(this),C};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(y,W_)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=X_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=b,this.fragmentShader=P,this}var hv=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new xl(e),t.set(e,n)),n}},xl=class{constructor(e){this.id=hv++,this.code=e,this.usedTimes=0}};function uv(i,e,t,n,r,s,a){let o=new fs,c=new yl,h=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures,p=r.precision,S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(C){return C===0?"uv":`uv${C}`}function m(C,D,Z,K,ie){let V=K.fog,q=ie.geometry,ne=C.isMeshStandardMaterial?K.environment:null,ae=(C.isMeshStandardMaterial?t:e).get(C.envMap||ne),ue=ae&&ae.mapping===qa?ae.image.height:null,me=S[C.type];C.precision!==null&&(p=r.getMaxPrecision(C.precision),p!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",p,"instead."));let fe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Me=fe!==void 0?fe.length:0,Le=0;q.morphAttributes.position!==void 0&&(Le=1),q.morphAttributes.normal!==void 0&&(Le=2),q.morphAttributes.color!==void 0&&(Le=3);let le,ye,Pe,Ne;if(me){let Ht=Bn[me];le=Ht.vertexShader,ye=Ht.fragmentShader}else le=C.vertexShader,ye=C.fragmentShader,c.update(C),Pe=c.getVertexShaderID(C),Ne=c.getFragmentShaderID(C);let Ve=i.getRenderTarget(),Ke=ie.isInstancedMesh===!0,Qe=ie.isBatchedMesh===!0,He=!!C.map,Ye=!!C.matcap,re=!!ae,et=!!C.aoMap,Fe=!!C.lightMap,at=!!C.bumpMap,Xe=!!C.normalMap,mt=!!C.displacementMap,$e=!!C.emissiveMap,E=!!C.metalnessMap,O=!!C.roughnessMap,F=C.anisotropy>0,W=C.clearcoat>0,L=C.iridescence>0,A=C.sheen>0,G=C.transmission>0,X=F&&!!C.anisotropyMap,oe=W&&!!C.clearcoatMap,se=W&&!!C.clearcoatNormalMap,pe=W&&!!C.clearcoatRoughnessMap,he=L&&!!C.iridescenceMap,we=L&&!!C.iridescenceThicknessMap,H=A&&!!C.sheenColorMap,_e=A&&!!C.sheenRoughnessMap,ve=!!C.specularMap,qe=!!C.specularColorMap,Ue=!!C.specularIntensityMap,Ze=G&&!!C.transmissionMap,Ie=G&&!!C.thicknessMap,ze=!!C.gradientMap,it=!!C.alphaMap,te=C.alphaTest>0,Ce=!!C.alphaHash,Ee=!!C.extensions,ge=!!q.attributes.uv1,Ae=!!q.attributes.uv2,Ge=!!q.attributes.uv3,lt=yi;return C.toneMapped&&(Ve===null||Ve.isXRRenderTarget===!0)&&(lt=i.toneMapping),{isWebGL2:u,shaderID:me,shaderType:C.type,shaderName:C.name,vertexShader:le,fragmentShader:ye,defines:C.defines,customVertexShaderID:Pe,customFragmentShaderID:Ne,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:p,batching:Qe,instancing:Ke,instancingColor:Ke&&ie.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Ve===null?i.outputColorSpace:Ve.isXRRenderTarget===!0?Ve.texture.colorSpace:ei,map:He,matcap:Ye,envMap:re,envMapMode:re&&ae.mapping,envMapCubeUVHeight:ue,aoMap:et,lightMap:Fe,bumpMap:at,normalMap:Xe,displacementMap:d&&mt,emissiveMap:$e,normalMapObjectSpace:Xe&&C.normalMapType===_p,normalMapTangentSpace:Xe&&C.normalMapType===Za,metalnessMap:E,roughnessMap:O,anisotropy:F,anisotropyMap:X,clearcoat:W,clearcoatMap:oe,clearcoatNormalMap:se,clearcoatRoughnessMap:pe,iridescence:L,iridescenceMap:he,iridescenceThicknessMap:we,sheen:A,sheenColorMap:H,sheenRoughnessMap:_e,specularMap:ve,specularColorMap:qe,specularIntensityMap:Ue,transmission:G,transmissionMap:Ze,thicknessMap:Ie,gradientMap:ze,opaque:C.transparent===!1&&C.blending===br,alphaMap:it,alphaTest:te,alphaHash:Ce,combine:C.combine,mapUv:He&&y(C.map.channel),aoMapUv:et&&y(C.aoMap.channel),lightMapUv:Fe&&y(C.lightMap.channel),bumpMapUv:at&&y(C.bumpMap.channel),normalMapUv:Xe&&y(C.normalMap.channel),displacementMapUv:mt&&y(C.displacementMap.channel),emissiveMapUv:$e&&y(C.emissiveMap.channel),metalnessMapUv:E&&y(C.metalnessMap.channel),roughnessMapUv:O&&y(C.roughnessMap.channel),anisotropyMapUv:X&&y(C.anisotropyMap.channel),clearcoatMapUv:oe&&y(C.clearcoatMap.channel),clearcoatNormalMapUv:se&&y(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&y(C.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&y(C.iridescenceMap.channel),iridescenceThicknessMapUv:we&&y(C.iridescenceThicknessMap.channel),sheenColorMapUv:H&&y(C.sheenColorMap.channel),sheenRoughnessMapUv:_e&&y(C.sheenRoughnessMap.channel),specularMapUv:ve&&y(C.specularMap.channel),specularColorMapUv:qe&&y(C.specularColorMap.channel),specularIntensityMapUv:Ue&&y(C.specularIntensityMap.channel),transmissionMapUv:Ze&&y(C.transmissionMap.channel),thicknessMapUv:Ie&&y(C.thicknessMap.channel),alphaMapUv:it&&y(C.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Xe||F),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,vertexUv1s:ge,vertexUv2s:Ae,vertexUv3s:Ge,pointsUvs:ie.isPoints===!0&&!!q.attributes.uv&&(He||it),fog:!!V,useFog:C.fog===!0,fogExp2:V&&V.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ie.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Le,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:C.dithering,shadowMapEnabled:i.shadowMap.enabled&&Z.length>0,shadowMapType:i.shadowMap.type,toneMapping:lt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:He&&C.map.isVideoTexture===!0&&yt.getTransfer(C.map.colorSpace)===Mt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Kn,flipSided:C.side===dn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:Ee&&C.extensions.derivatives===!0,extensionFragDepth:Ee&&C.extensions.fragDepth===!0,extensionDrawBuffers:Ee&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ee&&C.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function l(C){let D=[];if(C.shaderID?D.push(C.shaderID):(D.push(C.customVertexShaderID),D.push(C.customFragmentShaderID)),C.defines!==void 0)for(let Z in C.defines)D.push(Z),D.push(C.defines[Z]);return C.isRawShaderMaterial===!1&&(v(D,C),g(D,C),D.push(i.outputColorSpace)),D.push(C.customProgramCacheKey),D.join()}function v(C,D){C.push(D.precision),C.push(D.outputColorSpace),C.push(D.envMapMode),C.push(D.envMapCubeUVHeight),C.push(D.mapUv),C.push(D.alphaMapUv),C.push(D.lightMapUv),C.push(D.aoMapUv),C.push(D.bumpMapUv),C.push(D.normalMapUv),C.push(D.displacementMapUv),C.push(D.emissiveMapUv),C.push(D.metalnessMapUv),C.push(D.roughnessMapUv),C.push(D.anisotropyMapUv),C.push(D.clearcoatMapUv),C.push(D.clearcoatNormalMapUv),C.push(D.clearcoatRoughnessMapUv),C.push(D.iridescenceMapUv),C.push(D.iridescenceThicknessMapUv),C.push(D.sheenColorMapUv),C.push(D.sheenRoughnessMapUv),C.push(D.specularMapUv),C.push(D.specularColorMapUv),C.push(D.specularIntensityMapUv),C.push(D.transmissionMapUv),C.push(D.thicknessMapUv),C.push(D.combine),C.push(D.fogExp2),C.push(D.sizeAttenuation),C.push(D.morphTargetsCount),C.push(D.morphAttributeCount),C.push(D.numDirLights),C.push(D.numPointLights),C.push(D.numSpotLights),C.push(D.numSpotLightMaps),C.push(D.numHemiLights),C.push(D.numRectAreaLights),C.push(D.numDirLightShadows),C.push(D.numPointLightShadows),C.push(D.numSpotLightShadows),C.push(D.numSpotLightShadowsWithMaps),C.push(D.numLightProbes),C.push(D.shadowMapType),C.push(D.toneMapping),C.push(D.numClippingPlanes),C.push(D.numClipIntersection),C.push(D.depthPacking)}function g(C,D){o.disableAll(),D.isWebGL2&&o.enable(0),D.supportsVertexTextures&&o.enable(1),D.instancing&&o.enable(2),D.instancingColor&&o.enable(3),D.matcap&&o.enable(4),D.envMap&&o.enable(5),D.normalMapObjectSpace&&o.enable(6),D.normalMapTangentSpace&&o.enable(7),D.clearcoat&&o.enable(8),D.iridescence&&o.enable(9),D.alphaTest&&o.enable(10),D.vertexColors&&o.enable(11),D.vertexAlphas&&o.enable(12),D.vertexUv1s&&o.enable(13),D.vertexUv2s&&o.enable(14),D.vertexUv3s&&o.enable(15),D.vertexTangents&&o.enable(16),D.anisotropy&&o.enable(17),D.alphaHash&&o.enable(18),D.batching&&o.enable(19),C.push(o.mask),o.disableAll(),D.fog&&o.enable(0),D.useFog&&o.enable(1),D.flatShading&&o.enable(2),D.logarithmicDepthBuffer&&o.enable(3),D.skinning&&o.enable(4),D.morphTargets&&o.enable(5),D.morphNormals&&o.enable(6),D.morphColors&&o.enable(7),D.premultipliedAlpha&&o.enable(8),D.shadowMapEnabled&&o.enable(9),D.useLegacyLights&&o.enable(10),D.doubleSided&&o.enable(11),D.flipSided&&o.enable(12),D.useDepthPacking&&o.enable(13),D.dithering&&o.enable(14),D.transmission&&o.enable(15),D.sheen&&o.enable(16),D.opaque&&o.enable(17),D.pointsUvs&&o.enable(18),D.decodeVideoTexture&&o.enable(19),C.push(o.mask)}function _(C){let D=S[C.type],Z;if(D){let K=Bn[D];Z=tm.clone(K.uniforms)}else Z=C.uniforms;return Z}function b(C,D){let Z;for(let K=0,ie=h.length;K<ie;K++){let V=h[K];if(V.cacheKey===D){Z=V,++Z.usedTimes;break}}return Z===void 0&&(Z=new cv(i,D,C,s),h.push(Z)),Z}function P(C){if(--C.usedTimes===0){let D=h.indexOf(C);h[D]=h[h.length-1],h.pop(),C.destroy()}}function I(C){c.remove(C)}function z(){c.dispose()}return{getParameters:m,getProgramCacheKey:l,getUniforms:_,acquireProgram:b,releaseProgram:P,releaseShaderCache:I,programs:h,dispose:z}}function fv(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function dv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function tu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function nu(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(f,d,p,S,y,m){let l=i[e];return l===void 0?(l={id:f.id,object:f,geometry:d,material:p,groupOrder:S,renderOrder:f.renderOrder,z:y,group:m},i[e]=l):(l.id=f.id,l.object=f,l.geometry=d,l.material=p,l.groupOrder=S,l.renderOrder=f.renderOrder,l.z=y,l.group=m),e++,l}function o(f,d,p,S,y,m){let l=a(f,d,p,S,y,m);p.transmission>0?n.push(l):p.transparent===!0?r.push(l):t.push(l)}function c(f,d,p,S,y,m){let l=a(f,d,p,S,y,m);p.transmission>0?n.unshift(l):p.transparent===!0?r.unshift(l):t.unshift(l)}function h(f,d){t.length>1&&t.sort(f||dv),n.length>1&&n.sort(d||tu),r.length>1&&r.sort(d||tu)}function u(){for(let f=e,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:h}}function pv(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new nu,i.set(n,[a])):r>=s.length?(a=new nu,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function mv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new j,color:new Je};break;case"SpotLight":t={position:new j,direction:new j,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new j,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new j,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new j,halfWidth:new j,halfHeight:new j};break}return i[e.id]=t,t}}}function gv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var _v=0;function vv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function yv(i,e){let t=new mv,n=gv(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new j);let s=new j,a=new je,o=new je;function c(u,f){let d=0,p=0,S=0;for(let K=0;K<9;K++)r.probe[K].set(0,0,0);let y=0,m=0,l=0,v=0,g=0,_=0,b=0,P=0,I=0,z=0,C=0;u.sort(vv);let D=f===!0?Math.PI:1;for(let K=0,ie=u.length;K<ie;K++){let V=u[K],q=V.color,ne=V.intensity,ae=V.distance,ue=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)d+=q.r*ne*D,p+=q.g*ne*D,S+=q.b*ne*D;else if(V.isLightProbe){for(let me=0;me<9;me++)r.probe[me].addScaledVector(V.sh.coefficients[me],ne);C++}else if(V.isDirectionalLight){let me=t.get(V);if(me.color.copy(V.color).multiplyScalar(V.intensity*D),V.castShadow){let fe=V.shadow,Me=n.get(V);Me.shadowBias=fe.bias,Me.shadowNormalBias=fe.normalBias,Me.shadowRadius=fe.radius,Me.shadowMapSize=fe.mapSize,r.directionalShadow[y]=Me,r.directionalShadowMap[y]=ue,r.directionalShadowMatrix[y]=V.shadow.matrix,_++}r.directional[y]=me,y++}else if(V.isSpotLight){let me=t.get(V);me.position.setFromMatrixPosition(V.matrixWorld),me.color.copy(q).multiplyScalar(ne*D),me.distance=ae,me.coneCos=Math.cos(V.angle),me.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),me.decay=V.decay,r.spot[l]=me;let fe=V.shadow;if(V.map&&(r.spotLightMap[I]=V.map,I++,fe.updateMatrices(V),V.castShadow&&z++),r.spotLightMatrix[l]=fe.matrix,V.castShadow){let Me=n.get(V);Me.shadowBias=fe.bias,Me.shadowNormalBias=fe.normalBias,Me.shadowRadius=fe.radius,Me.shadowMapSize=fe.mapSize,r.spotShadow[l]=Me,r.spotShadowMap[l]=ue,P++}l++}else if(V.isRectAreaLight){let me=t.get(V);me.color.copy(q).multiplyScalar(ne),me.halfWidth.set(V.width*.5,0,0),me.halfHeight.set(0,V.height*.5,0),r.rectArea[v]=me,v++}else if(V.isPointLight){let me=t.get(V);if(me.color.copy(V.color).multiplyScalar(V.intensity*D),me.distance=V.distance,me.decay=V.decay,V.castShadow){let fe=V.shadow,Me=n.get(V);Me.shadowBias=fe.bias,Me.shadowNormalBias=fe.normalBias,Me.shadowRadius=fe.radius,Me.shadowMapSize=fe.mapSize,Me.shadowCameraNear=fe.camera.near,Me.shadowCameraFar=fe.camera.far,r.pointShadow[m]=Me,r.pointShadowMap[m]=ue,r.pointShadowMatrix[m]=V.shadow.matrix,b++}r.point[m]=me,m++}else if(V.isHemisphereLight){let me=t.get(V);me.skyColor.copy(V.color).multiplyScalar(ne*D),me.groundColor.copy(V.groundColor).multiplyScalar(ne*D),r.hemi[g]=me,g++}}v>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Oe.LTC_FLOAT_1,r.rectAreaLTC2=Oe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Oe.LTC_HALF_1,r.rectAreaLTC2=Oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=S;let Z=r.hash;(Z.directionalLength!==y||Z.pointLength!==m||Z.spotLength!==l||Z.rectAreaLength!==v||Z.hemiLength!==g||Z.numDirectionalShadows!==_||Z.numPointShadows!==b||Z.numSpotShadows!==P||Z.numSpotMaps!==I||Z.numLightProbes!==C)&&(r.directional.length=y,r.spot.length=l,r.rectArea.length=v,r.point.length=m,r.hemi.length=g,r.directionalShadow.length=_,r.directionalShadowMap.length=_,r.pointShadow.length=b,r.pointShadowMap.length=b,r.spotShadow.length=P,r.spotShadowMap.length=P,r.directionalShadowMatrix.length=_,r.pointShadowMatrix.length=b,r.spotLightMatrix.length=P+I-z,r.spotLightMap.length=I,r.numSpotLightShadowsWithMaps=z,r.numLightProbes=C,Z.directionalLength=y,Z.pointLength=m,Z.spotLength=l,Z.rectAreaLength=v,Z.hemiLength=g,Z.numDirectionalShadows=_,Z.numPointShadows=b,Z.numSpotShadows=P,Z.numSpotMaps=I,Z.numLightProbes=C,r.version=_v++)}function h(u,f){let d=0,p=0,S=0,y=0,m=0,l=f.matrixWorldInverse;for(let v=0,g=u.length;v<g;v++){let _=u[v];if(_.isDirectionalLight){let b=r.directional[d];b.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(l),d++}else if(_.isSpotLight){let b=r.spot[S];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(l),b.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(l),S++}else if(_.isRectAreaLight){let b=r.rectArea[y];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(l),o.identity(),a.copy(_.matrixWorld),a.premultiply(l),o.extractRotation(a),b.halfWidth.set(_.width*.5,0,0),b.halfHeight.set(0,_.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),y++}else if(_.isPointLight){let b=r.point[p];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(l),p++}else if(_.isHemisphereLight){let b=r.hemi[m];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(l),m++}}}return{setup:c,setupView:h,state:r}}function iu(i,e){let t=new yv(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(f){n.push(f)}function o(f){r.push(f)}function c(f){t.setup(n,f)}function h(f){t.setupView(n,f)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o}}function xv(i,e){let t=new WeakMap;function n(s,a=0){let o=t.get(s),c;return o===void 0?(c=new iu(i,e),t.set(s,[c])):a>=o.length?(c=new iu(i,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:n,dispose:r}}var Sl=class extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ml=class extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function bv(i,e,t){let n=new ps,r=new nt,s=new nt,a=new pt,o=new Sl({depthPacking:gp}),c=new Ml,h={},u=t.maxTextureSize,f={[Si]:dn,[dn]:Si,[Kn]:Kn},d=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Sv,fragmentShader:Mv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let S=new rn;S.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new cn(S,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wu;let l=this.type;this.render=function(b,P,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;let z=i.getRenderTarget(),C=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),Z=i.state;Z.setBlending(vi),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let K=l!==Jn&&this.type===Jn,ie=l===Jn&&this.type!==Jn;for(let V=0,q=b.length;V<q;V++){let ne=b[V],ae=ne.shadow;if(ae===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(ae.autoUpdate===!1&&ae.needsUpdate===!1)continue;r.copy(ae.mapSize);let ue=ae.getFrameExtents();if(r.multiply(ue),s.copy(ae.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ue.x),r.x=s.x*ue.x,ae.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ue.y),r.y=s.y*ue.y,ae.mapSize.y=s.y)),ae.map===null||K===!0||ie===!0){let fe=this.type!==Jn?{minFilter:jt,magFilter:jt}:{};ae.map!==null&&ae.map.dispose(),ae.map=new ti(r.x,r.y,fe),ae.map.texture.name=ne.name+".shadowMap",ae.camera.updateProjectionMatrix()}i.setRenderTarget(ae.map),i.clear();let me=ae.getViewportCount();for(let fe=0;fe<me;fe++){let Me=ae.getViewport(fe);a.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),Z.viewport(a),ae.updateMatrices(ne,fe),n=ae.getFrustum(),_(P,I,ae.camera,ne,this.type)}ae.isPointLightShadow!==!0&&this.type===Jn&&v(ae,I),ae.needsUpdate=!1}l=this.type,m.needsUpdate=!1,i.setRenderTarget(z,C,D)};function v(b,P){let I=e.update(y);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ti(r.x,r.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(P,null,I,d,y,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(P,null,I,p,y,null)}function g(b,P,I,z){let C=null,D=I.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)C=D;else if(C=I.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let Z=C.uuid,K=P.uuid,ie=h[Z];ie===void 0&&(ie={},h[Z]=ie);let V=ie[K];V===void 0&&(V=C.clone(),ie[K]=V),C=V}if(C.visible=P.visible,C.wireframe=P.wireframe,z===Jn?C.side=P.shadowSide!==null?P.shadowSide:P.side:C.side=P.shadowSide!==null?P.shadowSide:f[P.side],C.alphaMap=P.alphaMap,C.alphaTest=P.alphaTest,C.map=P.map,C.clipShadows=P.clipShadows,C.clippingPlanes=P.clippingPlanes,C.clipIntersection=P.clipIntersection,C.displacementMap=P.displacementMap,C.displacementScale=P.displacementScale,C.displacementBias=P.displacementBias,C.wireframeLinewidth=P.wireframeLinewidth,C.linewidth=P.linewidth,I.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let Z=i.properties.get(C);Z.light=I}return C}function _(b,P,I,z,C){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===Jn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,b.matrixWorld);let K=e.update(b),ie=b.material;if(Array.isArray(ie)){let V=K.groups;for(let q=0,ne=V.length;q<ne;q++){let ae=V[q],ue=ie[ae.materialIndex];if(ue&&ue.visible){let me=g(b,ue,z,C);b.onBeforeShadow(i,b,P,I,K,me,ae),i.renderBufferDirect(I,null,K,me,b,ae),b.onAfterShadow(i,b,P,I,K,me,ae)}}}else if(ie.visible){let V=g(b,ie,z,C);b.onBeforeShadow(i,b,P,I,K,V,null),i.renderBufferDirect(I,null,K,V,b,null),b.onAfterShadow(i,b,P,I,K,V,null)}}let Z=b.children;for(let K=0,ie=Z.length;K<ie;K++)_(Z[K],P,I,z,C)}}function Tv(i,e,t){let n=t.isWebGL2;function r(){let te=!1,Ce=new pt,Ee=null,ge=new pt(0,0,0,0);return{setMask:function(Ae){Ee!==Ae&&!te&&(i.colorMask(Ae,Ae,Ae,Ae),Ee=Ae)},setLocked:function(Ae){te=Ae},setClear:function(Ae,Ge,lt,Pt,Ht){Ht===!0&&(Ae*=Pt,Ge*=Pt,lt*=Pt),Ce.set(Ae,Ge,lt,Pt),ge.equals(Ce)===!1&&(i.clearColor(Ae,Ge,lt,Pt),ge.copy(Ce))},reset:function(){te=!1,Ee=null,ge.set(-1,0,0,0)}}}function s(){let te=!1,Ce=null,Ee=null,ge=null;return{setTest:function(Ae){Ae?Qe(i.DEPTH_TEST):He(i.DEPTH_TEST)},setMask:function(Ae){Ce!==Ae&&!te&&(i.depthMask(Ae),Ce=Ae)},setFunc:function(Ae){if(Ee!==Ae){switch(Ae){case Xd:i.depthFunc(i.NEVER);break;case Yd:i.depthFunc(i.ALWAYS);break;case qd:i.depthFunc(i.LESS);break;case pa:i.depthFunc(i.LEQUAL);break;case Zd:i.depthFunc(i.EQUAL);break;case Jd:i.depthFunc(i.GEQUAL);break;case Kd:i.depthFunc(i.GREATER);break;case $d:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=Ae}},setLocked:function(Ae){te=Ae},setClear:function(Ae){ge!==Ae&&(i.clearDepth(Ae),ge=Ae)},reset:function(){te=!1,Ce=null,Ee=null,ge=null}}}function a(){let te=!1,Ce=null,Ee=null,ge=null,Ae=null,Ge=null,lt=null,Pt=null,Ht=null;return{setTest:function(vt){te||(vt?Qe(i.STENCIL_TEST):He(i.STENCIL_TEST))},setMask:function(vt){Ce!==vt&&!te&&(i.stencilMask(vt),Ce=vt)},setFunc:function(vt,Gt,mn){(Ee!==vt||ge!==Gt||Ae!==mn)&&(i.stencilFunc(vt,Gt,mn),Ee=vt,ge=Gt,Ae=mn)},setOp:function(vt,Gt,mn){(Ge!==vt||lt!==Gt||Pt!==mn)&&(i.stencilOp(vt,Gt,mn),Ge=vt,lt=Gt,Pt=mn)},setLocked:function(vt){te=vt},setClear:function(vt){Ht!==vt&&(i.clearStencil(vt),Ht=vt)},reset:function(){te=!1,Ce=null,Ee=null,ge=null,Ae=null,Ge=null,lt=null,Pt=null,Ht=null}}}let o=new r,c=new s,h=new a,u=new WeakMap,f=new WeakMap,d={},p={},S=new WeakMap,y=[],m=null,l=!1,v=null,g=null,_=null,b=null,P=null,I=null,z=null,C=new Je(0,0,0),D=0,Z=!1,K=null,ie=null,V=null,q=null,ne=null,ae=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ue=!1,me=0,fe=i.getParameter(i.VERSION);fe.indexOf("WebGL")!==-1?(me=parseFloat(/^WebGL (\d)/.exec(fe)[1]),ue=me>=1):fe.indexOf("OpenGL ES")!==-1&&(me=parseFloat(/^OpenGL ES (\d)/.exec(fe)[1]),ue=me>=2);let Me=null,Le={},le=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),Pe=new pt().fromArray(le),Ne=new pt().fromArray(ye);function Ve(te,Ce,Ee,ge){let Ae=new Uint8Array(4),Ge=i.createTexture();i.bindTexture(te,Ge),i.texParameteri(te,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(te,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let lt=0;lt<Ee;lt++)n&&(te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY)?i.texImage3D(Ce,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,Ae):i.texImage2D(Ce+lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ae);return Ge}let Ke={};Ke[i.TEXTURE_2D]=Ve(i.TEXTURE_2D,i.TEXTURE_2D,1),Ke[i.TEXTURE_CUBE_MAP]=Ve(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ke[i.TEXTURE_2D_ARRAY]=Ve(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ke[i.TEXTURE_3D]=Ve(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),h.setClear(0),Qe(i.DEPTH_TEST),c.setFunc(pa),$e(!1),E(Nc),Qe(i.CULL_FACE),Xe(vi);function Qe(te){d[te]!==!0&&(i.enable(te),d[te]=!0)}function He(te){d[te]!==!1&&(i.disable(te),d[te]=!1)}function Ye(te,Ce){return p[te]!==Ce?(i.bindFramebuffer(te,Ce),p[te]=Ce,n&&(te===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=Ce),te===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=Ce)),!0):!1}function re(te,Ce){let Ee=y,ge=!1;if(te)if(Ee=S.get(Ce),Ee===void 0&&(Ee=[],S.set(Ce,Ee)),te.isWebGLMultipleRenderTargets){let Ae=te.texture;if(Ee.length!==Ae.length||Ee[0]!==i.COLOR_ATTACHMENT0){for(let Ge=0,lt=Ae.length;Ge<lt;Ge++)Ee[Ge]=i.COLOR_ATTACHMENT0+Ge;Ee.length=Ae.length,ge=!0}}else Ee[0]!==i.COLOR_ATTACHMENT0&&(Ee[0]=i.COLOR_ATTACHMENT0,ge=!0);else Ee[0]!==i.BACK&&(Ee[0]=i.BACK,ge=!0);ge&&(t.isWebGL2?i.drawBuffers(Ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ee))}function et(te){return m!==te?(i.useProgram(te),m=te,!0):!1}let Fe={[zi]:i.FUNC_ADD,[Pd]:i.FUNC_SUBTRACT,[Ld]:i.FUNC_REVERSE_SUBTRACT};if(n)Fe[zc]=i.MIN,Fe[kc]=i.MAX;else{let te=e.get("EXT_blend_minmax");te!==null&&(Fe[zc]=te.MIN_EXT,Fe[kc]=te.MAX_EXT)}let at={[Id]:i.ZERO,[Dd]:i.ONE,[Ud]:i.SRC_COLOR,[rl]:i.SRC_ALPHA,[kd]:i.SRC_ALPHA_SATURATE,[Bd]:i.DST_COLOR,[Nd]:i.DST_ALPHA,[Od]:i.ONE_MINUS_SRC_COLOR,[sl]:i.ONE_MINUS_SRC_ALPHA,[zd]:i.ONE_MINUS_DST_COLOR,[Fd]:i.ONE_MINUS_DST_ALPHA,[Vd]:i.CONSTANT_COLOR,[Hd]:i.ONE_MINUS_CONSTANT_COLOR,[Gd]:i.CONSTANT_ALPHA,[Wd]:i.ONE_MINUS_CONSTANT_ALPHA};function Xe(te,Ce,Ee,ge,Ae,Ge,lt,Pt,Ht,vt){if(te===vi){l===!0&&(He(i.BLEND),l=!1);return}if(l===!1&&(Qe(i.BLEND),l=!0),te!==Cd){if(te!==v||vt!==Z){if((g!==zi||P!==zi)&&(i.blendEquation(i.FUNC_ADD),g=zi,P=zi),vt)switch(te){case br:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case da:i.blendFunc(i.ONE,i.ONE);break;case Fc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",te);break}else switch(te){case br:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case da:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Fc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",te);break}_=null,b=null,I=null,z=null,C.set(0,0,0),D=0,v=te,Z=vt}return}Ae=Ae||Ce,Ge=Ge||Ee,lt=lt||ge,(Ce!==g||Ae!==P)&&(i.blendEquationSeparate(Fe[Ce],Fe[Ae]),g=Ce,P=Ae),(Ee!==_||ge!==b||Ge!==I||lt!==z)&&(i.blendFuncSeparate(at[Ee],at[ge],at[Ge],at[lt]),_=Ee,b=ge,I=Ge,z=lt),(Pt.equals(C)===!1||Ht!==D)&&(i.blendColor(Pt.r,Pt.g,Pt.b,Ht),C.copy(Pt),D=Ht),v=te,Z=!1}function mt(te,Ce){te.side===Kn?He(i.CULL_FACE):Qe(i.CULL_FACE);let Ee=te.side===dn;Ce&&(Ee=!Ee),$e(Ee),te.blending===br&&te.transparent===!1?Xe(vi):Xe(te.blending,te.blendEquation,te.blendSrc,te.blendDst,te.blendEquationAlpha,te.blendSrcAlpha,te.blendDstAlpha,te.blendColor,te.blendAlpha,te.premultipliedAlpha),c.setFunc(te.depthFunc),c.setTest(te.depthTest),c.setMask(te.depthWrite),o.setMask(te.colorWrite);let ge=te.stencilWrite;h.setTest(ge),ge&&(h.setMask(te.stencilWriteMask),h.setFunc(te.stencilFunc,te.stencilRef,te.stencilFuncMask),h.setOp(te.stencilFail,te.stencilZFail,te.stencilZPass)),F(te.polygonOffset,te.polygonOffsetFactor,te.polygonOffsetUnits),te.alphaToCoverage===!0?Qe(i.SAMPLE_ALPHA_TO_COVERAGE):He(i.SAMPLE_ALPHA_TO_COVERAGE)}function $e(te){K!==te&&(te?i.frontFace(i.CW):i.frontFace(i.CCW),K=te)}function E(te){te!==Ed?(Qe(i.CULL_FACE),te!==ie&&(te===Nc?i.cullFace(i.BACK):te===Ad?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):He(i.CULL_FACE),ie=te}function O(te){te!==V&&(ue&&i.lineWidth(te),V=te)}function F(te,Ce,Ee){te?(Qe(i.POLYGON_OFFSET_FILL),(q!==Ce||ne!==Ee)&&(i.polygonOffset(Ce,Ee),q=Ce,ne=Ee)):He(i.POLYGON_OFFSET_FILL)}function W(te){te?Qe(i.SCISSOR_TEST):He(i.SCISSOR_TEST)}function L(te){te===void 0&&(te=i.TEXTURE0+ae-1),Me!==te&&(i.activeTexture(te),Me=te)}function A(te,Ce,Ee){Ee===void 0&&(Me===null?Ee=i.TEXTURE0+ae-1:Ee=Me);let ge=Le[Ee];ge===void 0&&(ge={type:void 0,texture:void 0},Le[Ee]=ge),(ge.type!==te||ge.texture!==Ce)&&(Me!==Ee&&(i.activeTexture(Ee),Me=Ee),i.bindTexture(te,Ce||Ke[te]),ge.type=te,ge.texture=Ce)}function G(){let te=Le[Me];te!==void 0&&te.type!==void 0&&(i.bindTexture(te.type,null),te.type=void 0,te.texture=void 0)}function X(){try{i.compressedTexImage2D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function oe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function se(){try{i.texSubImage2D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function pe(){try{i.texSubImage3D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function he(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function we(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function H(){try{i.texStorage2D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function _e(){try{i.texStorage3D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function qe(){try{i.texImage3D.apply(i,arguments)}catch(te){console.error("THREE.WebGLState:",te)}}function Ue(te){Pe.equals(te)===!1&&(i.scissor(te.x,te.y,te.z,te.w),Pe.copy(te))}function Ze(te){Ne.equals(te)===!1&&(i.viewport(te.x,te.y,te.z,te.w),Ne.copy(te))}function Ie(te,Ce){let Ee=f.get(Ce);Ee===void 0&&(Ee=new WeakMap,f.set(Ce,Ee));let ge=Ee.get(te);ge===void 0&&(ge=i.getUniformBlockIndex(Ce,te.name),Ee.set(te,ge))}function ze(te,Ce){let ge=f.get(Ce).get(te);u.get(Ce)!==ge&&(i.uniformBlockBinding(Ce,ge,te.__bindingPointIndex),u.set(Ce,ge))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},Me=null,Le={},p={},S=new WeakMap,y=[],m=null,l=!1,v=null,g=null,_=null,b=null,P=null,I=null,z=null,C=new Je(0,0,0),D=0,Z=!1,K=null,ie=null,V=null,q=null,ne=null,Pe.set(0,0,i.canvas.width,i.canvas.height),Ne.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),h.reset()}return{buffers:{color:o,depth:c,stencil:h},enable:Qe,disable:He,bindFramebuffer:Ye,drawBuffers:re,useProgram:et,setBlending:Xe,setMaterial:mt,setFlipSided:$e,setCullFace:E,setLineWidth:O,setPolygonOffset:F,setScissorTest:W,activeTexture:L,bindTexture:A,unbindTexture:G,compressedTexImage2D:X,compressedTexImage3D:oe,texImage2D:ve,texImage3D:qe,updateUBOMapping:Ie,uniformBlockBinding:ze,texStorage2D:H,texStorage3D:_e,texSubImage2D:se,texSubImage3D:pe,compressedTexSubImage2D:he,compressedTexSubImage3D:we,scissor:Ue,viewport:Ze,reset:it}}function wv(i,e,t,n,r,s,a){let o=r.isWebGL2,c=r.maxTextures,h=r.maxCubemapSize,u=r.maxTextureSize,f=r.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),S=new WeakMap,y,m=new WeakMap,l=!1;try{l=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,A){return l?new OffscreenCanvas(L,A):us("canvas")}function g(L,A,G,X){let oe=1;if((L.width>X||L.height>X)&&(oe=X/Math.max(L.width,L.height)),oe<1||A===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){let se=A?Sa:Math.floor,pe=se(oe*L.width),he=se(oe*L.height);y===void 0&&(y=v(pe,he));let we=G?v(pe,he):y;return we.width=pe,we.height=he,we.getContext("2d").drawImage(L,0,0,pe,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+pe+"x"+he+")."),we}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function _(L){return cl(L.width)&&cl(L.height)}function b(L){return o?!1:L.wrapS!==fn||L.wrapT!==fn||L.minFilter!==jt&&L.minFilter!==yn}function P(L,A){return L.generateMipmaps&&A&&L.minFilter!==jt&&L.minFilter!==yn}function I(L){i.generateMipmap(L)}function z(L,A,G,X,oe=!1){if(o===!1)return A;if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let se=A;if(A===i.RED&&(G===i.FLOAT&&(se=i.R32F),G===i.HALF_FLOAT&&(se=i.R16F),G===i.UNSIGNED_BYTE&&(se=i.R8)),A===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(se=i.R8UI),G===i.UNSIGNED_SHORT&&(se=i.R16UI),G===i.UNSIGNED_INT&&(se=i.R32UI),G===i.BYTE&&(se=i.R8I),G===i.SHORT&&(se=i.R16I),G===i.INT&&(se=i.R32I)),A===i.RG&&(G===i.FLOAT&&(se=i.RG32F),G===i.HALF_FLOAT&&(se=i.RG16F),G===i.UNSIGNED_BYTE&&(se=i.RG8)),A===i.RGBA){let pe=oe?_a:yt.getTransfer(X);G===i.FLOAT&&(se=i.RGBA32F),G===i.HALF_FLOAT&&(se=i.RGBA16F),G===i.UNSIGNED_BYTE&&(se=pe===Mt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function C(L,A,G){return P(L,G)===!0||L.isFramebufferTexture&&L.minFilter!==jt&&L.minFilter!==yn?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function D(L){return L===jt||L===Hc||L===To?i.NEAREST:i.LINEAR}function Z(L){let A=L.target;A.removeEventListener("dispose",Z),ie(A),A.isVideoTexture&&S.delete(A)}function K(L){let A=L.target;A.removeEventListener("dispose",K),q(A)}function ie(L){let A=n.get(L);if(A.__webglInit===void 0)return;let G=L.source,X=m.get(G);if(X){let oe=X[A.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&V(L),Object.keys(X).length===0&&m.delete(G)}n.remove(L)}function V(L){let A=n.get(L);i.deleteTexture(A.__webglTexture);let G=L.source,X=m.get(G);delete X[A.__cacheKey],a.memory.textures--}function q(L){let A=L.texture,G=n.get(L),X=n.get(A);if(X.__webglTexture!==void 0&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(G.__webglFramebuffer[oe]))for(let se=0;se<G.__webglFramebuffer[oe].length;se++)i.deleteFramebuffer(G.__webglFramebuffer[oe][se]);else i.deleteFramebuffer(G.__webglFramebuffer[oe]);G.__webglDepthbuffer&&i.deleteRenderbuffer(G.__webglDepthbuffer[oe])}else{if(Array.isArray(G.__webglFramebuffer))for(let oe=0;oe<G.__webglFramebuffer.length;oe++)i.deleteFramebuffer(G.__webglFramebuffer[oe]);else i.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&i.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&i.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let oe=0;oe<G.__webglColorRenderbuffer.length;oe++)G.__webglColorRenderbuffer[oe]&&i.deleteRenderbuffer(G.__webglColorRenderbuffer[oe]);G.__webglDepthRenderbuffer&&i.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let oe=0,se=A.length;oe<se;oe++){let pe=n.get(A[oe]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(A[oe])}n.remove(A),n.remove(L)}let ne=0;function ae(){ne=0}function ue(){let L=ne;return L>=c&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+c),ne+=1,L}function me(L){let A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function fe(L,A){let G=n.get(L);if(L.isVideoTexture&&F(L),L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){let X=L.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Qe(G,L,A);return}}t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+A)}function Me(L,A){let G=n.get(L);if(L.version>0&&G.__version!==L.version){Qe(G,L,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+A)}function Le(L,A){let G=n.get(L);if(L.version>0&&G.__version!==L.version){Qe(G,L,A);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+A)}function le(L,A){let G=n.get(L);if(L.version>0&&G.__version!==L.version){He(G,L,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+A)}let ye={[Rr]:i.REPEAT,[fn]:i.CLAMP_TO_EDGE,[ol]:i.MIRRORED_REPEAT},Pe={[jt]:i.NEAREST,[Hc]:i.NEAREST_MIPMAP_NEAREST,[To]:i.NEAREST_MIPMAP_LINEAR,[yn]:i.LINEAR,[sp]:i.LINEAR_MIPMAP_NEAREST,[cs]:i.LINEAR_MIPMAP_LINEAR},Ne={[vp]:i.NEVER,[Tp]:i.ALWAYS,[yp]:i.LESS,[Ou]:i.LEQUAL,[xp]:i.EQUAL,[bp]:i.GEQUAL,[Sp]:i.GREATER,[Mp]:i.NOTEQUAL};function Ve(L,A,G){if(G?(i.texParameteri(L,i.TEXTURE_WRAP_S,ye[A.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,ye[A.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,ye[A.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,Pe[A.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,Pe[A.minFilter])):(i.texParameteri(L,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(L,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(A.wrapS!==fn||A.wrapT!==fn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(L,i.TEXTURE_MAG_FILTER,D(A.magFilter)),i.texParameteri(L,i.TEXTURE_MIN_FILTER,D(A.minFilter)),A.minFilter!==jt&&A.minFilter!==yn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Ne[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let X=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===jt||A.minFilter!==To&&A.minFilter!==cs||A.type===$n&&e.has("OES_texture_float_linear")===!1||o===!1&&A.type===hs&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(i.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function Ke(L,A){let G=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",Z));let X=A.source,oe=m.get(X);oe===void 0&&(oe={},m.set(X,oe));let se=me(A);if(se!==L.__cacheKey){oe[se]===void 0&&(oe[se]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),oe[se].usedTimes++;let pe=oe[L.__cacheKey];pe!==void 0&&(oe[L.__cacheKey].usedTimes--,pe.usedTimes===0&&V(A)),L.__cacheKey=se,L.__webglTexture=oe[se].texture}return G}function Qe(L,A,G){let X=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(X=i.TEXTURE_3D);let oe=Ke(L,A),se=A.source;t.bindTexture(X,L.__webglTexture,i.TEXTURE0+G);let pe=n.get(se);if(se.version!==pe.__version||oe===!0){t.activeTexture(i.TEXTURE0+G);let he=yt.getPrimaries(yt.workingColorSpace),we=A.colorSpace===Sn?null:yt.getPrimaries(A.colorSpace),H=A.colorSpace===Sn||he===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,H);let _e=b(A)&&_(A.image)===!1,ve=g(A.image,_e,!1,u);ve=W(A,ve);let qe=_(ve)||o,Ue=s.convert(A.format,A.colorSpace),Ze=s.convert(A.type),Ie=z(A.internalFormat,Ue,Ze,A.colorSpace,A.isVideoTexture);Ve(X,A,qe);let ze,it=A.mipmaps,te=o&&A.isVideoTexture!==!0&&Ie!==Du,Ce=pe.__version===void 0||oe===!0,Ee=C(A,ve,qe);if(A.isDepthTexture)Ie=i.DEPTH_COMPONENT,o?A.type===$n?Ie=i.DEPTH_COMPONENT32F:A.type===_i?Ie=i.DEPTH_COMPONENT24:A.type===Vi?Ie=i.DEPTH24_STENCIL8:Ie=i.DEPTH_COMPONENT16:A.type===$n&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Hi&&Ie===i.DEPTH_COMPONENT&&A.type!==Wl&&A.type!==_i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=_i,Ze=s.convert(A.type)),A.format===Cr&&Ie===i.DEPTH_COMPONENT&&(Ie=i.DEPTH_STENCIL,A.type!==Vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Vi,Ze=s.convert(A.type))),Ce&&(te?t.texStorage2D(i.TEXTURE_2D,1,Ie,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,Ie,ve.width,ve.height,0,Ue,Ze,null));else if(A.isDataTexture)if(it.length>0&&qe){te&&Ce&&t.texStorage2D(i.TEXTURE_2D,Ee,Ie,it[0].width,it[0].height);for(let ge=0,Ae=it.length;ge<Ae;ge++)ze=it[ge],te?t.texSubImage2D(i.TEXTURE_2D,ge,0,0,ze.width,ze.height,Ue,Ze,ze.data):t.texImage2D(i.TEXTURE_2D,ge,Ie,ze.width,ze.height,0,Ue,Ze,ze.data);A.generateMipmaps=!1}else te?(Ce&&t.texStorage2D(i.TEXTURE_2D,Ee,Ie,ve.width,ve.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve.width,ve.height,Ue,Ze,ve.data)):t.texImage2D(i.TEXTURE_2D,0,Ie,ve.width,ve.height,0,Ue,Ze,ve.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){te&&Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Ie,it[0].width,it[0].height,ve.depth);for(let ge=0,Ae=it.length;ge<Ae;ge++)ze=it[ge],A.format!==xn?Ue!==null?te?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,ze.width,ze.height,ve.depth,Ue,ze.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,Ie,ze.width,ze.height,ve.depth,0,ze.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,ze.width,ze.height,ve.depth,Ue,Ze,ze.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,Ie,ze.width,ze.height,ve.depth,0,Ue,Ze,ze.data)}else{te&&Ce&&t.texStorage2D(i.TEXTURE_2D,Ee,Ie,it[0].width,it[0].height);for(let ge=0,Ae=it.length;ge<Ae;ge++)ze=it[ge],A.format!==xn?Ue!==null?te?t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,ze.width,ze.height,Ue,ze.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,Ie,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?t.texSubImage2D(i.TEXTURE_2D,ge,0,0,ze.width,ze.height,Ue,Ze,ze.data):t.texImage2D(i.TEXTURE_2D,ge,Ie,ze.width,ze.height,0,Ue,Ze,ze.data)}else if(A.isDataArrayTexture)te?(Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Ie,ve.width,ve.height,ve.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,Ue,Ze,ve.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,ve.width,ve.height,ve.depth,0,Ue,Ze,ve.data);else if(A.isData3DTexture)te?(Ce&&t.texStorage3D(i.TEXTURE_3D,Ee,Ie,ve.width,ve.height,ve.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,Ue,Ze,ve.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,ve.width,ve.height,ve.depth,0,Ue,Ze,ve.data);else if(A.isFramebufferTexture){if(Ce)if(te)t.texStorage2D(i.TEXTURE_2D,Ee,Ie,ve.width,ve.height);else{let ge=ve.width,Ae=ve.height;for(let Ge=0;Ge<Ee;Ge++)t.texImage2D(i.TEXTURE_2D,Ge,Ie,ge,Ae,0,Ue,Ze,null),ge>>=1,Ae>>=1}}else if(it.length>0&&qe){te&&Ce&&t.texStorage2D(i.TEXTURE_2D,Ee,Ie,it[0].width,it[0].height);for(let ge=0,Ae=it.length;ge<Ae;ge++)ze=it[ge],te?t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Ue,Ze,ze):t.texImage2D(i.TEXTURE_2D,ge,Ie,Ue,Ze,ze);A.generateMipmaps=!1}else te?(Ce&&t.texStorage2D(i.TEXTURE_2D,Ee,Ie,ve.width,ve.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ue,Ze,ve)):t.texImage2D(i.TEXTURE_2D,0,Ie,Ue,Ze,ve);P(A,qe)&&I(X),pe.__version=se.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function He(L,A,G){if(A.image.length!==6)return;let X=Ke(L,A),oe=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+G);let se=n.get(oe);if(oe.version!==se.__version||X===!0){t.activeTexture(i.TEXTURE0+G);let pe=yt.getPrimaries(yt.workingColorSpace),he=A.colorSpace===Sn?null:yt.getPrimaries(A.colorSpace),we=A.colorSpace===Sn||pe===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let H=A.isCompressedTexture||A.image[0].isCompressedTexture,_e=A.image[0]&&A.image[0].isDataTexture,ve=[];for(let ge=0;ge<6;ge++)!H&&!_e?ve[ge]=g(A.image[ge],!1,!0,h):ve[ge]=_e?A.image[ge].image:A.image[ge],ve[ge]=W(A,ve[ge]);let qe=ve[0],Ue=_(qe)||o,Ze=s.convert(A.format,A.colorSpace),Ie=s.convert(A.type),ze=z(A.internalFormat,Ze,Ie,A.colorSpace),it=o&&A.isVideoTexture!==!0,te=se.__version===void 0||X===!0,Ce=C(A,qe,Ue);Ve(i.TEXTURE_CUBE_MAP,A,Ue);let Ee;if(H){it&&te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,ze,qe.width,qe.height);for(let ge=0;ge<6;ge++){Ee=ve[ge].mipmaps;for(let Ae=0;Ae<Ee.length;Ae++){let Ge=Ee[Ae];A.format!==xn?Ze!==null?it?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae,0,0,Ge.width,Ge.height,Ze,Ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae,ze,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae,0,0,Ge.width,Ge.height,Ze,Ie,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae,ze,Ge.width,Ge.height,0,Ze,Ie,Ge.data)}}}else{Ee=A.mipmaps,it&&te&&(Ee.length>0&&Ce++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,ze,ve[0].width,ve[0].height));for(let ge=0;ge<6;ge++)if(_e){it?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,ve[ge].width,ve[ge].height,Ze,Ie,ve[ge].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ze,ve[ge].width,ve[ge].height,0,Ze,Ie,ve[ge].data);for(let Ae=0;Ae<Ee.length;Ae++){let lt=Ee[Ae].image[ge].image;it?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae+1,0,0,lt.width,lt.height,Ze,Ie,lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae+1,ze,lt.width,lt.height,0,Ze,Ie,lt.data)}}else{it?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ze,Ie,ve[ge]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ze,Ze,Ie,ve[ge]);for(let Ae=0;Ae<Ee.length;Ae++){let Ge=Ee[Ae];it?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae+1,0,0,Ze,Ie,Ge.image[ge]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae+1,ze,Ze,Ie,Ge.image[ge])}}}P(A,Ue)&&I(i.TEXTURE_CUBE_MAP),se.__version=oe.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function Ye(L,A,G,X,oe,se){let pe=s.convert(G.format,G.colorSpace),he=s.convert(G.type),we=z(G.internalFormat,pe,he,G.colorSpace);if(!n.get(A).__hasExternalTextures){let _e=Math.max(1,A.width>>se),ve=Math.max(1,A.height>>se);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,se,we,_e,ve,A.depth,0,pe,he,null):t.texImage2D(oe,se,we,_e,ve,0,pe,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),O(A)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,oe,n.get(G).__webglTexture,0,E(A)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,oe,n.get(G).__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(L,A,G){if(i.bindRenderbuffer(i.RENDERBUFFER,L),A.depthBuffer&&!A.stencilBuffer){let X=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(G||O(A)){let oe=A.depthTexture;oe&&oe.isDepthTexture&&(oe.type===$n?X=i.DEPTH_COMPONENT32F:oe.type===_i&&(X=i.DEPTH_COMPONENT24));let se=E(A);O(A)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,X,A.width,A.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,se,X,A.width,A.height)}else i.renderbufferStorage(i.RENDERBUFFER,X,A.width,A.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,L)}else if(A.depthBuffer&&A.stencilBuffer){let X=E(A);G&&O(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,X,i.DEPTH24_STENCIL8,A.width,A.height):O(A)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X,i.DEPTH24_STENCIL8,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,L)}else{let X=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let oe=0;oe<X.length;oe++){let se=X[oe],pe=s.convert(se.format,se.colorSpace),he=s.convert(se.type),we=z(se.internalFormat,pe,he,se.colorSpace),H=E(A);G&&O(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,H,we,A.width,A.height):O(A)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,H,we,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,we,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function et(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),fe(A.depthTexture,0);let X=n.get(A.depthTexture).__webglTexture,oe=E(A);if(A.depthTexture.format===Hi)O(A)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(A.depthTexture.format===Cr)O(A)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Fe(L){let A=n.get(L),G=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");et(A.__webglFramebuffer,L)}else if(G){A.__webglDepthbuffer=[];for(let X=0;X<6;X++)t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[X]),A.__webglDepthbuffer[X]=i.createRenderbuffer(),re(A.__webglDepthbuffer[X],L,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=i.createRenderbuffer(),re(A.__webglDepthbuffer,L,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(L,A,G){let X=n.get(L);A!==void 0&&Ye(X.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Fe(L)}function Xe(L){let A=L.texture,G=n.get(L),X=n.get(A);L.addEventListener("dispose",K),L.isWebGLMultipleRenderTargets!==!0&&(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=A.version,a.memory.textures++);let oe=L.isWebGLCubeRenderTarget===!0,se=L.isWebGLMultipleRenderTargets===!0,pe=_(L)||o;if(oe){G.__webglFramebuffer=[];for(let he=0;he<6;he++)if(o&&A.mipmaps&&A.mipmaps.length>0){G.__webglFramebuffer[he]=[];for(let we=0;we<A.mipmaps.length;we++)G.__webglFramebuffer[he][we]=i.createFramebuffer()}else G.__webglFramebuffer[he]=i.createFramebuffer()}else{if(o&&A.mipmaps&&A.mipmaps.length>0){G.__webglFramebuffer=[];for(let he=0;he<A.mipmaps.length;he++)G.__webglFramebuffer[he]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(se)if(r.drawBuffers){let he=L.texture;for(let we=0,H=he.length;we<H;we++){let _e=n.get(he[we]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&L.samples>0&&O(L)===!1){let he=se?A:[A];G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let we=0;we<he.length;we++){let H=he[we];G.__webglColorRenderbuffer[we]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[we]);let _e=s.convert(H.format,H.colorSpace),ve=s.convert(H.type),qe=z(H.internalFormat,_e,ve,H.colorSpace,L.isXRRenderTarget===!0),Ue=E(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,qe,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,G.__webglColorRenderbuffer[we])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),re(G.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,A,pe);for(let he=0;he<6;he++)if(o&&A.mipmaps&&A.mipmaps.length>0)for(let we=0;we<A.mipmaps.length;we++)Ye(G.__webglFramebuffer[he][we],L,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,we);else Ye(G.__webglFramebuffer[he],L,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);P(A,pe)&&I(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){let he=L.texture;for(let we=0,H=he.length;we<H;we++){let _e=he[we],ve=n.get(_e);t.bindTexture(i.TEXTURE_2D,ve.__webglTexture),Ve(i.TEXTURE_2D,_e,pe),Ye(G.__webglFramebuffer,L,_e,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,0),P(_e,pe)&&I(i.TEXTURE_2D)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(o?he=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,X.__webglTexture),Ve(he,A,pe),o&&A.mipmaps&&A.mipmaps.length>0)for(let we=0;we<A.mipmaps.length;we++)Ye(G.__webglFramebuffer[we],L,A,i.COLOR_ATTACHMENT0,he,we);else Ye(G.__webglFramebuffer,L,A,i.COLOR_ATTACHMENT0,he,0);P(A,pe)&&I(he),t.unbindTexture()}L.depthBuffer&&Fe(L)}function mt(L){let A=_(L)||o,G=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let X=0,oe=G.length;X<oe;X++){let se=G[X];if(P(se,A)){let pe=L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,he=n.get(se).__webglTexture;t.bindTexture(pe,he),I(pe),t.unbindTexture()}}}function $e(L){if(o&&L.samples>0&&O(L)===!1){let A=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],G=L.width,X=L.height,oe=i.COLOR_BUFFER_BIT,se=[],pe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(L),we=L.isWebGLMultipleRenderTargets===!0;if(we)for(let H=0;H<A.length;H++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let H=0;H<A.length;H++){se.push(i.COLOR_ATTACHMENT0+H),L.depthBuffer&&se.push(pe);let _e=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(_e===!1&&(L.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),we&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[H]),_e===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),we){let ve=n.get(A[H]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ve,0)}i.blitFramebuffer(0,0,G,X,0,0,G,X,oe,i.NEAREST),p&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,se)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),we)for(let H=0;H<A.length;H++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,he.__webglColorRenderbuffer[H]);let _e=n.get(A[H]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function E(L){return Math.min(f,L.samples)}function O(L){let A=n.get(L);return o&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function F(L){let A=a.render.frame;S.get(L)!==A&&(S.set(L,A),L.update())}function W(L,A){let G=L.colorSpace,X=L.format,oe=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===ll||G!==ei&&G!==Sn&&(yt.getTransfer(G)===Mt?o===!1?e.has("EXT_sRGB")===!0&&X===xn?(L.format=ll,L.minFilter=yn,L.generateMipmaps=!1):A=Ma.sRGBToLinear(A):(X!==xn||oe!==xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),A}this.allocateTextureUnit=ue,this.resetTextureUnits=ae,this.setTexture2D=fe,this.setTexture2DArray=Me,this.setTexture3D=Le,this.setTextureCube=le,this.rebindTextures=at,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=Ye,this.useMultisampledRTT=O}function Ev(i,e,t){let n=t.isWebGL2;function r(s,a=Sn){let o,c=yt.getTransfer(a);if(s===xi)return i.UNSIGNED_BYTE;if(s===Ru)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Cu)return i.UNSIGNED_SHORT_5_5_5_1;if(s===ap)return i.BYTE;if(s===op)return i.SHORT;if(s===Wl)return i.UNSIGNED_SHORT;if(s===Au)return i.INT;if(s===_i)return i.UNSIGNED_INT;if(s===$n)return i.FLOAT;if(s===hs)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===lp)return i.ALPHA;if(s===xn)return i.RGBA;if(s===cp)return i.LUMINANCE;if(s===hp)return i.LUMINANCE_ALPHA;if(s===Hi)return i.DEPTH_COMPONENT;if(s===Cr)return i.DEPTH_STENCIL;if(s===ll)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===up)return i.RED;if(s===Pu)return i.RED_INTEGER;if(s===fp)return i.RG;if(s===Lu)return i.RG_INTEGER;if(s===Iu)return i.RGBA_INTEGER;if(s===wo||s===Eo||s===Ao||s===Ro)if(c===Mt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===wo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Eo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ao)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ro)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===wo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Eo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ao)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ro)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Gc||s===Wc||s===Xc||s===Yc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Gc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Wc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Xc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Yc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Du)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===qc||s===Zc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===qc)return c===Mt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Zc)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Jc||s===Kc||s===$c||s===jc||s===Qc||s===eh||s===th||s===nh||s===ih||s===rh||s===sh||s===ah||s===oh||s===lh)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Jc)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Kc)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===$c)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===jc)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Qc)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===eh)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===th)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===nh)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ih)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===rh)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===sh)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ah)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===oh)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===lh)return c===Mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Co||s===ch||s===hh)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Co)return c===Mt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ch)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===hh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===dp||s===uh||s===fh||s===dh)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Co)return o.COMPRESSED_RED_RGTC1_EXT;if(s===uh)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===fh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===dh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Vi?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}var bl=class extends Lt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Qn=class extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Av={type:"move"},os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){a=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),l=this._getHandJoint(h,y);m!==null&&(l.matrix.fromArray(m.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,l.jointRadius=m.radius),l.visible=m!==null}let u=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,S=.005;h.inputState.pinching&&d>p+S?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&d<=p-S&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Av)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Tl=class extends zn{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,h=null,u=null,f=null,d=null,p=null,S=null,y=t.getContextAttributes(),m=null,l=null,v=[],g=[],_=new nt,b=null,P=new Lt;P.layers.enable(1),P.viewport=new pt;let I=new Lt;I.layers.enable(2),I.viewport=new pt;let z=[P,I],C=new bl;C.layers.enable(1),C.layers.enable(2);let D=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let ye=v[le];return ye===void 0&&(ye=new os,v[le]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(le){let ye=v[le];return ye===void 0&&(ye=new os,v[le]=ye),ye.getGripSpace()},this.getHand=function(le){let ye=v[le];return ye===void 0&&(ye=new os,v[le]=ye),ye.getHandSpace()};function K(le){let ye=g.indexOf(le.inputSource);if(ye===-1)return;let Pe=v[ye];Pe!==void 0&&(Pe.update(le.inputSource,le.frame,h||a),Pe.dispatchEvent({type:le.type,data:le.inputSource}))}function ie(){r.removeEventListener("select",K),r.removeEventListener("selectstart",K),r.removeEventListener("selectend",K),r.removeEventListener("squeeze",K),r.removeEventListener("squeezestart",K),r.removeEventListener("squeezeend",K),r.removeEventListener("end",ie),r.removeEventListener("inputsourceschange",V);for(let le=0;le<v.length;le++){let ye=g[le];ye!==null&&(g[le]=null,v[le].disconnect(ye))}D=null,Z=null,e.setRenderTarget(m),p=null,d=null,f=null,r=null,l=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(_.width,_.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(le){s=le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){o=le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(le){h=le},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return S},this.getSession=function(){return r},this.setSession=async function(le){if(r=le,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",K),r.addEventListener("selectstart",K),r.addEventListener("selectend",K),r.addEventListener("squeeze",K),r.addEventListener("squeezestart",K),r.addEventListener("squeezeend",K),r.addEventListener("end",ie),r.addEventListener("inputsourceschange",V),y.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(_),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let ye={antialias:r.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ye),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),l=new ti(p.framebufferWidth,p.framebufferHeight,{format:xn,type:xi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let ye=null,Pe=null,Ne=null;y.depth&&(Ne=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=y.stencil?Cr:Hi,Pe=y.stencil?Vi:_i);let Ve={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Ve),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),l=new ti(d.textureWidth,d.textureHeight,{format:xn,type:xi,depthTexture:new Ca(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});let Ke=e.properties.get(l);Ke.__ignoreDepthValues=d.ignoreDepthValues}l.isXRRenderTarget=!0,this.setFoveation(c),h=null,a=await r.requestReferenceSpace(o),Le.setContext(r),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function V(le){for(let ye=0;ye<le.removed.length;ye++){let Pe=le.removed[ye],Ne=g.indexOf(Pe);Ne>=0&&(g[Ne]=null,v[Ne].disconnect(Pe))}for(let ye=0;ye<le.added.length;ye++){let Pe=le.added[ye],Ne=g.indexOf(Pe);if(Ne===-1){for(let Ke=0;Ke<v.length;Ke++)if(Ke>=g.length){g.push(Pe),Ne=Ke;break}else if(g[Ke]===null){g[Ke]=Pe,Ne=Ke;break}if(Ne===-1)break}let Ve=v[Ne];Ve&&Ve.connect(Pe)}}let q=new j,ne=new j;function ae(le,ye,Pe){q.setFromMatrixPosition(ye.matrixWorld),ne.setFromMatrixPosition(Pe.matrixWorld);let Ne=q.distanceTo(ne),Ve=ye.projectionMatrix.elements,Ke=Pe.projectionMatrix.elements,Qe=Ve[14]/(Ve[10]-1),He=Ve[14]/(Ve[10]+1),Ye=(Ve[9]+1)/Ve[5],re=(Ve[9]-1)/Ve[5],et=(Ve[8]-1)/Ve[0],Fe=(Ke[8]+1)/Ke[0],at=Qe*et,Xe=Qe*Fe,mt=Ne/(-et+Fe),$e=mt*-et;ye.matrixWorld.decompose(le.position,le.quaternion,le.scale),le.translateX($e),le.translateZ(mt),le.matrixWorld.compose(le.position,le.quaternion,le.scale),le.matrixWorldInverse.copy(le.matrixWorld).invert();let E=Qe+mt,O=He+mt,F=at-$e,W=Xe+(Ne-$e),L=Ye*He/O*E,A=re*He/O*E;le.projectionMatrix.makePerspective(F,W,L,A,E,O),le.projectionMatrixInverse.copy(le.projectionMatrix).invert()}function ue(le,ye){ye===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(ye.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(r===null)return;C.near=I.near=P.near=le.near,C.far=I.far=P.far=le.far,(D!==C.near||Z!==C.far)&&(r.updateRenderState({depthNear:C.near,depthFar:C.far}),D=C.near,Z=C.far);let ye=le.parent,Pe=C.cameras;ue(C,ye);for(let Ne=0;Ne<Pe.length;Ne++)ue(Pe[Ne],ye);Pe.length===2?ae(C,P,I):C.projectionMatrix.copy(P.projectionMatrix),me(le,C,ye)};function me(le,ye,Pe){Pe===null?le.matrix.copy(ye.matrixWorld):(le.matrix.copy(Pe.matrixWorld),le.matrix.invert(),le.matrix.multiply(ye.matrixWorld)),le.matrix.decompose(le.position,le.quaternion,le.scale),le.updateMatrixWorld(!0),le.projectionMatrix.copy(ye.projectionMatrix),le.projectionMatrixInverse.copy(ye.projectionMatrixInverse),le.isPerspectiveCamera&&(le.fov=Pr*2*Math.atan(1/le.projectionMatrix.elements[5]),le.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(le){c=le,d!==null&&(d.fixedFoveation=le),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=le)};let fe=null;function Me(le,ye){if(u=ye.getViewerPose(h||a),S=ye,u!==null){let Pe=u.views;p!==null&&(e.setRenderTargetFramebuffer(l,p.framebuffer),e.setRenderTarget(l));let Ne=!1;Pe.length!==C.cameras.length&&(C.cameras.length=0,Ne=!0);for(let Ve=0;Ve<Pe.length;Ve++){let Ke=Pe[Ve],Qe=null;if(p!==null)Qe=p.getViewport(Ke);else{let Ye=f.getViewSubImage(d,Ke);Qe=Ye.viewport,Ve===0&&(e.setRenderTargetTextures(l,Ye.colorTexture,d.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(l))}let He=z[Ve];He===void 0&&(He=new Lt,He.layers.enable(Ve),He.viewport=new pt,z[Ve]=He),He.matrix.fromArray(Ke.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Ke.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Ve===0&&(C.matrix.copy(He.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Ne===!0&&C.cameras.push(He)}}for(let Pe=0;Pe<v.length;Pe++){let Ne=g[Pe],Ve=v[Pe];Ne!==null&&Ve!==void 0&&Ve.update(Ne,ye,h||a)}fe&&fe(le,ye),ye.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ye}),S=null}let Le=new zu;Le.setAnimationLoop(Me),this.setAnimationLoop=function(le){fe=le},this.dispose=function(){}}};function Rv(i,e){function t(m,l){m.matrixAutoUpdate===!0&&m.updateMatrix(),l.value.copy(m.matrix)}function n(m,l){l.color.getRGB(m.fogColor.value,Bu(i)),l.isFog?(m.fogNear.value=l.near,m.fogFar.value=l.far):l.isFogExp2&&(m.fogDensity.value=l.density)}function r(m,l,v,g,_){l.isMeshBasicMaterial||l.isMeshLambertMaterial?s(m,l):l.isMeshToonMaterial?(s(m,l),f(m,l)):l.isMeshPhongMaterial?(s(m,l),u(m,l)):l.isMeshStandardMaterial?(s(m,l),d(m,l),l.isMeshPhysicalMaterial&&p(m,l,_)):l.isMeshMatcapMaterial?(s(m,l),S(m,l)):l.isMeshDepthMaterial?s(m,l):l.isMeshDistanceMaterial?(s(m,l),y(m,l)):l.isMeshNormalMaterial?s(m,l):l.isLineBasicMaterial?(a(m,l),l.isLineDashedMaterial&&o(m,l)):l.isPointsMaterial?c(m,l,v,g):l.isSpriteMaterial?h(m,l):l.isShadowMaterial?(m.color.value.copy(l.color),m.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function s(m,l){m.opacity.value=l.opacity,l.color&&m.diffuse.value.copy(l.color),l.emissive&&m.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(m.map.value=l.map,t(l.map,m.mapTransform)),l.alphaMap&&(m.alphaMap.value=l.alphaMap,t(l.alphaMap,m.alphaMapTransform)),l.bumpMap&&(m.bumpMap.value=l.bumpMap,t(l.bumpMap,m.bumpMapTransform),m.bumpScale.value=l.bumpScale,l.side===dn&&(m.bumpScale.value*=-1)),l.normalMap&&(m.normalMap.value=l.normalMap,t(l.normalMap,m.normalMapTransform),m.normalScale.value.copy(l.normalScale),l.side===dn&&m.normalScale.value.negate()),l.displacementMap&&(m.displacementMap.value=l.displacementMap,t(l.displacementMap,m.displacementMapTransform),m.displacementScale.value=l.displacementScale,m.displacementBias.value=l.displacementBias),l.emissiveMap&&(m.emissiveMap.value=l.emissiveMap,t(l.emissiveMap,m.emissiveMapTransform)),l.specularMap&&(m.specularMap.value=l.specularMap,t(l.specularMap,m.specularMapTransform)),l.alphaTest>0&&(m.alphaTest.value=l.alphaTest);let v=e.get(l).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=l.reflectivity,m.ior.value=l.ior,m.refractionRatio.value=l.refractionRatio),l.lightMap){m.lightMap.value=l.lightMap;let g=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=l.lightMapIntensity*g,t(l.lightMap,m.lightMapTransform)}l.aoMap&&(m.aoMap.value=l.aoMap,m.aoMapIntensity.value=l.aoMapIntensity,t(l.aoMap,m.aoMapTransform))}function a(m,l){m.diffuse.value.copy(l.color),m.opacity.value=l.opacity,l.map&&(m.map.value=l.map,t(l.map,m.mapTransform))}function o(m,l){m.dashSize.value=l.dashSize,m.totalSize.value=l.dashSize+l.gapSize,m.scale.value=l.scale}function c(m,l,v,g){m.diffuse.value.copy(l.color),m.opacity.value=l.opacity,m.size.value=l.size*v,m.scale.value=g*.5,l.map&&(m.map.value=l.map,t(l.map,m.uvTransform)),l.alphaMap&&(m.alphaMap.value=l.alphaMap,t(l.alphaMap,m.alphaMapTransform)),l.alphaTest>0&&(m.alphaTest.value=l.alphaTest)}function h(m,l){m.diffuse.value.copy(l.color),m.opacity.value=l.opacity,m.rotation.value=l.rotation,l.map&&(m.map.value=l.map,t(l.map,m.mapTransform)),l.alphaMap&&(m.alphaMap.value=l.alphaMap,t(l.alphaMap,m.alphaMapTransform)),l.alphaTest>0&&(m.alphaTest.value=l.alphaTest)}function u(m,l){m.specular.value.copy(l.specular),m.shininess.value=Math.max(l.shininess,1e-4)}function f(m,l){l.gradientMap&&(m.gradientMap.value=l.gradientMap)}function d(m,l){m.metalness.value=l.metalness,l.metalnessMap&&(m.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,m.metalnessMapTransform)),m.roughness.value=l.roughness,l.roughnessMap&&(m.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,m.roughnessMapTransform)),e.get(l).envMap&&(m.envMapIntensity.value=l.envMapIntensity)}function p(m,l,v){m.ior.value=l.ior,l.sheen>0&&(m.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),m.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(m.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,m.sheenColorMapTransform)),l.sheenRoughnessMap&&(m.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,m.sheenRoughnessMapTransform))),l.clearcoat>0&&(m.clearcoat.value=l.clearcoat,m.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(m.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,m.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(m.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===dn&&m.clearcoatNormalScale.value.negate())),l.iridescence>0&&(m.iridescence.value=l.iridescence,m.iridescenceIOR.value=l.iridescenceIOR,m.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(m.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,m.iridescenceMapTransform)),l.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),l.transmission>0&&(m.transmission.value=l.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),l.transmissionMap&&(m.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,m.transmissionMapTransform)),m.thickness.value=l.thickness,l.thicknessMap&&(m.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=l.attenuationDistance,m.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(m.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(m.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=l.specularIntensity,m.specularColor.value.copy(l.specularColor),l.specularColorMap&&(m.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,m.specularColorMapTransform)),l.specularIntensityMap&&(m.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,m.specularIntensityMapTransform))}function S(m,l){l.matcap&&(m.matcap.value=l.matcap)}function y(m,l){let v=e.get(l).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Cv(i,e,t,n){let r={},s={},a=[],o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,g){let _=g.program;n.uniformBlockBinding(v,_)}function h(v,g){let _=r[v.id];_===void 0&&(S(v),_=u(v),r[v.id]=_,v.addEventListener("dispose",m));let b=g.program;n.updateUBOMapping(v,b);let P=e.render.frame;s[v.id]!==P&&(d(v),s[v.id]=P)}function u(v){let g=f();v.__bindingPointIndex=g;let _=i.createBuffer(),b=v.__size,P=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,b,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,_),_}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let g=r[v.id],_=v.uniforms,b=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let P=0,I=_.length;P<I;P++){let z=_[P];if(p(z,P,b)===!0){let C=z.__offset,D=Array.isArray(z.value)?z.value:[z.value],Z=0;for(let K=0;K<D.length;K++){let ie=D[K],V=y(ie);typeof ie=="number"?(z.__data[0]=ie,i.bufferSubData(i.UNIFORM_BUFFER,C+Z,z.__data)):ie.isMatrix3?(z.__data[0]=ie.elements[0],z.__data[1]=ie.elements[1],z.__data[2]=ie.elements[2],z.__data[3]=ie.elements[0],z.__data[4]=ie.elements[3],z.__data[5]=ie.elements[4],z.__data[6]=ie.elements[5],z.__data[7]=ie.elements[0],z.__data[8]=ie.elements[6],z.__data[9]=ie.elements[7],z.__data[10]=ie.elements[8],z.__data[11]=ie.elements[0]):(ie.toArray(z.__data,Z),Z+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,C,z.__data)}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,g,_){let b=v.value;if(_[g]===void 0){if(typeof b=="number")_[g]=b;else{let P=Array.isArray(b)?b:[b],I=[];for(let z=0;z<P.length;z++)I.push(P[z].clone());_[g]=I}return!0}else if(typeof b=="number"){if(_[g]!==b)return _[g]=b,!0}else{let P=Array.isArray(_[g])?_[g]:[_[g]],I=Array.isArray(b)?b:[b];for(let z=0;z<P.length;z++){let C=P[z];if(C.equals(I[z])===!1)return C.copy(I[z]),!0}}return!1}function S(v){let g=v.uniforms,_=0,b=16,P=0;for(let I=0,z=g.length;I<z;I++){let C=g[I],D={boundary:0,storage:0},Z=Array.isArray(C.value)?C.value:[C.value];for(let K=0,ie=Z.length;K<ie;K++){let V=Z[K],q=y(V);D.boundary+=q.boundary,D.storage+=q.storage}if(C.__data=new Float32Array(D.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=_,I>0){P=_%b;let K=b-P;P!==0&&K-D.boundary<0&&(_+=b-P,C.__offset=_)}_+=D.storage}return P=_%b,P>0&&(_+=b-P),v.__size=_,v.__cache={},this}function y(v){let g={boundary:0,storage:0};return typeof v=="number"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function m(v){let g=v.target;g.removeEventListener("dispose",m);let _=a.indexOf(g.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function l(){for(let v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:h,dispose:l}}var Wi=class{constructor(e={}){let{canvas:t=zp(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let p=new Uint32Array(4),S=new Int32Array(4),y=null,m=null,l=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=St,this._useLegacyLights=!1,this.toneMapping=yi,this.toneMappingExposure=1;let g=this,_=!1,b=0,P=0,I=null,z=-1,C=null,D=new pt,Z=new pt,K=null,ie=new Je(0),V=0,q=t.width,ne=t.height,ae=1,ue=null,me=null,fe=new pt(0,0,q,ne),Me=new pt(0,0,q,ne),Le=!1,le=new ps,ye=!1,Pe=!1,Ne=null,Ve=new je,Ke=new nt,Qe=new j,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ye(){return I===null?ae:1}let re=n;function et(N,x){for(let T=0;T<N.length;T++){let R=N[T],w=t.getContext(R,x);if(w!==null)return w}return null}try{let N={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hl}`),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",te,!1),t.addEventListener("webglcontextcreationerror",Ce,!1),re===null){let x=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&x.shift(),re=et(x,N),re===null)throw et(x)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&re instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),re.getShaderPrecisionFormat===void 0&&(re.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let Fe,at,Xe,mt,$e,E,O,F,W,L,A,G,X,oe,se,pe,he,we,H,_e,ve,qe,Ue,Ze;function Ie(){Fe=new J0(re),at=new G0(re,Fe,e),Fe.init(at),qe=new Ev(re,Fe,at),Xe=new Tv(re,Fe,at),mt=new j0(re),$e=new fv,E=new wv(re,Fe,Xe,$e,at,qe,mt),O=new X0(g),F=new Z0(g),W=new am(re,at),Ue=new V0(re,Fe,W,at),L=new K0(re,W,mt,Ue),A=new n_(re,L,W,mt),H=new t_(re,at,E),pe=new W0($e),G=new uv(g,O,F,Fe,at,Ue,pe),X=new Rv(g,$e),oe=new pv,se=new xv(Fe,at),we=new k0(g,O,F,Xe,A,d,c),he=new bv(g,A,at),Ze=new Cv(re,mt,at,Xe),_e=new H0(re,Fe,mt,at),ve=new $0(re,Fe,mt,at),mt.programs=G.programs,g.capabilities=at,g.extensions=Fe,g.properties=$e,g.renderLists=oe,g.shadowMap=he,g.state=Xe,g.info=mt}Ie();let ze=new Tl(g,re);this.xr=ze,this.getContext=function(){return re},this.getContextAttributes=function(){return re.getContextAttributes()},this.forceContextLoss=function(){let N=Fe.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){let N=Fe.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(N){N!==void 0&&(ae=N,this.setSize(q,ne,!1))},this.getSize=function(N){return N.set(q,ne)},this.setSize=function(N,x,T=!0){if(ze.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=N,ne=x,t.width=Math.floor(N*ae),t.height=Math.floor(x*ae),T===!0&&(t.style.width=N+"px",t.style.height=x+"px"),this.setViewport(0,0,N,x)},this.getDrawingBufferSize=function(N){return N.set(q*ae,ne*ae).floor()},this.setDrawingBufferSize=function(N,x,T){q=N,ne=x,ae=T,t.width=Math.floor(N*T),t.height=Math.floor(x*T),this.setViewport(0,0,N,x)},this.getCurrentViewport=function(N){return N.copy(D)},this.getViewport=function(N){return N.copy(fe)},this.setViewport=function(N,x,T,R){N.isVector4?fe.set(N.x,N.y,N.z,N.w):fe.set(N,x,T,R),Xe.viewport(D.copy(fe).multiplyScalar(ae).floor())},this.getScissor=function(N){return N.copy(Me)},this.setScissor=function(N,x,T,R){N.isVector4?Me.set(N.x,N.y,N.z,N.w):Me.set(N,x,T,R),Xe.scissor(Z.copy(Me).multiplyScalar(ae).floor())},this.getScissorTest=function(){return Le},this.setScissorTest=function(N){Xe.setScissorTest(Le=N)},this.setOpaqueSort=function(N){ue=N},this.setTransparentSort=function(N){me=N},this.getClearColor=function(N){return N.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(N=!0,x=!0,T=!0){let R=0;if(N){let w=!1;if(I!==null){let M=I.texture.format;w=M===Iu||M===Lu||M===Pu}if(w){let M=I.texture.type,k=M===xi||M===_i||M===Wl||M===Vi||M===Ru||M===Cu,U=we.getClearColor(),B=we.getClearAlpha(),J=U.r,ee=U.g,Y=U.b;k?(p[0]=J,p[1]=ee,p[2]=Y,p[3]=B,re.clearBufferuiv(re.COLOR,0,p)):(S[0]=J,S[1]=ee,S[2]=Y,S[3]=B,re.clearBufferiv(re.COLOR,0,S))}else R|=re.COLOR_BUFFER_BIT}x&&(R|=re.DEPTH_BUFFER_BIT),T&&(R|=re.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),re.clear(R)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",te,!1),t.removeEventListener("webglcontextcreationerror",Ce,!1),oe.dispose(),se.dispose(),$e.dispose(),O.dispose(),F.dispose(),A.dispose(),Ue.dispose(),Ze.dispose(),G.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",Ht),ze.removeEventListener("sessionend",vt),Ne&&(Ne.dispose(),Ne=null),Gt.stop()};function it(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function te(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;let N=mt.autoReset,x=he.enabled,T=he.autoUpdate,R=he.needsUpdate,w=he.type;Ie(),mt.autoReset=N,he.enabled=x,he.autoUpdate=T,he.needsUpdate=R,he.type=w}function Ce(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function Ee(N){let x=N.target;x.removeEventListener("dispose",Ee),ge(x)}function ge(N){Ae(N),$e.remove(N)}function Ae(N){let x=$e.get(N).programs;x!==void 0&&(x.forEach(function(T){G.releaseProgram(T)}),N.isShaderMaterial&&G.releaseShaderCache(N))}this.renderBufferDirect=function(N,x,T,R,w,M){x===null&&(x=He);let k=w.isMesh&&w.matrixWorld.determinant()<0,U=lo(N,x,T,R,w);Xe.setMaterial(R,k);let B=T.index,J=1;if(R.wireframe===!0){if(B=L.getWireframeAttribute(T),B===void 0)return;J=2}let ee=T.drawRange,Y=T.attributes.position,ce=ee.start*J,xe=(ee.start+ee.count)*J;M!==null&&(ce=Math.max(ce,M.start*J),xe=Math.min(xe,(M.start+M.count)*J)),B!==null?(ce=Math.max(ce,0),xe=Math.min(xe,B.count)):Y!=null&&(ce=Math.max(ce,0),xe=Math.min(xe,Y.count));let Se=xe-ce;if(Se<0||Se===1/0)return;Ue.setup(w,R,U,T,B);let de,Te=_e;if(B!==null&&(de=W.get(B),Te=ve,Te.setIndex(de)),w.isMesh)R.wireframe===!0?(Xe.setLineWidth(R.wireframeLinewidth*Ye()),Te.setMode(re.LINES)):Te.setMode(re.TRIANGLES);else if(w.isLine){let Re=R.linewidth;Re===void 0&&(Re=1),Xe.setLineWidth(Re*Ye()),w.isLineSegments?Te.setMode(re.LINES):w.isLineLoop?Te.setMode(re.LINE_LOOP):Te.setMode(re.LINE_STRIP)}else w.isPoints?Te.setMode(re.POINTS):w.isSprite&&Te.setMode(re.TRIANGLES);if(w.isBatchedMesh)Te.renderMultiDraw(w._multiDrawStarts,w._multiDrawCounts,w._multiDrawCount);else if(w.isInstancedMesh)Te.renderInstances(ce,Se,w.count);else if(T.isInstancedBufferGeometry){let Re=T._maxInstanceCount!==void 0?T._maxInstanceCount:1/0,tt=Math.min(T.instanceCount,Re);Te.renderInstances(ce,Se,tt)}else Te.render(ce,Se)};function Ge(N,x,T){N.transparent===!0&&N.side===Kn&&N.forceSinglePass===!1?(N.side=dn,N.needsUpdate=!0,er(N,x,T),N.side=Si,N.needsUpdate=!0,er(N,x,T),N.side=Kn):er(N,x,T)}this.compile=function(N,x,T=null){T===null&&(T=N),m=se.get(T),m.init(),v.push(m),T.traverseVisible(function(w){w.isLight&&w.layers.test(x.layers)&&(m.pushLight(w),w.castShadow&&m.pushShadow(w))}),N!==T&&N.traverseVisible(function(w){w.isLight&&w.layers.test(x.layers)&&(m.pushLight(w),w.castShadow&&m.pushShadow(w))}),m.setupLights(g._useLegacyLights);let R=new Set;return N.traverse(function(w){let M=w.material;if(M)if(Array.isArray(M))for(let k=0;k<M.length;k++){let U=M[k];Ge(U,T,w),R.add(U)}else Ge(M,T,w),R.add(M)}),v.pop(),m=null,R},this.compileAsync=function(N,x,T=null){let R=this.compile(N,x,T);return new Promise(w=>{function M(){if(R.forEach(function(k){$e.get(k).currentProgram.isReady()&&R.delete(k)}),R.size===0){w(N);return}setTimeout(M,10)}Fe.get("KHR_parallel_shader_compile")!==null?M():setTimeout(M,10)})};let lt=null;function Pt(N){lt&&lt(N)}function Ht(){Gt.stop()}function vt(){Gt.start()}let Gt=new zu;Gt.setAnimationLoop(Pt),typeof self<"u"&&Gt.setContext(self),this.setAnimationLoop=function(N){lt=N,ze.setAnimationLoop(N),N===null?Gt.stop():Gt.start()},ze.addEventListener("sessionstart",Ht),ze.addEventListener("sessionend",vt),this.render=function(N,x){if(x!==void 0&&x.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(x),x=ze.getCamera()),N.isScene===!0&&N.onBeforeRender(g,N,x,I),m=se.get(N,v.length),m.init(),v.push(m),Ve.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),le.setFromProjectionMatrix(Ve),Pe=this.localClippingEnabled,ye=pe.init(this.clippingPlanes,Pe),y=oe.get(N,l.length),y.init(),l.push(y),mn(N,x,0,g.sortObjects),y.finish(),g.sortObjects===!0&&y.sort(ue,me),this.info.render.frame++,ye===!0&&pe.beginShadows();let T=m.state.shadowsArray;if(he.render(T,N,x),ye===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),we.render(y,N),m.setupLights(g._useLegacyLights),x.isArrayCamera){let R=x.cameras;for(let w=0,M=R.length;w<M;w++){let k=R[w];Qi(y,N,k,k.viewport)}}else Qi(y,N,x);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),N.isScene===!0&&N.onAfterRender(g,N,x),Ue.resetDefaultState(),z=-1,C=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,l.pop(),l.length>0?y=l[l.length-1]:y=null};function mn(N,x,T,R){if(N.visible===!1)return;if(N.layers.test(x.layers)){if(N.isGroup)T=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(x);else if(N.isLight)m.pushLight(N),N.castShadow&&m.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||le.intersectsSprite(N)){R&&Qe.setFromMatrixPosition(N.matrixWorld).applyMatrix4(Ve);let k=A.update(N),U=N.material;U.visible&&y.push(N,k,U,T,Qe.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||le.intersectsObject(N))){let k=A.update(N),U=N.material;if(R&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),Qe.copy(N.boundingSphere.center)):(k.boundingSphere===null&&k.computeBoundingSphere(),Qe.copy(k.boundingSphere.center)),Qe.applyMatrix4(N.matrixWorld).applyMatrix4(Ve)),Array.isArray(U)){let B=k.groups;for(let J=0,ee=B.length;J<ee;J++){let Y=B[J],ce=U[Y.materialIndex];ce&&ce.visible&&y.push(N,k,ce,T,Qe.z,Y)}}else U.visible&&y.push(N,k,U,T,Qe.z,null)}}let M=N.children;for(let k=0,U=M.length;k<U;k++)mn(M[k],x,T,R)}function Qi(N,x,T,R){let w=N.opaque,M=N.transmissive,k=N.transparent;m.setupLightsView(T),ye===!0&&pe.setGlobalState(g.clippingPlanes,T),M.length>0&&Rs(w,M,x,T),R&&Xe.viewport(D.copy(R)),w.length>0&&En(w,x,T),M.length>0&&En(M,x,T),k.length>0&&En(k,x,T),Xe.buffers.depth.setTest(!0),Xe.buffers.depth.setMask(!0),Xe.buffers.color.setMask(!0),Xe.setPolygonOffset(!1)}function Rs(N,x,T,R){if((T.isScene===!0?T.overrideMaterial:null)!==null)return;let M=at.isWebGL2;Ne===null&&(Ne=new ti(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")?hs:xi,minFilter:cs,samples:M?4:0})),g.getDrawingBufferSize(Ke),M?Ne.setSize(Ke.x,Ke.y):Ne.setSize(Sa(Ke.x),Sa(Ke.y));let k=g.getRenderTarget();g.setRenderTarget(Ne),g.getClearColor(ie),V=g.getClearAlpha(),V<1&&g.setClearColor(16777215,.5),g.clear();let U=g.toneMapping;g.toneMapping=yi,En(N,T,R),E.updateMultisampleRenderTarget(Ne),E.updateRenderTargetMipmap(Ne);let B=!1;for(let J=0,ee=x.length;J<ee;J++){let Y=x[J],ce=Y.object,xe=Y.geometry,Se=Y.material,de=Y.group;if(Se.side===Kn&&ce.layers.test(R.layers)){let Te=Se.side;Se.side=dn,Se.needsUpdate=!0,Cs(ce,T,R,xe,Se,de),Se.side=Te,Se.needsUpdate=!0,B=!0}}B===!0&&(E.updateMultisampleRenderTarget(Ne),E.updateRenderTargetMipmap(Ne)),g.setRenderTarget(k),g.setClearColor(ie,V),g.toneMapping=U}function En(N,x,T){let R=x.isScene===!0?x.overrideMaterial:null;for(let w=0,M=N.length;w<M;w++){let k=N[w],U=k.object,B=k.geometry,J=R===null?k.material:R,ee=k.group;U.layers.test(T.layers)&&Cs(U,x,T,B,J,ee)}}function Cs(N,x,T,R,w,M){N.onBeforeRender(g,x,T,R,w,M),N.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),w.onBeforeRender(g,x,T,R,N,M),w.transparent===!0&&w.side===Kn&&w.forceSinglePass===!1?(w.side=dn,w.needsUpdate=!0,g.renderBufferDirect(T,x,R,w,N,M),w.side=Si,w.needsUpdate=!0,g.renderBufferDirect(T,x,R,w,N,M),w.side=Kn):g.renderBufferDirect(T,x,R,w,N,M),N.onAfterRender(g,x,T,R,w,M)}function er(N,x,T){x.isScene!==!0&&(x=He);let R=$e.get(N),w=m.state.lights,M=m.state.shadowsArray,k=w.state.version,U=G.getParameters(N,w.state,M,x,T),B=G.getProgramCacheKey(U),J=R.programs;R.environment=N.isMeshStandardMaterial?x.environment:null,R.fog=x.fog,R.envMap=(N.isMeshStandardMaterial?F:O).get(N.envMap||R.environment),J===void 0&&(N.addEventListener("dispose",Ee),J=new Map,R.programs=J);let ee=J.get(B);if(ee!==void 0){if(R.currentProgram===ee&&R.lightsStateVersion===k)return Ii(N,U),ee}else U.uniforms=G.getUniforms(N),N.onBuild(T,U,g),N.onBeforeCompile(U,g),ee=G.acquireProgram(U,B),J.set(B,ee),R.uniforms=U.uniforms;let Y=R.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(Y.clippingPlanes=pe.uniform),Ii(N,U),R.needsLights=ho(N),R.lightsStateVersion=k,R.needsLights&&(Y.ambientLightColor.value=w.state.ambient,Y.lightProbe.value=w.state.probe,Y.directionalLights.value=w.state.directional,Y.directionalLightShadows.value=w.state.directionalShadow,Y.spotLights.value=w.state.spot,Y.spotLightShadows.value=w.state.spotShadow,Y.rectAreaLights.value=w.state.rectArea,Y.ltc_1.value=w.state.rectAreaLTC1,Y.ltc_2.value=w.state.rectAreaLTC2,Y.pointLights.value=w.state.point,Y.pointLightShadows.value=w.state.pointShadow,Y.hemisphereLights.value=w.state.hemi,Y.directionalShadowMap.value=w.state.directionalShadowMap,Y.directionalShadowMatrix.value=w.state.directionalShadowMatrix,Y.spotShadowMap.value=w.state.spotShadowMap,Y.spotLightMatrix.value=w.state.spotLightMatrix,Y.spotLightMap.value=w.state.spotLightMap,Y.pointShadowMap.value=w.state.pointShadowMap,Y.pointShadowMatrix.value=w.state.pointShadowMatrix),R.currentProgram=ee,R.uniformsList=null,ee}function Ps(N){if(N.uniformsList===null){let x=N.currentProgram.getUniforms();N.uniformsList=wr.seqWithValue(x.seq,N.uniforms)}return N.uniformsList}function Ii(N,x){let T=$e.get(N);T.outputColorSpace=x.outputColorSpace,T.batching=x.batching,T.instancing=x.instancing,T.instancingColor=x.instancingColor,T.skinning=x.skinning,T.morphTargets=x.morphTargets,T.morphNormals=x.morphNormals,T.morphColors=x.morphColors,T.morphTargetsCount=x.morphTargetsCount,T.numClippingPlanes=x.numClippingPlanes,T.numIntersection=x.numClipIntersection,T.vertexAlphas=x.vertexAlphas,T.vertexTangents=x.vertexTangents,T.toneMapping=x.toneMapping}function lo(N,x,T,R,w){x.isScene!==!0&&(x=He),E.resetTextureUnits();let M=x.fog,k=R.isMeshStandardMaterial?x.environment:null,U=I===null?g.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ei,B=(R.isMeshStandardMaterial?F:O).get(R.envMap||k),J=R.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,ee=!!T.attributes.tangent&&(!!R.normalMap||R.anisotropy>0),Y=!!T.morphAttributes.position,ce=!!T.morphAttributes.normal,xe=!!T.morphAttributes.color,Se=yi;R.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Se=g.toneMapping);let de=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,Te=de!==void 0?de.length:0,Re=$e.get(R),tt=m.state.lights;if(ye===!0&&(Pe===!0||N!==C)){let st=N===C&&R.id===z;pe.setState(R,N,st)}let We=!1;R.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==tt.state.version||Re.outputColorSpace!==U||w.isBatchedMesh&&Re.batching===!1||!w.isBatchedMesh&&Re.batching===!0||w.isInstancedMesh&&Re.instancing===!1||!w.isInstancedMesh&&Re.instancing===!0||w.isSkinnedMesh&&Re.skinning===!1||!w.isSkinnedMesh&&Re.skinning===!0||w.isInstancedMesh&&Re.instancingColor===!0&&w.instanceColor===null||w.isInstancedMesh&&Re.instancingColor===!1&&w.instanceColor!==null||Re.envMap!==B||R.fog===!0&&Re.fog!==M||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==pe.numPlanes||Re.numIntersection!==pe.numIntersection)||Re.vertexAlphas!==J||Re.vertexTangents!==ee||Re.morphTargets!==Y||Re.morphNormals!==ce||Re.morphColors!==xe||Re.toneMapping!==Se||at.isWebGL2===!0&&Re.morphTargetsCount!==Te)&&(We=!0):(We=!0,Re.__version=R.version);let ke=Re.currentProgram;We===!0&&(ke=er(R,x,w));let Be=!1,be=!1,ct=!1,rt=ke.getUniforms(),De=Re.uniforms;if(Xe.useProgram(ke.program)&&(Be=!0,be=!0,ct=!0),R.id!==z&&(z=R.id,be=!0),Be||C!==N){rt.setValue(re,"projectionMatrix",N.projectionMatrix),rt.setValue(re,"viewMatrix",N.matrixWorldInverse);let st=rt.map.cameraPosition;st!==void 0&&st.setValue(re,Qe.setFromMatrixPosition(N.matrixWorld)),at.logarithmicDepthBuffer&&rt.setValue(re,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),(R.isMeshPhongMaterial||R.isMeshToonMaterial||R.isMeshLambertMaterial||R.isMeshBasicMaterial||R.isMeshStandardMaterial||R.isShaderMaterial)&&rt.setValue(re,"isOrthographic",N.isOrthographicCamera===!0),C!==N&&(C=N,be=!0,ct=!0)}if(w.isSkinnedMesh){rt.setOptional(re,w,"bindMatrix"),rt.setOptional(re,w,"bindMatrixInverse");let st=w.skeleton;st&&(at.floatVertexTextures?(st.boneTexture===null&&st.computeBoneTexture(),rt.setValue(re,"boneTexture",st.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}w.isBatchedMesh&&(rt.setOptional(re,w,"batchingTexture"),rt.setValue(re,"batchingTexture",w._matricesTexture,E));let Bt=T.morphAttributes;if((Bt.position!==void 0||Bt.normal!==void 0||Bt.color!==void 0&&at.isWebGL2===!0)&&H.update(w,T,ke),(be||Re.receiveShadow!==w.receiveShadow)&&(Re.receiveShadow=w.receiveShadow,rt.setValue(re,"receiveShadow",w.receiveShadow)),R.isMeshGouraudMaterial&&R.envMap!==null&&(De.envMap.value=B,De.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1),be&&(rt.setValue(re,"toneMappingExposure",g.toneMappingExposure),Re.needsLights&&co(De,ct),M&&R.fog===!0&&X.refreshFogUniforms(De,M),X.refreshMaterialUniforms(De,R,ae,ne,Ne),wr.upload(re,Ps(Re),De,E)),R.isShaderMaterial&&R.uniformsNeedUpdate===!0&&(wr.upload(re,Ps(Re),De,E),R.uniformsNeedUpdate=!1),R.isSpriteMaterial&&rt.setValue(re,"center",w.center),rt.setValue(re,"modelViewMatrix",w.modelViewMatrix),rt.setValue(re,"normalMatrix",w.normalMatrix),rt.setValue(re,"modelMatrix",w.matrixWorld),R.isShaderMaterial||R.isRawShaderMaterial){let st=R.uniformsGroups;for(let Zt=0,li=st.length;Zt<li;Zt++)if(at.isWebGL2){let Tt=st[Zt];Ze.update(Tt,ke),Ze.bind(Tt,ke)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ke}function co(N,x){N.ambientLightColor.needsUpdate=x,N.lightProbe.needsUpdate=x,N.directionalLights.needsUpdate=x,N.directionalLightShadows.needsUpdate=x,N.pointLights.needsUpdate=x,N.pointLightShadows.needsUpdate=x,N.spotLights.needsUpdate=x,N.spotLightShadows.needsUpdate=x,N.rectAreaLights.needsUpdate=x,N.hemisphereLights.needsUpdate=x}function ho(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(N,x,T){$e.get(N.texture).__webglTexture=x,$e.get(N.depthTexture).__webglTexture=T;let R=$e.get(N);R.__hasExternalTextures=!0,R.__hasExternalTextures&&(R.__autoAllocateDepthBuffer=T===void 0,R.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),R.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(N,x){let T=$e.get(N);T.__webglFramebuffer=x,T.__useDefaultFramebuffer=x===void 0},this.setRenderTarget=function(N,x=0,T=0){I=N,b=x,P=T;let R=!0,w=null,M=!1,k=!1;if(N){let B=$e.get(N);B.__useDefaultFramebuffer!==void 0?(Xe.bindFramebuffer(re.FRAMEBUFFER,null),R=!1):B.__webglFramebuffer===void 0?E.setupRenderTarget(N):B.__hasExternalTextures&&E.rebindTextures(N,$e.get(N.texture).__webglTexture,$e.get(N.depthTexture).__webglTexture);let J=N.texture;(J.isData3DTexture||J.isDataArrayTexture||J.isCompressedArrayTexture)&&(k=!0);let ee=$e.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(ee[x])?w=ee[x][T]:w=ee[x],M=!0):at.isWebGL2&&N.samples>0&&E.useMultisampledRTT(N)===!1?w=$e.get(N).__webglMultisampledFramebuffer:Array.isArray(ee)?w=ee[T]:w=ee,D.copy(N.viewport),Z.copy(N.scissor),K=N.scissorTest}else D.copy(fe).multiplyScalar(ae).floor(),Z.copy(Me).multiplyScalar(ae).floor(),K=Le;if(Xe.bindFramebuffer(re.FRAMEBUFFER,w)&&at.drawBuffers&&R&&Xe.drawBuffers(N,w),Xe.viewport(D),Xe.scissor(Z),Xe.setScissorTest(K),M){let B=$e.get(N.texture);re.framebufferTexture2D(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,re.TEXTURE_CUBE_MAP_POSITIVE_X+x,B.__webglTexture,T)}else if(k){let B=$e.get(N.texture),J=x||0;re.framebufferTextureLayer(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,B.__webglTexture,T||0,J)}z=-1},this.readRenderTargetPixels=function(N,x,T,R,w,M,k){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let U=$e.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&k!==void 0&&(U=U[k]),U){Xe.bindFramebuffer(re.FRAMEBUFFER,U);try{let B=N.texture,J=B.format,ee=B.type;if(J!==xn&&qe.convert(J)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Y=ee===hs&&(Fe.has("EXT_color_buffer_half_float")||at.isWebGL2&&Fe.has("EXT_color_buffer_float"));if(ee!==xi&&qe.convert(ee)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ee===$n&&(at.isWebGL2||Fe.has("OES_texture_float")||Fe.has("WEBGL_color_buffer_float")))&&!Y){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}x>=0&&x<=N.width-R&&T>=0&&T<=N.height-w&&re.readPixels(x,T,R,w,qe.convert(J),qe.convert(ee),M)}finally{let B=I!==null?$e.get(I).__webglFramebuffer:null;Xe.bindFramebuffer(re.FRAMEBUFFER,B)}}},this.copyFramebufferToTexture=function(N,x,T=0){let R=Math.pow(2,-T),w=Math.floor(x.image.width*R),M=Math.floor(x.image.height*R);E.setTexture2D(x,0),re.copyTexSubImage2D(re.TEXTURE_2D,T,0,0,N.x,N.y,w,M),Xe.unbindTexture()},this.copyTextureToTexture=function(N,x,T,R=0){let w=x.image.width,M=x.image.height,k=qe.convert(T.format),U=qe.convert(T.type);E.setTexture2D(T,0),re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,T.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,T.unpackAlignment),x.isDataTexture?re.texSubImage2D(re.TEXTURE_2D,R,N.x,N.y,w,M,k,U,x.image.data):x.isCompressedTexture?re.compressedTexSubImage2D(re.TEXTURE_2D,R,N.x,N.y,x.mipmaps[0].width,x.mipmaps[0].height,k,x.mipmaps[0].data):re.texSubImage2D(re.TEXTURE_2D,R,N.x,N.y,k,U,x.image),R===0&&T.generateMipmaps&&re.generateMipmap(re.TEXTURE_2D),Xe.unbindTexture()},this.copyTextureToTexture3D=function(N,x,T,R,w=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let M=N.max.x-N.min.x+1,k=N.max.y-N.min.y+1,U=N.max.z-N.min.z+1,B=qe.convert(R.format),J=qe.convert(R.type),ee;if(R.isData3DTexture)E.setTexture3D(R,0),ee=re.TEXTURE_3D;else if(R.isDataArrayTexture)E.setTexture2DArray(R,0),ee=re.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,R.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,R.unpackAlignment);let Y=re.getParameter(re.UNPACK_ROW_LENGTH),ce=re.getParameter(re.UNPACK_IMAGE_HEIGHT),xe=re.getParameter(re.UNPACK_SKIP_PIXELS),Se=re.getParameter(re.UNPACK_SKIP_ROWS),de=re.getParameter(re.UNPACK_SKIP_IMAGES),Te=T.isCompressedTexture?T.mipmaps[0]:T.image;re.pixelStorei(re.UNPACK_ROW_LENGTH,Te.width),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,Te.height),re.pixelStorei(re.UNPACK_SKIP_PIXELS,N.min.x),re.pixelStorei(re.UNPACK_SKIP_ROWS,N.min.y),re.pixelStorei(re.UNPACK_SKIP_IMAGES,N.min.z),T.isDataTexture||T.isData3DTexture?re.texSubImage3D(ee,w,x.x,x.y,x.z,M,k,U,B,J,Te.data):T.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),re.compressedTexSubImage3D(ee,w,x.x,x.y,x.z,M,k,U,B,Te.data)):re.texSubImage3D(ee,w,x.x,x.y,x.z,M,k,U,B,J,Te),re.pixelStorei(re.UNPACK_ROW_LENGTH,Y),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,ce),re.pixelStorei(re.UNPACK_SKIP_PIXELS,xe),re.pixelStorei(re.UNPACK_SKIP_ROWS,Se),re.pixelStorei(re.UNPACK_SKIP_IMAGES,de),w===0&&R.generateMipmaps&&re.generateMipmap(ee),Xe.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?E.setTextureCube(N,0):N.isData3DTexture?E.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?E.setTexture2DArray(N,0):E.setTexture2D(N,0),Xe.unbindTexture()},this.resetState=function(){b=0,P=0,I=null,Xe.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Xl?"display-p3":"srgb",t.unpackColorSpace=yt.workingColorSpace===Ja?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===St?Gi:Uu}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Gi?St:ei}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},wl=class extends Wi{};wl.prototype.isWebGL1Renderer=!0;var Pa=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Je(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Or=class extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var ru=new j,su=new pt,au=new pt,Pv=new j,ou=new je,aa=new j,Qo=new ni,lu=new je,el=new ii,La=class extends cn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vc,this.bindMatrix=new je,this.bindMatrixInverse=new je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mi),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,aa),this.boundingBox.expandByPoint(aa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ni),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,aa),this.boundingSphere.expandByPoint(aa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qo.copy(this.boundingSphere),Qo.applyMatrix4(r),e.ray.intersectsSphere(Qo)!==!1&&(lu.copy(r).invert(),el.copy(e.ray).applyMatrix4(lu),!(this.boundingBox!==null&&el.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,el)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new pt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Vc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;su.fromBufferAttribute(r.attributes.skinIndex,e),au.fromBufferAttribute(r.attributes.skinWeight,e),ru.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=au.getComponent(s);if(a!==0){let o=su.getComponent(s);ou.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Pv.copy(ru).applyMatrix4(ou),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Nr=class extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}},El=class extends Qt{constructor(e=null,t=1,n=1,r,s,a,o,c,h=jt,u=jt,f,d){super(null,a,o,c,h,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},cu=new je,Lv=new je,Ia=class i{constructor(e=[],t=[]){this.uuid=Ri(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Lv;cu.multiplyMatrices(o,t[s]),cu.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new El(t,e,e,xn,$n);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Nr),this.bones.push(a),this.boneInverses.push(new je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=n[r];e.boneInverses.push(o.toArray())}return e}};var ms=class extends Dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},hu=new j,uu=new j,fu=new je,tl=new ii,oa=new ni,Da=class extends bt{constructor(e=new rn,t=new ms){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)hu.fromBufferAttribute(t,r-1),uu.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=hu.distanceTo(uu);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(r),oa.radius+=s,e.ray.intersectsSphere(oa)===!1)return;fu.copy(r).invert(),tl.copy(e.ray).applyMatrix4(fu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,h=new j,u=new j,f=new j,d=new j,p=this.isLineSegments?2:1,S=n.index,m=n.attributes.position;if(S!==null){let l=Math.max(0,a.start),v=Math.min(S.count,a.start+a.count);for(let g=l,_=v-1;g<_;g+=p){let b=S.getX(g),P=S.getX(g+1);if(h.fromBufferAttribute(m,b),u.fromBufferAttribute(m,P),tl.distanceSqToSegment(h,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);let z=e.ray.origin.distanceTo(d);z<e.near||z>e.far||t.push({distance:z,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{let l=Math.max(0,a.start),v=Math.min(m.count,a.start+a.count);for(let g=l,_=v-1;g<_;g+=p){if(h.fromBufferAttribute(m,g),u.fromBufferAttribute(m,g+1),tl.distanceSqToSegment(h,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);let P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};var gs=class extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},du=new je,Al=new ii,la=new ni,ca=new j,_s=class extends bt{constructor(e=new rn,t=new gs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(r),la.radius+=s,e.ray.intersectsSphere(la)===!1)return;du.copy(r).invert(),Al.copy(e.ray).applyMatrix4(du);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let S=d,y=p;S<y;S++){let m=h.getX(S);ca.fromBufferAttribute(f,m),pu(ca,m,c,r,e,t,this)}}else{let d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let S=d,y=p;S<y;S++)ca.fromBufferAttribute(f,S),pu(ca,S,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function pu(i,e,t,n,r,s,a){let o=Al.distanceSqToPoint(i);if(o<t){let c=new j;Al.closestPointToPoint(i,c),c.applyMatrix4(n);let h=r.ray.origin.distanceTo(c);if(h<r.near||h>r.far)return;s.push({distance:h,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}var Ua=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,c=s-1,h;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),h=n[r]-a,h<0)o=r+1;else if(h>0)c=r-1;else{c=r;break}if(r=c,n[r]===a)return r/(s-1);let u=n[r],d=n[r+1]-u,p=(a-u)/d;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new nt:new j);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new j,r=[],s=[],a=[],o=new j,c=new je;for(let p=0;p<=e;p++){let S=p/e;r[p]=this.getTangentAt(S,new j)}s[0]=new j,a[0]=new j;let h=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=h&&(h=u,n.set(1,0,0)),f<=h&&(h=f,n.set(0,1,0)),d<=h&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();let S=Math.acos(zt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(o,S))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(zt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let S=1;S<=e;S++)s[S].applyMatrix4(c.makeRotationAxis(r[S],p*S)),a[S].crossVectors(r[S],s[S])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};var Iv={triangulate:function(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Xu(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,h,u,f,d,p;if(n&&(s=Fv(i,e,s,t)),i.length>80*t){o=h=i[0],c=u=i[1];for(let S=t;S<r;S+=t)f=i[S],d=i[S+1],f<o&&(o=f),d<c&&(c=d),f>h&&(h=f),d>u&&(u=d);p=Math.max(h-o,u-c),p=p!==0?32767/p:0}return vs(s,a,t,o,c,p,0),a}};function Xu(i,e,t,n,r){let s,a;if(r===Zv(i,e,t,n)>0)for(s=e;s<t;s+=n)a=mu(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=mu(s,i[s],i[s+1],a);return a&&$a(a,a.next)&&(xs(a),a=a.next),a}function Xi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&($a(t,t.next)||At(t.prev,t,t.next)===0)){if(xs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function vs(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Hv(i,n,r,s);let o=i,c,h;for(;i.prev!==i.next;){if(c=i.prev,h=i.next,s?Uv(i,n,r,s):Dv(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(h.i/t|0),xs(i),i=h.next,o=h.next;continue}if(i=h,i===o){a?a===1?(i=Ov(Xi(i),e,t),vs(i,e,t,n,r,s,2)):a===2&&Nv(i,e,t,n,r,s):vs(Xi(i),e,t,n,r,s,1);break}}}function Dv(i){let e=i.prev,t=i,n=i.next;if(At(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,h=n.y,u=r<s?r<a?r:a:s<a?s:a,f=o<c?o<h?o:h:c<h?c:h,d=r>s?r>a?r:a:s>a?s:a,p=o>c?o>h?o:h:c>h?c:h,S=n.next;for(;S!==e;){if(S.x>=u&&S.x<=d&&S.y>=f&&S.y<=p&&Mr(r,o,s,c,a,h,S.x,S.y)&&At(S.prev,S,S.next)>=0)return!1;S=S.next}return!0}function Uv(i,e,t,n){let r=i.prev,s=i,a=i.next;if(At(r,s,a)>=0)return!1;let o=r.x,c=s.x,h=a.x,u=r.y,f=s.y,d=a.y,p=o<c?o<h?o:h:c<h?c:h,S=u<f?u<d?u:d:f<d?f:d,y=o>c?o>h?o:h:c>h?c:h,m=u>f?u>d?u:d:f>d?f:d,l=Rl(p,S,e,t,n),v=Rl(y,m,e,t,n),g=i.prevZ,_=i.nextZ;for(;g&&g.z>=l&&_&&_.z<=v;){if(g.x>=p&&g.x<=y&&g.y>=S&&g.y<=m&&g!==r&&g!==a&&Mr(o,u,c,f,h,d,g.x,g.y)&&At(g.prev,g,g.next)>=0||(g=g.prevZ,_.x>=p&&_.x<=y&&_.y>=S&&_.y<=m&&_!==r&&_!==a&&Mr(o,u,c,f,h,d,_.x,_.y)&&At(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;g&&g.z>=l;){if(g.x>=p&&g.x<=y&&g.y>=S&&g.y<=m&&g!==r&&g!==a&&Mr(o,u,c,f,h,d,g.x,g.y)&&At(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;_&&_.z<=v;){if(_.x>=p&&_.x<=y&&_.y>=S&&_.y<=m&&_!==r&&_!==a&&Mr(o,u,c,f,h,d,_.x,_.y)&&At(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Ov(i,e,t){let n=i;do{let r=n.prev,s=n.next.next;!$a(r,s)&&Yu(r,n,n.next,s)&&ys(r,s)&&ys(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),xs(n),xs(n.next),n=i=s),n=n.next}while(n!==i);return Xi(n)}function Nv(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Xv(a,o)){let c=qu(a,o);a=Xi(a,a.next),c=Xi(c,c.next),vs(a,e,t,n,r,s,0),vs(c,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Fv(i,e,t,n){let r=[],s,a,o,c,h;for(s=0,a=e.length;s<a;s++)o=e[s]*n,c=s<a-1?e[s+1]*n:i.length,h=Xu(i,o,c,n,!1),h===h.next&&(h.steiner=!0),r.push(Wv(h));for(r.sort(Bv),s=0;s<r.length;s++)t=zv(r[s],t);return t}function Bv(i,e){return i.x-e.x}function zv(i,e){let t=kv(i,e);if(!t)return e;let n=qu(t,i);return Xi(n,n.next),Xi(t,t.next)}function kv(i,e){let t=e,n=-1/0,r,s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,r=t.x<t.next.x?t:t.next,d===s))return r}t=t.next}while(t!==e);if(!r)return null;let o=r,c=r.x,h=r.y,u=1/0,f;t=r;do s>=t.x&&t.x>=c&&s!==t.x&&Mr(a<h?s:n,a,c,h,a<h?n:s,a,t.x,t.y)&&(f=Math.abs(a-t.y)/(s-t.x),ys(t,i)&&(f<u||f===u&&(t.x>r.x||t.x===r.x&&Vv(r,t)))&&(r=t,u=f)),t=t.next;while(t!==o);return r}function Vv(i,e){return At(i.prev,i,e.prev)<0&&At(e.next,i,i.next)<0}function Hv(i,e,t,n){let r=i;do r.z===0&&(r.z=Rl(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Gv(r)}function Gv(i){let e,t,n,r,s,a,o,c,h=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<h&&(o++,n=n.nextZ,!!n);e++);for(c=h;o>0||c>0&&n;)o!==0&&(c===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,h*=2}while(a>1);return i}function Rl(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Wv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Mr(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Xv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Yv(i,e)&&(ys(i,e)&&ys(e,i)&&qv(i,e)&&(At(i.prev,i,e.prev)||At(i,e.prev,e))||$a(i,e)&&At(i.prev,i,i.next)>0&&At(e.prev,e,e.next)>0)}function At(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function $a(i,e){return i.x===e.x&&i.y===e.y}function Yu(i,e,t,n){let r=ua(At(i,e,t)),s=ua(At(i,e,n)),a=ua(At(t,n,i)),o=ua(At(t,n,e));return!!(r!==s&&a!==o||r===0&&ha(i,t,e)||s===0&&ha(i,n,e)||a===0&&ha(t,i,n)||o===0&&ha(t,e,n))}function ha(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ua(i){return i>0?1:i<0?-1:0}function Yv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Yu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ys(i,e){return At(i.prev,i,i.next)<0?At(i,e,i.next)>=0&&At(i,i.prev,e)>=0:At(i,e,i.prev)<0||At(i,i.next,e)<0}function qv(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function qu(i,e){let t=new Cl(i.i,i.x,i.y),n=new Cl(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function mu(i,e,t,n){let r=new Cl(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function xs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Cl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Zv(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Oa=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];gu(e),_u(n,e);let a=e.length;t.forEach(gu);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,_u(n,t[c]);let o=Iv.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function gu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _u(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Na=class i extends rn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),h=0,u=[],f=new j,d=new j,p=[],S=[],y=[],m=[];for(let l=0;l<=n;l++){let v=[],g=l/n,_=0;l===0&&a===0?_=.5/t:l===n&&c===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){let P=b/t;f.x=-e*Math.cos(r+P*s)*Math.sin(a+g*o),f.y=e*Math.cos(a+g*o),f.z=e*Math.sin(r+P*s)*Math.sin(a+g*o),S.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),m.push(P+_,1-g),v.push(h++)}u.push(v)}for(let l=0;l<n;l++)for(let v=0;v<t;v++){let g=u[l][v+1],_=u[l][v],b=u[l+1][v],P=u[l+1][v+1];(l!==0||a>0)&&p.push(g,_,P),(l!==n-1||c<Math.PI)&&p.push(_,b,P)}this.setIndex(p),this.setAttribute("position",new Ct(S,3)),this.setAttribute("normal",new Ct(y,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Pl=class extends Dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Za,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ss=class extends Pl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Fr=class extends Dn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Je(16777215),this.specular=new Je(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Za,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Br=class extends Dn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Za,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function fa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Jv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Kv(i){function e(r,s){return i[r]-i[s]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function vu(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let c=0;c!==e;++c)r[a++]=i[o+c]}return r}function Zu(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}var zr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ll=class extends zr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ph,endingEnd:ph}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case mh:s=e,o=2*t-n;break;case gh:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case mh:a=e,c=2*n-t;break;case gh:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let h=(n-t)*.5,u=this.valueSize;this._weightPrev=h/(t-o),this._weightNext=h/(c-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,h=c-o,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,S=(n-t)/(r-t),y=S*S,m=y*S,l=-d*m+2*d*y-d*S,v=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*S+1,g=(-1-p)*m+(1.5+p)*y+.5*S,_=p*m-p*y;for(let b=0;b!==o;++b)s[b]=l*a[u+b]+v*a[h+b]+g*a[c+b]+_*a[f+b];return s}},Il=class extends zr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,h=c-o,u=(n-t)/(r-t),f=1-u;for(let d=0;d!==o;++d)s[d]=a[h+d]*f+a[c+d]*u;return s}},Dl=class extends zr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fa(t,this.TimeBufferType),this.values=fa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fa(e.times,Array),values:fa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Dl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Il(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ll(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ma:t=this.InterpolantFactoryMethodDiscrete;break;case ga:t=this.InterpolantFactoryMethodLinear;break;case Po:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ma;case this.InterpolantFactoryMethodLinear:return ga;case this.InterpolantFactoryMethodSmooth:return Po}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Jv(r))for(let o=0,c=r.length;o!==c;++o){let h=r[o];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,h),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Po,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,h=e[o],u=e[o+1];if(h!==u&&(o!==1||h!==e[0]))if(r)c=!0;else{let f=o*n,d=f-n,p=f+n;for(let S=0;S!==n;++S){let y=t[f+S];if(y!==t[d+S]||y!==t[p+S]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[f+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,h=0;h!==n;++h)t[c+h]=t[o+h];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};bn.prototype.TimeBufferType=Float32Array;bn.prototype.ValueBufferType=Float32Array;bn.prototype.DefaultInterpolation=ga;var bi=class extends bn{};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=ma;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends bn{};Fa.prototype.ValueTypeName="color";var Ti=class extends bn{};Ti.prototype.ValueTypeName="number";var Ul=class extends zr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),h=e*o;for(let u=h+o;h!==u;h+=4)Ft.slerpFlat(s,0,a,h-o,a,h,c);return s}},kn=class extends bn{InterpolantFactoryMethodLinear(e){return new Ul(this.times,this.values,this.getValueSize(),e)}};kn.prototype.ValueTypeName="quaternion";kn.prototype.DefaultInterpolation=ga;kn.prototype.InterpolantFactoryMethodSmooth=void 0;var wi=class extends bn{};wi.prototype.ValueTypeName="string";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=ma;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends bn{};Ei.prototype.ValueTypeName="vector";var Ba=class{constructor(e,t=-1,n,r=pp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Ri(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(jv(n[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(bn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,a=[];for(let o=0;o<s;o++){let c=[],h=[];c.push((o+s-1)%s,o,(o+1)%s),h.push(0,1,0);let u=Kv(c);c=vu(c,1,u),h=vu(h,1,u),!r&&c[0]===0&&(c.push(s),h.push(h[0])),a.push(new Ti(".morphTargetInfluences["+t[o].name+"]",c,h).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let h=e[o],u=h.name.match(s);if(u&&u.length>1){let f=u[1],d=r[f];d||(r[f]=d=[]),d.push(h)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(f,d,p,S,y){if(p.length!==0){let m=[],l=[];Zu(p,m,l,S),m.length!==0&&y.push(new f(d,m,l))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,h=e.hierarchy||[];for(let f=0;f<h.length;f++){let d=h[f].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},S;for(S=0;S<d.length;S++)if(d[S].morphTargets)for(let y=0;y<d[S].morphTargets.length;y++)p[d[S].morphTargets[y]]=-1;for(let y in p){let m=[],l=[];for(let v=0;v!==d[S].morphTargets.length;++v){let g=d[S];m.push(g.time),l.push(g.morphTarget===y?1:0)}r.push(new Ti(".morphTargetInfluence["+y+"]",m,l))}c=p.length*a}else{let p=".bones["+t[f].name+"]";n(Ei,p+".position",d,"pos",r),n(kn,p+".quaternion",d,"rot",r),n(Ei,p+".scale",d,"scl",r)}}return r.length===0?null:new this(s,c,r,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function $v(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ti;case"vector":case"vector2":case"vector3":case"vector4":return Ei;case"color":return Fa;case"quaternion":return kn;case"bool":case"boolean":return bi;case"string":return wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function jv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=$v(i.type);if(i.times===void 0){let t=[],n=[];Zu(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var za={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Ms=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,c,h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return h.push(u,f),this},this.removeHandler=function(u){let f=h.indexOf(u);return f!==-1&&h.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=h.length;f<d;f+=2){let p=h[f],S=h[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return S}return null}}},Qv=new Ms,Vn=class{constructor(e){this.manager=e!==void 0?e:Qv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Vn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Zn={},Ol=class extends Error{constructor(e,t){super(e),this.response=t}},ka=class extends Vn{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=za.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:r});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||h.body===void 0||h.body.getReader===void 0)return h;let u=Zn[e],f=h.body.getReader(),d=h.headers.get("Content-Length")||h.headers.get("X-File-Size"),p=d?parseInt(d):0,S=p!==0,y=0,m=new ReadableStream({start(l){v();function v(){f.read().then(({done:g,value:_})=>{if(g)l.close();else{y+=_.byteLength;let b=new ProgressEvent("progress",{lengthComputable:S,loaded:y,total:p});for(let P=0,I=u.length;P<I;P++){let z=u[P];z.onProgress&&z.onProgress(b)}l.enqueue(_),v()}})}}});return new Response(m)}else throw new Ol(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(c){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return h.json();default:if(o===void 0)return h.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),d=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(d);return h.arrayBuffer().then(S=>p.decode(S))}}}).then(h=>{za.add(e,h);let u=Zn[e];delete Zn[e];for(let f=0,d=u.length;f<d;f++){let p=u[f];p.onLoad&&p.onLoad(h)}}).catch(h=>{let u=Zn[e];if(u===void 0)throw this.manager.itemError(e),h;delete Zn[e];for(let f=0,d=u.length;f<d;f++){let p=u[f];p.onError&&p.onError(h)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Nl=class extends Vn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=za.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=us("img");function c(){u(),za.add(e,this),t&&t(this),s.manager.itemEnd(e)}function h(f){u(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",h,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",h,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var Ai=class extends Vn{constructor(e){super(e)}load(e,t,n,r){let s=new Qt,a=new Nl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},Yi=class extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Va=class extends Yi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},nl=new je,yu=new j,xu=new j,bs=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ps,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;yu.setFromMatrixPosition(e.matrixWorld),t.position.copy(yu),xu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xu),t.updateMatrixWorld(),nl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(nl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fl=class extends bs{constructor(){super(new Lt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Pr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},kr=class extends Yi{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Fl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Su=new je,ns=new j,il=new j,Bl=class extends bs{constructor(){super(new Lt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new nt(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new j(1,0,0),new j(-1,0,0),new j(0,0,1),new j(0,0,-1),new j(0,1,0),new j(0,-1,0)],this._cubeUps=[new j(0,1,0),new j(0,1,0),new j(0,1,0),new j(0,1,0),new j(0,0,1),new j(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ns.setFromMatrixPosition(e.matrixWorld),n.position.copy(ns),il.copy(n.position),il.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(il),n.updateMatrixWorld(),r.makeTranslation(-ns.x,-ns.y,-ns.z),Su.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Su)}},qi=class extends Yi{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Bl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},zl=class extends bs{constructor(){super(new Ur(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Zi=class extends Yi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new zl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Ha=class extends Yi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ga=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Wa=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Mu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Mu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Mu(){return(typeof performance>"u"?Date:performance).now()}var Zl="\\[\\]\\.:\\/",ey=new RegExp("["+Zl+"]","g"),Jl="[^"+Zl+"]",ty="[^"+Zl.replace("\\.","")+"]",ny=/((?:WC+[\/:])*)/.source.replace("WC",Jl),iy=/(WCOD+)?/.source.replace("WCOD",ty),ry=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jl),sy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jl),ay=new RegExp("^"+ny+iy+ry+sy+"$"),oy=["material","materials","bones","map"],kl=class{constructor(e,t,n){let r=n||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ey,"")}static parseTrackName(e){let t=ay.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);oy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let a=e[r];if(a===void 0){let h=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=kl;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zy=new Float32Array(1);var Xa=class{constructor(e,t,n=0,r=1/0){this.ray=new ii(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new fs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Vl(e,this,n,t),n.sort(bu),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Vl(e[r],this,n,t);return n.sort(bu),n}};function bu(i,e){return i.distance-e.distance}function Vl(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let r=i.children;for(let s=0,a=r.length;s<a;s++)Vl(r[s],e,t,!0)}}var Ts=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(zt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hl);var Ku={type:"change"},Kl={type:"start"},$u={type:"end"},ja=new ii,ju=new In,ly=Math.cos(70*Yt.DEG2RAD),Qa=class extends zn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new j,this.cursor=new j,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ji.ROTATE,MIDDLE:Ji.DOLLY,RIGHT:Ji.PAN},this.touches={ONE:Ki.ROTATE,TWO:Ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(H){H.addEventListener("keydown",A),this._domElementKeyEvents=H},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",A),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Ku),n.update(),s=r.NONE},this.update=function(){let H=new j,_e=new Ft().setFromUnitVectors(e.up,new j(0,1,0)),ve=_e.clone().invert(),qe=new j,Ue=new Ft,Ze=new j,Ie=2*Math.PI;return function(it=null){let te=n.object.position;H.copy(te).sub(n.target),H.applyQuaternion(_e),o.setFromVector3(H),n.autoRotate&&s===r.NONE&&Z(C(it)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let Ce=n.minAzimuthAngle,Ee=n.maxAzimuthAngle;isFinite(Ce)&&isFinite(Ee)&&(Ce<-Math.PI?Ce+=Ie:Ce>Math.PI&&(Ce-=Ie),Ee<-Math.PI?Ee+=Ie:Ee>Math.PI&&(Ee-=Ie),Ce<=Ee?o.theta=Math.max(Ce,Math.min(Ee,o.theta)):o.theta=o.theta>(Ce+Ee)/2?Math.max(Ce,o.theta):Math.min(Ee,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&P||n.object.isOrthographicCamera?o.radius=me(o.radius):o.radius=me(o.radius*h),H.setFromSpherical(o),H.applyQuaternion(ve),te.copy(n.target).add(H),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let ge=!1;if(n.zoomToCursor&&P){let Ae=null;if(n.object.isPerspectiveCamera){let Ge=H.length();Ae=me(Ge*h);let lt=Ge-Ae;n.object.position.addScaledVector(_,lt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let Ge=new j(b.x,b.y,0);Ge.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),n.object.updateProjectionMatrix(),ge=!0;let lt=new j(b.x,b.y,0);lt.unproject(n.object),n.object.position.sub(lt).add(Ge),n.object.updateMatrixWorld(),Ae=H.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Ae!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Ae).add(n.object.position):(ja.origin.copy(n.object.position),ja.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ja.direction))<ly?e.lookAt(n.target):(ju.setFromNormalAndCoplanarPoint(n.object.up,n.target),ja.intersectPlane(ju,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),n.object.updateProjectionMatrix(),ge=!0);return h=1,P=!1,ge||qe.distanceToSquared(n.object.position)>a||8*(1-Ue.dot(n.object.quaternion))>a||Ze.distanceToSquared(n.target)>0?(n.dispatchEvent(Ku),qe.copy(n.object.position),Ue.copy(n.object.quaternion),Ze.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",oe),n.domElement.removeEventListener("pointerdown",$e),n.domElement.removeEventListener("pointercancel",O),n.domElement.removeEventListener("wheel",L),n.domElement.removeEventListener("pointermove",E),n.domElement.removeEventListener("pointerup",O),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",A),n._domElementKeyEvents=null)};let n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=r.NONE,a=1e-6,o=new Ts,c=new Ts,h=1,u=new j,f=new nt,d=new nt,p=new nt,S=new nt,y=new nt,m=new nt,l=new nt,v=new nt,g=new nt,_=new j,b=new nt,P=!1,I=[],z={};function C(H){return H!==null?2*Math.PI/60*n.autoRotateSpeed*H:2*Math.PI/60/60*n.autoRotateSpeed}function D(){return Math.pow(.95,n.zoomSpeed)}function Z(H){c.theta-=H}function K(H){c.phi-=H}let ie=function(){let H=new j;return function(ve,qe){H.setFromMatrixColumn(qe,0),H.multiplyScalar(-ve),u.add(H)}}(),V=function(){let H=new j;return function(ve,qe){n.screenSpacePanning===!0?H.setFromMatrixColumn(qe,1):(H.setFromMatrixColumn(qe,0),H.crossVectors(n.object.up,H)),H.multiplyScalar(ve),u.add(H)}}(),q=function(){let H=new j;return function(ve,qe){let Ue=n.domElement;if(n.object.isPerspectiveCamera){let Ze=n.object.position;H.copy(Ze).sub(n.target);let Ie=H.length();Ie*=Math.tan(n.object.fov/2*Math.PI/180),ie(2*ve*Ie/Ue.clientHeight,n.object.matrix),V(2*qe*Ie/Ue.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(ie(ve*(n.object.right-n.object.left)/n.object.zoom/Ue.clientWidth,n.object.matrix),V(qe*(n.object.top-n.object.bottom)/n.object.zoom/Ue.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ne(H){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h/=H:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ae(H){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h*=H:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ue(H){if(!n.zoomToCursor)return;P=!0;let _e=n.domElement.getBoundingClientRect(),ve=H.clientX-_e.left,qe=H.clientY-_e.top,Ue=_e.width,Ze=_e.height;b.x=ve/Ue*2-1,b.y=-(qe/Ze)*2+1,_.set(b.x,b.y,1).unproject(n.object).sub(n.object.position).normalize()}function me(H){return Math.max(n.minDistance,Math.min(n.maxDistance,H))}function fe(H){f.set(H.clientX,H.clientY)}function Me(H){ue(H),l.set(H.clientX,H.clientY)}function Le(H){S.set(H.clientX,H.clientY)}function le(H){d.set(H.clientX,H.clientY),p.subVectors(d,f).multiplyScalar(n.rotateSpeed);let _e=n.domElement;Z(2*Math.PI*p.x/_e.clientHeight),K(2*Math.PI*p.y/_e.clientHeight),f.copy(d),n.update()}function ye(H){v.set(H.clientX,H.clientY),g.subVectors(v,l),g.y>0?ne(D()):g.y<0&&ae(D()),l.copy(v),n.update()}function Pe(H){y.set(H.clientX,H.clientY),m.subVectors(y,S).multiplyScalar(n.panSpeed),q(m.x,m.y),S.copy(y),n.update()}function Ne(H){ue(H),H.deltaY<0?ae(D()):H.deltaY>0&&ne(D()),n.update()}function Ve(H){let _e=!1;switch(H.code){case n.keys.UP:H.ctrlKey||H.metaKey||H.shiftKey?K(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,n.keyPanSpeed),_e=!0;break;case n.keys.BOTTOM:H.ctrlKey||H.metaKey||H.shiftKey?K(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,-n.keyPanSpeed),_e=!0;break;case n.keys.LEFT:H.ctrlKey||H.metaKey||H.shiftKey?Z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(n.keyPanSpeed,0),_e=!0;break;case n.keys.RIGHT:H.ctrlKey||H.metaKey||H.shiftKey?Z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(-n.keyPanSpeed,0),_e=!0;break}_e&&(H.preventDefault(),n.update())}function Ke(){if(I.length===1)f.set(I[0].pageX,I[0].pageY);else{let H=.5*(I[0].pageX+I[1].pageX),_e=.5*(I[0].pageY+I[1].pageY);f.set(H,_e)}}function Qe(){if(I.length===1)S.set(I[0].pageX,I[0].pageY);else{let H=.5*(I[0].pageX+I[1].pageX),_e=.5*(I[0].pageY+I[1].pageY);S.set(H,_e)}}function He(){let H=I[0].pageX-I[1].pageX,_e=I[0].pageY-I[1].pageY,ve=Math.sqrt(H*H+_e*_e);l.set(0,ve)}function Ye(){n.enableZoom&&He(),n.enablePan&&Qe()}function re(){n.enableZoom&&He(),n.enableRotate&&Ke()}function et(H){if(I.length==1)d.set(H.pageX,H.pageY);else{let ve=we(H),qe=.5*(H.pageX+ve.x),Ue=.5*(H.pageY+ve.y);d.set(qe,Ue)}p.subVectors(d,f).multiplyScalar(n.rotateSpeed);let _e=n.domElement;Z(2*Math.PI*p.x/_e.clientHeight),K(2*Math.PI*p.y/_e.clientHeight),f.copy(d)}function Fe(H){if(I.length===1)y.set(H.pageX,H.pageY);else{let _e=we(H),ve=.5*(H.pageX+_e.x),qe=.5*(H.pageY+_e.y);y.set(ve,qe)}m.subVectors(y,S).multiplyScalar(n.panSpeed),q(m.x,m.y),S.copy(y)}function at(H){let _e=we(H),ve=H.pageX-_e.x,qe=H.pageY-_e.y,Ue=Math.sqrt(ve*ve+qe*qe);v.set(0,Ue),g.set(0,Math.pow(v.y/l.y,n.zoomSpeed)),ne(g.y),l.copy(v)}function Xe(H){n.enableZoom&&at(H),n.enablePan&&Fe(H)}function mt(H){n.enableZoom&&at(H),n.enableRotate&&et(H)}function $e(H){n.enabled!==!1&&(I.length===0&&(n.domElement.setPointerCapture(H.pointerId),n.domElement.addEventListener("pointermove",E),n.domElement.addEventListener("pointerup",O)),se(H),H.pointerType==="touch"?G(H):F(H))}function E(H){n.enabled!==!1&&(H.pointerType==="touch"?X(H):W(H))}function O(H){pe(H),I.length===0&&(n.domElement.releasePointerCapture(H.pointerId),n.domElement.removeEventListener("pointermove",E),n.domElement.removeEventListener("pointerup",O)),n.dispatchEvent($u),s=r.NONE}function F(H){let _e;switch(H.button){case 0:_e=n.mouseButtons.LEFT;break;case 1:_e=n.mouseButtons.MIDDLE;break;case 2:_e=n.mouseButtons.RIGHT;break;default:_e=-1}switch(_e){case Ji.DOLLY:if(n.enableZoom===!1)return;Me(H),s=r.DOLLY;break;case Ji.ROTATE:if(H.ctrlKey||H.metaKey||H.shiftKey){if(n.enablePan===!1)return;Le(H),s=r.PAN}else{if(n.enableRotate===!1)return;fe(H),s=r.ROTATE}break;case Ji.PAN:if(H.ctrlKey||H.metaKey||H.shiftKey){if(n.enableRotate===!1)return;fe(H),s=r.ROTATE}else{if(n.enablePan===!1)return;Le(H),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Kl)}function W(H){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;le(H);break;case r.DOLLY:if(n.enableZoom===!1)return;ye(H);break;case r.PAN:if(n.enablePan===!1)return;Pe(H);break}}function L(H){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(H.preventDefault(),n.dispatchEvent(Kl),Ne(H),n.dispatchEvent($u))}function A(H){n.enabled===!1||n.enablePan===!1||Ve(H)}function G(H){switch(he(H),I.length){case 1:switch(n.touches.ONE){case Ki.ROTATE:if(n.enableRotate===!1)return;Ke(),s=r.TOUCH_ROTATE;break;case Ki.PAN:if(n.enablePan===!1)return;Qe(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case Ki.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ye(),s=r.TOUCH_DOLLY_PAN;break;case Ki.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;re(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Kl)}function X(H){switch(he(H),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;et(H),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;Fe(H),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Xe(H),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;mt(H),n.update();break;default:s=r.NONE}}function oe(H){n.enabled!==!1&&H.preventDefault()}function se(H){I.push(H)}function pe(H){delete z[H.pointerId];for(let _e=0;_e<I.length;_e++)if(I[_e].pointerId==H.pointerId){I.splice(_e,1);return}}function he(H){let _e=z[H.pointerId];_e===void 0&&(_e=new nt,z[H.pointerId]=_e),_e.set(H.pageX,H.pageY)}function we(H){let _e=H.pointerId===I[0].pointerId?I[1]:I[0];return z[_e.pointerId]}n.domElement.addEventListener("contextmenu",oe),n.domElement.addEventListener("pointerdown",$e),n.domElement.addEventListener("pointercancel",O),n.domElement.addEventListener("wheel",L,{passive:!1}),this.update()}};var Qu=function(i){return URL.createObjectURL(new Blob([i],{type:"text/javascript"}))},cy=function(i){return new Worker(i)};try{URL.revokeObjectURL(Qu(""))}catch{Qu=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)},cy=function(e){return new Worker(e,{type:"module"})}}var Tn=Uint8Array,Ci=Uint16Array,Ql=Uint32Array,ef=new Tn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),tf=new Tn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),hy=new Tn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),nf=function(i,e){for(var t=new Ci(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new Ql(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return[t,r]},rf=nf(ef,2),sf=rf[0],uy=rf[1];sf[28]=258,uy[258]=28;var af=nf(tf,0),fy=af[0],$y=af[1],ec=new Ci(32768);for(gt=0;gt<32768;++gt)si=(gt&43690)>>>1|(gt&21845)<<1,si=(si&52428)>>>2|(si&13107)<<2,si=(si&61680)>>>4|(si&3855)<<4,ec[gt]=((si&65280)>>>8|(si&255)<<8)>>>1;var si,gt,ws=function(i,e,t){for(var n=i.length,r=0,s=new Ci(e);r<n;++r)++s[i[r]-1];var a=new Ci(e);for(r=0;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new Ci(1<<e);var c=15-e;for(r=0;r<n;++r)if(i[r])for(var h=r<<4|i[r],u=e-i[r],f=a[i[r]-1]++<<u,d=f|(1<<u)-1;f<=d;++f)o[ec[f]>>>c]=h}else for(o=new Ci(n),r=0;r<n;++r)i[r]&&(o[r]=ec[a[i[r]-1]++]>>>15-i[r]);return o},Es=new Tn(288);for(gt=0;gt<144;++gt)Es[gt]=8;var gt;for(gt=144;gt<256;++gt)Es[gt]=9;var gt;for(gt=256;gt<280;++gt)Es[gt]=7;var gt;for(gt=280;gt<288;++gt)Es[gt]=8;var gt,of=new Tn(32);for(gt=0;gt<32;++gt)of[gt]=5;var gt;var dy=ws(Es,9,1);var py=ws(of,5,1),$l=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},Un=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},jl=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},my=function(i){return(i/8|0)+(i&7&&1)},gy=function(i,e,t){(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length);var n=new(i instanceof Ci?Ci:i instanceof Ql?Ql:Tn)(t-e);return n.set(i.subarray(e,t)),n},_y=function(i,e,t){var n=i.length;if(!n||t&&!t.l&&n<5)return e||new Tn(0);var r=!e||t,s=!t||t.i;t||(t={}),e||(e=new Tn(n*3));var a=function(Ne){var Ve=e.length;if(Ne>Ve){var Ke=new Tn(Math.max(Ve*2,Ne));Ke.set(e),e=Ke}},o=t.f||0,c=t.p||0,h=t.b||0,u=t.l,f=t.d,d=t.m,p=t.n,S=n*8;do{if(!u){t.f=o=Un(i,c,1);var y=Un(i,c+1,3);if(c+=3,y)if(y==1)u=dy,f=py,d=9,p=5;else if(y==2){var g=Un(i,c,31)+257,_=Un(i,c+10,15)+4,b=g+Un(i,c+5,31)+1;c+=14;for(var P=new Tn(b),I=new Tn(19),z=0;z<_;++z)I[hy[z]]=Un(i,c+z*3,7);c+=_*3;for(var C=$l(I),D=(1<<C)-1,Z=ws(I,C,1),z=0;z<b;){var K=Z[Un(i,c,D)];c+=K&15;var m=K>>>4;if(m<16)P[z++]=m;else{var ie=0,V=0;for(m==16?(V=3+Un(i,c,3),c+=2,ie=P[z-1]):m==17?(V=3+Un(i,c,7),c+=3):m==18&&(V=11+Un(i,c,127),c+=7);V--;)P[z++]=ie}}var q=P.subarray(0,g),ne=P.subarray(g);d=$l(q),p=$l(ne),u=ws(q,d,1),f=ws(ne,p,1)}else throw"invalid block type";else{var m=my(c)+4,l=i[m-4]|i[m-3]<<8,v=m+l;if(v>n){if(s)throw"unexpected EOF";break}r&&a(h+l),e.set(i.subarray(m,v),h),t.b=h+=l,t.p=c=v*8;continue}if(c>S){if(s)throw"unexpected EOF";break}}r&&a(h+131072);for(var ae=(1<<d)-1,ue=(1<<p)-1,me=c;;me=c){var ie=u[jl(i,c)&ae],fe=ie>>>4;if(c+=ie&15,c>S){if(s)throw"unexpected EOF";break}if(!ie)throw"invalid length/literal";if(fe<256)e[h++]=fe;else if(fe==256){me=c,u=null;break}else{var Me=fe-254;if(fe>264){var z=fe-257,Le=ef[z];Me=Un(i,c,(1<<Le)-1)+sf[z],c+=Le}var le=f[jl(i,c)&ue],ye=le>>>4;if(!le)throw"invalid distance";c+=le&15;var ne=fy[ye];if(ye>3){var Le=tf[ye];ne+=jl(i,c)&(1<<Le)-1,c+=Le}if(c>S){if(s)throw"unexpected EOF";break}r&&a(h+131072);for(var Pe=h+Me;h<Pe;h+=4)e[h]=e[h-ne],e[h+1]=e[h+1-ne],e[h+2]=e[h+2-ne],e[h+3]=e[h+3-ne];h=Pe}}t.l=u,t.p=me,t.b=h,u&&(o=1,t.m=d,t.d=f,t.n=p)}while(!o);return h==e.length?e:gy(e,0,h)};var vy=new Tn(0);var yy=function(i){if((i[0]&15)!=8||i[0]>>>4>7||(i[0]<<8|i[1])%31)throw"invalid zlib data";if(i[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function lf(i,e){return _y((yy(i),i.subarray(2,-4)),e)}var xy=typeof TextDecoder<"u"&&new TextDecoder,Sy=0;try{xy.decode(vy,{stream:!0}),Sy=1}catch{}function cf(i,e,t){let n=t.length-i-1;if(e>=t[n])return n-1;if(e<=t[i])return i;let r=i,s=n,a=Math.floor((r+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:r=a,a=Math.floor((r+s)/2);return a}function by(i,e,t,n){let r=[],s=[],a=[];r[0]=1;for(let o=1;o<=t;++o){s[o]=e-n[i+1-o],a[o]=n[i+o]-e;let c=0;for(let h=0;h<o;++h){let u=a[h+1],f=s[o-h],d=r[h]/(u+f);r[h]=c+u*d,c=f*d}r[o]=c}return r}function hf(i,e,t,n){let r=cf(i,n,e),s=by(r,n,i,e),a=new pt(0,0,0,0);for(let o=0;o<=i;++o){let c=t[r-i+o],h=s[o],u=c.w*h;a.x+=c.x*u,a.y+=c.y*u,a.z+=c.z*u,a.w+=c.w*h}return a}function Ty(i,e,t,n,r){let s=[];for(let f=0;f<=t;++f)s[f]=0;let a=[];for(let f=0;f<=n;++f)a[f]=s.slice(0);let o=[];for(let f=0;f<=t;++f)o[f]=s.slice(0);o[0][0]=1;let c=s.slice(0),h=s.slice(0);for(let f=1;f<=t;++f){c[f]=e-r[i+1-f],h[f]=r[i+f]-e;let d=0;for(let p=0;p<f;++p){let S=h[p+1],y=c[f-p];o[f][p]=S+y;let m=o[p][f-1]/o[f][p];o[p][f]=d+S*m,d=y*m}o[f][f]=d}for(let f=0;f<=t;++f)a[0][f]=o[f][t];for(let f=0;f<=t;++f){let d=0,p=1,S=[];for(let y=0;y<=t;++y)S[y]=s.slice(0);S[0][0]=1;for(let y=1;y<=n;++y){let m=0,l=f-y,v=t-y;f>=y&&(S[p][0]=S[d][0]/o[v+1][l],m=S[p][0]*o[l][v]);let g=l>=-1?1:-l,_=f-1<=v?y-1:t-f;for(let P=g;P<=_;++P)S[p][P]=(S[d][P]-S[d][P-1])/o[v+1][l+P],m+=S[p][P]*o[l+P][v];f<=v&&(S[p][y]=-S[d][y-1]/o[v+1][f],m+=S[p][y]*o[f][v]),a[y][f]=m;let b=d;d=p,p=b}}let u=t;for(let f=1;f<=n;++f){for(let d=0;d<=t;++d)a[f][d]*=u;u*=t-f}return a}function wy(i,e,t,n,r){let s=r<i?r:i,a=[],o=cf(i,n,e),c=Ty(o,n,i,s,e),h=[];for(let u=0;u<t.length;++u){let f=t[u].clone(),d=f.w;f.x*=d,f.y*=d,f.z*=d,h[u]=f}for(let u=0;u<=s;++u){let f=h[o-i].clone().multiplyScalar(c[u][0]);for(let d=1;d<=i;++d)f.add(h[o-i+d].clone().multiplyScalar(c[u][d]));a[u]=f}for(let u=s+1;u<=r+1;++u)a[u]=new pt(0,0,0);return a}function Ey(i,e){let t=1;for(let r=2;r<=i;++r)t*=r;let n=1;for(let r=2;r<=e;++r)n*=r;for(let r=2;r<=i-e;++r)n*=r;return t/n}function Ay(i){let e=i.length,t=[],n=[];for(let s=0;s<e;++s){let a=i[s];t[s]=new j(a.x,a.y,a.z),n[s]=a.w}let r=[];for(let s=0;s<e;++s){let a=t[s].clone();for(let o=1;o<=s;++o)a.sub(r[s-o].clone().multiplyScalar(Ey(s,o)*n[o]));r[s]=a.divideScalar(n[0])}return r}function uf(i,e,t,n,r){let s=wy(i,e,t,n,r);return Ay(s)}var eo=class extends Ua{constructor(e,t,n,r,s){super(),this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=s||this.knots.length-1;for(let a=0;a<n.length;++a){let o=n[a];this.controlPoints[a]=new pt(o.x,o.y,o.z,o.w)}}getPoint(e,t=new j){let n=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=hf(this.degree,this.knots,this.controlPoints,r);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new j){let n=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=uf(this.degree,this.knots,this.controlPoints,r,1);return n.copy(s[1]).normalize(),n}};var ft,It,un,no=class extends Vn{constructor(e){super(e)}load(e,t,n,r){let s=this,a=s.path===""?Ga.extractUrlBase(e):s.path,o=new ka(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(c){try{t(s.parse(c,a))}catch(h){r?r(h):console.error(h),s.manager.itemError(e)}},n,r)}parse(e,t){if(Cy(e))ft=new oc().parse(e);else{let r=mf(e);if(!Py(r))throw new Error("THREE.FBXLoader: Unknown format.");if(ff(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+ff(r));ft=new ac().parse(r)}let n=new Ai(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new ic(n,this.manager).parse(ft)}},ic=class{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){It=this.parseConnections();let e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),r=this.parseDeformers(),s=new rc().parse(r);return this.parseScene(r,s,n),un}parseConnections(){let e=new Map;return"Connections"in ft&&ft.Connections.connections.forEach(function(n){let r=n[0],s=n[1],a=n[2];e.has(r)||e.set(r,{parents:[],children:[]});let o={ID:s,relationship:a};e.get(r).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});let c={ID:r,relationship:a};e.get(s).children.push(c)}),e}parseImages(){let e={},t={};if("Video"in ft.Objects){let n=ft.Objects.Video;for(let r in n){let s=n[r],a=parseInt(r);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){let o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,c=typeof s.Content=="string"&&s.Content!=="";if(o||c){let h=this.parseImage(n[r]);t[s.RelativeFilename||s.Filename]=h}}}}for(let n in e){let r=e[n];t[r]!==void 0?e[n]=t[r]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){let t=e.Content,n=e.RelativeFilename||e.Filename,r=n.slice(n.lastIndexOf(".")+1).toLowerCase(),s;switch(r){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{let a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){let t=new Map;if("Texture"in ft.Objects){let n=ft.Objects.Texture;for(let r in n){let s=this.parseTexture(n[r],e);t.set(parseInt(r),s)}}return t}parseTexture(e,t){let n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;let r=e.WrapModeU,s=e.WrapModeV,a=r!==void 0?r.value:0,o=s!==void 0?s.value:0;if(n.wrapS=a===0?Rr:fn,n.wrapT=o===0?Rr:fn,"Scaling"in e){let c=e.Scaling.value;n.repeat.x=c[0],n.repeat.y=c[1]}if("Translation"in e){let c=e.Translation.value;n.offset.x=c[0],n.offset.y=c[1]}return n}loadTexture(e,t){let n,r=this.textureLoader.path,s=It.get(e.id).children;s!==void 0&&s.length>0&&t[s[0].ID]!==void 0&&(n=t[s[0].ID],(n.indexOf("blob:")===0||n.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let a,o=e.FileName.slice(-3).toLowerCase();if(o==="tga"){let c=this.manager.getHandler(".tga");c===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",e.RelativeFilename),a=new Qt):(c.setPath(this.textureLoader.path),a=c.load(n))}else if(o==="dds"){let c=this.manager.getHandler(".dds");c===null?(console.warn("FBXLoader: DDS loader not found, creating placeholder texture for",e.RelativeFilename),a=new Qt):(c.setPath(this.textureLoader.path),a=c.load(n))}else o==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",e.RelativeFilename),a=new Qt):a=this.textureLoader.load(n);return this.textureLoader.setPath(r),a}parseMaterials(e){let t=new Map;if("Material"in ft.Objects){let n=ft.Objects.Material;for(let r in n){let s=this.parseMaterial(n[r],e);s!==null&&t.set(parseInt(r),s)}}return t}parseMaterial(e,t){let n=e.id,r=e.attrName,s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!It.has(n))return null;let a=this.parseParameters(e,t,n),o;switch(s.toLowerCase()){case"phong":o=new Fr;break;case"lambert":o=new Br;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new Fr;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,n){let r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=new Je().fromArray(e.Diffuse.value).convertSRGBToLinear():e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=new Je().fromArray(e.DiffuseColor.value).convertSRGBToLinear()),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=new Je().fromArray(e.Emissive.value).convertSRGBToLinear():e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=new Je().fromArray(e.EmissiveColor.value).convertSRGBToLinear()),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),e.Opacity&&(r.opacity=parseFloat(e.Opacity.value)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=new Je().fromArray(e.Specular.value).convertSRGBToLinear():e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=new Je().fromArray(e.SpecularColor.value).convertSRGBToLinear());let s=this;return It.get(n).children.forEach(function(a){let o=a.relationship;switch(o){case"Bump":r.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=s.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=St);break;case"DisplacementColor":r.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=s.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=St);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=s.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=ls,r.envMap.colorSpace=St);break;case"SpecularColor":r.specularMap=s.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=St);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=s.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in ft.Objects&&t in ft.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=It.get(t).children[0].ID),e.get(t)}parseDeformers(){let e={},t={};if("Deformer"in ft.Objects){let n=ft.Objects.Deformer;for(let r in n){let s=n[r],a=It.get(parseInt(r));if(s.attrType==="Skin"){let o=this.parseSkeleton(a,n);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(s.attrType==="BlendShape"){let o={id:r};o.rawTargets=this.parseMorphTargets(a,n),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){let n=[];return e.children.forEach(function(r){let s=t[r.ID];if(s.attrType!=="Cluster")return;let a={ID:r.ID,indices:[],weights:[],transformLink:new je().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),n.push(a)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){let n=[];for(let r=0;r<e.children.length;r++){let s=e.children[r],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=It.get(parseInt(s.ID)).children.filter(function(c){return c.relationship===void 0})[0].ID,n.push(o)}return n}parseScene(e,t,n){un=new Qn;let r=this.parseModels(e.skeletons,t,n),s=ft.Objects.Model,a=this;r.forEach(function(c){let h=s[c.ID];a.setLookAtProperties(c,h),It.get(c.ID).parents.forEach(function(f){let d=r.get(f.ID);d!==void 0&&d.add(c)}),c.parent===null&&un.add(c)}),this.bindSkeleton(e.skeletons,t,r),this.addGlobalSceneSettings(),un.traverse(function(c){if(c.userData.transformData){c.parent&&(c.userData.transformData.parentMatrix=c.parent.matrix,c.userData.transformData.parentMatrixWorld=c.parent.matrixWorld);let h=df(c.userData.transformData);c.applyMatrix4(h),c.updateWorldMatrix()}});let o=new sc().parse();un.children.length===1&&un.children[0].isGroup&&(un.children[0].animations=o,un=un.children[0]),un.animations=o}parseModels(e,t,n){let r=new Map,s=ft.Objects.Model;for(let a in s){let o=parseInt(a),c=s[a],h=It.get(o),u=this.buildSkeleton(h,e,o,c.attrName);if(!u){switch(c.attrType){case"Camera":u=this.createCamera(h);break;case"Light":u=this.createLight(h);break;case"Mesh":u=this.createMesh(h,t,n);break;case"NurbsCurve":u=this.createCurve(h,t);break;case"LimbNode":case"Root":u=new Nr;break;case"Null":default:u=new Qn;break}u.name=c.attrName?_t.sanitizeNodeName(c.attrName):"",u.userData.originalName=c.attrName,u.ID=o}this.getTransformData(u,c),r.set(o,u)}return r}buildSkeleton(e,t,n,r){let s=null;return e.parents.forEach(function(a){for(let o in t){let c=t[o];c.rawBones.forEach(function(h,u){if(h.ID===a.ID){let f=s;s=new Nr,s.matrixWorld.copy(h.transformLink),s.name=r?_t.sanitizeNodeName(r):"",s.userData.originalName=r,s.ID=n,c.bones[u]=s,f!==null&&s.add(f)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(r){let s=ft.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new bt;else{let r=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(r=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let a=1e3;n.FarPlane!==void 0&&(a=n.FarPlane.value/1e3);let o=window.innerWidth,c=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(o=n.AspectWidth.value,c=n.AspectHeight.value);let h=o/c,u=45;n.FieldOfView!==void 0&&(u=n.FieldOfView.value);let f=n.FocalLength?n.FocalLength.value:null;switch(r){case 0:t=new Lt(u,h,s,a),f!==null&&t.setFocalLength(f);break;case 1:t=new Ur(-o/2,o/2,c/2,-c/2,s,a);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new bt;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(r){let s=ft.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new bt;else{let r;n.LightType===void 0?r=0:r=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=new Je().fromArray(n.Color.value).convertSRGBToLinear());let a=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(a=0);let o=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?o=0:o=n.FarAttenuationEnd.value);let c=1;switch(r){case 0:t=new qi(s,a,o,c);break;case 1:t=new Zi(s,a);break;case 2:let h=Math.PI/3;n.InnerAngle!==void 0&&(h=Yt.degToRad(n.InnerAngle.value));let u=0;n.OuterAngle!==void 0&&(u=Yt.degToRad(n.OuterAngle.value),u=Math.max(u,1)),t=new kr(s,a,o,h,u,c);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new qi(s,a);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let r,s=null,a=null,o=[];return e.children.forEach(function(c){t.has(c.ID)&&(s=t.get(c.ID)),n.has(c.ID)&&o.push(n.get(c.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new Fr({name:Vn.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(c){c.vertexColors=!0}),s.FBX_Deformer?(r=new La(s,a),r.normalizeSkinWeights()):r=new cn(s,a),r}createCurve(e,t){let n=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),r=new ms({name:Vn.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Da(n,r)}getTransformData(e,t){let n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=pf(t.RotationOrder.value):n.eulerOrder="ZYX","Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&It.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){let s=ft.Objects.Model[r.ID];if("Lcl_Translation"in s){let a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),un.add(e.target)):e.lookAt(new j().fromArray(a))}}})}bindSkeleton(e,t,n){let r=this.parsePoseNodes();for(let s in e){let a=e[s];It.get(parseInt(a.ID)).parents.forEach(function(c){if(t.has(c.ID)){let h=c.ID;It.get(h).parents.forEach(function(f){n.has(f.ID)&&n.get(f.ID).bind(new Ia(a.bones),r[f.ID])})}})}}parsePoseNodes(){let e={};if("Pose"in ft.Objects){let t=ft.Objects.Pose;for(let n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){let r=t[n].PoseNode;Array.isArray(r)?r.forEach(function(s){e[s.Node]=new je().fromArray(s.Matrix.a)}):e[r.Node]=new je().fromArray(r.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in ft){if("AmbientColor"in ft.GlobalSettings){let e=ft.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],r=e[2];if(t!==0||n!==0||r!==0){let s=new Je(t,n,r).convertSRGBToLinear();un.add(new Ha(s,1))}}"UnitScaleFactor"in ft.GlobalSettings&&(un.userData.unitScaleFactor=ft.GlobalSettings.UnitScaleFactor.value)}}},rc=class{constructor(){this.negativeMaterialIndices=!1}parse(e){let t=new Map;if("Geometry"in ft.Objects){let n=ft.Objects.Geometry;for(let r in n){let s=It.get(parseInt(r)),a=this.parseGeometry(s,n[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){let r=n.skeletons,s=[],a=e.parents.map(function(f){return ft.Objects.Model[f.ID]});if(a.length===0)return;let o=e.children.reduce(function(f,d){return r[d.ID]!==void 0&&(f=r[d.ID]),f},null);e.children.forEach(function(f){n.morphTargets[f.ID]!==void 0&&s.push(n.morphTargets[f.ID])});let c=a[0],h={};"RotationOrder"in c&&(h.eulerOrder=pf(c.RotationOrder.value)),"InheritType"in c&&(h.inheritType=parseInt(c.InheritType.value)),"GeometricTranslation"in c&&(h.translation=c.GeometricTranslation.value),"GeometricRotation"in c&&(h.rotation=c.GeometricRotation.value),"GeometricScaling"in c&&(h.scale=c.GeometricScaling.value);let u=df(h);return this.genGeometry(t,o,s,u)}genGeometry(e,t,n,r){let s=new rn;e.attrName&&(s.name=e.attrName);let a=this.parseGeoNode(e,t),o=this.genBuffers(a),c=new Ct(o.vertex,3);if(c.applyMatrix4(r),s.setAttribute("position",c),o.colors.length>0&&s.setAttribute("color",new Ct(o.colors,3)),t&&(s.setAttribute("skinIndex",new Ir(o.weightsIndices,4)),s.setAttribute("skinWeight",new Ct(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){let h=new ut().getNormalMatrix(r),u=new Ct(o.normal,3);u.applyNormalMatrix(h),s.setAttribute("normal",u)}if(o.uvs.forEach(function(h,u){let f=u===0?"uv":`uv${u}`;s.setAttribute(f,new Ct(o.uvs[u],2))}),a.material&&a.material.mappingType!=="AllSame"){let h=o.materialIndex[0],u=0;if(o.materialIndex.forEach(function(f,d){f!==h&&(s.addGroup(u,d-u,h),h=f,u=d)}),s.groups.length>0){let f=s.groups[s.groups.length-1],d=f.start+f.count;d!==o.materialIndex.length&&s.addGroup(d,o.materialIndex.length-d,h)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,n,r),s}parseGeoNode(e,t){let n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(r,s){r.indices.forEach(function(a,o){n.weightTable[a]===void 0&&(n.weightTable[a]=[]),n.weightTable[a].push({id:s,weight:r.weights[o]})})})),n}genBuffers(e){let t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]},n=0,r=0,s=!1,a=[],o=[],c=[],h=[],u=[],f=[],d=this;return e.vertexIndices.forEach(function(p,S){let y,m=!1;p<0&&(p=p^-1,m=!0);let l=[],v=[];if(a.push(p*3,p*3+1,p*3+2),e.color){let g=to(S,n,p,e.color);c.push(g[0],g[1],g[2])}if(e.skeleton){if(e.weightTable[p]!==void 0&&e.weightTable[p].forEach(function(g){v.push(g.weight),l.push(g.id)}),v.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);let g=[0,0,0,0],_=[0,0,0,0];v.forEach(function(b,P){let I=b,z=l[P];_.forEach(function(C,D,Z){if(I>C){Z[D]=I,I=C;let K=g[D];g[D]=z,z=K}})}),l=g,v=_}for(;v.length<4;)v.push(0),l.push(0);for(let g=0;g<4;++g)u.push(v[g]),f.push(l[g])}if(e.normal){let g=to(S,n,p,e.normal);o.push(g[0],g[1],g[2])}e.material&&e.material.mappingType!=="AllSame"&&(y=to(S,n,p,e.material)[0],y<0&&(d.negativeMaterialIndices=!0,y=0)),e.uv&&e.uv.forEach(function(g,_){let b=to(S,n,p,g);h[_]===void 0&&(h[_]=[]),h[_].push(b[0]),h[_].push(b[1])}),r++,m&&(d.genFace(t,e,a,y,o,c,h,u,f,r),n++,r=0,a=[],o=[],c=[],h=[],u=[],f=[])}),t}getNormalNewell(e){let t=new j(0,0,0);for(let n=0;n<e.length;n++){let r=e[n],s=e[(n+1)%e.length];t.x+=(r.y-s.y)*(r.z+s.z),t.y+=(r.z-s.z)*(r.x+s.x),t.z+=(r.x-s.x)*(r.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){let t=this.getNormalNewell(e),r=(Math.abs(t.z)>.5?new j(0,1,0):new j(0,0,1)).cross(t).normalize(),s=t.clone().cross(r).normalize();return{normal:t,tangent:r,bitangent:s}}flattenVertex(e,t,n){return new nt(e.dot(t),e.dot(n))}genFace(e,t,n,r,s,a,o,c,h,u){let f;if(u>3){let d=[];for(let m=0;m<n.length;m+=3)d.push(new j(t.vertexPositions[n[m]],t.vertexPositions[n[m+1]],t.vertexPositions[n[m+2]]));let{tangent:p,bitangent:S}=this.getNormalTangentAndBitangent(d),y=[];for(let m of d)y.push(this.flattenVertex(m,p,S));f=Oa.triangulateShape(y,[])}else f=[[0,1,2]];for(let[d,p,S]of f)e.vertex.push(t.vertexPositions[n[d*3]]),e.vertex.push(t.vertexPositions[n[d*3+1]]),e.vertex.push(t.vertexPositions[n[d*3+2]]),e.vertex.push(t.vertexPositions[n[p*3]]),e.vertex.push(t.vertexPositions[n[p*3+1]]),e.vertex.push(t.vertexPositions[n[p*3+2]]),e.vertex.push(t.vertexPositions[n[S*3]]),e.vertex.push(t.vertexPositions[n[S*3+1]]),e.vertex.push(t.vertexPositions[n[S*3+2]]),t.skeleton&&(e.vertexWeights.push(c[d*4]),e.vertexWeights.push(c[d*4+1]),e.vertexWeights.push(c[d*4+2]),e.vertexWeights.push(c[d*4+3]),e.vertexWeights.push(c[p*4]),e.vertexWeights.push(c[p*4+1]),e.vertexWeights.push(c[p*4+2]),e.vertexWeights.push(c[p*4+3]),e.vertexWeights.push(c[S*4]),e.vertexWeights.push(c[S*4+1]),e.vertexWeights.push(c[S*4+2]),e.vertexWeights.push(c[S*4+3]),e.weightsIndices.push(h[d*4]),e.weightsIndices.push(h[d*4+1]),e.weightsIndices.push(h[d*4+2]),e.weightsIndices.push(h[d*4+3]),e.weightsIndices.push(h[p*4]),e.weightsIndices.push(h[p*4+1]),e.weightsIndices.push(h[p*4+2]),e.weightsIndices.push(h[p*4+3]),e.weightsIndices.push(h[S*4]),e.weightsIndices.push(h[S*4+1]),e.weightsIndices.push(h[S*4+2]),e.weightsIndices.push(h[S*4+3])),t.color&&(e.colors.push(a[d*3]),e.colors.push(a[d*3+1]),e.colors.push(a[d*3+2]),e.colors.push(a[p*3]),e.colors.push(a[p*3+1]),e.colors.push(a[p*3+2]),e.colors.push(a[S*3]),e.colors.push(a[S*3+1]),e.colors.push(a[S*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2]),e.normal.push(s[S*3]),e.normal.push(s[S*3+1]),e.normal.push(s[S*3+2])),t.uv&&t.uv.forEach(function(y,m){e.uvs[m]===void 0&&(e.uvs[m]=[]),e.uvs[m].push(o[m][d*2]),e.uvs[m].push(o[m][d*2+1]),e.uvs[m].push(o[m][p*2]),e.uvs[m].push(o[m][p*2+1]),e.uvs[m].push(o[m][S*2]),e.uvs[m].push(o[m][S*2+1])})}addMorphTargets(e,t,n,r){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];let s=this;n.forEach(function(a){a.rawTargets.forEach(function(o){let c=ft.Objects.Geometry[o.geoID];c!==void 0&&s.genMorphGeometry(e,t,c,r,o.name)})})}genMorphGeometry(e,t,n,r,s){let a=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],o=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=e.attributes.position.count*3,u=new Float32Array(h);for(let S=0;S<c.length;S++){let y=c[S]*3;u[y]=o[S*3],u[y+1]=o[S*3+1],u[y+2]=o[S*3+2]}let f={vertexIndices:a,vertexPositions:u},d=this.genBuffers(f),p=new Ct(d.vertex,3);p.name=s||n.attrName,p.applyMatrix4(r),e.morphAttributes.position.push(p)}parseNormals(e){let t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Normals.a,s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:s,mappingType:t,referenceType:n}}parseUVs(e){let t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.UV.a,s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:r,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){let t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Colors.a,s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new Je;a<r.length;a+=4)o.fromArray(r,a).convertSRGBToLinear().toArray(r,a);return{dataSize:4,buffer:r,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){let t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};let r=e.Materials.a,s=[];for(let a=0;a<r.length;++a)s.push(a);return{dataSize:1,buffer:r,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){let t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new rn;let n=t-1,r=e.KnotVector.a,s=[],a=e.Points.a;for(let f=0,d=a.length;f<d;f+=4)s.push(new pt().fromArray(a,f));let o,c;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=n,c=r.length-1-o;for(let f=0;f<n;++f)s.push(s[f])}let u=new eo(n,r,s,o,c).getPoints(s.length*12);return new rn().setFromPoints(u)}},sc=class{parse(){let e=[],t=this.parseClips();if(t!==void 0)for(let n in t){let r=t[n],s=this.addClip(r);e.push(s)}return e}parseClips(){if(ft.Objects.AnimationCurve===void 0)return;let e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);let t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){let e=ft.Objects.AnimationCurveNode,t=new Map;for(let n in e){let r=e[n];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){let s={id:r.id,attr:r.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){let t=ft.Objects.AnimationCurve;for(let n in t){let r={id:t[n].id,times:t[n].KeyTime.a.map(Ly),values:t[n].KeyValueFloat.a},s=It.get(r.id);if(s!==void 0){let a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){let t=ft.Objects.AnimationLayer,n=new Map;for(let r in t){let s=[],a=It.get(parseInt(r));a!==void 0&&(a.children.forEach(function(c,h){if(e.has(c.ID)){let u=e.get(c.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(s[h]===void 0){let f=It.get(c.ID).parents.filter(function(d){return d.relationship!==void 0})[0].ID;if(f!==void 0){let d=ft.Objects.Model[f.toString()];if(d===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",c);return}let p={modelName:d.attrName?_t.sanitizeNodeName(d.attrName):"",ID:d.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};un.traverse(function(S){S.ID===d.id&&(p.transform=S.matrix,S.userData.transformData&&(p.eulerOrder=S.userData.transformData.eulerOrder))}),p.transform||(p.transform=new je),"PreRotation"in d&&(p.preRotation=d.PreRotation.value),"PostRotation"in d&&(p.postRotation=d.PostRotation.value),s[h]=p}}s[h]&&(s[h][u.attr]=u)}else if(u.curves.morph!==void 0){if(s[h]===void 0){let f=It.get(c.ID).parents.filter(function(l){return l.relationship!==void 0})[0].ID,d=It.get(f).parents[0].ID,p=It.get(d).parents[0].ID,S=It.get(p).parents[0].ID,y=ft.Objects.Model[S],m={modelName:y.attrName?_t.sanitizeNodeName(y.attrName):"",morphName:ft.Objects.Deformer[f].attrName};s[h]=m}s[h][u.attr]=u}}}),n.set(parseInt(r),s))}return n}parseAnimStacks(e){let t=ft.Objects.AnimationStack,n={};for(let r in t){let s=It.get(parseInt(r)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");let a=e.get(s[0].ID);n[r]={name:t[r].attrName,layer:a}}return n}addClip(e){let t=[],n=this;return e.layer.forEach(function(r){t=t.concat(n.generateTracks(r))}),new Ba(e.name,-1,t)}generateTracks(e){let t=[],n=new j,r=new j;if(e.transform&&e.transform.decompose(n,new Ft,r),n=n.toArray(),r=r.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){let s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){let s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){let s=this.generateVectorTrack(e.modelName,e.S.curves,r,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){let s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,r){let s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,n);return new Ei(e+"."+r,s,a)}generateRotationTrack(e,t,n,r,s){let a,o;if(t.x!==void 0&&t.y!==void 0&&t.z!==void 0){let f=this.interpolateRotations(t.x,t.y,t.z,s);a=f[0],o=f[1]}n!==void 0&&(n=n.map(Yt.degToRad),n.push(s),n=new hn().fromArray(n),n=new Ft().setFromEuler(n)),r!==void 0&&(r=r.map(Yt.degToRad),r.push(s),r=new hn().fromArray(r),r=new Ft().setFromEuler(r).invert());let c=new Ft,h=new hn,u=[];if(!o||!a)return new kn(e+".quaternion",[],[]);for(let f=0;f<o.length;f+=3)h.set(o[f],o[f+1],o[f+2],s),c.setFromEuler(h),n!==void 0&&c.premultiply(n),r!==void 0&&c.multiply(r),f>2&&new Ft().fromArray(u,(f-3)/3*4).dot(c)<0&&c.set(-c.x,-c.y,-c.z,-c.w),c.toArray(u,f/3*4);return new kn(e+".quaternion",a,u)}generateMorphTrack(e){let t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),r=un.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new Ti(e.modelName+".morphTargetInfluences["+r+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,r){return n-r}),t.length>1){let n=1,r=t[0];for(let s=1;s<t.length;s++){let a=t[s];a!==r&&(t[n]=a,r=a,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){let r=n,s=[],a=-1,o=-1,c=-1;return e.forEach(function(h){if(t.x&&(a=t.x.times.indexOf(h)),t.y&&(o=t.y.times.indexOf(h)),t.z&&(c=t.z.times.indexOf(h)),a!==-1){let u=t.x.values[a];s.push(u),r[0]=u}else s.push(r[0]);if(o!==-1){let u=t.y.values[o];s.push(u),r[1]=u}else s.push(r[1]);if(c!==-1){let u=t.z.values[c];s.push(u),r[2]=u}else s.push(r[2])}),s}interpolateRotations(e,t,n,r){let s=[],a=[];s.push(e.times[0]),a.push(Yt.degToRad(e.values[0])),a.push(Yt.degToRad(t.values[0])),a.push(Yt.degToRad(n.values[0]));for(let o=1;o<e.values.length;o++){let c=[e.values[o-1],t.values[o-1],n.values[o-1]];if(isNaN(c[0])||isNaN(c[1])||isNaN(c[2]))continue;let h=c.map(Yt.degToRad),u=[e.values[o],t.values[o],n.values[o]];if(isNaN(u[0])||isNaN(u[1])||isNaN(u[2]))continue;let f=u.map(Yt.degToRad),d=[u[0]-c[0],u[1]-c[1],u[2]-c[2]],p=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(p[0]>=180||p[1]>=180||p[2]>=180){let y=Math.max(...p)/180,m=new hn(...h,r),l=new hn(...f,r),v=new Ft().setFromEuler(m),g=new Ft().setFromEuler(l);v.dot(g)&&g.set(-g.x,-g.y,-g.z,-g.w);let _=e.times[o-1],b=e.times[o]-_,P=new Ft,I=new hn;for(let z=0;z<1;z+=1/y)P.copy(v.clone().slerp(g.clone(),z)),s.push(_+z*b),I.setFromQuaternion(P,r),a.push(I.x),a.push(I.y),a.push(I.z)}else s.push(e.times[o]),a.push(Yt.degToRad(e.values[o])),a.push(Yt.degToRad(t.values[o])),a.push(Yt.degToRad(n.values[o]))}return[s,a]}},ac=class{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new ro,this.nodeStack=[],this.currentProp=[],this.currentPropName="";let t=this,n=e.split(/[\r\n]+/);return n.forEach(function(r,s){let a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;let c=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),h=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=r.match("^\\t{"+(t.currentIndent-1)+"}}");c?t.parseNodeBegin(r,c):h?t.parseNodeProperty(r,h,n[++s]):u?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){let n=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(c){return c.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in o?(n==="PoseNode"?o.PoseNode.push(s):o[n].id!==void 0&&(o[n]={},o[n][o[n].id]=o[n]),a.id!==""&&(o[n][a.id]=s)):typeof a.id=="number"?(o[n]={},o[n][a.id]=s):n!=="Properties70"&&(n==="PoseNode"?o[n]=[s]:o[n]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",r="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:n,type:r}}parseNodeProperty(e,t,n){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());let a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,s);return}if(r==="C"){let c=s.split(",").slice(1),h=parseInt(c[0]),u=parseInt(c[1]),f=s.split(",").slice(3);f=f.map(function(d){return d.trim().replace(/^"/,"")}),r="connections",s=[h,u],Dy(s,f),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=s),r in a&&Array.isArray(a[r])?a[r].push(s):r!=="a"?a[r]=s:a.a=s,this.setCurrentProp(a,r),r==="a"&&s.slice(-1)!==","&&(a.a=nc(s))}parseNodePropertyContinued(e){let t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=nc(t.a))}parseNodeSpecialProperty(e,t,n){let r=n.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=r[0],a=r[1],o=r[2],c=r[3],h=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":h=parseFloat(h);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":h=nc(h);break}this.getPrevNode()[s]={type:a,type2:o,flag:c,value:h},this.setCurrentProp(this.getPrevNode(),s)}},oc=class{parse(e){let t=new io(e);t.skip(23);let n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);let r=new ro;for(;!this.endOfContent(t);){let s=this.parseNode(t,n);s!==null&&r.add(s.name,s)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){let n={},r=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();let a=e.getUint8(),o=e.getString(a);if(r===0)return null;let c=[];for(let d=0;d<s;d++)c.push(this.parseProperty(e));let h=c.length>0?c[0]:"",u=c.length>1?c[1]:"",f=c.length>2?c[2]:"";for(n.singleProperty=s===1&&e.getOffset()===r;r>e.getOffset();){let d=this.parseNode(e,t);d!==null&&this.parseSubNode(o,n,d)}return n.propertyList=c,typeof h=="number"&&(n.id=h),u!==""&&(n.attrName=u),f!==""&&(n.attrType=f),o!==""&&(n.name=o),n}parseSubNode(e,t,n){if(n.singleProperty===!0){let r=n.propertyList[0];Array.isArray(r)?(t[n.name]=n,n.a=r):t[n.name]=r}else if(e==="Connections"&&n.name==="C"){let r=[];n.propertyList.forEach(function(s,a){a!==0&&r.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let r=n.propertyList[0],s=n.propertyList[1],a=n.propertyList[2],o=n.propertyList[3],c;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?c=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:c=n.propertyList[4],t[r]={type:s,type2:a,flag:o,value:c}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){let t=e.getString(1),n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":let r=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}let o=lf(new Uint8Array(e.getArrayBuffer(a))),c=new io(o.buffer);switch(t){case"b":case"c":return c.getBooleanArray(r);case"d":return c.getFloat64Array(r);case"f":return c.getFloat32Array(r);case"i":return c.getInt32Array(r);case"l":return c.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}},io=class{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){let t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){let e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){let e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){let e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){let t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){let e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){let t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){let e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){let t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){let e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){let t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){let t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){let t=this.offset,n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);let r=n.indexOf(0);return r>=0&&(n=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(n)}},ro=class{add(e,t){this[e]=t}};function Cy(i){let e="Kaydara FBX Binary  \0";return i.byteLength>=e.length&&e===mf(i,0,e.length)}function Py(i){let e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"],t=0;function n(r){let s=i[r-1];return i=i.slice(t+r),t++,s}for(let r=0;r<e.length;++r)if(n(1)===e[r])return!1;return!0}function ff(i){let e=/FBXVersion: (\d+)/,t=i.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function Ly(i){return i/46186158e3}var Iy=[];function to(i,e,t,n){let r;switch(n.mappingType){case"ByPolygonVertex":r=i;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(r=n.indices[r]);let s=r*n.dataSize,a=s+n.dataSize;return Uy(Iy,n.buffer,s,a)}var tc=new hn,Hr=new j;function df(i){let e=new je,t=new je,n=new je,r=new je,s=new je,a=new je,o=new je,c=new je,h=new je,u=new je,f=new je,d=new je,p=i.inheritType?i.inheritType:0;if(i.translation&&e.setPosition(Hr.fromArray(i.translation)),i.preRotation){let D=i.preRotation.map(Yt.degToRad);D.push(i.eulerOrder||hn.DEFAULT_ORDER),t.makeRotationFromEuler(tc.fromArray(D))}if(i.rotation){let D=i.rotation.map(Yt.degToRad);D.push(i.eulerOrder||hn.DEFAULT_ORDER),n.makeRotationFromEuler(tc.fromArray(D))}if(i.postRotation){let D=i.postRotation.map(Yt.degToRad);D.push(i.eulerOrder||hn.DEFAULT_ORDER),r.makeRotationFromEuler(tc.fromArray(D)),r.invert()}i.scale&&s.scale(Hr.fromArray(i.scale)),i.scalingOffset&&o.setPosition(Hr.fromArray(i.scalingOffset)),i.scalingPivot&&a.setPosition(Hr.fromArray(i.scalingPivot)),i.rotationOffset&&c.setPosition(Hr.fromArray(i.rotationOffset)),i.rotationPivot&&h.setPosition(Hr.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(f.copy(i.parentMatrix),u.copy(i.parentMatrixWorld));let S=t.clone().multiply(n).multiply(r),y=new je;y.extractRotation(u);let m=new je;m.copyPosition(u);let l=m.clone().invert().multiply(u),v=y.clone().invert().multiply(l),g=s,_=new je;if(p===0)_.copy(y).multiply(S).multiply(v).multiply(g);else if(p===1)_.copy(y).multiply(v).multiply(S).multiply(g);else{let Z=new je().scale(new j().setFromMatrixScale(f)).clone().invert(),K=v.clone().multiply(Z);_.copy(y).multiply(S).multiply(K).multiply(g)}let b=h.clone().invert(),P=a.clone().invert(),I=e.clone().multiply(c).multiply(h).multiply(t).multiply(n).multiply(r).multiply(b).multiply(o).multiply(a).multiply(s).multiply(P),z=new je().copyPosition(I),C=u.clone().multiply(z);return d.copyPosition(C),I=d.clone().multiply(_),I.premultiply(u.invert()),I}function pf(i){i=i||0;let e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[i]}function nc(i){return i.split(",").map(function(t){return parseFloat(t)})}function mf(i,e,t){return e===void 0&&(e=0),t===void 0&&(t=i.byteLength),new TextDecoder().decode(new Uint8Array(i,e,t))}function Dy(i,e){for(let t=0,n=i.length,r=e.length;t<r;t++,n++)i[n]=e[t]}function Uy(i,e,t,n){for(let r=t,s=0;r<n;r++,s++)i[s]=e[r];return i}var so,_f,wn,oi,pn,gf,ai,Pi=new Or,lc,cc,hc=!1,ao=0,uc=!0,fc,vf,$i=document.getElementById("contact-container"),Oy=document.getElementById("progress-bar"),Ny=document.querySelector(".progress-bar-container"),dc=new Ms;dc.onLoad=function(){Ny.style.display="none"};dc.onProgress=function(i,e,t){Oy.value=e/t*100};function yf(){so=document.querySelector("#bubble"),so.height=$i.offsetHeight,so.width=$i.offsetWidth,pn=new Wi({canvas:so,antialias:!0,alpha:!0}),oi=new Lt(45,window.innerWidth/window.innerHeight,1,1e4),oi.position.set(100,50,150),_f=new Wa;let i=new Ai().load("https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b64138ad558e5a9292da54_wall_texture.webp"),e=new Ss({roughness:1,clearcoat:1,clearcoatRoughness:1,transmission:0,thickness:1,reflectivity:0,color:5263440,map:i}),t=new Br({color:"white"}),n=new Ss({color:16753920,emissive:0,metalness:.8,roughness:.2,reflectivity:.6,clearcoat:1,clearcoatRoughness:1,thickness:1});new no(dc).load("https://qn.edwardxwliu.cn/cat%20fix.fbx",function(h){h.traverse(function(u){u.isMesh&&(u.name==="cat3"&&(fc=u),u.name==="cat1003"||u.name==="cat2"||u.name==="cat3"?u.material=t:u.name==="Coin_Dollar_1,5_cm"?u.material=n:u.name==="cat4"&&(u.material=e))}),$(window).width()>768?h.scale.setScalar($i.clientWidth/$i.clientHeight*.05):h.scale.setScalar($i.clientWidth/$i.clientHeight*.1),h.position.set(0,-50,0),Pi.add(h)});let s=new kr(16777215,500);s.name="Spot Light",s.angle=Math.PI/5,s.penumbra=.3,s.position.set(100,100,50),s.castShadow=!0,s.shadow.camera.near=80,s.shadow.camera.far=300,s.shadow.mapSize.width=1024,s.shadow.mapSize.height=1024,Pi.add(s);let a=new Zi(16777215,3);a.name="Dir. Light",a.position.set(0,100,0),a.castShadow=!0,a.shadow.camera.near=1,a.shadow.camera.far=130,a.shadow.camera.right=150,a.shadow.camera.left=-150,a.shadow.camera.top=150,a.shadow.camera.bottom=-150,a.shadow.mapSize.width=1024,a.shadow.mapSize.height=1024,Pi.add(a);let o=new Zi(16777215,3);o.name="Dir. Light 2",o.position.set(50,-50,0),o.castShadow=!0,Pi.add(o);let c=new Va(16777215,16777215,1);c.color.setHSL(.6,1,.6),c.groundColor.setHSL(.095,1,.75),c.position.set(0,150,0),Pi.add(c),ai=new cn(new Na(1,8,8),new Lr({color:16777215})),Pi.add(ai),ai.add(new qi(16777215,3e3)),pn.setPixelRatio(window.devicePixelRatio),pn.setSize(window.innerWidth,window.innerHeight),pn.useLegacyLights=!1,pn.shadowMap.enabled=!0,pn.shadowMap.type=Tu,pn.toneMapping=Gl,pn.toneMappingExposure=1.25,wn=new Qa(oi,pn.domElement),wn.screenSpacePanning=!0,wn.enablePan=!0,wn.enableZoom=!0,wn.minDistance=50,wn.maxDistance=500,wn.target.set(0,2,0),wn.update(),window.addEventListener("resize",Fy),$(window).width()>768?pn.domElement.addEventListener("mousemove",zy,!0):pn.domElement.addEventListener("touchstart",ky)}function Fy(){oi.aspect=window.innerWidth/window.innerHeight,oi.updateProjectionMatrix(),pn.setSize(window.innerWidth,window.innerHeight)}function xf(){let i={root:null,threshold:.5};new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting?Sf():cancelAnimationFrame(vf)})},i).observe($i)}function Sf(){vf=requestAnimationFrame(Sf),uc?(fc.rotation.x+=.02,ao++,ao>=50&&(uc=!1)):(fc.rotation.x-=.02,ao--,ao<=-.79&&(uc=!0)),By()}function By(){let i=_f.getDelta();gf!==void 0&&gf.update(i);let e=Date.now()*25e-5;$(window).width()>768?(ai.position.x=Math.sin(e*7)*50,ai.position.y=Math.cos(e*5)*50-50,ai.position.z=Math.cos(e*3)*50):(ai.position.x=Math.sin(e*7)*25,ai.position.y=Math.cos(e*5)*25-25,ai.position.z=Math.cos(e*3)*25),pn.render(Pi,oi)}function zy(i){let e=new j(0,0,.5),t=pn.domElement.getBoundingClientRect();e.x=(i.clientX-t.left)/(t.right-t.left)*2-1,e.y=-((i.clientY-t.top)/(t.bottom-t.top))*2+1,e.unproject(oi);let r=new Xa(oi.position,e.sub(oi.position).normalize()).intersectObjects(Pi.children);wn.enabled=r.length>0}function ky(i){let e=+(i.targetTouches[0].clientX/window.innerWidth)*2+-1,t=-(i.targetTouches[0].clientY/window.innerHeight)*2+1;if(!hc)return hc=!0,setTimeout(function(){hc=!1},300),lc=e,cc=t,!1;i.preventDefault(),Math.abs(e-lc)/2<.2&&Math.abs(t-cc)/2<.2&&Math.abs(e-lc)/2>0&&Math.abs(t-cc)/2>0&&(wn.enabled=!wn.enabled,wn.enabled?$("#bubble").css("touch-action","none"):$("#bubble").css("touch-action","auto"))}var qt=typeof module<"u"&&module.exports&&typeof global<"u"?global:window;(qt._gsQueue||(qt._gsQueue=[])).push(function(){"use strict";qt._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(i,e,t){var n=function(y){var m,l=[],v=y.length;for(m=0;m!==v;l.push(y[m++]));return l},r=function(y,m,l){var v,g,_=y.cycle;for(v in _)g=_[v],y[v]=typeof g=="function"?g.call(m[l],l):g[l%g.length];delete y.cycle},s=function(y,m,l){t.call(this,y,m,l),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=s.prototype.render},a=1e-10,o=t._internals,c=o.isSelector,h=o.isArray,u=s.prototype=t.to({},.1,{}),f=[];s.version="1.18.0",u.constructor=s,u.kill()._gc=!1,s.killTweensOf=s.killDelayedCallsTo=t.killTweensOf,s.getTweensOf=t.getTweensOf,s.lagSmoothing=t.lagSmoothing,s.ticker=t.ticker,s.render=t.render,u.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},u.updateTo=function(y,m){var l,v=this.ratio,g=this.vars.immediateRender||y.immediateRender;m&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(l in y)this.vars[l]=y[l];if(this._initted||g){if(m)this._initted=!1,g&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&t._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var _=this._time;this.render(0,!0,!1),this._initted=!1,this.render(_,!0,!1)}else if(this._time>0||g){this._initted=!1,this._init();for(var b,P=1/(1-v),I=this._firstPT;I;)b=I.s+I.c,I.c*=P,I.s=b-I.c,I=I._next}}return this},u.render=function(y,m,l){this._initted||this._duration===0&&this.vars.repeat&&this.invalidate();var v,g,_,b,P,I,z,C,D=this._dirty?this.totalDuration():this._totalDuration,Z=this._time,K=this._totalTime,ie=this._cycle,V=this._duration,q=this._rawPrevTime;if(y>=D?(this._totalTime=D,this._cycle=this._repeat,this._yoyo&&1&this._cycle?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=V,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(v=!0,g="onComplete",l=l||this._timeline.autoRemoveChildren),V===0&&(this._initted||!this.vars.lazy||l)&&(this._startTime===this._timeline._duration&&(y=0),(y===0||0>q||q===a)&&q!==y&&(l=!0,q>a&&(g="onReverseComplete")),this._rawPrevTime=C=!m||y||q===y?y:a)):1e-7>y?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(K!==0||V===0&&q>0)&&(g="onReverseComplete",v=this._reversed),0>y&&(this._active=!1,V===0&&(this._initted||!this.vars.lazy||l)&&(q>=0&&(l=!0),this._rawPrevTime=C=!m||y||q===y?y:a)),this._initted||(l=!0)):(this._totalTime=this._time=y,this._repeat!==0&&(b=V+this._repeatDelay,this._cycle=this._totalTime/b>>0,this._cycle!==0&&this._cycle===this._totalTime/b&&this._cycle--,this._time=this._totalTime-this._cycle*b,this._yoyo&&1&this._cycle&&(this._time=V-this._time),this._time>V?this._time=V:0>this._time&&(this._time=0)),this._easeType?(P=this._time/V,I=this._easeType,z=this._easePower,(I===1||I===3&&P>=.5)&&(P=1-P),I===3&&(P*=2),z===1?P*=P:z===2?P*=P*P:z===3?P*=P*P*P:z===4&&(P*=P*P*P*P),this.ratio=I===1?1-P:I===2?P:.5>this._time/V?P/2:1-P/2):this.ratio=this._ease.getRatio(this._time/V)),Z===this._time&&!l&&ie===this._cycle)return K!==this._totalTime&&this._onUpdate&&(m||this._callback("onUpdate")),void 0;if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!l&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=Z,this._totalTime=K,this._rawPrevTime=q,this._cycle=ie,o.lazyTweens.push(this),this._lazy=[y,m],void 0;this._time&&!v?this.ratio=this._ease.getRatio(this._time/V):v&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(this._time===0?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==Z&&y>=0&&(this._active=!0),K===0&&(this._initted===2&&y>0&&this._init(),this._startAt&&(y>=0?this._startAt.render(y,m,l):g||(g="_dummyGS")),this.vars.onStart&&(this._totalTime!==0||V===0)&&(m||this._callback("onStart"))),_=this._firstPT;_;)_.f?_.t[_.p](_.c*this.ratio+_.s):_.t[_.p]=_.c*this.ratio+_.s,_=_._next;this._onUpdate&&(0>y&&this._startAt&&this._startTime&&this._startAt.render(y,m,l),m||(this._totalTime!==K||v)&&this._callback("onUpdate")),this._cycle!==ie&&(m||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),g&&(!this._gc||l)&&(0>y&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(y,m,l),v&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!m&&this.vars[g]&&this._callback(g),V===0&&this._rawPrevTime===a&&C!==a&&(this._rawPrevTime=0))},s.to=function(y,m,l){return new s(y,m,l)},s.from=function(y,m,l){return l.runBackwards=!0,l.immediateRender=l.immediateRender!=0,new s(y,m,l)},s.fromTo=function(y,m,l,v){return v.startAt=l,v.immediateRender=v.immediateRender!=0&&l.immediateRender!=0,new s(y,m,v)},s.staggerTo=s.allTo=function(y,m,l,v,g,_,b){v=v||0;var P,I,z,C,D=l.delay||0,Z=[],K=function(){l.onComplete&&l.onComplete.apply(l.onCompleteScope||this,arguments),g.apply(b||l.callbackScope||this,_||f)},ie=l.cycle,V=l.startAt&&l.startAt.cycle;for(h(y)||(typeof y=="string"&&(y=t.selector(y)||y),c(y)&&(y=n(y))),y=y||[],0>v&&(y=n(y),y.reverse(),v*=-1),P=y.length-1,z=0;P>=z;z++){I={};for(C in l)I[C]=l[C];if(ie&&r(I,y,z),V){V=I.startAt={};for(C in l.startAt)V[C]=l.startAt[C];r(I.startAt,y,z)}I.delay=D,z===P&&g&&(I.onComplete=K),Z[z]=new s(y[z],m,I),D+=v}return Z},s.staggerFrom=s.allFrom=function(y,m,l,v,g,_,b){return l.runBackwards=!0,l.immediateRender=l.immediateRender!=0,s.staggerTo(y,m,l,v,g,_,b)},s.staggerFromTo=s.allFromTo=function(y,m,l,v,g,_,b,P){return v.startAt=l,v.immediateRender=v.immediateRender!=0&&l.immediateRender!=0,s.staggerTo(y,m,v,g,_,b,P)},s.delayedCall=function(y,m,l,v,g){return new s(m,0,{delay:y,onComplete:m,onCompleteParams:l,callbackScope:v,onReverseComplete:m,onReverseCompleteParams:l,immediateRender:!1,useFrames:g,overwrite:0})},s.set=function(y,m){return new s(y,0,m)},s.isTweening=function(y){return t.getTweensOf(y,!0).length>0};var d=function(y,m){for(var l=[],v=0,g=y._first;g;)g instanceof t?l[v++]=g:(m&&(l[v++]=g),l=l.concat(d(g,m)),v=l.length),g=g._next;return l},p=s.getAllTweens=function(y){return d(i._rootTimeline,y).concat(d(i._rootFramesTimeline,y))};s.killAll=function(y,m,l,v){m==null&&(m=!0),l==null&&(l=!0);var g,_,b,P=p(v!=0),I=P.length,z=m&&l&&v;for(b=0;I>b;b++)_=P[b],(z||_ instanceof e||(g=_.target===_.vars.onComplete)&&l||m&&!g)&&(y?_.totalTime(_._reversed?0:_.totalDuration()):_._enabled(!1,!1))},s.killChildTweensOf=function(y,m){if(y!=null){var l,v,g,_,b,P=o.tweenLookup;if(typeof y=="string"&&(y=t.selector(y)||y),c(y)&&(y=n(y)),h(y))for(_=y.length;--_>-1;)s.killChildTweensOf(y[_],m);else{l=[];for(g in P)for(v=P[g].target.parentNode;v;)v===y&&(l=l.concat(P[g].tweens)),v=v.parentNode;for(b=l.length,_=0;b>_;_++)m&&l[_].totalTime(l[_].totalDuration()),l[_]._enabled(!1,!1)}}};var S=function(y,m,l,v){m=m!==!1,l=l!==!1,v=v!==!1;for(var g,_,b=p(v),P=m&&l&&v,I=b.length;--I>-1;)_=b[I],(P||_ instanceof e||(g=_.target===_.vars.onComplete)&&l||m&&!g)&&_.paused(y)};return s.pauseAll=function(y,m,l){S(!0,y,m,l)},s.resumeAll=function(y,m,l){S(!1,y,m,l)},s.globalTimeScale=function(y){var m=i._rootTimeline,l=t.ticker.time;return arguments.length?(y=y||a,m._startTime=l-(l-m._startTime)*m._timeScale/y,m=i._rootFramesTimeline,l=t.ticker.frame,m._startTime=l-(l-m._startTime)*m._timeScale/y,m._timeScale=i._rootTimeline._timeScale=y,y):m._timeScale},u.progress=function(y){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&1&this._cycle?1-y:y)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},u.totalProgress=function(y){return arguments.length?this.totalTime(this.totalDuration()*y,!1):this._totalTime/this.totalDuration()},u.time=function(y,m){return arguments.length?(this._dirty&&this.totalDuration(),y>this._duration&&(y=this._duration),this._yoyo&&1&this._cycle?y=this._duration-y+this._cycle*(this._duration+this._repeatDelay):this._repeat!==0&&(y+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(y,m)):this._time},u.duration=function(y){return arguments.length?i.prototype.duration.call(this,y):this._duration},u.totalDuration=function(y){return arguments.length?this._repeat===-1?this:this.duration((y-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=this._repeat===-1?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},u.repeat=function(y){return arguments.length?(this._repeat=y,this._uncache(!0)):this._repeat},u.repeatDelay=function(y){return arguments.length?(this._repeatDelay=y,this._uncache(!0)):this._repeatDelay},u.yoyo=function(y){return arguments.length?(this._yoyo=y,this):this._yoyo},s},!0),qt._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(i,e,t){var n=function(l){e.call(this,l),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var v,g,_=this.vars;for(g in _)v=_[g],c(v)&&v.join("").indexOf("{self}")!==-1&&(_[g]=this._swapSelfInParams(v));c(_.tweens)&&this.add(_.tweens,0,_.align,_.stagger)},r=1e-10,s=t._internals,a=n._internals={},o=s.isSelector,c=s.isArray,h=s.lazyTweens,u=s.lazyRender,f=qt._gsDefine.globals,d=function(l){var v,g={};for(v in l)g[v]=l[v];return g},p=function(l,v,g){var _,b,P=l.cycle;for(_ in P)b=P[_],l[_]=typeof b=="function"?b.call(v[g],g):b[g%b.length];delete l.cycle},S=a.pauseCallback=function(){},y=function(l){var v,g=[],_=l.length;for(v=0;v!==_;g.push(l[v++]));return g},m=n.prototype=new e;return n.version="1.18.0",m.constructor=n,m.kill()._gc=m._forcingPlayhead=m._hasPause=!1,m.to=function(l,v,g,_){var b=g.repeat&&f.TweenMax||t;return v?this.add(new b(l,v,g),_):this.set(l,g,_)},m.from=function(l,v,g,_){return this.add((g.repeat&&f.TweenMax||t).from(l,v,g),_)},m.fromTo=function(l,v,g,_,b){var P=_.repeat&&f.TweenMax||t;return v?this.add(P.fromTo(l,v,g,_),b):this.set(l,_,b)},m.staggerTo=function(l,v,g,_,b,P,I,z){var C,D,Z=new n({onComplete:P,onCompleteParams:I,callbackScope:z,smoothChildTiming:this.smoothChildTiming}),K=g.cycle;for(typeof l=="string"&&(l=t.selector(l)||l),l=l||[],o(l)&&(l=y(l)),_=_||0,0>_&&(l=y(l),l.reverse(),_*=-1),D=0;l.length>D;D++)C=d(g),C.startAt&&(C.startAt=d(C.startAt),C.startAt.cycle&&p(C.startAt,l,D)),K&&p(C,l,D),Z.to(l[D],v,C,D*_);return this.add(Z,b)},m.staggerFrom=function(l,v,g,_,b,P,I,z){return g.immediateRender=g.immediateRender!=0,g.runBackwards=!0,this.staggerTo(l,v,g,_,b,P,I,z)},m.staggerFromTo=function(l,v,g,_,b,P,I,z,C){return _.startAt=g,_.immediateRender=_.immediateRender!=0&&g.immediateRender!=0,this.staggerTo(l,v,_,b,P,I,z,C)},m.call=function(l,v,g,_){return this.add(t.delayedCall(0,l,v,g),_)},m.set=function(l,v,g){return g=this._parseTimeOrLabel(g,0,!0),v.immediateRender==null&&(v.immediateRender=g===this._time&&!this._paused),this.add(new t(l,0,v),g)},n.exportRoot=function(l,v){l=l||{},l.smoothChildTiming==null&&(l.smoothChildTiming=!0);var g,_,b=new n(l),P=b._timeline;for(v==null&&(v=!0),P._remove(b,!0),b._startTime=0,b._rawPrevTime=b._time=b._totalTime=P._time,g=P._first;g;)_=g._next,v&&g instanceof t&&g.target===g.vars.onComplete||b.add(g,g._startTime-g._delay),g=_;return P.add(b,0),b},m.add=function(l,v,g,_){var b,P,I,z,C,D;if(typeof v!="number"&&(v=this._parseTimeOrLabel(v,0,!0,l)),!(l instanceof i)){if(l instanceof Array||l&&l.push&&c(l)){for(g=g||"normal",_=_||0,b=v,P=l.length,I=0;P>I;I++)c(z=l[I])&&(z=new n({tweens:z})),this.add(z,b),typeof z!="string"&&typeof z!="function"&&(g==="sequence"?b=z._startTime+z.totalDuration()/z._timeScale:g==="start"&&(z._startTime-=z.delay())),b+=_;return this._uncache(!0)}if(typeof l=="string")return this.addLabel(l,v);if(typeof l!="function")throw"Cannot add "+l+" into the timeline; it is not a tween, timeline, function, or string.";l=t.delayedCall(0,l)}if(e.prototype.add.call(this,l,v),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(C=this,D=C.rawTime()>l._startTime;C._timeline;)D&&C._timeline.smoothChildTiming?C.totalTime(C._totalTime,!0):C._gc&&C._enabled(!0,!1),C=C._timeline;return this},m.remove=function(l){if(l instanceof i){this._remove(l,!1);var v=l._timeline=l.vars.useFrames?i._rootFramesTimeline:i._rootTimeline;return l._startTime=(l._paused?l._pauseTime:v._time)-(l._reversed?l.totalDuration()-l._totalTime:l._totalTime)/l._timeScale,this}if(l instanceof Array||l&&l.push&&c(l)){for(var g=l.length;--g>-1;)this.remove(l[g]);return this}return typeof l=="string"?this.removeLabel(l):this.kill(null,l)},m._remove=function(l,v){e.prototype._remove.call(this,l,v);var g=this._last;return g?this._time>g._startTime+g._totalDuration/g._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},m.append=function(l,v){return this.add(l,this._parseTimeOrLabel(null,v,!0,l))},m.insert=m.insertMultiple=function(l,v,g,_){return this.add(l,v||0,g,_)},m.appendMultiple=function(l,v,g,_){return this.add(l,this._parseTimeOrLabel(null,v,!0,l),g,_)},m.addLabel=function(l,v){return this._labels[l]=this._parseTimeOrLabel(v),this},m.addPause=function(l,v,g,_){var b=t.delayedCall(0,S,g,_||this);return b.vars.onComplete=b.vars.onReverseComplete=v,b.data="isPause",this._hasPause=!0,this.add(b,l)},m.removeLabel=function(l){return delete this._labels[l],this},m.getLabelTime=function(l){return this._labels[l]!=null?this._labels[l]:-1},m._parseTimeOrLabel=function(l,v,g,_){var b;if(_ instanceof i&&_.timeline===this)this.remove(_);else if(_&&(_ instanceof Array||_.push&&c(_)))for(b=_.length;--b>-1;)_[b]instanceof i&&_[b].timeline===this&&this.remove(_[b]);if(typeof v=="string")return this._parseTimeOrLabel(v,g&&typeof l=="number"&&this._labels[v]==null?l-this.duration():0,g);if(v=v||0,typeof l!="string"||!isNaN(l)&&this._labels[l]==null)l==null&&(l=this.duration());else{if(b=l.indexOf("="),b===-1)return this._labels[l]==null?g?this._labels[l]=this.duration()+v:v:this._labels[l]+v;v=parseInt(l.charAt(b-1)+"1",10)*Number(l.substr(b+1)),l=b>1?this._parseTimeOrLabel(l.substr(0,b-1),0,g):this.duration()}return Number(l)+v},m.seek=function(l,v){return this.totalTime(typeof l=="number"?l:this._parseTimeOrLabel(l),v!==!1)},m.stop=function(){return this.paused(!0)},m.gotoAndPlay=function(l,v){return this.play(l,v)},m.gotoAndStop=function(l,v){return this.pause(l,v)},m.render=function(l,v,g){this._gc&&this._enabled(!0,!1);var _,b,P,I,z,C,D=this._dirty?this.totalDuration():this._totalDuration,Z=this._time,K=this._startTime,ie=this._timeScale,V=this._paused;if(l>=D)this._totalTime=this._time=D,this._reversed||this._hasPausedChild()||(b=!0,I="onComplete",z=!!this._timeline.autoRemoveChildren,this._duration===0&&(l===0||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==l&&this._first&&(z=!0,this._rawPrevTime>r&&(I="onReverseComplete"))),this._rawPrevTime=this._duration||!v||l||this._rawPrevTime===l?l:r,l=D+1e-4;else if(1e-7>l)if(this._totalTime=this._time=0,(Z!==0||this._duration===0&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>l&&this._rawPrevTime>=0))&&(I="onReverseComplete",b=this._reversed),0>l)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(z=b=!0,I="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(z=!0),this._rawPrevTime=l;else{if(this._rawPrevTime=this._duration||!v||l||this._rawPrevTime===l?l:r,l===0&&b)for(_=this._first;_&&_._startTime===0;)_._duration||(b=!1),_=_._next;l=0,this._initted||(z=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!v){if(l>=Z)for(_=this._first;_&&l>=_._startTime&&!C;)_._duration||_.data!=="isPause"||_.ratio||_._startTime===0&&this._rawPrevTime===0||(C=_),_=_._next;else for(_=this._last;_&&_._startTime>=l&&!C;)_._duration||_.data==="isPause"&&_._rawPrevTime>0&&(C=_),_=_._prev;C&&(this._time=l=C._startTime,this._totalTime=l+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=l}if(this._time!==Z&&this._first||g||z||C){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==Z&&l>0&&(this._active=!0),Z===0&&this.vars.onStart&&this._time!==0&&(v||this._callback("onStart")),this._time>=Z)for(_=this._first;_&&(P=_._next,!this._paused||V);)(_._active||_._startTime<=this._time&&!_._paused&&!_._gc)&&(C===_&&this.pause(),_._reversed?_.render((_._dirty?_.totalDuration():_._totalDuration)-(l-_._startTime)*_._timeScale,v,g):_.render((l-_._startTime)*_._timeScale,v,g)),_=P;else for(_=this._last;_&&(P=_._prev,!this._paused||V);){if(_._active||Z>=_._startTime&&!_._paused&&!_._gc){if(C===_){for(C=_._prev;C&&C.endTime()>this._time;)C.render(C._reversed?C.totalDuration()-(l-C._startTime)*C._timeScale:(l-C._startTime)*C._timeScale,v,g),C=C._prev;C=null,this.pause()}_._reversed?_.render((_._dirty?_.totalDuration():_._totalDuration)-(l-_._startTime)*_._timeScale,v,g):_.render((l-_._startTime)*_._timeScale,v,g)}_=P}this._onUpdate&&(v||(h.length&&u(),this._callback("onUpdate"))),I&&(this._gc||(K===this._startTime||ie!==this._timeScale)&&(this._time===0||D>=this.totalDuration())&&(b&&(h.length&&u(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!v&&this.vars[I]&&this._callback(I)))}},m._hasPausedChild=function(){for(var l=this._first;l;){if(l._paused||l instanceof n&&l._hasPausedChild())return!0;l=l._next}return!1},m.getChildren=function(l,v,g,_){_=_||-9999999999;for(var b=[],P=this._first,I=0;P;)_>P._startTime||(P instanceof t?v!==!1&&(b[I++]=P):(g!==!1&&(b[I++]=P),l!==!1&&(b=b.concat(P.getChildren(!0,v,g)),I=b.length))),P=P._next;return b},m.getTweensOf=function(l,v){var g,_,b=this._gc,P=[],I=0;for(b&&this._enabled(!0,!0),g=t.getTweensOf(l),_=g.length;--_>-1;)(g[_].timeline===this||v&&this._contains(g[_]))&&(P[I++]=g[_]);return b&&this._enabled(!1,!0),P},m.recent=function(){return this._recent},m._contains=function(l){for(var v=l.timeline;v;){if(v===this)return!0;v=v.timeline}return!1},m.shiftChildren=function(l,v,g){g=g||0;for(var _,b=this._first,P=this._labels;b;)b._startTime>=g&&(b._startTime+=l),b=b._next;if(v)for(_ in P)P[_]>=g&&(P[_]+=l);return this._uncache(!0)},m._kill=function(l,v){if(!l&&!v)return this._enabled(!1,!1);for(var g=v?this.getTweensOf(v):this.getChildren(!0,!0,!1),_=g.length,b=!1;--_>-1;)g[_]._kill(l,v)&&(b=!0);return b},m.clear=function(l){var v=this.getChildren(!1,!0,!0),g=v.length;for(this._time=this._totalTime=0;--g>-1;)v[g]._enabled(!1,!1);return l!==!1&&(this._labels={}),this._uncache(!0)},m.invalidate=function(){for(var l=this._first;l;)l.invalidate(),l=l._next;return i.prototype.invalidate.call(this)},m._enabled=function(l,v){if(l===this._gc)for(var g=this._first;g;)g._enabled(l,!0),g=g._next;return e.prototype._enabled.call(this,l,v)},m.totalTime=function(){this._forcingPlayhead=!0;var l=i.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,l},m.duration=function(l){return arguments.length?(this.duration()!==0&&l!==0&&this.timeScale(this._duration/l),this):(this._dirty&&this.totalDuration(),this._duration)},m.totalDuration=function(l){if(!arguments.length){if(this._dirty){for(var v,g,_=0,b=this._last,P=999999999999;b;)v=b._prev,b._dirty&&b.totalDuration(),b._startTime>P&&this._sortChildren&&!b._paused?this.add(b,b._startTime-b._delay):P=b._startTime,0>b._startTime&&!b._paused&&(_-=b._startTime,this._timeline.smoothChildTiming&&(this._startTime+=b._startTime/this._timeScale),this.shiftChildren(-b._startTime,!1,-9999999999),P=0),g=b._startTime+b._totalDuration/b._timeScale,g>_&&(_=g),b=v;this._duration=this._totalDuration=_,this._dirty=!1}return this._totalDuration}return this.totalDuration()!==0&&l!==0&&this.timeScale(this._totalDuration/l),this},m.paused=function(l){if(!l)for(var v=this._first,g=this._time;v;)v._startTime===g&&v.data==="isPause"&&(v._rawPrevTime=0),v=v._next;return i.prototype.paused.apply(this,arguments)},m.usesFrames=function(){for(var l=this._timeline;l._timeline;)l=l._timeline;return l===i._rootFramesTimeline},m.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},n},!0),qt._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(i,e,t){var n=function(u){i.call(this,u),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=1e-10,s=e._internals,a=s.lazyTweens,o=s.lazyRender,c=new t(null,null,1,0),h=n.prototype=new i;return h.constructor=n,h.kill()._gc=!1,n.version="1.18.0",h.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},h.addCallback=function(u,f,d,p){return this.add(e.delayedCall(0,u,d,p),f)},h.removeCallback=function(u,f){if(u)if(f==null)this._kill(null,u);else for(var d=this.getTweensOf(u,!1),p=d.length,S=this._parseTimeOrLabel(f);--p>-1;)d[p]._startTime===S&&d[p]._enabled(!1,!1);return this},h.removePause=function(u){return this.removeCallback(i._internals.pauseCallback,u)},h.tweenTo=function(u,f){f=f||{};var d,p,S,y={ease:c,useFrames:this.usesFrames(),immediateRender:!1};for(p in f)y[p]=f[p];return y.time=this._parseTimeOrLabel(u),d=Math.abs(Number(y.time)-this._time)/this._timeScale||.001,S=new e(this,d,y),y.onStart=function(){S.target.paused(!0),S.vars.time!==S.target.time()&&d===S.duration()&&S.duration(Math.abs(S.vars.time-S.target.time())/S.target._timeScale),f.onStart&&S._callback("onStart")},S},h.tweenFromTo=function(u,f,d){d=d||{},u=this._parseTimeOrLabel(u),d.startAt={onComplete:this.seek,onCompleteParams:[u],callbackScope:this},d.immediateRender=d.immediateRender!==!1;var p=this.tweenTo(f,d);return p.duration(Math.abs(p.vars.time-u)/this._timeScale||.001)},h.render=function(u,f,d){this._gc&&this._enabled(!0,!1);var p,S,y,m,l,v,g,_=this._dirty?this.totalDuration():this._totalDuration,b=this._duration,P=this._time,I=this._totalTime,z=this._startTime,C=this._timeScale,D=this._rawPrevTime,Z=this._paused,K=this._cycle;if(u>=_)this._locked||(this._totalTime=_,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(S=!0,m="onComplete",l=!!this._timeline.autoRemoveChildren,this._duration===0&&(u===0||0>D||D===r)&&D!==u&&this._first&&(l=!0,D>r&&(m="onReverseComplete"))),this._rawPrevTime=this._duration||!f||u||this._rawPrevTime===u?u:r,this._yoyo&&1&this._cycle?this._time=u=0:(this._time=b,u=b+1e-4);else if(1e-7>u)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(P!==0||b===0&&D!==r&&(D>0||0>u&&D>=0)&&!this._locked)&&(m="onReverseComplete",S=this._reversed),0>u)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(l=S=!0,m="onReverseComplete"):D>=0&&this._first&&(l=!0),this._rawPrevTime=u;else{if(this._rawPrevTime=b||!f||u||this._rawPrevTime===u?u:r,u===0&&S)for(p=this._first;p&&p._startTime===0;)p._duration||(S=!1),p=p._next;u=0,this._initted||(l=!0)}else if(b===0&&0>D&&(l=!0),this._time=this._rawPrevTime=u,this._locked||(this._totalTime=u,this._repeat!==0&&(v=b+this._repeatDelay,this._cycle=this._totalTime/v>>0,this._cycle!==0&&this._cycle===this._totalTime/v&&this._cycle--,this._time=this._totalTime-this._cycle*v,this._yoyo&&1&this._cycle&&(this._time=b-this._time),this._time>b?(this._time=b,u=b+1e-4):0>this._time?this._time=u=0:u=this._time)),this._hasPause&&!this._forcingPlayhead&&!f){if(u=this._time,u>=P)for(p=this._first;p&&u>=p._startTime&&!g;)p._duration||p.data!=="isPause"||p.ratio||p._startTime===0&&this._rawPrevTime===0||(g=p),p=p._next;else for(p=this._last;p&&p._startTime>=u&&!g;)p._duration||p.data==="isPause"&&p._rawPrevTime>0&&(g=p),p=p._prev;g&&(this._time=u=g._startTime,this._totalTime=u+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==K&&!this._locked){var ie=this._yoyo&&(1&K)!==0,V=ie===(this._yoyo&&(1&this._cycle)!==0),q=this._totalTime,ne=this._cycle,ae=this._rawPrevTime,ue=this._time;if(this._totalTime=K*b,K>this._cycle?ie=!ie:this._totalTime+=b,this._time=P,this._rawPrevTime=b===0?D-1e-4:D,this._cycle=K,this._locked=!0,P=ie?0:b,this.render(P,f,b===0),f||this._gc||this.vars.onRepeat&&this._callback("onRepeat"),V&&(P=ie?b+1e-4:-1e-4,this.render(P,!0,!1)),this._locked=!1,this._paused&&!Z)return;this._time=ue,this._totalTime=q,this._cycle=ne,this._rawPrevTime=ae}if(!(this._time!==P&&this._first||d||l||g))return I!==this._totalTime&&this._onUpdate&&(f||this._callback("onUpdate")),void 0;if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==I&&u>0&&(this._active=!0),I===0&&this.vars.onStart&&this._totalTime!==0&&(f||this._callback("onStart")),this._time>=P)for(p=this._first;p&&(y=p._next,!this._paused||Z);)(p._active||p._startTime<=this._time&&!p._paused&&!p._gc)&&(g===p&&this.pause(),p._reversed?p.render((p._dirty?p.totalDuration():p._totalDuration)-(u-p._startTime)*p._timeScale,f,d):p.render((u-p._startTime)*p._timeScale,f,d)),p=y;else for(p=this._last;p&&(y=p._prev,!this._paused||Z);){if(p._active||P>=p._startTime&&!p._paused&&!p._gc){if(g===p){for(g=p._prev;g&&g.endTime()>this._time;)g.render(g._reversed?g.totalDuration()-(u-g._startTime)*g._timeScale:(u-g._startTime)*g._timeScale,f,d),g=g._prev;g=null,this.pause()}p._reversed?p.render((p._dirty?p.totalDuration():p._totalDuration)-(u-p._startTime)*p._timeScale,f,d):p.render((u-p._startTime)*p._timeScale,f,d)}p=y}this._onUpdate&&(f||(a.length&&o(),this._callback("onUpdate"))),m&&(this._locked||this._gc||(z===this._startTime||C!==this._timeScale)&&(this._time===0||_>=this.totalDuration())&&(S&&(a.length&&o(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!f&&this.vars[m]&&this._callback(m)))},h.getActive=function(u,f,d){u==null&&(u=!0),f==null&&(f=!0),d==null&&(d=!1);var p,S,y=[],m=this.getChildren(u,f,d),l=0,v=m.length;for(p=0;v>p;p++)S=m[p],S.isActive()&&(y[l++]=S);return y},h.getLabelAfter=function(u){u||u!==0&&(u=this._time);var f,d=this.getLabelsArray(),p=d.length;for(f=0;p>f;f++)if(d[f].time>u)return d[f].name;return null},h.getLabelBefore=function(u){u==null&&(u=this._time);for(var f=this.getLabelsArray(),d=f.length;--d>-1;)if(u>f[d].time)return f[d].name;return null},h.getLabelsArray=function(){var u,f=[],d=0;for(u in this._labels)f[d++]={time:this._labels[u],name:u};return f.sort(function(p,S){return p.time-S.time}),f},h.progress=function(u,f){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&1&this._cycle?1-u:u)+this._cycle*(this._duration+this._repeatDelay),f):this._time/this.duration()},h.totalProgress=function(u,f){return arguments.length?this.totalTime(this.totalDuration()*u,f):this._totalTime/this.totalDuration()},h.totalDuration=function(u){return arguments.length?this._repeat===-1?this:this.duration((u-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(i.prototype.totalDuration.call(this),this._totalDuration=this._repeat===-1?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},h.time=function(u,f){return arguments.length?(this._dirty&&this.totalDuration(),u>this._duration&&(u=this._duration),this._yoyo&&1&this._cycle?u=this._duration-u+this._cycle*(this._duration+this._repeatDelay):this._repeat!==0&&(u+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(u,f)):this._time},h.repeat=function(u){return arguments.length?(this._repeat=u,this._uncache(!0)):this._repeat},h.repeatDelay=function(u){return arguments.length?(this._repeatDelay=u,this._uncache(!0)):this._repeatDelay},h.yoyo=function(u){return arguments.length?(this._yoyo=u,this):this._yoyo},h.currentLabel=function(u){return arguments.length?this.seek(u,!0):this.getLabelBefore(this._time+1e-8)},n},!0),function(){var i=180/Math.PI,e=[],t=[],n=[],r={},s=qt._gsDefine.globals,a=function(l,v,g,_){this.a=l,this.b=v,this.c=g,this.d=_,this.da=_-l,this.ca=g-l,this.ba=v-l},o=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",c=function(l,v,g,_){var b={a:l},P={},I={},z={c:_},C=(l+v)/2,D=(v+g)/2,Z=(g+_)/2,K=(C+D)/2,ie=(D+Z)/2,V=(ie-K)/8;return b.b=C+(l-C)/4,P.b=K+V,b.c=P.a=(b.b+P.b)/2,P.c=I.a=(K+ie)/2,I.b=ie-V,z.b=Z+(_-Z)/4,I.c=z.a=(I.b+z.b)/2,[b,P,I,z]},h=function(l,v,g,_,b){var P,I,z,C,D,Z,K,ie,V,q,ne,ae,ue,me=l.length-1,fe=0,Me=l[0].a;for(P=0;me>P;P++)D=l[fe],I=D.a,z=D.d,C=l[fe+1].d,b?(ne=e[P],ae=t[P],ue=.25*(ae+ne)*v/(_?.5:n[P]||.5),Z=z-(z-I)*(_?.5*v:ne!==0?ue/ne:0),K=z+(C-z)*(_?.5*v:ae!==0?ue/ae:0),ie=z-(Z+((K-Z)*(3*ne/(ne+ae)+.5)/4||0))):(Z=z-.5*(z-I)*v,K=z+.5*(C-z)*v,ie=z-(Z+K)/2),Z+=ie,K+=ie,D.c=V=Z,D.b=P!==0?Me:Me=D.a+.6*(D.c-D.a),D.da=z-I,D.ca=V-I,D.ba=Me-I,g?(q=c(I,Me,V,z),l.splice(fe,1,q[0],q[1],q[2],q[3]),fe+=4):fe++,Me=K;D=l[fe],D.b=Me,D.c=Me+.4*(D.d-Me),D.da=D.d-D.a,D.ca=D.c-D.a,D.ba=Me-D.a,g&&(q=c(D.a,Me,D.c,D.d),l.splice(fe,1,q[0],q[1],q[2],q[3]))},u=function(l,v,g,_){var b,P,I,z,C,D,Z=[];if(_)for(l=[_].concat(l),P=l.length;--P>-1;)typeof(D=l[P][v])=="string"&&D.charAt(1)==="="&&(l[P][v]=_[v]+Number(D.charAt(0)+D.substr(2)));if(b=l.length-2,0>b)return Z[0]=new a(l[0][v],0,0,l[-1>b?0:1][v]),Z;for(P=0;b>P;P++)I=l[P][v],z=l[P+1][v],Z[P]=new a(I,0,0,z),g&&(C=l[P+2][v],e[P]=(e[P]||0)+(z-I)*(z-I),t[P]=(t[P]||0)+(C-z)*(C-z));return Z[P]=new a(l[P][v],0,0,l[P+1][v]),Z},f=function(l,v,g,_,b,P){var I,z,C,D,Z,K,ie,V,q={},ne=[],ae=P||l[0];b=typeof b=="string"?","+b+",":o,v==null&&(v=1);for(z in l[0])ne.push(z);if(l.length>1){for(V=l[l.length-1],ie=!0,I=ne.length;--I>-1;)if(z=ne[I],Math.abs(ae[z]-V[z])>.05){ie=!1;break}ie&&(l=l.concat(),P&&l.unshift(P),l.push(l[1]),P=l[l.length-3])}for(e.length=t.length=n.length=0,I=ne.length;--I>-1;)z=ne[I],r[z]=b.indexOf(","+z+",")!==-1,q[z]=u(l,z,r[z],P);for(I=e.length;--I>-1;)e[I]=Math.sqrt(e[I]),t[I]=Math.sqrt(t[I]);if(!_){for(I=ne.length;--I>-1;)if(r[z])for(C=q[ne[I]],K=C.length-1,D=0;K>D;D++)Z=C[D+1].da/t[D]+C[D].da/e[D],n[D]=(n[D]||0)+Z*Z;for(I=n.length;--I>-1;)n[I]=Math.sqrt(n[I])}for(I=ne.length,D=g?4:1;--I>-1;)z=ne[I],C=q[z],h(C,v,g,_,r[z]),ie&&(C.splice(0,D),C.splice(C.length-D,D));return q},d=function(l,v,g){v=v||"soft";var _,b,P,I,z,C,D,Z,K,ie,V,q={},ne=v==="cubic"?3:2,ae=v==="soft",ue=[];if(ae&&g&&(l=[g].concat(l)),l==null||ne+1>l.length)throw"invalid Bezier data";for(K in l[0])ue.push(K);for(C=ue.length;--C>-1;){for(K=ue[C],q[K]=z=[],ie=0,Z=l.length,D=0;Z>D;D++)_=g==null?l[D][K]:typeof(V=l[D][K])=="string"&&V.charAt(1)==="="?g[K]+Number(V.charAt(0)+V.substr(2)):Number(V),ae&&D>1&&Z-1>D&&(z[ie++]=(_+z[ie-2])/2),z[ie++]=_;for(Z=ie-ne+1,ie=0,D=0;Z>D;D+=ne)_=z[D],b=z[D+1],P=z[D+2],I=ne===2?0:z[D+3],z[ie++]=V=ne===3?new a(_,b,P,I):new a(_,(2*b+_)/3,(2*b+P)/3,P);z.length=ie}return q},p=function(l,v,g){for(var _,b,P,I,z,C,D,Z,K,ie,V,q=1/g,ne=l.length;--ne>-1;)for(ie=l[ne],P=ie.a,I=ie.d-P,z=ie.c-P,C=ie.b-P,_=b=0,Z=1;g>=Z;Z++)D=q*Z,K=1-D,_=b-(b=(D*D*I+3*K*(D*z+K*C))*D),V=ne*g+Z-1,v[V]=(v[V]||0)+_*_},S=function(l,v){v=v>>0||6;var g,_,b,P,I=[],z=[],C=0,D=0,Z=v-1,K=[],ie=[];for(g in l)p(l[g],I,v);for(b=I.length,_=0;b>_;_++)C+=Math.sqrt(I[_]),P=_%v,ie[P]=C,P===Z&&(D+=C,P=_/v>>0,K[P]=ie,z[P]=D,C=0,ie=[]);return{length:D,lengths:z,segments:K}},y=qt._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(l,v,g){this._target=l,v instanceof Array&&(v={values:v}),this._func={},this._round={},this._props=[],this._timeRes=v.timeResolution==null?6:parseInt(v.timeResolution,10);var _,b,P,I,z,C=v.values||[],D={},Z=C[0],K=v.autoRotate||g.vars.orientToBezier;this._autoRotate=K?K instanceof Array?K:[["x","y","rotation",K===!0?0:Number(K)||0]]:null;for(_ in Z)this._props.push(_);for(P=this._props.length;--P>-1;)_=this._props[P],this._overwriteProps.push(_),b=this._func[_]=typeof l[_]=="function",D[_]=b?l[_.indexOf("set")||typeof l["get"+_.substr(3)]!="function"?_:"get"+_.substr(3)]():parseFloat(l[_]),z||D[_]!==C[0][_]&&(z=D);if(this._beziers=v.type!=="cubic"&&v.type!=="quadratic"&&v.type!=="soft"?f(C,isNaN(v.curviness)?1:v.curviness,!1,v.type==="thruBasic",v.correlate,z):d(C,v.type,D),this._segCount=this._beziers[_].length,this._timeRes){var ie=S(this._beziers,this._timeRes);this._length=ie.length,this._lengths=ie.lengths,this._segments=ie.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(K=this._autoRotate)for(this._initialRotations=[],K[0]instanceof Array||(this._autoRotate=K=[K]),P=K.length;--P>-1;){for(I=0;3>I;I++)_=K[P][I],this._func[_]=typeof l[_]=="function"?l[_.indexOf("set")||typeof l["get"+_.substr(3)]!="function"?_:"get"+_.substr(3)]:!1;_=K[P][2],this._initialRotations[P]=this._func[_]?this._func[_].call(this._target):this._target[_]}return this._startRatio=g.vars.runBackwards?1:0,!0},set:function(l){var v,g,_,b,P,I,z,C,D,Z,K=this._segCount,ie=this._func,V=this._target,q=l!==this._startRatio;if(this._timeRes){if(D=this._lengths,Z=this._curSeg,l*=this._length,_=this._li,l>this._l2&&K-1>_){for(C=K-1;C>_&&l>=(this._l2=D[++_]););this._l1=D[_-1],this._li=_,this._curSeg=Z=this._segments[_],this._s2=Z[this._s1=this._si=0]}else if(this._l1>l&&_>0){for(;_>0&&(this._l1=D[--_])>=l;);_===0&&this._l1>l?this._l1=0:_++,this._l2=D[_],this._li=_,this._curSeg=Z=this._segments[_],this._s1=Z[(this._si=Z.length-1)-1]||0,this._s2=Z[this._si]}if(v=_,l-=this._l1,_=this._si,l>this._s2&&Z.length-1>_){for(C=Z.length-1;C>_&&l>=(this._s2=Z[++_]););this._s1=Z[_-1],this._si=_}else if(this._s1>l&&_>0){for(;_>0&&(this._s1=Z[--_])>=l;);_===0&&this._s1>l?this._s1=0:_++,this._s2=Z[_],this._si=_}I=(_+(l-this._s1)/(this._s2-this._s1))*this._prec}else v=0>l?0:l>=1?K-1:K*l>>0,I=(l-v*(1/K))*K;for(g=1-I,_=this._props.length;--_>-1;)b=this._props[_],P=this._beziers[b][v],z=(I*I*P.da+3*g*(I*P.ca+g*P.ba))*I+P.a,this._round[b]&&(z=Math.round(z)),ie[b]?V[b](z):V[b]=z;if(this._autoRotate){var ne,ae,ue,me,fe,Me,Le,le=this._autoRotate;for(_=le.length;--_>-1;)b=le[_][2],Me=le[_][3]||0,Le=le[_][4]===!0?1:i,P=this._beziers[le[_][0]],ne=this._beziers[le[_][1]],P&&ne&&(P=P[v],ne=ne[v],ae=P.a+(P.b-P.a)*I,me=P.b+(P.c-P.b)*I,ae+=(me-ae)*I,me+=(P.c+(P.d-P.c)*I-me)*I,ue=ne.a+(ne.b-ne.a)*I,fe=ne.b+(ne.c-ne.b)*I,ue+=(fe-ue)*I,fe+=(ne.c+(ne.d-ne.c)*I-fe)*I,z=q?Math.atan2(fe-ue,me-ae)*Le+Me:this._initialRotations[_],ie[b]?V[b](z):V[b]=z)}}}),m=y.prototype;y.bezierThrough=f,y.cubicToQuadratic=c,y._autoCSS=!0,y.quadraticToCubic=function(l,v,g){return new a(l,(2*v+l)/3,(2*v+g)/3,g)},y._cssRegister=function(){var l=s.CSSPlugin;if(l){var v=l._internals,g=v._parseToProxy,_=v._setPluginRatio,b=v.CSSPropTween;v._registerComplexSpecialProp("bezier",{parser:function(P,I,z,C,D,Z){I instanceof Array&&(I={values:I}),Z=new y;var K,ie,V,q=I.values,ne=q.length-1,ae=[],ue={};if(0>ne)return D;for(K=0;ne>=K;K++)V=g(P,q[K],C,D,Z,ne!==K),ae[K]=V.end;for(ie in I)ue[ie]=I[ie];return ue.values=ae,D=new b(P,"bezier",0,0,V.pt,2),D.data=V,D.plugin=Z,D.setRatio=_,ue.autoRotate===0&&(ue.autoRotate=!0),!ue.autoRotate||ue.autoRotate instanceof Array||(K=ue.autoRotate===!0?0:Number(ue.autoRotate),ue.autoRotate=V.end.left!=null?[["left","top","rotation",K,!1]]:V.end.x!=null?[["x","y","rotation",K,!1]]:!1),ue.autoRotate&&(C._transform||C._enableTransforms(!1),V.autoRotate=C._target._gsTransform),Z._onInitTween(V.proxy,ue,C._tween),D}})}},m._roundProps=function(l,v){for(var g=this._overwriteProps,_=g.length;--_>-1;)(l[g[_]]||l.bezier||l.bezierThrough)&&(this._round[g[_]]=v)},m._kill=function(l){var v,g,_=this._props;for(v in this._beziers)if(v in l)for(delete this._beziers[v],delete this._func[v],g=_.length;--g>-1;)_[g]===v&&_.splice(g,1);return this._super._kill.call(this,l)}}(),qt._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(i,e){var t,n,r,s,a=function(){i.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o=qt._gsDefine.globals,c={},h=a.prototype=new i("css");h.constructor=a,a.version="1.18.0",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",a.defaultSmoothOrigin=!0,h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var u,f,d,p,S,y,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,l=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,v=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,g=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,_=/(?:\d|\-|\+|=|#|\.)*/g,b=/opacity *= *([^)]*)/i,P=/opacity:([^;]*)/i,I=/alpha\(opacity *=.+?\)/i,z=/^(rgb|hsl)/,C=/([A-Z])/g,D=/-([a-z])/gi,Z=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,K=function(x,T){return T.toUpperCase()},ie=/(?:Left|Right|Width)/i,V=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,q=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,ne=/,(?=[^\)]*(?:\(|$))/gi,ae=Math.PI/180,ue=180/Math.PI,me={},fe=document,Me=function(x){return fe.createElementNS?fe.createElementNS("http://www.w3.org/1999/xhtml",x):fe.createElement(x)},Le=Me("div"),le=Me("img"),ye=a._internals={_specialProps:c},Pe=navigator.userAgent,Ne=function(){var x=Pe.indexOf("Android"),T=Me("a");return d=Pe.indexOf("Safari")!==-1&&Pe.indexOf("Chrome")===-1&&(x===-1||Number(Pe.substr(x+8,1))>3),S=d&&6>Number(Pe.substr(Pe.indexOf("Version/")+8,1)),p=Pe.indexOf("Firefox")!==-1,(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Pe)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Pe))&&(y=parseFloat(RegExp.$1)),T?(T.style.cssText="top:1px;opacity:.55;",/^0.55/.test(T.style.opacity)):!1}(),Ve=function(x){return b.test(typeof x=="string"?x:(x.currentStyle?x.currentStyle.filter:x.style.filter)||"")?parseFloat(RegExp.$1)/100:1},Ke=function(x){window.console&&console.log(x)},Qe="",He="",Ye=function(x,T){T=T||Le;var R,w,M=T.style;if(M[x]!==void 0)return x;for(x=x.charAt(0).toUpperCase()+x.substr(1),R=["O","Moz","ms","Ms","Webkit"],w=5;--w>-1&&M[R[w]+x]===void 0;);return w>=0?(He=w===3?"ms":R[w],Qe="-"+He.toLowerCase()+"-",He+x):null},re=fe.defaultView?fe.defaultView.getComputedStyle:function(){},et=a.getStyle=function(x,T,R,w,M){var k;return Ne||T!=="opacity"?(!w&&x.style[T]?k=x.style[T]:(R=R||re(x))?k=R[T]||R.getPropertyValue(T)||R.getPropertyValue(T.replace(C,"-$1").toLowerCase()):x.currentStyle&&(k=x.currentStyle[T]),M==null||k&&k!=="none"&&k!=="auto"&&k!=="auto auto"?k:M):Ve(x)},Fe=ye.convertToPixels=function(x,T,R,w,M){if(w==="px"||!w)return R;if(w==="auto"||!R)return 0;var k,U,B,J=ie.test(T),ee=x,Y=Le.style,ce=0>R;if(ce&&(R=-R),w==="%"&&T.indexOf("border")!==-1)k=R/100*(J?x.clientWidth:x.clientHeight);else{if(Y.cssText="border:0 solid red;position:"+et(x,"position")+";line-height:0;",w!=="%"&&ee.appendChild&&w.charAt(0)!=="v"&&w!=="rem")Y[J?"borderLeftWidth":"borderTopWidth"]=R+w;else{if(ee=x.parentNode||fe.body,U=ee._gsCache,B=e.ticker.frame,U&&J&&U.time===B)return U.width*R/100;Y[J?"width":"height"]=R+w}ee.appendChild(Le),k=parseFloat(Le[J?"offsetWidth":"offsetHeight"]),ee.removeChild(Le),J&&w==="%"&&a.cacheWidths!==!1&&(U=ee._gsCache=ee._gsCache||{},U.time=B,U.width=100*(k/R)),k!==0||M||(k=Fe(x,T,R,w,!0))}return ce?-k:k},at=ye.calculateOffset=function(x,T,R){if(et(x,"position",R)!=="absolute")return 0;var w=T==="left"?"Left":"Top",M=et(x,"margin"+w,R);return x["offset"+w]-(Fe(x,T,parseFloat(M),M.replace(_,""))||0)},Xe=function(x,T){var R,w,M,k={};if(T=T||re(x,null))if(R=T.length)for(;--R>-1;)M=T[R],(M.indexOf("-transform")===-1||Ee===M)&&(k[M.replace(D,K)]=T.getPropertyValue(M));else for(R in T)(R.indexOf("Transform")===-1||Ce===R)&&(k[R]=T[R]);else if(T=x.currentStyle||x.style)for(R in T)typeof R=="string"&&k[R]===void 0&&(k[R.replace(D,K)]=T[R]);return Ne||(k.opacity=Ve(x)),w=En(x,T,!1),k.rotation=w.rotation,k.skewX=w.skewX,k.scaleX=w.scaleX,k.scaleY=w.scaleY,k.x=w.x,k.y=w.y,Ae&&(k.z=w.z,k.rotationX=w.rotationX,k.rotationY=w.rotationY,k.scaleZ=w.scaleZ),k.filters&&delete k.filters,k},mt=function(x,T,R,w,M){var k,U,B,J={},ee=x.style;for(U in R)U!=="cssText"&&U!=="length"&&isNaN(U)&&(T[U]!==(k=R[U])||M&&M[U])&&U.indexOf("Origin")===-1&&(typeof k=="number"||typeof k=="string")&&(J[U]=k!=="auto"||U!=="left"&&U!=="top"?k!==""&&k!=="auto"&&k!=="none"||typeof T[U]!="string"||T[U].replace(g,"")===""?k:0:at(x,U),ee[U]!==void 0&&(B=new H(ee,U,ee[U],B)));if(w)for(U in w)U!=="className"&&(J[U]=w[U]);return{difs:J,firstMPT:B}},$e={width:["Left","Right"],height:["Top","Bottom"]},E=["marginLeft","marginRight","marginTop","marginBottom"],O=function(x,T,R){var w=parseFloat(T==="width"?x.offsetWidth:x.offsetHeight),M=$e[T],k=M.length;for(R=R||re(x,null);--k>-1;)w-=parseFloat(et(x,"padding"+M[k],R,!0))||0,w-=parseFloat(et(x,"border"+M[k]+"Width",R,!0))||0;return w},F=function(x,T){if(x==="contain"||x==="auto"||x==="auto auto")return x+" ";(x==null||x==="")&&(x="0 0");var R=x.split(" "),w=x.indexOf("left")!==-1?"0%":x.indexOf("right")!==-1?"100%":R[0],M=x.indexOf("top")!==-1?"0%":x.indexOf("bottom")!==-1?"100%":R[1];return M==null?M=w==="center"?"50%":"0":M==="center"&&(M="50%"),(w==="center"||isNaN(parseFloat(w))&&(w+"").indexOf("=")===-1)&&(w="50%"),x=w+" "+M+(R.length>2?" "+R[2]:""),T&&(T.oxp=w.indexOf("%")!==-1,T.oyp=M.indexOf("%")!==-1,T.oxr=w.charAt(1)==="=",T.oyr=M.charAt(1)==="=",T.ox=parseFloat(w.replace(g,"")),T.oy=parseFloat(M.replace(g,"")),T.v=x),T||x},W=function(x,T){return typeof x=="string"&&x.charAt(1)==="="?parseInt(x.charAt(0)+"1",10)*parseFloat(x.substr(2)):parseFloat(x)-parseFloat(T)},L=function(x,T){return x==null?T:typeof x=="string"&&x.charAt(1)==="="?parseInt(x.charAt(0)+"1",10)*parseFloat(x.substr(2))+T:parseFloat(x)},A=function(x,T,R,w){var M,k,U,B,J,ee=1e-6;return x==null?B=T:typeof x=="number"?B=x:(M=360,k=x.split("_"),J=x.charAt(1)==="=",U=(J?parseInt(x.charAt(0)+"1",10)*parseFloat(k[0].substr(2)):parseFloat(k[0]))*(x.indexOf("rad")===-1?1:ue)-(J?0:T),k.length&&(w&&(w[R]=T+U),x.indexOf("short")!==-1&&(U%=M,U!==U%(M/2)&&(U=0>U?U+M:U-M)),x.indexOf("_cw")!==-1&&0>U?U=(U+9999999999*M)%M-(0|U/M)*M:x.indexOf("ccw")!==-1&&U>0&&(U=(U-9999999999*M)%M-(0|U/M)*M)),B=T+U),ee>B&&B>-ee&&(B=0),B},G={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},X=function(x,T,R){return x=0>x?x+1:x>1?x-1:x,0|255*(1>6*x?T+6*(R-T)*x:.5>x?R:2>3*x?T+6*(R-T)*(2/3-x):T)+.5},oe=a.parseColor=function(x,T){var R,w,M,k,U,B,J,ee,Y,ce,xe;if(x)if(typeof x=="number")R=[x>>16,255&x>>8,255&x];else{if(x.charAt(x.length-1)===","&&(x=x.substr(0,x.length-1)),G[x])R=G[x];else if(x.charAt(0)==="#")x.length===4&&(w=x.charAt(1),M=x.charAt(2),k=x.charAt(3),x="#"+w+w+M+M+k+k),x=parseInt(x.substr(1),16),R=[x>>16,255&x>>8,255&x];else if(x.substr(0,3)==="hsl")if(R=xe=x.match(m),T){if(x.indexOf("=")!==-1)return x.match(l)}else U=Number(R[0])%360/360,B=Number(R[1])/100,J=Number(R[2])/100,M=.5>=J?J*(B+1):J+B-J*B,w=2*J-M,R.length>3&&(R[3]=Number(x[3])),R[0]=X(U+1/3,w,M),R[1]=X(U,w,M),R[2]=X(U-1/3,w,M);else R=x.match(m)||G.transparent;R[0]=Number(R[0]),R[1]=Number(R[1]),R[2]=Number(R[2]),R.length>3&&(R[3]=Number(R[3]))}else R=G.black;return T&&!xe&&(w=R[0]/255,M=R[1]/255,k=R[2]/255,ee=Math.max(w,M,k),Y=Math.min(w,M,k),J=(ee+Y)/2,ee===Y?U=B=0:(ce=ee-Y,B=J>.5?ce/(2-ee-Y):ce/(ee+Y),U=ee===w?(M-k)/ce+(k>M?6:0):ee===M?(k-w)/ce+2:(w-M)/ce+4,U*=60),R[0]=0|U+.5,R[1]=0|100*B+.5,R[2]=0|100*J+.5),R},se=function(x,T){var R,w,M,k=x.match(pe)||[],U=0,B=k.length?"":x;for(R=0;k.length>R;R++)w=k[R],M=x.substr(U,x.indexOf(w,U)-U),U+=M.length+w.length,w=oe(w,T),w.length===3&&w.push(1),B+=M+(T?"hsla("+w[0]+","+w[1]+"%,"+w[2]+"%,"+w[3]:"rgba("+w.join(","))+")";return B},pe="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in G)pe+="|"+h+"\\b";pe=RegExp(pe+")","gi"),a.colorStringFilter=function(x){var T,R=x[0]+x[1];pe.lastIndex=0,pe.test(R)&&(T=R.indexOf("hsl(")!==-1||R.indexOf("hsla(")!==-1,x[0]=se(x[0],T),x[1]=se(x[1],T))},e.defaultStringFilter||(e.defaultStringFilter=a.colorStringFilter);var he=function(x,T,R,w){if(x==null)return function(xe){return xe};var M,k=T?(x.match(pe)||[""])[0]:"",U=x.split(k).join("").match(v)||[],B=x.substr(0,x.indexOf(U[0])),J=x.charAt(x.length-1)===")"?")":"",ee=x.indexOf(" ")!==-1?" ":",",Y=U.length,ce=Y>0?U[0].replace(m,""):"";return Y?M=T?function(xe){var Se,de,Te,Re;if(typeof xe=="number")xe+=ce;else if(w&&ne.test(xe)){for(Re=xe.replace(ne,"|").split("|"),Te=0;Re.length>Te;Te++)Re[Te]=M(Re[Te]);return Re.join(",")}if(Se=(xe.match(pe)||[k])[0],de=xe.split(Se).join("").match(v)||[],Te=de.length,Y>Te--)for(;Y>++Te;)de[Te]=R?de[0|(Te-1)/2]:U[Te];return B+de.join(ee)+ee+Se+J+(xe.indexOf("inset")!==-1?" inset":"")}:function(xe){var Se,de,Te;if(typeof xe=="number")xe+=ce;else if(w&&ne.test(xe)){for(de=xe.replace(ne,"|").split("|"),Te=0;de.length>Te;Te++)de[Te]=M(de[Te]);return de.join(",")}if(Se=xe.match(v)||[],Te=Se.length,Y>Te--)for(;Y>++Te;)Se[Te]=R?Se[0|(Te-1)/2]:U[Te];return B+Se.join(ee)+J}:function(xe){return xe}},we=function(x){return x=x.split(","),function(T,R,w,M,k,U,B){var J,ee=(R+"").split(" ");for(B={},J=0;4>J;J++)B[x[J]]=ee[J]=ee[J]||ee[(J-1)/2>>0];return M.parse(T,B,k,U)}},H=(ye._setPluginRatio=function(x){this.plugin.setRatio(x);for(var T,R,w,M,k=this.data,U=k.proxy,B=k.firstMPT,J=1e-6;B;)T=U[B.v],B.r?T=Math.round(T):J>T&&T>-J&&(T=0),B.t[B.p]=T,B=B._next;if(k.autoRotate&&(k.autoRotate.rotation=U.rotation),x===1)for(B=k.firstMPT;B;){if(R=B.t,R.type){if(R.type===1){for(M=R.xs0+R.s+R.xs1,w=1;R.l>w;w++)M+=R["xn"+w]+R["xs"+(w+1)];R.e=M}}else R.e=R.s+R.xs0;B=B._next}},function(x,T,R,w,M){this.t=x,this.p=T,this.v=R,this.r=M,w&&(w._prev=this,this._next=w)}),_e=(ye._parseToProxy=function(x,T,R,w,M,k){var U,B,J,ee,Y,ce=w,xe={},Se={},de=R._transform,Te=me;for(R._transform=null,me=T,w=Y=R.parse(x,T,w,M),me=Te,k&&(R._transform=de,ce&&(ce._prev=null,ce._prev&&(ce._prev._next=null)));w&&w!==ce;){if(1>=w.type&&(B=w.p,Se[B]=w.s+w.c,xe[B]=w.s,k||(ee=new H(w,"s",B,ee,w.r),w.c=0),w.type===1))for(U=w.l;--U>0;)J="xn"+U,B=w.p+"_"+J,Se[B]=w.data[J],xe[B]=w[J],k||(ee=new H(w,J,B,ee,w.rxp[J]));w=w._next}return{proxy:xe,end:Se,firstMPT:ee,pt:Y}},ye.CSSPropTween=function(x,T,R,w,M,k,U,B,J,ee,Y){this.t=x,this.p=T,this.s=R,this.c=w,this.n=U||T,x instanceof _e||s.push(this.n),this.r=B,this.type=k||0,J&&(this.pr=J,t=!0),this.b=ee===void 0?R:ee,this.e=Y===void 0?R+w:Y,M&&(this._next=M,M._prev=this)}),ve=function(x,T,R,w,M,k){var U=new _e(x,T,R,w-R,M,-1,k);return U.b=R,U.e=U.xs0=w,U},qe=a.parseComplex=function(x,T,R,w,M,k,U,B,J,ee){R=R||k||"",U=new _e(x,T,0,0,U,ee?2:1,null,!1,B,R,w),w+="";var Y,ce,xe,Se,de,Te,Re,tt,We,ke,Be,be,ct,rt=R.split(", ").join(",").split(" "),De=w.split(", ").join(",").split(" "),Bt=rt.length,st=u!==!1;for((w.indexOf(",")!==-1||R.indexOf(",")!==-1)&&(rt=rt.join(" ").replace(ne,", ").split(" "),De=De.join(" ").replace(ne,", ").split(" "),Bt=rt.length),Bt!==De.length&&(rt=(k||"").split(" "),Bt=rt.length),U.plugin=J,U.setRatio=ee,pe.lastIndex=0,Y=0;Bt>Y;Y++)if(Se=rt[Y],de=De[Y],tt=parseFloat(Se),tt||tt===0)U.appendXtra("",tt,W(de,tt),de.replace(l,""),st&&de.indexOf("px")!==-1,!0);else if(M&&pe.test(Se))be=de.charAt(de.length-1)===","?"),":")",ct=de.indexOf("hsl")!==-1&&Ne,Se=oe(Se,ct),de=oe(de,ct),We=Se.length+de.length>6,We&&!Ne&&de[3]===0?(U["xs"+U.l]+=U.l?" transparent":"transparent",U.e=U.e.split(De[Y]).join("transparent")):(Ne||(We=!1),ct?U.appendXtra(We?"hsla(":"hsl(",Se[0],W(de[0],Se[0]),",",!1,!0).appendXtra("",Se[1],W(de[1],Se[1]),"%,",!1).appendXtra("",Se[2],W(de[2],Se[2]),We?"%,":"%"+be,!1):U.appendXtra(We?"rgba(":"rgb(",Se[0],de[0]-Se[0],",",!0,!0).appendXtra("",Se[1],de[1]-Se[1],",",!0).appendXtra("",Se[2],de[2]-Se[2],We?",":be,!0),We&&(Se=4>Se.length?1:Se[3],U.appendXtra("",Se,(4>de.length?1:de[3])-Se,be,!1))),pe.lastIndex=0;else if(Te=Se.match(m)){if(Re=de.match(l),!Re||Re.length!==Te.length)return U;for(xe=0,ce=0;Te.length>ce;ce++)Be=Te[ce],ke=Se.indexOf(Be,xe),U.appendXtra(Se.substr(xe,ke-xe),Number(Be),W(Re[ce],Be),"",st&&Se.substr(ke+Be.length,2)==="px",ce===0),xe=ke+Be.length;U["xs"+U.l]+=Se.substr(xe)}else U["xs"+U.l]+=U.l?" "+Se:Se;if(w.indexOf("=")!==-1&&U.data){for(be=U.xs0+U.data.s,Y=1;U.l>Y;Y++)be+=U["xs"+Y]+U.data["xn"+Y];U.e=be+U["xs"+Y]}return U.l||(U.type=-1,U.xs0=U.e),U.xfirst||U},Ue=9;for(h=_e.prototype,h.l=h.pr=0;--Ue>0;)h["xn"+Ue]=0,h["xs"+Ue]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(x,T,R,w,M,k){var U=this,B=U.l;return U["xs"+B]+=k&&B?" "+x:x||"",R||B===0||U.plugin?(U.l++,U.type=U.setRatio?2:1,U["xs"+U.l]=w||"",B>0?(U.data["xn"+B]=T+R,U.rxp["xn"+B]=M,U["xn"+B]=T,U.plugin||(U.xfirst=new _e(U,"xn"+B,T,R,U.xfirst||U,0,U.n,M,U.pr),U.xfirst.xs0=0),U):(U.data={s:T+R},U.rxp={},U.s=T,U.c=R,U.r=M,U)):(U["xs"+B]+=T+(w||""),U)};var Ze=function(x,T){T=T||{},this.p=T.prefix&&Ye(x)||x,c[x]=c[this.p]=this,this.format=T.formatter||he(T.defaultValue,T.color,T.collapsible,T.multi),T.parser&&(this.parse=T.parser),this.clrs=T.color,this.multi=T.multi,this.keyword=T.keyword,this.dflt=T.defaultValue,this.pr=T.priority||0},Ie=ye._registerComplexSpecialProp=function(x,T,R){typeof T!="object"&&(T={parser:R});var w,M,k=x.split(","),U=T.defaultValue;for(R=R||[U],w=0;k.length>w;w++)T.prefix=w===0&&T.prefix,T.defaultValue=R[w]||U,M=new Ze(k[w],T)},ze=function(x){if(!c[x]){var T=x.charAt(0).toUpperCase()+x.substr(1)+"Plugin";Ie(x,{parser:function(R,w,M,k,U,B,J){var ee=o.com.greensock.plugins[T];return ee?(ee._cssRegister(),c[M].parse(R,w,M,k,U,B,J)):(Ke("Error: "+T+" js file not loaded."),U)}})}};h=Ze.prototype,h.parseComplex=function(x,T,R,w,M,k){var U,B,J,ee,Y,ce,xe=this.keyword;if(this.multi&&(ne.test(R)||ne.test(T)?(B=T.replace(ne,"|").split("|"),J=R.replace(ne,"|").split("|")):xe&&(B=[T],J=[R])),J){for(ee=J.length>B.length?J.length:B.length,U=0;ee>U;U++)T=B[U]=B[U]||this.dflt,R=J[U]=J[U]||this.dflt,xe&&(Y=T.indexOf(xe),ce=R.indexOf(xe),Y!==ce&&(ce===-1?B[U]=B[U].split(xe).join(""):Y===-1&&(B[U]+=" "+xe)));T=B.join(", "),R=J.join(", ")}return qe(x,this.p,T,R,this.clrs,this.dflt,w,this.pr,M,k)},h.parse=function(x,T,R,w,M,k){return this.parseComplex(x.style,this.format(et(x,this.p,r,!1,this.dflt)),this.format(T),M,k)},a.registerSpecialProp=function(x,T,R){Ie(x,{parser:function(w,M,k,U,B,J){var ee=new _e(w,k,0,0,B,2,k,!1,R);return ee.plugin=J,ee.setRatio=T(w,M,U._tween,k),ee},priority:R})},a.useSVGTransformAttr=d||p;var it,te="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Ce=Ye("transform"),Ee=Qe+"transform",ge=Ye("transformOrigin"),Ae=Ye("perspective")!==null,Ge=ye.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Ae?a.defaultForce3D||"auto":!1},lt=window.SVGElement,Pt=function(x,T,R){var w,M=fe.createElementNS("http://www.w3.org/2000/svg",x),k=/([a-z])([A-Z])/g;for(w in R)M.setAttributeNS(null,w.replace(k,"$1-$2").toLowerCase(),R[w]);return T.appendChild(M),M},Ht=fe.documentElement,vt=function(){var x,T,R,w=y||/Android/i.test(Pe)&&!window.chrome;return fe.createElementNS&&!w&&(x=Pt("svg",Ht),T=Pt("rect",x,{width:100,height:50,x:100}),R=T.getBoundingClientRect().width,T.style[ge]="50% 50%",T.style[Ce]="scaleX(0.5)",w=R===T.getBoundingClientRect().width&&!(p&&Ae),Ht.removeChild(x)),w}(),Gt=function(x,T,R,w,M){var k,U,B,J,ee,Y,ce,xe,Se,de,Te,Re,tt,We,ke=x._gsTransform,Be=Rs(x,!0);ke&&(tt=ke.xOrigin,We=ke.yOrigin),(!w||2>(k=w.split(" ")).length)&&(ce=x.getBBox(),T=F(T).split(" "),k=[(T[0].indexOf("%")!==-1?parseFloat(T[0])/100*ce.width:parseFloat(T[0]))+ce.x,(T[1].indexOf("%")!==-1?parseFloat(T[1])/100*ce.height:parseFloat(T[1]))+ce.y]),R.xOrigin=J=parseFloat(k[0]),R.yOrigin=ee=parseFloat(k[1]),w&&Be!==Qi&&(Y=Be[0],ce=Be[1],xe=Be[2],Se=Be[3],de=Be[4],Te=Be[5],Re=Y*Se-ce*xe,U=J*(Se/Re)+ee*(-xe/Re)+(xe*Te-Se*de)/Re,B=J*(-ce/Re)+ee*(Y/Re)-(Y*Te-ce*de)/Re,J=R.xOrigin=k[0]=U,ee=R.yOrigin=k[1]=B),ke&&(M||M!==!1&&a.defaultSmoothOrigin!==!1?(U=J-tt,B=ee-We,ke.xOffset+=U*Be[0]+B*Be[2]-U,ke.yOffset+=U*Be[1]+B*Be[3]-B):ke.xOffset=ke.yOffset=0),x.setAttribute("data-svg-origin",k.join(" "))},mn=function(x){return!!(lt&&typeof x.getBBox=="function"&&x.getCTM&&(!x.parentNode||x.parentNode.getBBox&&x.parentNode.getCTM))},Qi=[1,0,0,1,0,0],Rs=function(x,T){var R,w,M,k,U,B=x._gsTransform||new Ge,J=1e5;if(Ce?w=et(x,Ee,null,!0):x.currentStyle&&(w=x.currentStyle.filter.match(V),w=w&&w.length===4?[w[0].substr(4),Number(w[2].substr(4)),Number(w[1].substr(4)),w[3].substr(4),B.x||0,B.y||0].join(","):""),R=!w||w==="none"||w==="matrix(1, 0, 0, 1, 0, 0)",(B.svg||x.getBBox&&mn(x))&&(R&&(x.style[Ce]+"").indexOf("matrix")!==-1&&(w=x.style[Ce],R=0),M=x.getAttribute("transform"),R&&M&&(M.indexOf("matrix")!==-1?(w=M,R=0):M.indexOf("translate")!==-1&&(w="matrix(1,0,0,1,"+M.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",R=0))),R)return Qi;for(M=(w||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],Ue=M.length;--Ue>-1;)k=Number(M[Ue]),M[Ue]=(U=k-(k|=0))?(0|U*J+(0>U?-.5:.5))/J+k:k;return T&&M.length>6?[M[0],M[1],M[4],M[5],M[12],M[13]]:M},En=ye.getTransform=function(x,T,R,w){if(x._gsTransform&&R&&!w)return x._gsTransform;var M,k,U,B,J,ee,Y=R?x._gsTransform||new Ge:new Ge,ce=0>Y.scaleX,xe=2e-5,Se=1e5,de=Ae&&(parseFloat(et(x,ge,T,!1,"0 0 0").split(" ")[2])||Y.zOrigin)||0,Te=parseFloat(a.defaultTransformPerspective)||0;if(Y.svg=!(!x.getBBox||!mn(x)),Y.svg&&(Gt(x,et(x,ge,r,!1,"50% 50%")+"",Y,x.getAttribute("data-svg-origin")),it=a.useSVGTransformAttr||vt),M=Rs(x),M!==Qi){if(M.length===16){var Re,tt,We,ke,Be,be=M[0],ct=M[1],rt=M[2],De=M[3],Bt=M[4],st=M[5],Zt=M[6],li=M[7],Tt=M[8],wt=M[9],Dt=M[10],Jt=M[12],Kt=M[13],sn=M[14],en=M[11],Et=Math.atan2(Zt,Dt);Y.zOrigin&&(sn=-Y.zOrigin,Jt=Tt*sn-M[12],Kt=wt*sn-M[13],sn=Dt*sn+Y.zOrigin-M[14]),Y.rotationX=Et*ue,Et&&(ke=Math.cos(-Et),Be=Math.sin(-Et),Re=Bt*ke+Tt*Be,tt=st*ke+wt*Be,We=Zt*ke+Dt*Be,Tt=Bt*-Be+Tt*ke,wt=st*-Be+wt*ke,Dt=Zt*-Be+Dt*ke,en=li*-Be+en*ke,Bt=Re,st=tt,Zt=We),Et=Math.atan2(Tt,Dt),Y.rotationY=Et*ue,Et&&(ke=Math.cos(-Et),Be=Math.sin(-Et),Re=be*ke-Tt*Be,tt=ct*ke-wt*Be,We=rt*ke-Dt*Be,wt=ct*Be+wt*ke,Dt=rt*Be+Dt*ke,en=De*Be+en*ke,be=Re,ct=tt,rt=We),Et=Math.atan2(ct,be),Y.rotation=Et*ue,Et&&(ke=Math.cos(-Et),Be=Math.sin(-Et),be=be*ke+Bt*Be,tt=ct*ke+st*Be,st=ct*-Be+st*ke,Zt=rt*-Be+Zt*ke,ct=tt),Y.rotationX&&Math.abs(Y.rotationX)+Math.abs(Y.rotation)>359.9&&(Y.rotationX=Y.rotation=0,Y.rotationY+=180),Y.scaleX=(0|Math.sqrt(be*be+ct*ct)*Se+.5)/Se,Y.scaleY=(0|Math.sqrt(st*st+wt*wt)*Se+.5)/Se,Y.scaleZ=(0|Math.sqrt(Zt*Zt+Dt*Dt)*Se+.5)/Se,Y.skewX=0,Y.perspective=en?1/(0>en?-en:en):0,Y.x=Jt,Y.y=Kt,Y.z=sn,Y.svg&&(Y.x-=Y.xOrigin-(Y.xOrigin*be-Y.yOrigin*Bt),Y.y-=Y.yOrigin-(Y.yOrigin*ct-Y.xOrigin*st))}else if(!(Ae&&!w&&M.length&&Y.x===M[4]&&Y.y===M[5]&&(Y.rotationX||Y.rotationY)||Y.x!==void 0&&et(x,"display",T)==="none")){var Xr=M.length>=6,Yr=Xr?M[0]:1,qr=M[1]||0,Zr=M[2]||0,Jr=Xr?M[3]:1;Y.x=M[4]||0,Y.y=M[5]||0,U=Math.sqrt(Yr*Yr+qr*qr),B=Math.sqrt(Jr*Jr+Zr*Zr),J=Yr||qr?Math.atan2(qr,Yr)*ue:Y.rotation||0,ee=Zr||Jr?Math.atan2(Zr,Jr)*ue+J:Y.skewX||0,Math.abs(ee)>90&&270>Math.abs(ee)&&(ce?(U*=-1,ee+=0>=J?180:-180,J+=0>=J?180:-180):(B*=-1,ee+=0>=ee?180:-180)),Y.scaleX=U,Y.scaleY=B,Y.rotation=J,Y.skewX=ee,Ae&&(Y.rotationX=Y.rotationY=Y.z=0,Y.perspective=Te,Y.scaleZ=1),Y.svg&&(Y.x-=Y.xOrigin-(Y.xOrigin*Yr+Y.yOrigin*Zr),Y.y-=Y.yOrigin-(Y.xOrigin*qr+Y.yOrigin*Jr))}Y.zOrigin=de;for(k in Y)xe>Y[k]&&Y[k]>-xe&&(Y[k]=0)}return R&&(x._gsTransform=Y,Y.svg&&(it&&x.style[Ce]?e.delayedCall(.001,function(){Ii(x.style,Ce)}):!it&&x.getAttribute("transform")&&e.delayedCall(.001,function(){x.removeAttribute("transform")}))),Y},Cs=function(x){var T,R,w=this.data,M=-w.rotation*ae,k=M+w.skewX*ae,U=1e5,B=(0|Math.cos(M)*w.scaleX*U)/U,J=(0|Math.sin(M)*w.scaleX*U)/U,ee=(0|Math.sin(k)*-w.scaleY*U)/U,Y=(0|Math.cos(k)*w.scaleY*U)/U,ce=this.t.style,xe=this.t.currentStyle;if(xe){R=J,J=-ee,ee=-R,T=xe.filter,ce.filter="";var Se,de,Te=this.t.offsetWidth,Re=this.t.offsetHeight,tt=xe.position!=="absolute",We="progid:DXImageTransform.Microsoft.Matrix(M11="+B+", M12="+J+", M21="+ee+", M22="+Y,ke=w.x+Te*w.xPercent/100,Be=w.y+Re*w.yPercent/100;if(w.ox!=null&&(Se=(w.oxp?.01*Te*w.ox:w.ox)-Te/2,de=(w.oyp?.01*Re*w.oy:w.oy)-Re/2,ke+=Se-(Se*B+de*J),Be+=de-(Se*ee+de*Y)),tt?(Se=Te/2,de=Re/2,We+=", Dx="+(Se-(Se*B+de*J)+ke)+", Dy="+(de-(Se*ee+de*Y)+Be)+")"):We+=", sizingMethod='auto expand')",ce.filter=T.indexOf("DXImageTransform.Microsoft.Matrix(")!==-1?T.replace(q,We):We+" "+T,(x===0||x===1)&&B===1&&J===0&&ee===0&&Y===1&&(tt&&We.indexOf("Dx=0, Dy=0")===-1||b.test(T)&&parseFloat(RegExp.$1)!==100||T.indexOf(T.indexOf("Alpha"))===-1&&ce.removeAttribute("filter")),!tt){var be,ct,rt,De=8>y?1:-1;for(Se=w.ieOffsetX||0,de=w.ieOffsetY||0,w.ieOffsetX=Math.round((Te-((0>B?-B:B)*Te+(0>J?-J:J)*Re))/2+ke),w.ieOffsetY=Math.round((Re-((0>Y?-Y:Y)*Re+(0>ee?-ee:ee)*Te))/2+Be),Ue=0;4>Ue;Ue++)ct=E[Ue],be=xe[ct],R=be.indexOf("px")!==-1?parseFloat(be):Fe(this.t,ct,parseFloat(be),be.replace(_,""))||0,rt=R!==w[ct]?2>Ue?-w.ieOffsetX:-w.ieOffsetY:2>Ue?Se-w.ieOffsetX:de-w.ieOffsetY,ce[ct]=(w[ct]=Math.round(R-rt*(Ue===0||Ue===2?1:De)))+"px"}}},er=ye.set3DTransformRatio=ye.setTransformRatio=function(x){var T,R,w,M,k,U,B,J,ee,Y,ce,xe,Se,de,Te,Re,tt,We,ke,Be,be,ct,rt,De=this.data,Bt=this.t.style,st=De.rotation,Zt=De.rotationX,li=De.rotationY,Tt=De.scaleX,wt=De.scaleY,Dt=De.scaleZ,Jt=De.x,Kt=De.y,sn=De.z,en=De.svg,Et=De.perspective,Xr=De.force3D;if(!(((x!==1&&x!==0||Xr!=="auto"||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&Xr||sn||Et||li||Zt)&&(!it||!en)&&Ae))return st||De.skewX||en?(st*=ae,ct=De.skewX*ae,rt=1e5,T=Math.cos(st)*Tt,M=Math.sin(st)*Tt,R=Math.sin(st-ct)*-wt,k=Math.cos(st-ct)*wt,ct&&De.skewType==="simple"&&(tt=Math.tan(ct),tt=Math.sqrt(1+tt*tt),R*=tt,k*=tt,De.skewY&&(T*=tt,M*=tt)),en&&(Jt+=De.xOrigin-(De.xOrigin*T+De.yOrigin*R)+De.xOffset,Kt+=De.yOrigin-(De.xOrigin*M+De.yOrigin*k)+De.yOffset,it&&(De.xPercent||De.yPercent)&&(de=this.t.getBBox(),Jt+=.01*De.xPercent*de.width,Kt+=.01*De.yPercent*de.height),de=1e-6,de>Jt&&Jt>-de&&(Jt=0),de>Kt&&Kt>-de&&(Kt=0)),ke=(0|T*rt)/rt+","+(0|M*rt)/rt+","+(0|R*rt)/rt+","+(0|k*rt)/rt+","+Jt+","+Kt+")",en&&it?this.t.setAttribute("transform","matrix("+ke):Bt[Ce]=(De.xPercent||De.yPercent?"translate("+De.xPercent+"%,"+De.yPercent+"%) matrix(":"matrix(")+ke):Bt[Ce]=(De.xPercent||De.yPercent?"translate("+De.xPercent+"%,"+De.yPercent+"%) matrix(":"matrix(")+Tt+",0,0,"+wt+","+Jt+","+Kt+")",void 0;if(p&&(de=1e-4,de>Tt&&Tt>-de&&(Tt=Dt=2e-5),de>wt&&wt>-de&&(wt=Dt=2e-5),!Et||De.z||De.rotationX||De.rotationY||(Et=0)),st||De.skewX)st*=ae,Te=T=Math.cos(st),Re=M=Math.sin(st),De.skewX&&(st-=De.skewX*ae,Te=Math.cos(st),Re=Math.sin(st),De.skewType==="simple"&&(tt=Math.tan(De.skewX*ae),tt=Math.sqrt(1+tt*tt),Te*=tt,Re*=tt,De.skewY&&(T*=tt,M*=tt))),R=-Re,k=Te;else{if(!(li||Zt||Dt!==1||Et||en))return Bt[Ce]=(De.xPercent||De.yPercent?"translate("+De.xPercent+"%,"+De.yPercent+"%) translate3d(":"translate3d(")+Jt+"px,"+Kt+"px,"+sn+"px)"+(Tt!==1||wt!==1?" scale("+Tt+","+wt+")":""),void 0;T=k=1,R=M=0}ee=1,w=U=B=J=Y=ce=0,xe=Et?-1/Et:0,Se=De.zOrigin,de=1e-6,Be=",",be="0",st=li*ae,st&&(Te=Math.cos(st),Re=Math.sin(st),B=-Re,Y=xe*-Re,w=T*Re,U=M*Re,ee=Te,xe*=Te,T*=Te,M*=Te),st=Zt*ae,st&&(Te=Math.cos(st),Re=Math.sin(st),tt=R*Te+w*Re,We=k*Te+U*Re,J=ee*Re,ce=xe*Re,w=R*-Re+w*Te,U=k*-Re+U*Te,ee*=Te,xe*=Te,R=tt,k=We),Dt!==1&&(w*=Dt,U*=Dt,ee*=Dt,xe*=Dt),wt!==1&&(R*=wt,k*=wt,J*=wt,ce*=wt),Tt!==1&&(T*=Tt,M*=Tt,B*=Tt,Y*=Tt),(Se||en)&&(Se&&(Jt+=w*-Se,Kt+=U*-Se,sn+=ee*-Se+Se),en&&(Jt+=De.xOrigin-(De.xOrigin*T+De.yOrigin*R)+De.xOffset,Kt+=De.yOrigin-(De.xOrigin*M+De.yOrigin*k)+De.yOffset),de>Jt&&Jt>-de&&(Jt=be),de>Kt&&Kt>-de&&(Kt=be),de>sn&&sn>-de&&(sn=0)),ke=De.xPercent||De.yPercent?"translate("+De.xPercent+"%,"+De.yPercent+"%) matrix3d(":"matrix3d(",ke+=(de>T&&T>-de?be:T)+Be+(de>M&&M>-de?be:M)+Be+(de>B&&B>-de?be:B),ke+=Be+(de>Y&&Y>-de?be:Y)+Be+(de>R&&R>-de?be:R)+Be+(de>k&&k>-de?be:k),Zt||li?(ke+=Be+(de>J&&J>-de?be:J)+Be+(de>ce&&ce>-de?be:ce)+Be+(de>w&&w>-de?be:w),ke+=Be+(de>U&&U>-de?be:U)+Be+(de>ee&&ee>-de?be:ee)+Be+(de>xe&&xe>-de?be:xe)+Be):ke+=",0,0,0,0,1,0,",ke+=Jt+Be+Kt+Be+sn+Be+(Et?1+-sn/Et:1)+")",Bt[Ce]=ke};h=Ge.prototype,h.x=h.y=h.z=h.skewX=h.skewY=h.rotation=h.rotationX=h.rotationY=h.zOrigin=h.xPercent=h.yPercent=h.xOffset=h.yOffset=0,h.scaleX=h.scaleY=h.scaleZ=1,Ie("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(x,T,R,w,M,k,U){if(w._lastParsedTransform===U)return M;w._lastParsedTransform=U;var B,J,ee,Y,ce,xe,Se,de,Te,Re,tt=x._gsTransform,We=x.style,ke=1e-6,Be=te.length,be=U,ct={},rt="transformOrigin";if(U.display?(Y=et(x,"display"),We.display="block",B=En(x,r,!0,U.parseTransform),We.display=Y):B=En(x,r,!0,U.parseTransform),w._transform=B,typeof be.transform=="string"&&Ce)Y=Le.style,Y[Ce]=be.transform,Y.display="block",Y.position="absolute",fe.body.appendChild(Le),J=En(Le,null,!1),fe.body.removeChild(Le),J.perspective||(J.perspective=B.perspective),be.xPercent!=null&&(J.xPercent=L(be.xPercent,B.xPercent)),be.yPercent!=null&&(J.yPercent=L(be.yPercent,B.yPercent));else if(typeof be=="object"){if(J={scaleX:L(be.scaleX!=null?be.scaleX:be.scale,B.scaleX),scaleY:L(be.scaleY!=null?be.scaleY:be.scale,B.scaleY),scaleZ:L(be.scaleZ,B.scaleZ),x:L(be.x,B.x),y:L(be.y,B.y),z:L(be.z,B.z),xPercent:L(be.xPercent,B.xPercent),yPercent:L(be.yPercent,B.yPercent),perspective:L(be.transformPerspective,B.perspective)},de=be.directionalRotation,de!=null)if(typeof de=="object")for(Y in de)be[Y]=de[Y];else be.rotation=de;typeof be.x=="string"&&be.x.indexOf("%")!==-1&&(J.x=0,J.xPercent=L(be.x,B.xPercent)),typeof be.y=="string"&&be.y.indexOf("%")!==-1&&(J.y=0,J.yPercent=L(be.y,B.yPercent)),J.rotation=A("rotation"in be?be.rotation:"shortRotation"in be?be.shortRotation+"_short":"rotationZ"in be?be.rotationZ:B.rotation,B.rotation,"rotation",ct),Ae&&(J.rotationX=A("rotationX"in be?be.rotationX:"shortRotationX"in be?be.shortRotationX+"_short":B.rotationX||0,B.rotationX,"rotationX",ct),J.rotationY=A("rotationY"in be?be.rotationY:"shortRotationY"in be?be.shortRotationY+"_short":B.rotationY||0,B.rotationY,"rotationY",ct)),J.skewX=be.skewX==null?B.skewX:A(be.skewX,B.skewX),J.skewY=be.skewY==null?B.skewY:A(be.skewY,B.skewY),(ee=J.skewY-B.skewY)&&(J.skewX+=ee,J.rotation+=ee)}for(Ae&&be.force3D!=null&&(B.force3D=be.force3D,Se=!0),B.skewType=be.skewType||B.skewType||a.defaultSkewType,xe=B.force3D||B.z||B.rotationX||B.rotationY||J.z||J.rotationX||J.rotationY||J.perspective,xe||be.scale==null||(J.scaleZ=1);--Be>-1;)R=te[Be],ce=J[R]-B[R],(ce>ke||-ke>ce||be[R]!=null||me[R]!=null)&&(Se=!0,M=new _e(B,R,B[R],ce,M),R in ct&&(M.e=ct[R]),M.xs0=0,M.plugin=k,w._overwriteProps.push(M.n));return ce=be.transformOrigin,B.svg&&(ce||be.svgOrigin)&&(Te=B.xOffset,Re=B.yOffset,Gt(x,F(ce),J,be.svgOrigin,be.smoothOrigin),M=ve(B,"xOrigin",(tt?B:J).xOrigin,J.xOrigin,M,rt),M=ve(B,"yOrigin",(tt?B:J).yOrigin,J.yOrigin,M,rt),(Te!==B.xOffset||Re!==B.yOffset)&&(M=ve(B,"xOffset",tt?Te:B.xOffset,B.xOffset,M,rt),M=ve(B,"yOffset",tt?Re:B.yOffset,B.yOffset,M,rt)),ce=it?null:"0px 0px"),(ce||Ae&&xe&&B.zOrigin)&&(Ce?(Se=!0,R=ge,ce=(ce||et(x,R,r,!1,"50% 50%"))+"",M=new _e(We,R,0,0,M,-1,rt),M.b=We[R],M.plugin=k,Ae?(Y=B.zOrigin,ce=ce.split(" "),B.zOrigin=(ce.length>2&&(Y===0||ce[2]!=="0px")?parseFloat(ce[2]):Y)||0,M.xs0=M.e=ce[0]+" "+(ce[1]||"50%")+" 0px",M=new _e(B,"zOrigin",0,0,M,-1,M.n),M.b=Y,M.xs0=M.e=B.zOrigin):M.xs0=M.e=ce):F(ce+"",B)),Se&&(w._transformType=B.svg&&it||!xe&&this._transformType!==3?2:3),M},prefix:!0}),Ie("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),Ie("borderRadius",{defaultValue:"0px",parser:function(x,T,R,w,M){T=this.format(T);var k,U,B,J,ee,Y,ce,xe,Se,de,Te,Re,tt,We,ke,Be,be=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],ct=x.style;for(Se=parseFloat(x.offsetWidth),de=parseFloat(x.offsetHeight),k=T.split(" "),U=0;be.length>U;U++)this.p.indexOf("border")&&(be[U]=Ye(be[U])),ee=J=et(x,be[U],r,!1,"0px"),ee.indexOf(" ")!==-1&&(J=ee.split(" "),ee=J[0],J=J[1]),Y=B=k[U],ce=parseFloat(ee),Re=ee.substr((ce+"").length),tt=Y.charAt(1)==="=",tt?(xe=parseInt(Y.charAt(0)+"1",10),Y=Y.substr(2),xe*=parseFloat(Y),Te=Y.substr((xe+"").length-(0>xe?1:0))||""):(xe=parseFloat(Y),Te=Y.substr((xe+"").length)),Te===""&&(Te=n[R]||Re),Te!==Re&&(We=Fe(x,"borderLeft",ce,Re),ke=Fe(x,"borderTop",ce,Re),Te==="%"?(ee=100*(We/Se)+"%",J=100*(ke/de)+"%"):Te==="em"?(Be=Fe(x,"borderLeft",1,"em"),ee=We/Be+"em",J=ke/Be+"em"):(ee=We+"px",J=ke+"px"),tt&&(Y=parseFloat(ee)+xe+Te,B=parseFloat(J)+xe+Te)),M=qe(ct,be[U],ee+" "+J,Y+" "+B,!1,"0px",M);return M},prefix:!0,formatter:he("0px 0px 0px 0px",!1,!0)}),Ie("backgroundPosition",{defaultValue:"0 0",parser:function(x,T,R,w,M,k){var U,B,J,ee,Y,ce,xe="background-position",Se=r||re(x,null),de=this.format((Se?y?Se.getPropertyValue(xe+"-x")+" "+Se.getPropertyValue(xe+"-y"):Se.getPropertyValue(xe):x.currentStyle.backgroundPositionX+" "+x.currentStyle.backgroundPositionY)||"0 0"),Te=this.format(T);if(de.indexOf("%")!==-1!=(Te.indexOf("%")!==-1)&&(ce=et(x,"backgroundImage").replace(Z,""),ce&&ce!=="none")){for(U=de.split(" "),B=Te.split(" "),le.setAttribute("src",ce),J=2;--J>-1;)de=U[J],ee=de.indexOf("%")!==-1,ee!==(B[J].indexOf("%")!==-1)&&(Y=J===0?x.offsetWidth-le.width:x.offsetHeight-le.height,U[J]=ee?parseFloat(de)/100*Y+"px":100*(parseFloat(de)/Y)+"%");de=U.join(" ")}return this.parseComplex(x.style,de,Te,M,k)},formatter:F}),Ie("backgroundSize",{defaultValue:"0 0",formatter:F}),Ie("perspective",{defaultValue:"0px",prefix:!0}),Ie("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),Ie("transformStyle",{prefix:!0}),Ie("backfaceVisibility",{prefix:!0}),Ie("userSelect",{prefix:!0}),Ie("margin",{parser:we("marginTop,marginRight,marginBottom,marginLeft")}),Ie("padding",{parser:we("paddingTop,paddingRight,paddingBottom,paddingLeft")}),Ie("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(x,T,R,w,M,k){var U,B,J;return 9>y?(B=x.currentStyle,J=8>y?" ":",",U="rect("+B.clipTop+J+B.clipRight+J+B.clipBottom+J+B.clipLeft+")",T=this.format(T).split(",").join(J)):(U=this.format(et(x,this.p,r,!1,this.dflt)),T=this.format(T)),this.parseComplex(x.style,U,T,M,k)}}),Ie("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),Ie("autoRound,strictUnits",{parser:function(x,T,R,w,M){return M}}),Ie("border",{defaultValue:"0px solid #000",parser:function(x,T,R,w,M,k){return this.parseComplex(x.style,this.format(et(x,"borderTopWidth",r,!1,"0px")+" "+et(x,"borderTopStyle",r,!1,"solid")+" "+et(x,"borderTopColor",r,!1,"#000")),this.format(T),M,k)},color:!0,formatter:function(x){var T=x.split(" ");return T[0]+" "+(T[1]||"solid")+" "+(x.match(pe)||["#000"])[0]}}),Ie("borderWidth",{parser:we("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),Ie("float,cssFloat,styleFloat",{parser:function(x,T,R,w,M){var k=x.style,U="cssFloat"in k?"cssFloat":"styleFloat";return new _e(k,U,0,0,M,-1,R,!1,0,k[U],T)}});var Ps=function(x){var T,R=this.t,w=R.filter||et(this.data,"filter")||"",M=0|this.s+this.c*x;M===100&&(w.indexOf("atrix(")===-1&&w.indexOf("radient(")===-1&&w.indexOf("oader(")===-1?(R.removeAttribute("filter"),T=!et(this.data,"filter")):(R.filter=w.replace(I,""),T=!0)),T||(this.xn1&&(R.filter=w=w||"alpha(opacity="+M+")"),w.indexOf("pacity")===-1?M===0&&this.xn1||(R.filter=w+" alpha(opacity="+M+")"):R.filter=w.replace(b,"opacity="+M))};Ie("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(x,T,R,w,M,k){var U=parseFloat(et(x,"opacity",r,!1,"1")),B=x.style,J=R==="autoAlpha";return typeof T=="string"&&T.charAt(1)==="="&&(T=(T.charAt(0)==="-"?-1:1)*parseFloat(T.substr(2))+U),J&&U===1&&et(x,"visibility",r)==="hidden"&&T!==0&&(U=0),Ne?M=new _e(B,"opacity",U,T-U,M):(M=new _e(B,"opacity",100*U,100*(T-U),M),M.xn1=J?1:0,B.zoom=1,M.type=2,M.b="alpha(opacity="+M.s+")",M.e="alpha(opacity="+(M.s+M.c)+")",M.data=x,M.plugin=k,M.setRatio=Ps),J&&(M=new _e(B,"visibility",0,0,M,-1,null,!1,0,U!==0?"inherit":"hidden",T===0?"hidden":"inherit"),M.xs0="inherit",w._overwriteProps.push(M.n),w._overwriteProps.push(R)),M}});var Ii=function(x,T){T&&(x.removeProperty?((T.substr(0,2)==="ms"||T.substr(0,6)==="webkit")&&(T="-"+T),x.removeProperty(T.replace(C,"-$1").toLowerCase())):x.removeAttribute(T))},lo=function(x){if(this.t._gsClassPT=this,x===1||x===0){this.t.setAttribute("class",x===0?this.b:this.e);for(var T=this.data,R=this.t.style;T;)T.v?R[T.p]=T.v:Ii(R,T.p),T=T._next;x===1&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};Ie("className",{parser:function(x,T,R,w,M,k,U){var B,J,ee,Y,ce,xe=x.getAttribute("class")||"",Se=x.style.cssText;if(M=w._classNamePT=new _e(x,R,0,0,M,2),M.setRatio=lo,M.pr=-11,t=!0,M.b=xe,J=Xe(x,r),ee=x._gsClassPT){for(Y={},ce=ee.data;ce;)Y[ce.p]=1,ce=ce._next;ee.setRatio(1)}return x._gsClassPT=M,M.e=T.charAt(1)!=="="?T:xe.replace(RegExp("\\s*\\b"+T.substr(2)+"\\b"),"")+(T.charAt(0)==="+"?" "+T.substr(2):""),x.setAttribute("class",M.e),B=mt(x,J,Xe(x),U,Y),x.setAttribute("class",xe),M.data=B.firstMPT,x.style.cssText=Se,M=M.xfirst=w.parse(x,B.difs,M,k)}});var co=function(x){if((x===1||x===0)&&this.data._totalTime===this.data._totalDuration&&this.data.data!=="isFromStart"){var T,R,w,M,k,U=this.t.style,B=c.transform.parse;if(this.e==="all")U.cssText="",M=!0;else for(T=this.e.split(" ").join("").split(","),w=T.length;--w>-1;)R=T[w],c[R]&&(c[R].parse===B?M=!0:R=R==="transformOrigin"?ge:c[R].p),Ii(U,R);M&&(Ii(U,Ce),k=this.t._gsTransform,k&&(k.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(Ie("clearProps",{parser:function(x,T,R,w,M){return M=new _e(x,R,0,0,M,2),M.setRatio=co,M.e=T,M.pr=-10,M.data=w._tween,t=!0,M}}),h="bezier,throwProps,physicsProps,physics2D".split(","),Ue=h.length;Ue--;)ze(h[Ue]);h=a.prototype,h._firstPT=h._lastParsedTransform=h._transform=null,h._onInitTween=function(x,T,R){if(!x.nodeType)return!1;this._target=x,this._tween=R,this._vars=T,u=T.autoRound,t=!1,n=T.suffixMap||a.suffixMap,r=re(x,""),s=this._overwriteProps;var w,M,k,U,B,J,ee,Y,ce,xe=x.style;if(f&&xe.zIndex===""&&(w=et(x,"zIndex",r),(w==="auto"||w==="")&&this._addLazySet(xe,"zIndex",0)),typeof T=="string"&&(U=xe.cssText,w=Xe(x,r),xe.cssText=U+";"+T,w=mt(x,w,Xe(x)).difs,!Ne&&P.test(T)&&(w.opacity=parseFloat(RegExp.$1)),T=w,xe.cssText=U),this._firstPT=M=T.className?c.className.parse(x,T.className,"className",this,null,null,T):this.parse(x,T,null),this._transformType){for(ce=this._transformType===3,Ce?d&&(f=!0,xe.zIndex===""&&(ee=et(x,"zIndex",r),(ee==="auto"||ee==="")&&this._addLazySet(xe,"zIndex",0)),S&&this._addLazySet(xe,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(ce?"visible":"hidden"))):xe.zoom=1,k=M;k&&k._next;)k=k._next;Y=new _e(x,"transform",0,0,null,2),this._linkCSSP(Y,null,k),Y.setRatio=Ce?er:Cs,Y.data=this._transform||En(x,r,!0),Y.tween=R,Y.pr=-1,s.pop()}if(t){for(;M;){for(J=M._next,k=U;k&&k.pr>M.pr;)k=k._next;(M._prev=k?k._prev:B)?M._prev._next=M:U=M,(M._next=k)?k._prev=M:B=M,M=J}this._firstPT=U}return!0},h.parse=function(x,T,R,w){var M,k,U,B,J,ee,Y,ce,xe,Se,de=x.style;for(M in T)ee=T[M],k=c[M],k?R=k.parse(x,ee,M,this,R,w,T):(J=et(x,M,r)+"",xe=typeof ee=="string",M==="color"||M==="fill"||M==="stroke"||M.indexOf("Color")!==-1||xe&&z.test(ee)?(xe||(ee=oe(ee),ee=(ee.length>3?"rgba(":"rgb(")+ee.join(",")+")"),R=qe(de,M,J,ee,!0,"transparent",R,0,w)):!xe||ee.indexOf(" ")===-1&&ee.indexOf(",")===-1?(U=parseFloat(J),Y=U||U===0?J.substr((U+"").length):"",(J===""||J==="auto")&&(M==="width"||M==="height"?(U=O(x,M,r),Y="px"):M==="left"||M==="top"?(U=at(x,M,r),Y="px"):(U=M!=="opacity"?0:1,Y="")),Se=xe&&ee.charAt(1)==="=",Se?(B=parseInt(ee.charAt(0)+"1",10),ee=ee.substr(2),B*=parseFloat(ee),ce=ee.replace(_,"")):(B=parseFloat(ee),ce=xe?ee.replace(_,""):""),ce===""&&(ce=M in n?n[M]:Y),ee=B||B===0?(Se?B+U:B)+ce:T[M],Y!==ce&&ce!==""&&(B||B===0)&&U&&(U=Fe(x,M,U,Y),ce==="%"?(U/=Fe(x,M,100,"%")/100,T.strictUnits!==!0&&(J=U+"%")):ce==="em"||ce==="rem"?U/=Fe(x,M,1,ce):ce!=="px"&&(B=Fe(x,M,B,ce),ce="px"),Se&&(B||B===0)&&(ee=B+U+ce)),Se&&(B+=U),!U&&U!==0||!B&&B!==0?de[M]!==void 0&&(ee||ee+""!="NaN"&&ee!=null)?(R=new _e(de,M,B||U||0,0,R,-1,M,!1,0,J,ee),R.xs0=ee!=="none"||M!=="display"&&M.indexOf("Style")===-1?ee:J):Ke("invalid "+M+" tween value: "+T[M]):(R=new _e(de,M,U,B-U,R,0,M,u!==!1&&(ce==="px"||M==="zIndex"),0,J,ee),R.xs0=ce)):R=qe(de,M,J,ee,!0,null,R,0,w)),w&&R&&!R.plugin&&(R.plugin=w);return R},h.setRatio=function(x){var T,R,w,M=this._firstPT,k=1e-6;if(x!==1||this._tween._time!==this._tween._duration&&this._tween._time!==0)if(x||this._tween._time!==this._tween._duration&&this._tween._time!==0||this._tween._rawPrevTime===-1e-6)for(;M;){if(T=M.c*x+M.s,M.r?T=Math.round(T):k>T&&T>-k&&(T=0),M.type)if(M.type===1)if(w=M.l,w===2)M.t[M.p]=M.xs0+T+M.xs1+M.xn1+M.xs2;else if(w===3)M.t[M.p]=M.xs0+T+M.xs1+M.xn1+M.xs2+M.xn2+M.xs3;else if(w===4)M.t[M.p]=M.xs0+T+M.xs1+M.xn1+M.xs2+M.xn2+M.xs3+M.xn3+M.xs4;else if(w===5)M.t[M.p]=M.xs0+T+M.xs1+M.xn1+M.xs2+M.xn2+M.xs3+M.xn3+M.xs4+M.xn4+M.xs5;else{for(R=M.xs0+T+M.xs1,w=1;M.l>w;w++)R+=M["xn"+w]+M["xs"+(w+1)];M.t[M.p]=R}else M.type===-1?M.t[M.p]=M.xs0:M.setRatio&&M.setRatio(x);else M.t[M.p]=T+M.xs0;M=M._next}else for(;M;)M.type!==2?M.t[M.p]=M.b:M.setRatio(x),M=M._next;else for(;M;){if(M.type!==2)if(M.r&&M.type!==-1)if(T=Math.round(M.s+M.c),M.type){if(M.type===1){for(w=M.l,R=M.xs0+T+M.xs1,w=1;M.l>w;w++)R+=M["xn"+w]+M["xs"+(w+1)];M.t[M.p]=R}}else M.t[M.p]=T+M.xs0;else M.t[M.p]=M.e;else M.setRatio(x);M=M._next}},h._enableTransforms=function(x){this._transform=this._transform||En(this._target,r,!0),this._transformType=this._transform.svg&&it||!x&&this._transformType!==3?2:3};var ho=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};h._addLazySet=function(x,T,R){var w=this._firstPT=new _e(x,T,0,0,this._firstPT,2);w.e=R,w.setRatio=ho,w.data=this},h._linkCSSP=function(x,T,R,w){return x&&(T&&(T._prev=x),x._next&&(x._next._prev=x._prev),x._prev?x._prev._next=x._next:this._firstPT===x&&(this._firstPT=x._next,w=!0),R?R._next=x:w||this._firstPT!==null||(this._firstPT=x),x._next=T,x._prev=R),x},h._kill=function(x){var T,R,w,M=x;if(x.autoAlpha||x.alpha){M={};for(R in x)M[R]=x[R];M.opacity=1,M.autoAlpha&&(M.visibility=1)}return x.className&&(T=this._classNamePT)&&(w=T.xfirst,w&&w._prev?this._linkCSSP(w._prev,T._next,w._prev._prev):w===this._firstPT&&(this._firstPT=T._next),T._next&&this._linkCSSP(T._next,T._next._next,w._prev),this._classNamePT=null),i.prototype._kill.call(this,M)};var N=function(x,T,R){var w,M,k,U;if(x.slice)for(M=x.length;--M>-1;)N(x[M],T,R);else for(w=x.childNodes,M=w.length;--M>-1;)k=w[M],U=k.type,k.style&&(T.push(Xe(k)),R&&R.push(k)),U!==1&&U!==9&&U!==11||!k.childNodes.length||N(k,T,R)};return a.cascadeTo=function(x,T,R){var w,M,k,U,B=e.to(x,T,R),J=[B],ee=[],Y=[],ce=[],xe=e._internals.reservedProps;for(x=B._targets||B.target,N(x,ee,ce),B.render(T,!0,!0),N(x,Y),B.render(0,!0,!0),B._enabled(!0),w=ce.length;--w>-1;)if(M=mt(ce[w],ee[w],Y[w]),M.firstMPT){M=M.difs;for(k in R)xe[k]&&(M[k]=R[k]);U={};for(k in M)U[k]=ee[w][k];J.push(e.fromTo(ce[w],T,U,M))}return J},i.activate([a]),a},!0),function(){var i=qt._gsDefine.plugin({propName:"roundProps",version:"1.5",priority:-1,API:2,init:function(n,r,s){return this._tween=s,!0}}),e=function(n){for(;n;)n.f||n.blob||(n.r=1),n=n._next},t=i.prototype;t._onInitAllProps=function(){for(var n,r,s,a=this._tween,o=a.vars.roundProps.join?a.vars.roundProps:a.vars.roundProps.split(","),c=o.length,h={},u=a._propLookup.roundProps;--c>-1;)h[o[c]]=1;for(c=o.length;--c>-1;)for(n=o[c],r=a._firstPT;r;)s=r._next,r.pg?r.t._roundProps(h,!0):r.n===n&&(r.f===2&&r.t?e(r.t._firstPT):(this._add(r.t,n,r.s,r.c),s&&(s._prev=r._prev),r._prev?r._prev._next=s:a._firstPT===r&&(a._firstPT=s),r._next=r._prev=null,a._propLookup[n]=u)),r=s;return!1},t._add=function(n,r,s,a){this._addTween(n,r,s,s+a,r,!0),this._overwriteProps.push(r)}}(),function(){qt._gsDefine.plugin({propName:"attr",API:2,version:"0.5.0",init:function(i,e){var t;if(typeof i.setAttribute!="function")return!1;for(t in e)this._addTween(i,"setAttribute",i.getAttribute(t)+"",e[t]+"",t,!1,t),this._overwriteProps.push(t);return!0}})}(),qt._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(i,e){typeof e!="object"&&(e={rotation:e}),this.finals={};var t,n,r,s,a,o,c=e.useRadians===!0?2*Math.PI:360,h=1e-6;for(t in e)t!=="useRadians"&&(o=(e[t]+"").split("_"),n=o[0],r=parseFloat(typeof i[t]!="function"?i[t]:i[t.indexOf("set")||typeof i["get"+t.substr(3)]!="function"?t:"get"+t.substr(3)]()),s=this.finals[t]=typeof n=="string"&&n.charAt(1)==="="?r+parseInt(n.charAt(0)+"1",10)*Number(n.substr(2)):Number(n)||0,a=s-r,o.length&&(n=o.join("_"),n.indexOf("short")!==-1&&(a%=c,a!==a%(c/2)&&(a=0>a?a+c:a-c)),n.indexOf("_cw")!==-1&&0>a?a=(a+9999999999*c)%c-(0|a/c)*c:n.indexOf("ccw")!==-1&&a>0&&(a=(a-9999999999*c)%c-(0|a/c)*c)),(a>h||-h>a)&&(this._addTween(i,t,r,r+a,t),this._overwriteProps.push(t)));return!0},set:function(i){var e;if(i!==1)this._super.setRatio.call(this,i);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,qt._gsDefine("easing.Back",["easing.Ease"],function(i){var e,t,n,r=qt.GreenSockGlobals||qt,s=r.com.greensock,a=2*Math.PI,o=Math.PI/2,c=s._class,h=function(l,v){var g=c("easing."+l,function(){},!0),_=g.prototype=new i;return _.constructor=g,_.getRatio=v,g},u=i.register||function(){},f=function(l,v,g,_){var b=c("easing."+l,{easeOut:new v,easeIn:new g,easeInOut:new _},!0);return u(b,l),b},d=function(l,v,g){this.t=l,this.v=v,g&&(this.next=g,g.prev=this,this.c=g.v-v,this.gap=g.t-l)},p=function(l,v){var g=c("easing."+l,function(b){this._p1=b||b===0?b:1.70158,this._p2=1.525*this._p1},!0),_=g.prototype=new i;return _.constructor=g,_.getRatio=v,_.config=function(b){return new g(b)},g},S=f("Back",p("BackOut",function(l){return(l-=1)*l*((this._p1+1)*l+this._p1)+1}),p("BackIn",function(l){return l*l*((this._p1+1)*l-this._p1)}),p("BackInOut",function(l){return 1>(l*=2)?.5*l*l*((this._p2+1)*l-this._p2):.5*((l-=2)*l*((this._p2+1)*l+this._p2)+2)})),y=c("easing.SlowMo",function(l,v,g){v=v||v===0?v:.7,l==null?l=.7:l>1&&(l=1),this._p=l!==1?v:0,this._p1=(1-l)/2,this._p2=l,this._p3=this._p1+this._p2,this._calcEnd=g===!0},!0),m=y.prototype=new i;return m.constructor=y,m.getRatio=function(l){var v=l+(.5-l)*this._p;return this._p1>l?this._calcEnd?1-(l=1-l/this._p1)*l:v-(l=1-l/this._p1)*l*l*l*v:l>this._p3?this._calcEnd?1-(l=(l-this._p3)/this._p1)*l:v+(l-v)*(l=(l-this._p3)/this._p1)*l*l*l:this._calcEnd?1:v},y.ease=new y(.7,.7),m.config=y.config=function(l,v,g){return new y(l,v,g)},e=c("easing.SteppedEase",function(l){l=l||1,this._p1=1/l,this._p2=l+1},!0),m=e.prototype=new i,m.constructor=e,m.getRatio=function(l){return 0>l?l=0:l>=1&&(l=.999999999),(this._p2*l>>0)*this._p1},m.config=e.config=function(l){return new e(l)},t=c("easing.RoughEase",function(l){l=l||{};for(var v,g,_,b,P,I,z=l.taper||"none",C=[],D=0,Z=0|(l.points||20),K=Z,ie=l.randomize!==!1,V=l.clamp===!0,q=l.template instanceof i?l.template:null,ne=typeof l.strength=="number"?.4*l.strength:.4;--K>-1;)v=ie?Math.random():1/Z*K,g=q?q.getRatio(v):v,z==="none"?_=ne:z==="out"?(b=1-v,_=b*b*ne):z==="in"?_=v*v*ne:.5>v?(b=2*v,_=.5*b*b*ne):(b=2*(1-v),_=.5*b*b*ne),ie?g+=Math.random()*_-.5*_:K%2?g+=.5*_:g-=.5*_,V&&(g>1?g=1:0>g&&(g=0)),C[D++]={x:v,y:g};for(C.sort(function(ae,ue){return ae.x-ue.x}),I=new d(1,1,null),K=Z;--K>-1;)P=C[K],I=new d(P.x,P.y,I);this._prev=new d(0,0,I.t!==0?I:I.next)},!0),m=t.prototype=new i,m.constructor=t,m.getRatio=function(l){var v=this._prev;if(l>v.t){for(;v.next&&l>=v.t;)v=v.next;v=v.prev}else for(;v.prev&&v.t>=l;)v=v.prev;return this._prev=v,v.v+(l-v.t)/v.gap*v.c},m.config=function(l){return new t(l)},t.ease=new t,f("Bounce",h("BounceOut",function(l){return 1/2.75>l?7.5625*l*l:2/2.75>l?7.5625*(l-=1.5/2.75)*l+.75:2.5/2.75>l?7.5625*(l-=2.25/2.75)*l+.9375:7.5625*(l-=2.625/2.75)*l+.984375}),h("BounceIn",function(l){return 1/2.75>(l=1-l)?1-7.5625*l*l:2/2.75>l?1-(7.5625*(l-=1.5/2.75)*l+.75):2.5/2.75>l?1-(7.5625*(l-=2.25/2.75)*l+.9375):1-(7.5625*(l-=2.625/2.75)*l+.984375)}),h("BounceInOut",function(l){var v=.5>l;return l=v?1-2*l:2*l-1,l=1/2.75>l?7.5625*l*l:2/2.75>l?7.5625*(l-=1.5/2.75)*l+.75:2.5/2.75>l?7.5625*(l-=2.25/2.75)*l+.9375:7.5625*(l-=2.625/2.75)*l+.984375,v?.5*(1-l):.5*l+.5})),f("Circ",h("CircOut",function(l){return Math.sqrt(1-(l-=1)*l)}),h("CircIn",function(l){return-(Math.sqrt(1-l*l)-1)}),h("CircInOut",function(l){return 1>(l*=2)?-.5*(Math.sqrt(1-l*l)-1):.5*(Math.sqrt(1-(l-=2)*l)+1)})),n=function(l,v,g){var _=c("easing."+l,function(P,I){this._p1=P>=1?P:1,this._p2=(I||g)/(1>P?P:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),b=_.prototype=new i;return b.constructor=_,b.getRatio=v,b.config=function(P,I){return new _(P,I)},_},f("Elastic",n("ElasticOut",function(l){return this._p1*Math.pow(2,-10*l)*Math.sin((l-this._p3)*this._p2)+1},.3),n("ElasticIn",function(l){return-(this._p1*Math.pow(2,10*(l-=1))*Math.sin((l-this._p3)*this._p2))},.3),n("ElasticInOut",function(l){return 1>(l*=2)?-.5*this._p1*Math.pow(2,10*(l-=1))*Math.sin((l-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(l-=1))*Math.sin((l-this._p3)*this._p2)+1},.45)),f("Expo",h("ExpoOut",function(l){return 1-Math.pow(2,-10*l)}),h("ExpoIn",function(l){return Math.pow(2,10*(l-1))-.001}),h("ExpoInOut",function(l){return 1>(l*=2)?.5*Math.pow(2,10*(l-1)):.5*(2-Math.pow(2,-10*(l-1)))})),f("Sine",h("SineOut",function(l){return Math.sin(l*o)}),h("SineIn",function(l){return-Math.cos(l*o)+1}),h("SineInOut",function(l){return-.5*(Math.cos(Math.PI*l)-1)})),c("easing.EaseLookup",{find:function(l){return i.map[l]}},!0),u(r.SlowMo,"SlowMo","ease,"),u(t,"RoughEase","ease,"),u(e,"SteppedEase","ease,"),S},!0)}),qt._gsDefine&&qt._gsQueue.pop()(),function(i,e){"use strict";var t=i.GreenSockGlobals=i.GreenSockGlobals||i;if(!t.TweenLite){var n,r,s,a,o,c=function(E){var O,F=E.split("."),W=t;for(O=0;F.length>O;O++)W[F[O]]=W=W[F[O]]||{};return W},h=c("com.greensock"),u=1e-10,f=function(E){var O,F=[],W=E.length;for(O=0;O!==W;F.push(E[O++]));return F},d=function(){},p=function(){var E=Object.prototype.toString,O=E.call([]);return function(F){return F!=null&&(F instanceof Array||typeof F=="object"&&!!F.push&&E.call(F)===O)}}(),S={},y=function(E,O,F,W){this.sc=S[E]?S[E].sc:[],S[E]=this,this.gsClass=null,this.func=F;var L=[];this.check=function(A){for(var G,X,oe,se,pe,he=O.length,we=he;--he>-1;)(G=S[O[he]]||new y(O[he],[])).gsClass?(L[he]=G.gsClass,we--):A&&G.sc.push(this);if(we===0&&F)for(X=("com.greensock."+E).split("."),oe=X.pop(),se=c(X.join("."))[oe]=this.gsClass=F.apply(F,L),W&&(t[oe]=se,pe=typeof module<"u"&&module.exports,!pe&&typeof define=="function"&&define.amd?define((i.GreenSockAMDPath?i.GreenSockAMDPath+"/":"")+E.split(".").pop(),[],function(){return se}):E===e&&pe&&(module.exports=se)),he=0;this.sc.length>he;he++)this.sc[he].check()},this.check(!0)},m=i._gsDefine=function(E,O,F,W){return new y(E,O,F,W)},l=h._class=function(E,O,F){return O=O||function(){},m(E,[],function(){return O},F),O};m.globals=t;var v=[0,0,1,1],g=[],_=l("easing.Ease",function(E,O,F,W){this._func=E,this._type=F||0,this._power=W||0,this._params=O?v.concat(O):v},!0),b=_.map={},P=_.register=function(E,O,F,W){for(var L,A,G,X,oe=O.split(","),se=oe.length,pe=(F||"easeIn,easeOut,easeInOut").split(",");--se>-1;)for(A=oe[se],L=W?l("easing."+A,null,!0):h.easing[A]||{},G=pe.length;--G>-1;)X=pe[G],b[A+"."+X]=b[X+A]=L[X]=E.getRatio?E:E[X]||new E};for(s=_.prototype,s._calcEnd=!1,s.getRatio=function(E){if(this._func)return this._params[0]=E,this._func.apply(null,this._params);var O=this._type,F=this._power,W=O===1?1-E:O===2?E:.5>E?2*E:2*(1-E);return F===1?W*=W:F===2?W*=W*W:F===3?W*=W*W*W:F===4&&(W*=W*W*W*W),O===1?1-W:O===2?W:.5>E?W/2:1-W/2},n=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=n.length;--r>-1;)s=n[r]+",Power"+r,P(new _(null,null,1,r),s,"easeOut",!0),P(new _(null,null,2,r),s,"easeIn"+(r===0?",easeNone":"")),P(new _(null,null,3,r),s,"easeInOut");b.linear=h.easing.Linear.easeIn,b.swing=h.easing.Quad.easeInOut;var I=l("events.EventDispatcher",function(E){this._listeners={},this._eventTarget=E||this});s=I.prototype,s.addEventListener=function(E,O,F,W,L){L=L||0;var A,G,X=this._listeners[E],oe=0;for(X==null&&(this._listeners[E]=X=[]),G=X.length;--G>-1;)A=X[G],A.c===O&&A.s===F?X.splice(G,1):oe===0&&L>A.pr&&(oe=G+1);X.splice(oe,0,{c:O,s:F,up:W,pr:L}),this!==a||o||a.wake()},s.removeEventListener=function(E,O){var F,W=this._listeners[E];if(W){for(F=W.length;--F>-1;)if(W[F].c===O)return W.splice(F,1),void 0}},s.dispatchEvent=function(E){var O,F,W,L=this._listeners[E];if(L)for(O=L.length,F=this._eventTarget;--O>-1;)W=L[O],W&&(W.up?W.c.call(W.s||F,{type:E,target:F}):W.c.call(W.s||F))};var z=i.requestAnimationFrame,C=i.cancelAnimationFrame,D=Date.now||function(){return new Date().getTime()},Z=D();for(n=["ms","moz","webkit","o"],r=n.length;--r>-1&&!z;)z=i[n[r]+"RequestAnimationFrame"],C=i[n[r]+"CancelAnimationFrame"]||i[n[r]+"CancelRequestAnimationFrame"];l("Ticker",function(E,O){var F,W,L,A,G,X=this,oe=D(),se=O!==!1&&z,pe=500,he=33,we="tick",H=function(_e){var ve,qe,Ue=D()-Z;Ue>pe&&(oe+=Ue-he),Z+=Ue,X.time=(Z-oe)/1e3,ve=X.time-G,(!F||ve>0||_e===!0)&&(X.frame++,G+=ve+(ve>=A?.004:A-ve),qe=!0),_e!==!0&&(L=W(H)),qe&&X.dispatchEvent(we)};I.call(X),X.time=X.frame=0,X.tick=function(){H(!0)},X.lagSmoothing=function(_e,ve){pe=_e||1/u,he=Math.min(ve,pe,0)},X.sleep=function(){L!=null&&(se&&C?C(L):clearTimeout(L),W=d,L=null,X===a&&(o=!1))},X.wake=function(){L!==null?X.sleep():X.frame>10&&(Z=D()-pe+5),W=F===0?d:se&&z?z:function(_e){return setTimeout(_e,0|1e3*(G-X.time)+1)},X===a&&(o=!0),H(2)},X.fps=function(_e){return arguments.length?(F=_e,A=1/(F||60),G=this.time+A,X.wake(),void 0):F},X.useRAF=function(_e){return arguments.length?(X.sleep(),se=_e,X.fps(F),void 0):se},X.fps(E),setTimeout(function(){se&&5>X.frame&&X.useRAF(!1)},1500)}),s=h.Ticker.prototype=new h.events.EventDispatcher,s.constructor=h.Ticker;var K=l("core.Animation",function(E,O){if(this.vars=O=O||{},this._duration=this._totalDuration=E||0,this._delay=Number(O.delay)||0,this._timeScale=1,this._active=O.immediateRender===!0,this.data=O.data,this._reversed=O.reversed===!0,Ye){o||a.wake();var F=this.vars.useFrames?He:Ye;F.add(this,F._time),this.vars.paused&&this.paused(!0)}});a=K.ticker=new h.Ticker,s=K.prototype,s._dirty=s._gc=s._initted=s._paused=!1,s._totalTime=s._time=0,s._rawPrevTime=-1,s._next=s._last=s._onUpdate=s._timeline=s.timeline=null,s._paused=!1;var ie=function(){o&&D()-Z>2e3&&a.wake(),setTimeout(ie,2e3)};ie(),s.play=function(E,O){return E!=null&&this.seek(E,O),this.reversed(!1).paused(!1)},s.pause=function(E,O){return E!=null&&this.seek(E,O),this.paused(!0)},s.resume=function(E,O){return E!=null&&this.seek(E,O),this.paused(!1)},s.seek=function(E,O){return this.totalTime(Number(E),O!==!1)},s.restart=function(E,O){return this.reversed(!1).paused(!1).totalTime(E?-this._delay:0,O!==!1,!0)},s.reverse=function(E,O){return E!=null&&this.seek(E||this.totalDuration(),O),this.reversed(!0).paused(!1)},s.render=function(){},s.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},s.isActive=function(){var E,O=this._timeline,F=this._startTime;return!O||!this._gc&&!this._paused&&O.isActive()&&(E=O.rawTime())>=F&&F+this.totalDuration()/this._timeScale>E},s._enabled=function(E,O){return o||a.wake(),this._gc=!E,this._active=this.isActive(),O!==!0&&(E&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!E&&this.timeline&&this._timeline._remove(this,!0)),!1},s._kill=function(){return this._enabled(!1,!1)},s.kill=function(E,O){return this._kill(E,O),this},s._uncache=function(E){for(var O=E?this:this.timeline;O;)O._dirty=!0,O=O.timeline;return this},s._swapSelfInParams=function(E){for(var O=E.length,F=E.concat();--O>-1;)E[O]==="{self}"&&(F[O]=this);return F},s._callback=function(E){var O=this.vars;O[E].apply(O[E+"Scope"]||O.callbackScope||this,O[E+"Params"]||g)},s.eventCallback=function(E,O,F,W){if((E||"").substr(0,2)==="on"){var L=this.vars;if(arguments.length===1)return L[E];O==null?delete L[E]:(L[E]=O,L[E+"Params"]=p(F)&&F.join("").indexOf("{self}")!==-1?this._swapSelfInParams(F):F,L[E+"Scope"]=W),E==="onUpdate"&&(this._onUpdate=O)}return this},s.delay=function(E){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+E-this._delay),this._delay=E,this):this._delay},s.duration=function(E){return arguments.length?(this._duration=this._totalDuration=E,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&E!==0&&this.totalTime(this._totalTime*(E/this._duration),!0),this):(this._dirty=!1,this._duration)},s.totalDuration=function(E){return this._dirty=!1,arguments.length?this.duration(E):this._totalDuration},s.time=function(E,O){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(E>this._duration?this._duration:E,O)):this._time},s.totalTime=function(E,O,F){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>E&&!F&&(E+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var W=this._totalDuration,L=this._timeline;if(E>W&&!F&&(E=W),this._startTime=(this._paused?this._pauseTime:L._time)-(this._reversed?W-E:E)/this._timeScale,L._dirty||this._uncache(!1),L._timeline)for(;L._timeline;)L._timeline._time!==(L._startTime+L._totalTime)/L._timeScale&&L.totalTime(L._totalTime,!0),L=L._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==E||this._duration===0)&&(ue.length&&et(),this.render(E,O,!1),ue.length&&et())}return this},s.progress=s.totalProgress=function(E,O){var F=this.duration();return arguments.length?this.totalTime(F*E,O):F?this._time/F:this.ratio},s.startTime=function(E){return arguments.length?(E!==this._startTime&&(this._startTime=E,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,E-this._delay)),this):this._startTime},s.endTime=function(E){return this._startTime+(E!=0?this.totalDuration():this.duration())/this._timeScale},s.timeScale=function(E){if(!arguments.length)return this._timeScale;if(E=E||u,this._timeline&&this._timeline.smoothChildTiming){var O=this._pauseTime,F=O||O===0?O:this._timeline.totalTime();this._startTime=F-(F-this._startTime)*this._timeScale/E}return this._timeScale=E,this._uncache(!1)},s.reversed=function(E){return arguments.length?(E!=this._reversed&&(this._reversed=E,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},s.paused=function(E){if(!arguments.length)return this._paused;var O,F,W=this._timeline;return E!=this._paused&&W&&(o||E||a.wake(),O=W.rawTime(),F=O-this._pauseTime,!E&&W.smoothChildTiming&&(this._startTime+=F,this._uncache(!1)),this._pauseTime=E?O:null,this._paused=E,this._active=this.isActive(),!E&&F!==0&&this._initted&&this.duration()&&(O=W.smoothChildTiming?this._totalTime:(O-this._startTime)/this._timeScale,this.render(O,O===this._totalTime,!0))),this._gc&&!E&&this._enabled(!0,!1),this};var V=l("core.SimpleTimeline",function(E){K.call(this,0,E),this.autoRemoveChildren=this.smoothChildTiming=!0});s=V.prototype=new K,s.constructor=V,s.kill()._gc=!1,s._first=s._last=s._recent=null,s._sortChildren=!1,s.add=s.insert=function(E,O){var F,W;if(E._startTime=Number(O||0)+E._delay,E._paused&&this!==E._timeline&&(E._pauseTime=E._startTime+(this.rawTime()-E._startTime)/E._timeScale),E.timeline&&E.timeline._remove(E,!0),E.timeline=E._timeline=this,E._gc&&E._enabled(!0,!0),F=this._last,this._sortChildren)for(W=E._startTime;F&&F._startTime>W;)F=F._prev;return F?(E._next=F._next,F._next=E):(E._next=this._first,this._first=E),E._next?E._next._prev=E:this._last=E,E._prev=F,this._recent=E,this._timeline&&this._uncache(!0),this},s._remove=function(E,O){return E.timeline===this&&(O||E._enabled(!1,!0),E._prev?E._prev._next=E._next:this._first===E&&(this._first=E._next),E._next?E._next._prev=E._prev:this._last===E&&(this._last=E._prev),E._next=E._prev=E.timeline=null,E===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},s.render=function(E,O,F){var W,L=this._first;for(this._totalTime=this._time=this._rawPrevTime=E;L;)W=L._next,(L._active||E>=L._startTime&&!L._paused)&&(L._reversed?L.render((L._dirty?L.totalDuration():L._totalDuration)-(E-L._startTime)*L._timeScale,O,F):L.render((E-L._startTime)*L._timeScale,O,F)),L=W},s.rawTime=function(){return o||a.wake(),this._totalTime};var q=l("TweenLite",function(E,O,F){if(K.call(this,O,F),this.render=q.prototype.render,E==null)throw"Cannot tween a null target.";this.target=E=typeof E!="string"?E:q.selector(E)||E;var W,L,A,G=E.jquery||E.length&&E!==i&&E[0]&&(E[0]===i||E[0].nodeType&&E[0].style&&!E.nodeType),X=this.vars.overwrite;if(this._overwrite=X=X==null?Qe[q.defaultOverwrite]:typeof X=="number"?X>>0:Qe[X],(G||E instanceof Array||E.push&&p(E))&&typeof E[0]!="number")for(this._targets=A=f(E),this._propLookup=[],this._siblings=[],W=0;A.length>W;W++)L=A[W],L?typeof L!="string"?L.length&&L!==i&&L[0]&&(L[0]===i||L[0].nodeType&&L[0].style&&!L.nodeType)?(A.splice(W--,1),this._targets=A=A.concat(f(L))):(this._siblings[W]=Fe(L,this,!1),X===1&&this._siblings[W].length>1&&Xe(L,this,null,1,this._siblings[W])):(L=A[W--]=q.selector(L),typeof L=="string"&&A.splice(W+1,1)):A.splice(W--,1);else this._propLookup={},this._siblings=Fe(E,this,!1),X===1&&this._siblings.length>1&&Xe(E,this,null,1,this._siblings);(this.vars.immediateRender||O===0&&this._delay===0&&this.vars.immediateRender!==!1)&&(this._time=-u,this.render(-this._delay))},!0),ne=function(E){return E&&E.length&&E!==i&&E[0]&&(E[0]===i||E[0].nodeType&&E[0].style&&!E.nodeType)},ae=function(E,O){var F,W={};for(F in E)Ke[F]||F in O&&F!=="transform"&&F!=="x"&&F!=="y"&&F!=="width"&&F!=="height"&&F!=="className"&&F!=="border"||!(!Pe[F]||Pe[F]&&Pe[F]._autoCSS)||(W[F]=E[F],delete E[F]);E.css=W};s=q.prototype=new K,s.constructor=q,s.kill()._gc=!1,s.ratio=0,s._firstPT=s._targets=s._overwrittenProps=s._startAt=null,s._notifyPluginsOfEnabled=s._lazy=!1,q.version="1.18.0",q.defaultEase=s._ease=new _(null,null,1,1),q.defaultOverwrite="auto",q.ticker=a,q.autoSleep=120,q.lagSmoothing=function(E,O){a.lagSmoothing(E,O)},q.selector=i.$||i.jQuery||function(E){var O=i.$||i.jQuery;return O?(q.selector=O,O(E)):typeof document>"u"?E:document.querySelectorAll?document.querySelectorAll(E):document.getElementById(E.charAt(0)==="#"?E.substr(1):E)};var ue=[],me={},fe=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,Me=function(E){for(var O,F=this._firstPT,W=1e-6;F;)O=F.blob?E?this.join(""):this.start:F.c*E+F.s,F.r?O=Math.round(O):W>O&&O>-W&&(O=0),F.f?F.fp?F.t[F.p](F.fp,O):F.t[F.p](O):F.t[F.p]=O,F=F._next},Le=function(E,O,F,W){var L,A,G,X,oe,se,pe,he=[E,O],we=0,H="",_e=0;for(he.start=E,F&&(F(he),E=he[0],O=he[1]),he.length=0,L=E.match(fe)||[],A=O.match(fe)||[],W&&(W._next=null,W.blob=1,he._firstPT=W),oe=A.length,X=0;oe>X;X++)pe=A[X],se=O.substr(we,O.indexOf(pe,we)-we),H+=se||!X?se:",",we+=se.length,_e?_e=(_e+1)%5:se.substr(-5)==="rgba("&&(_e=1),pe===L[X]||X>=L.length?H+=pe:(H&&(he.push(H),H=""),G=parseFloat(L[X]),he.push(G),he._firstPT={_next:he._firstPT,t:he,p:he.length-1,s:G,c:(pe.charAt(1)==="="?parseInt(pe.charAt(0)+"1",10)*parseFloat(pe.substr(2)):parseFloat(pe)-G)||0,f:0,r:_e&&4>_e}),we+=pe.length;return H+=O.substr(we),H&&he.push(H),he.setRatio=Me,he},le=function(E,O,F,W,L,A,G,X){var oe,se,pe=F==="get"?E[O]:F,he=typeof E[O],we=typeof W=="string"&&W.charAt(1)==="=",H={t:E,p:O,s:pe,f:he==="function",pg:0,n:L||O,r:A,pr:0,c:we?parseInt(W.charAt(0)+"1",10)*parseFloat(W.substr(2)):parseFloat(W)-pe||0};return he!=="number"&&(he==="function"&&F==="get"&&(se=O.indexOf("set")||typeof E["get"+O.substr(3)]!="function"?O:"get"+O.substr(3),H.s=pe=G?E[se](G):E[se]()),typeof pe=="string"&&(G||isNaN(pe))?(H.fp=G,oe=Le(pe,W,X||q.defaultStringFilter,H),H={t:oe,p:"setRatio",s:0,c:1,f:2,pg:0,n:L||O,pr:0}):we||(H.c=parseFloat(W)-parseFloat(pe)||0)),H.c?((H._next=this._firstPT)&&(H._next._prev=H),this._firstPT=H,H):void 0},ye=q._internals={isArray:p,isSelector:ne,lazyTweens:ue,blobDif:Le},Pe=q._plugins={},Ne=ye.tweenLookup={},Ve=0,Ke=ye.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1},Qe={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,true:1,false:0},He=K._rootFramesTimeline=new V,Ye=K._rootTimeline=new V,re=30,et=ye.lazyRender=function(){var E,O=ue.length;for(me={};--O>-1;)E=ue[O],E&&E._lazy!==!1&&(E.render(E._lazy[0],E._lazy[1],!0),E._lazy=!1);ue.length=0};Ye._startTime=a.time,He._startTime=a.frame,Ye._active=He._active=!0,setTimeout(et,1),K._updateRoot=q.render=function(){var E,O,F;if(ue.length&&et(),Ye.render((a.time-Ye._startTime)*Ye._timeScale,!1,!1),He.render((a.frame-He._startTime)*He._timeScale,!1,!1),ue.length&&et(),a.frame>=re){re=a.frame+(parseInt(q.autoSleep,10)||120);for(F in Ne){for(O=Ne[F].tweens,E=O.length;--E>-1;)O[E]._gc&&O.splice(E,1);O.length===0&&delete Ne[F]}if(F=Ye._first,(!F||F._paused)&&q.autoSleep&&!He._first&&a._listeners.tick.length===1){for(;F&&F._paused;)F=F._next;F||a.sleep()}}},a.addEventListener("tick",K._updateRoot);var Fe=function(E,O,F){var W,L,A=E._gsTweenID;if(Ne[A||(E._gsTweenID=A="t"+Ve++)]||(Ne[A]={target:E,tweens:[]}),O&&(W=Ne[A].tweens,W[L=W.length]=O,F))for(;--L>-1;)W[L]===O&&W.splice(L,1);return Ne[A].tweens},at=function(E,O,F,W){var L,A,G=E.vars.onOverwrite;return G&&(L=G(E,O,F,W)),G=q.onOverwrite,G&&(A=G(E,O,F,W)),L!==!1&&A!==!1},Xe=function(E,O,F,W,L){var A,G,X,oe;if(W===1||W>=4){for(oe=L.length,A=0;oe>A;A++)if((X=L[A])!==O)X._gc||X._kill(null,E,O)&&(G=!0);else if(W===5)break;return G}var se,pe=O._startTime+u,he=[],we=0,H=O._duration===0;for(A=L.length;--A>-1;)(X=L[A])===O||X._gc||X._paused||(X._timeline!==O._timeline?(se=se||mt(O,0,H),mt(X,se,H)===0&&(he[we++]=X)):pe>=X._startTime&&X._startTime+X.totalDuration()/X._timeScale>pe&&((H||!X._initted)&&2e-10>=pe-X._startTime||(he[we++]=X)));for(A=we;--A>-1;)if(X=he[A],W===2&&X._kill(F,E,O)&&(G=!0),W!==2||!X._firstPT&&X._initted){if(W!==2&&!at(X,O))continue;X._enabled(!1,!1)&&(G=!0)}return G},mt=function(E,O,F){for(var W=E._timeline,L=W._timeScale,A=E._startTime;W._timeline;){if(A+=W._startTime,L*=W._timeScale,W._paused)return-100;W=W._timeline}return A/=L,A>O?A-O:F&&A===O||!E._initted&&2*u>A-O?u:(A+=E.totalDuration()/E._timeScale/L)>O+u?0:A-O-u};s._init=function(){var E,O,F,W,L,A=this.vars,G=this._overwrittenProps,X=this._duration,oe=!!A.immediateRender,se=A.ease;if(A.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),L={};for(W in A.startAt)L[W]=A.startAt[W];if(L.overwrite=!1,L.immediateRender=!0,L.lazy=oe&&A.lazy!==!1,L.startAt=L.delay=null,this._startAt=q.to(this.target,0,L),oe){if(this._time>0)this._startAt=null;else if(X!==0)return}}else if(A.runBackwards&&X!==0)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{this._time!==0&&(oe=!1),F={};for(W in A)Ke[W]&&W!=="autoCSS"||(F[W]=A[W]);if(F.overwrite=0,F.data="isFromStart",F.lazy=oe&&A.lazy!==!1,F.immediateRender=oe,this._startAt=q.to(this.target,0,F),oe){if(this._time===0)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=se=se?se instanceof _?se:typeof se=="function"?new _(se,A.easeParams):b[se]||q.defaultEase:q.defaultEase,A.easeParams instanceof Array&&se.config&&(this._ease=se.config.apply(se,A.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(E=this._targets.length;--E>-1;)this._initProps(this._targets[E],this._propLookup[E]={},this._siblings[E],G?G[E]:null)&&(O=!0);else O=this._initProps(this.target,this._propLookup,this._siblings,G);if(O&&q._onPluginEvent("_onInitAllProps",this),G&&(this._firstPT||typeof this.target!="function"&&this._enabled(!1,!1)),A.runBackwards)for(F=this._firstPT;F;)F.s+=F.c,F.c=-F.c,F=F._next;this._onUpdate=A.onUpdate,this._initted=!0},s._initProps=function(E,O,F,W){var L,A,G,X,oe,se;if(E==null)return!1;me[E._gsTweenID]&&et(),this.vars.css||E.style&&E!==i&&E.nodeType&&Pe.css&&this.vars.autoCSS!==!1&&ae(this.vars,E);for(L in this.vars)if(se=this.vars[L],Ke[L])se&&(se instanceof Array||se.push&&p(se))&&se.join("").indexOf("{self}")!==-1&&(this.vars[L]=se=this._swapSelfInParams(se,this));else if(Pe[L]&&(X=new Pe[L])._onInitTween(E,this.vars[L],this)){for(this._firstPT=oe={_next:this._firstPT,t:X,p:"setRatio",s:0,c:1,f:1,n:L,pg:1,pr:X._priority},A=X._overwriteProps.length;--A>-1;)O[X._overwriteProps[A]]=this._firstPT;(X._priority||X._onInitAllProps)&&(G=!0),(X._onDisable||X._onEnable)&&(this._notifyPluginsOfEnabled=!0),oe._next&&(oe._next._prev=oe)}else O[L]=le.call(this,E,L,"get",se,L,0,null,this.vars.stringFilter);return W&&this._kill(W,E)?this._initProps(E,O,F,W):this._overwrite>1&&this._firstPT&&F.length>1&&Xe(E,this,O,this._overwrite,F)?(this._kill(O,E),this._initProps(E,O,F,W)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(me[E._gsTweenID]=!0),G)},s.render=function(E,O,F){var W,L,A,G,X=this._time,oe=this._duration,se=this._rawPrevTime;if(E>=oe)this._totalTime=this._time=oe,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(W=!0,L="onComplete",F=F||this._timeline.autoRemoveChildren),oe===0&&(this._initted||!this.vars.lazy||F)&&(this._startTime===this._timeline._duration&&(E=0),(E===0||0>se||se===u&&this.data!=="isPause")&&se!==E&&(F=!0,se>u&&(L="onReverseComplete")),this._rawPrevTime=G=!O||E||se===E?E:u);else if(1e-7>E)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(X!==0||oe===0&&se>0)&&(L="onReverseComplete",W=this._reversed),0>E&&(this._active=!1,oe===0&&(this._initted||!this.vars.lazy||F)&&(se>=0&&(se!==u||this.data!=="isPause")&&(F=!0),this._rawPrevTime=G=!O||E||se===E?E:u)),this._initted||(F=!0);else if(this._totalTime=this._time=E,this._easeType){var pe=E/oe,he=this._easeType,we=this._easePower;(he===1||he===3&&pe>=.5)&&(pe=1-pe),he===3&&(pe*=2),we===1?pe*=pe:we===2?pe*=pe*pe:we===3?pe*=pe*pe*pe:we===4&&(pe*=pe*pe*pe*pe),this.ratio=he===1?1-pe:he===2?pe:.5>E/oe?pe/2:1-pe/2}else this.ratio=this._ease.getRatio(E/oe);if(this._time!==X||F){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!F&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=X,this._rawPrevTime=se,ue.push(this),this._lazy=[E,O],void 0;this._time&&!W?this.ratio=this._ease.getRatio(this._time/oe):W&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(this._time===0?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==X&&E>=0&&(this._active=!0),X===0&&(this._startAt&&(E>=0?this._startAt.render(E,O,F):L||(L="_dummyGS")),this.vars.onStart&&(this._time!==0||oe===0)&&(O||this._callback("onStart"))),A=this._firstPT;A;)A.f?A.t[A.p](A.c*this.ratio+A.s):A.t[A.p]=A.c*this.ratio+A.s,A=A._next;this._onUpdate&&(0>E&&this._startAt&&E!==-1e-4&&this._startAt.render(E,O,F),O||(this._time!==X||W)&&this._callback("onUpdate")),L&&(!this._gc||F)&&(0>E&&this._startAt&&!this._onUpdate&&E!==-1e-4&&this._startAt.render(E,O,F),W&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!O&&this.vars[L]&&this._callback(L),oe===0&&this._rawPrevTime===u&&G!==u&&(this._rawPrevTime=0))}},s._kill=function(E,O,F){if(E==="all"&&(E=null),E==null&&(O==null||O===this.target))return this._lazy=!1,this._enabled(!1,!1);O=typeof O!="string"?O||this._targets||this.target:q.selector(O)||O;var W,L,A,G,X,oe,se,pe,he,we=F&&this._time&&F._startTime===this._startTime&&this._timeline===F._timeline;if((p(O)||ne(O))&&typeof O[0]!="number")for(W=O.length;--W>-1;)this._kill(E,O[W],F)&&(oe=!0);else{if(this._targets){for(W=this._targets.length;--W>-1;)if(O===this._targets[W]){X=this._propLookup[W]||{},this._overwrittenProps=this._overwrittenProps||[],L=this._overwrittenProps[W]=E?this._overwrittenProps[W]||{}:"all";break}}else{if(O!==this.target)return!1;X=this._propLookup,L=this._overwrittenProps=E?this._overwrittenProps||{}:"all"}if(X){if(se=E||X,pe=E!==L&&L!=="all"&&E!==X&&(typeof E!="object"||!E._tempKill),F&&(q.onOverwrite||this.vars.onOverwrite)){for(A in se)X[A]&&(he||(he=[]),he.push(A));if((he||!E)&&!at(this,F,O,he))return!1}for(A in se)(G=X[A])&&(we&&(G.f?G.t[G.p](G.s):G.t[G.p]=G.s,oe=!0),G.pg&&G.t._kill(se)&&(oe=!0),G.pg&&G.t._overwriteProps.length!==0||(G._prev?G._prev._next=G._next:G===this._firstPT&&(this._firstPT=G._next),G._next&&(G._next._prev=G._prev),G._next=G._prev=null),delete X[A]),pe&&(L[A]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return oe},s.invalidate=function(){return this._notifyPluginsOfEnabled&&q._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],K.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-u,this.render(-this._delay)),this},s._enabled=function(E,O){if(o||a.wake(),E&&this._gc){var F,W=this._targets;if(W)for(F=W.length;--F>-1;)this._siblings[F]=Fe(W[F],this,!0);else this._siblings=Fe(this.target,this,!0)}return K.prototype._enabled.call(this,E,O),this._notifyPluginsOfEnabled&&this._firstPT?q._onPluginEvent(E?"_onEnable":"_onDisable",this):!1},q.to=function(E,O,F){return new q(E,O,F)},q.from=function(E,O,F){return F.runBackwards=!0,F.immediateRender=F.immediateRender!=0,new q(E,O,F)},q.fromTo=function(E,O,F,W){return W.startAt=F,W.immediateRender=W.immediateRender!=0&&F.immediateRender!=0,new q(E,O,W)},q.delayedCall=function(E,O,F,W,L){return new q(O,0,{delay:E,onComplete:O,onCompleteParams:F,callbackScope:W,onReverseComplete:O,onReverseCompleteParams:F,immediateRender:!1,lazy:!1,useFrames:L,overwrite:0})},q.set=function(E,O){return new q(E,0,O)},q.getTweensOf=function(E,O){if(E==null)return[];E=typeof E!="string"?E:q.selector(E)||E;var F,W,L,A;if((p(E)||ne(E))&&typeof E[0]!="number"){for(F=E.length,W=[];--F>-1;)W=W.concat(q.getTweensOf(E[F],O));for(F=W.length;--F>-1;)for(A=W[F],L=F;--L>-1;)A===W[L]&&W.splice(F,1)}else for(W=Fe(E).concat(),F=W.length;--F>-1;)(W[F]._gc||O&&!W[F].isActive())&&W.splice(F,1);return W},q.killTweensOf=q.killDelayedCallsTo=function(E,O,F){typeof O=="object"&&(F=O,O=!1);for(var W=q.getTweensOf(E,O),L=W.length;--L>-1;)W[L]._kill(F,E)};var $e=l("plugins.TweenPlugin",function(E,O){this._overwriteProps=(E||"").split(","),this._propName=this._overwriteProps[0],this._priority=O||0,this._super=$e.prototype},!0);if(s=$e.prototype,$e.version="1.18.0",$e.API=2,s._firstPT=null,s._addTween=le,s.setRatio=Me,s._kill=function(E){var O,F=this._overwriteProps,W=this._firstPT;if(E[this._propName]!=null)this._overwriteProps=[];else for(O=F.length;--O>-1;)E[F[O]]!=null&&F.splice(O,1);for(;W;)E[W.n]!=null&&(W._next&&(W._next._prev=W._prev),W._prev?(W._prev._next=W._next,W._prev=null):this._firstPT===W&&(this._firstPT=W._next)),W=W._next;return!1},s._roundProps=function(E,O){for(var F=this._firstPT;F;)(E[this._propName]||F.n!=null&&E[F.n.split(this._propName+"_").join("")])&&(F.r=O),F=F._next},q._onPluginEvent=function(E,O){var F,W,L,A,G,X=O._firstPT;if(E==="_onInitAllProps"){for(;X;){for(G=X._next,W=L;W&&W.pr>X.pr;)W=W._next;(X._prev=W?W._prev:A)?X._prev._next=X:L=X,(X._next=W)?W._prev=X:A=X,X=G}X=O._firstPT=L}for(;X;)X.pg&&typeof X.t[E]=="function"&&X.t[E]()&&(F=!0),X=X._next;return F},$e.activate=function(E){for(var O=E.length;--O>-1;)E[O].API===$e.API&&(Pe[new E[O]()._propName]=E[O]);return!0},m.plugin=function(E){if(!(E&&E.propName&&E.init&&E.API))throw"illegal plugin definition.";var O,F=E.propName,W=E.priority||0,L=E.overwriteProps,A={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},G=l("plugins."+F.charAt(0).toUpperCase()+F.substr(1)+"Plugin",function(){$e.call(this,F,W),this._overwriteProps=L||[]},E.global===!0),X=G.prototype=new $e(F);X.constructor=G,G.API=E.API;for(O in A)typeof E[O]=="function"&&(X[A[O]]=E[O]);return G.version=E.version,$e.activate([G]),G},n=i._gsQueue){for(r=0;n.length>r;r++)n[r]();for(s in S)S[s].func||i.console.log("GSAP encountered missing dependency: com.greensock."+s)}o=!1}}(typeof module<"u"&&module.exports&&typeof global<"u"?global:window,"TweenMax");var oo=document.getElementById("tooltip-span");function Mf(){window.onmousemove=function(i){var e=i.clientX,t=i.clientY;oo.style.top=t+20+"px",oo.style.left=e+20+"px"},window.onmousedown=function(i){oo.style.display="none"},window.onmouseup=function(i){oo.style.display="block"},window.innerWidth<=768||Vy()}function Vy(){var i=$(".cursor"),e=$(".cursor-follower"),t=0,n=0,r=0,s=0;TweenMax.to({},.006,{repeat:-1,onRepeat:function(){t+=(r-t)/9,n+=(s-n)/9,TweenMax.set(e,{css:{left:t-0,top:n-0}}),TweenMax.set(i,{css:{left:r,top:s}})}}),$(document).on("mousemove",function(a){r=a.clientX,s=a.clientY}),$("a.f-bg-vid-keeper.w-inline-block, .f-grid-link").on("mouseenter",function(){i.addClass("active"),e.addClass("active")}),$("a.f-bg-vid-keeper.w-inline-block, .f-grid-link").on("mouseleave",function(){i.removeClass("active"),e.removeClass("active")}),$(".with-pov-h1-holder").on("mouseenter",function(){i.addClass("video"),e.addClass("video")}),$(".with-pov-h1-holder").on("mouseleave",function(){i.removeClass("video"),e.removeClass("video")}),$(".vjs-progress-holder").on("mouseenter",function(){i.addClass("bar"),e.addClass("bar")}),$(".vjs-progress-holder").on("mouseleave",function(){i.removeClass("bar"),e.removeClass("bar")})}function bf(){(function(i){"use strict";i(document).ready(function(){"use strict";var e=document.querySelector(".progress-wrap path"),t=e.getTotalLength();e.style.transition=e.style.WebkitTransition="none",e.style.strokeDasharray=t+" "+t,e.style.strokeDashoffset=t,e.getBoundingClientRect(),e.style.transition=e.style.WebkitTransition="stroke-dashoffset 10ms linear";var n=function(){var a=i(window).scrollTop(),o=i(document).height()-i(window).height(),c=t-a*t/o;e.style.strokeDashoffset=c};n(),i(window).scroll(n);var r=50,s=550;jQuery(window).on("scroll",function(){jQuery(this).scrollTop()>r?jQuery(".progress-wrap").addClass("active-progress"):jQuery(".progress-wrap").removeClass("active-progress")}),jQuery(".progress-wrap").on("click",function(a){return a.preventDefault(),jQuery("html, body").animate({scrollTop:0},s),!1})})})(jQuery)}var Li,Hn,ji,Wr,Gr,Tf=0,wf=0,Ef=window.innerWidth/2,Af=window.innerHeight/2,Rf,As=[],pc=document.getElementById("banner-container");function Cf(){Li=document.querySelector("#banner-canvas"),Li.height=pc.offsetHeight,Li.width=pc.offsetWidth;let i=Li.height,e=Li.width;Wr=new Wi({canvas:Li,antialias:!0,alpha:!0}),Hn=new Lt(75,window.innerWidth/window.innerHeight,1,2e3),Hn.position.z=1400,ji=new Or,ji.fog=new Pa(0,8e-4);let t=new rn,n=[],r=new Ai,s=f=>{f.colorSpace=St},a=r.load("https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f2173b619fe50ee27ea9_ball.webp",s),o=r.load("https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f217e1ae7e98fce71d13_disc.webp",s),c=r.load("https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f2173b619fe50ee27df1_circle.webp",s),h=r.load("https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f2176beddb56d427c607_spark1.webp",s),u=r.load("https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9e16942f7724f06ee984f_snowflake4.webp",s);for(let f=0;f<1e4;f++){let d=Math.random()*2e3-1e3,p=Math.random()*2e3-1e3,S=Math.random()*2e3-1e3;n.push(d,p,S)}t.setAttribute("position",new Ct(n,3)),Gr=[[[1,.2,.5],o,6],[[.95,.1,.5],c,5],[[.9,.05,.5],a,4],[[.85,0,.5],u,3],[[.8,0,.5],h,3]];for(let f=0;f<Gr.length;f++){let d=Gr[f][0],p=Gr[f][1],S=Gr[f][2];As[f]=new gs({size:S,map:p,blending:da,depthTest:!1,transparent:!0}),As[f].color.setHSL(d[0],d[1],d[2],St);let y=new _s(t,As[f]);y.rotation.x=Math.random()*6,y.rotation.y=Math.random()*6,y.rotation.z=Math.random()*6,ji.add(y)}Wr.setPixelRatio(window.devicePixelRatio),Wr.setSize(Li.offsetWidth,Li.offsetHeight),Wr.useLegacyLights=!1,document.body.addEventListener("pointermove",Gy),window.addEventListener("resize",Hy)}function Hy(){Ef=window.innerWidth/2,Af=window.innerHeight/2,Hn.aspect=window.innerWidth/window.innerHeight,Hn.updateProjectionMatrix(),Wr.setSize(window.innerWidth,window.innerHeight)}function Gy(i){i.isPrimary!==!1&&(Tf=i.clientX-Ef,wf=i.clientY-Af)}function Pf(){let i={root:null,threshold:.5};new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting?Lf():cancelAnimationFrame(Rf)})},i).observe(pc)}function Lf(){Rf=requestAnimationFrame(Lf),Wy()}function Wy(){let i=Date.now()*5e-5;Hn.position.x+=(Tf-Hn.position.x)*.05,Hn.position.y+=(-wf-Hn.position.y)*.05,Hn.lookAt(ji.position);for(let e=0;e<ji.children.length;e++){let t=ji.children[e];t instanceof _s&&(t.rotation.y=i*(e<4?e+1:-(e+1)))}for(let e=0;e<As.length;e++){let t=Gr[e][0],n=360*(t[0]+i)%360/360;As[e].color.setHSL(n,t[1],t[2],St)}Wr.render(ji,Hn)}function Xy(){$("#bg-video").get(0).firstChild.play()}$("#enter-button").click(Xy);Mf();bf();yf();xf();Cf();Pf();})();
/*!
 * VERSION: 1.18.0
 * DATE: 2015-09-05
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
