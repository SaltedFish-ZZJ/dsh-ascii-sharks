window.__ModuleLoader__.load({
  id: 'dsh-ascii-sharks',
  factory(require) {
    const React = require('react');

    // ── ascii-sharks engine ────────────────────────────────────────────────
    // Bundled verbatim from ascii-sharks-main/ascii-sharks.html. The only
    // change is the final line: instead of grabbing the first <canvas> and
    // booting itself, it exposes the engine class so the Host page can mount
    // it on a dedicated background canvas.
"use strict";(()=>{var te=Object.defineProperty;var ee=(i,t,n)=>t in i?te(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var l=(i,t,n)=>ee(i,typeof t!="symbol"?t+"":t,n);var ct=Math.PI*2,P=(i,t,n)=>i<t?t:i>n?n:i,L=(i,t)=>i+Math.random()*(t-i),Et=(i,t)=>Math.floor(L(i,t+1));function J(i,t,n){let e=P((n-i)/(t-i),0,1);return e*e*(3-2*e)}function wt(i,t){let n=(t-i)%ct;return n>Math.PI&&(n-=ct),n<-Math.PI&&(n+=ct),n}function rt(i,t,n){let e=Math.imul(i|0,374761393)^Math.imul(t|0,668265263)^Math.imul(n|0,1442695041);return e=Math.imul(e^e>>>13,1274126177),e^=e>>>16,(e>>>0)/4294967296}var _t=1/260,Wt=1/310,Pt=1/190,Lt=3400;function qt(i,t,n,e){let s=i*_t+n*.07,o=t*Wt-n*.05,a=(i+t)*Pt+n*.11;return e.x=(-Wt*Math.sin(s)*Math.sin(o)+.5*Pt*Math.cos(a))*Lt,e.y=(-_t*Math.cos(s)*Math.cos(o)-.5*Pt*Math.cos(a))*Lt,e}var et=[{name:"sardine",cruise:36,maxSpeed:64,minSpeed:18,weight:3,schoolSize:[18,28],spacing:[1.8,1.1],align:1.6,cohesion:1.6,jitter:40,mill:70,verticalDrag:.5},{name:"anchovy",cruise:46,maxSpeed:78,minSpeed:22,weight:3,schoolSize:[20,32],spacing:[1.5,1],align:3.2,cohesion:.45,jitter:30,mill:0,verticalDrag:1.4},{name:"silverside",cruise:40,maxSpeed:70,minSpeed:20,weight:3,schoolSize:[12,20],spacing:[2,1.1],align:2.4,cohesion:1.1,jitter:35,mill:0,verticalDrag:1.6},{name:"mackerel",cruise:32,maxSpeed:60,minSpeed:16,weight:2,schoolSize:[5,9],spacing:[2.6,1.3],align:2,cohesion:.9,jitter:25,mill:0,verticalDrag:2},{name:"goby",cruise:26,maxSpeed:56,minSpeed:10,weight:1,schoolSize:[8,12],spacing:[1.4,1.1],align:.35,cohesion:1.4,jitter:110,mill:0,verticalDrag:.3},{name:"needlefish",cruise:58,maxSpeed:98,minSpeed:30,weight:2,schoolSize:[3,6],spacing:[3.2,1.6],align:3.6,cohesion:.25,jitter:16,mill:0,verticalDrag:2.4},{name:"lanternfish",cruise:22,maxSpeed:44,minSpeed:8,weight:2,schoolSize:[10,16],spacing:[1.6,1],align:.8,cohesion:1.2,jitter:70,mill:40,verticalDrag:.6}],ne=et.reduce((i,t)=>i+t.weight,0);var FISH_CHARS=["-","~","=","+",".","|","o"];function Tt(){let i=Math.random()*ne;for(let t=0;t<et.length;t++)if(i-=et[t].weight,i<=0)return t;return 0}var j=20,se=[{kind:"classic",size:1},{kind:"classic",size:.7},{kind:"classic",size:.84},{kind:"classic",size:.77}],Nt=420,ie=1.4,re=1,kt=1100,oe=-.6,vt=class{constructor(t=se,n){this.sharkSpecs=t;this.fishCount=n;l(this,"width",0);l(this,"height",0);l(this,"time",0);l(this,"fish",[]);l(this,"sharks",[]);l(this,"jellies",[]);l(this,"creature",window.__DSH_SHARKS_CREATURE__||"whale");l(this,"events",[]);l(this,"pointer",{x:0,y:0,active:!1});l(this,"perception",60);l(this,"sepX",[]);l(this,"sepY",[]);l(this,"foreignSep",40);l(this,"bucketCols",0);l(this,"bucketRows",0);l(this,"bucketHead",new Int32Array(0));l(this,"bucketCount",new Uint16Array(0));l(this,"bucketNext",new Int32Array(0));l(this,"lastSpawn",0);l(this,"tmp",{x:0,y:0})}resize(t,n,e,s){let o=this.width===0;if(this.width=t,this.height=n,this.sepX=et.map(a=>a.spacing[0]*e),this.sepY=et.map(a=>a.spacing[1]*s),this.perception=Math.max(s*3,e*5.5),this.foreignSep=e*3,o||this.fish.length===0){this.seed();return}for(let a of this.fish)a.x=P(a.x,0,t),a.y=P(a.y,0,n)}seed(){let{width:t,height:n}=this,e=Math.min(t,n),s=P(e*.44,170,430),o=this.sharkSpecs.length;let WS=this.creature==="whale"?[{kind:"whale",size:1},{kind:"whale",size:.7}]:this.creature==="shark"?se:[],N=WS.length;this.sharks=[];for(let c=0;c<N;c++){let{kind:d,size:r}=WS[c],f=s*r,p=e*L(.28,.4),M=c/N*ct+L(-.4,.4),u=c%2===0?1:-1,x=t/2+Math.cos(M)*p*(t/e)*.9,m=n/2+Math.sin(M)*p,F=M+u*Math.PI/2,A=new Float32Array(j*2),z=f/(j-1);for(let D=0;D<j;D++)A[D*2]=x-Math.cos(F)*z*D,A[D*2+1]=m-Math.sin(F)*z*D;this.sharks.push({id:c+1,kind:d,length:f,nodes:A,heading:F,speed:30,phase:L(0,ct),turn:0,hunger:L(.25,.75),wander:0,orbitDir:u,orbitRadius:p,target:null,retargetAt:0,depth:r})}this.sharks.sort((c,d)=>c.length-d.length);let a=this.fishCount??P(Math.round(t*n/4400),85,340);for(this.fish=[];this.fish.length<a;){let c=Tt(),d=et[c],r=Math.min(Et(d.schoolSize[0],d.schoolSize[1]),a-this.fish.length),f=Math.random()<.5?1:-1,p=L(t*.06,t*.94),M=L(n*.08,n*.92),u=(Math.random()<.5?0:Math.PI)+L(-.5,.5);for(let x=0;x<r;x++)this.fish.push({x:p+L(-1,1)*this.sepX[c]*Math.sqrt(r),y:M+L(-1,1)*this.sepY[c]*Math.sqrt(r)*.6,vx:Math.cos(u)*d.cruise,vy:Math.sin(u)*d.cruise,species:c,alarm:0,alive:!0,respawnAt:0,phase:L(0,ct),turn:0,depth:L(.55,1),millDir:f})}this.bucketNext=new Int32Array(this.fish.length),this.seedJellies()}splash(t,n){this.events.push({kind:"splash",x:t,y:n});let e=240;for(let s of this.fish){if(!s.alive)continue;let o=s.x-t,a=s.y-n,c=Math.hypot(o,a);if(c>e||c<.001)continue;let d=(1-c/e)*260;s.vx+=o/c*d,s.vy+=a/c*d,s.alarm=1}}seedJellies(){var t=this.width,n=this.height,e=Math.min(t,n),s=P(e*.16,90,190);this.jellies=[];for(var a=0;a<3;a++)this.jellies.push({x:t*(.12+Math.random()*.76),y:n*(.05+Math.random()*.95),S:s*L(.7,1.15),pulse:Math.random(),phase:Math.random(),tent:Et(8,12)});}stepJellies(t){if(!this.jellies)return;var n=this.width,e=this.height;for(var a of this.jellies){a.pulse+=t*.3;var c=a.pulse%1,d=c<.25?Math.sin(c/.25*Math.PI/2):1-(c-.25)/.75;a.y+=(-16-d*34)*t;a.x+=Math.sin(this.time*.3+a.phase*6)*10*t;if(a.y<-a.S*2.6||a.x<-a.S||a.x>n+a.S){a.y=e+a.S*2;a.x=n*(.15+Math.random()*.7)}}}step(t){this.time+=t,this.rebuildHash(),this.stepFish(t),this.stepSharks(t),this.stepJellies(t),this.respawn()}rebuildHash(){let t=this.perception,n=2;this.bucketCols=Math.ceil(this.width/t)+n*2,this.bucketRows=Math.ceil(this.height/t)+n*2;let e=this.bucketCols*this.bucketRows;this.bucketHead.length!==e&&(this.bucketHead=new Int32Array(e),this.bucketCount=new Uint16Array(e)),this.bucketHead.fill(-1),this.bucketCount.fill(0),this.bucketNext.length!==this.fish.length&&(this.bucketNext=new Int32Array(this.fish.length));for(let s=0;s<this.fish.length;s++){let o=this.fish[s];if(!o.alive)continue;let a=this.bucketOf(o.x,o.y);this.bucketNext[s]=this.bucketHead[a],this.bucketHead[a]=s,this.bucketCount[a]++}}bucketOf(t,n){let e=this.perception,s=P(Math.floor(t/e)+2,0,this.bucketCols-1);return P(Math.floor(n/e)+2,0,this.bucketRows-1)*this.bucketCols+s}stepFish(t){let{fish:n,sharks:e,pointer:s,width:o,height:a,time:c}=this,d=this.perception,r=d*d,f=this.foreignSep,p=this.perception,M=this.bucketCols,u=this.bucketRows,x=this.bucketHead,m=this.bucketNext,F=this.tmp,A=Math.exp(-t*.7),z=Math.min(1,t*6);for(let D=0;D<n.length;D++){let h=n[D];if(!h.alive)continue;let R=et[h.species],q=1+1.8*h.alarm,$=this.sepX[h.species]*q,y=this.sepY[h.species]*q,H=Math.hypot(h.vx,h.vy)||1,S=h.vx/H,g=h.vy/H,b=0,w=0,K=0,C=0,k=0,E=0,T=0,I=0,v=0,U=0,V=P(Math.floor(h.x/p)+2,0,M-1),st=P(Math.floor(h.y/p)+2,0,u-1);for(let N=Math.max(0,st-1);N<=Math.min(u-1,st+1);N++)for(let O=Math.max(0,V-1);O<=Math.min(M-1,V+1);O++){let W=x[N*M+O];for(;W!==-1;){if(W!==D){let _=n[W],Y=_.x-h.x,X=_.y-h.y,tt=Y*Y+X*X;if(tt<r&&tt>1e-6){let dt=Math.sqrt(tt);if((Y*S+X*g)/dt>oe){let mt=Y/$,pt=X/y,bt=mt*mt+pt*pt;if(bt<1){let it=Math.sqrt(bt)||.001,ht=(1-it)/it;K-=mt*ht,C-=pt*ht}if(_.species===h.species)k+=_.vx,E+=_.vy,T+=Y,I+=X,v++;else if(dt<f){let it=(1-dt/f)/dt*.6;K-=Y*it,C-=X*it}_.alarm>U&&(U=_.alarm)}}}W=m[W]}}if(b+=K*Nt,w+=C*Nt,v>0){let N=ie*R.align,O=re*R.cohesion*(1-.8*h.alarm);if(b+=(k/v-h.vx)*N+T/v*O,w+=(E/v-h.vy)*N+I/v*O,R.mill>0){let W=Math.hypot(T,I)||1;b+=-I/W*h.millDir*R.mill*(1-h.alarm),w+=T/W*h.millDir*R.mill*(1-h.alarm)}}let B=0;for(let N of e){let O=N.length*.6+60,W=1/0,_=0,Y=0;for(let ht=0;ht<=12;ht+=3){let Kt=N.nodes[ht*2],Ct=N.nodes[ht*2+1],Ot=(h.x-Kt)**2+(h.y-Ct)**2;Ot<W&&(W=Ot,_=Kt,Y=Ct)}let X=Math.sqrt(W);if(X>=O||X<.001)continue;let tt=1-X/O;tt*=tt;let dt=(h.x-_)/X,mt=(h.y-Y)/X,pt=Math.cos(N.heading),bt=Math.sin(N.heading),it=pt*(h.y-N.nodes[1])-bt*(h.x-N.nodes[0])>=0?1:-1;b+=(dt*.7-bt*it*.9)*kt*tt,w+=(mt*.7+pt*it*.9)*kt*tt,B=Math.max(B,Math.sqrt(tt))}if(s.active){let O=h.x-s.x,W=h.y-s.y,_=Math.hypot(O,W);if(_<130&&_>.001){let Y=(1-_/130)**2;b+=O/_*kt*Y,w+=W/_*kt*Y,B=Math.max(B,Math.sqrt(Y)*.8)}}let Z=Math.max(h.alarm*A,B),ot=U*.86;ot>Z&&(Z+=(ot-Z)*z),h.alarm=Z;let Q=36;h.x<Q?b+=(Q-h.x)*7:h.x>o-Q&&(b-=(h.x-(o-Q))*7),h.y<Q?w+=(Q-h.y)*7:h.y>a-Q&&(w-=(h.y-(a-Q))*7),qt(h.x,h.y,c,F),b+=F.x*.5+(Math.random()-.5)*R.jitter,w+=F.y*.5+(Math.random()-.5)*R.jitter,w-=h.vy*R.verticalDrag*(1-.7*h.alarm);let at=R.cruise*(1+1.3*h.alarm);b+=(at-H)*S*1.6,w+=(at-H)*g*1.6;let ft=Math.atan2(h.vy,h.vx);h.vx+=b*t,h.vy+=w*t;let ut=R.maxSpeed*(1+1.8*h.alarm),G=Math.hypot(h.vx,h.vy);G>ut?(h.vx*=ut/G,h.vy*=ut/G):G<R.minSpeed&&G>.001&&(h.vx*=R.minSpeed/G,h.vy*=R.minSpeed/G),h.turn+=(wt(ft,Math.atan2(h.vy,h.vx))/t-h.turn)*Math.min(1,t*8),h.phase+=t*(7+Math.hypot(h.vx,h.vy)*.12),h.x=P(h.x+h.vx*t,-60,o+60),h.y=P(h.y+h.vy*t,-60,a+60)}}stepSharks(t){let{sharks:n,width:e,height:s,time:o}=this,a=Math.min(e,s),c=e/2,d=s/2;for(let r of n){let f=r.length,p=r.nodes,M=p[0],u=p[1];r.hunger=Math.min(1,r.hunger+t*.03);let x=Math.cos(r.heading),m=Math.sin(r.heading);r.wander=P(r.wander+(Math.random()-.5)*t*3.2,-1.1,1.1),x+=Math.cos(r.heading+r.wander)*.45,m+=Math.sin(r.heading+r.wander)*.45,o>=r.retargetAt&&(r.target=this.findPrey(r),r.retargetAt=o+.45);let F=r.target,A=!1,z=0;if(F&&F.alive&&r.hunger>.3){let k=F.x+F.vx*.35-M,E=F.y+F.vy*.35-u,T=Math.hypot(k,E)||1,I=1.4+2.6*r.hunger;x+=k/T*I,m+=E/T*I,A=!0,z=P(1-T/(f*.9),0,1)}else{let k=(M-c)/(e/a),E=u-d,T=Math.hypot(k,E)||1,I=r.orbitRadius*(1+.15*Math.sin(o*.05+r.id)),v=P((I-T)/I,-1,1);x+=(-E/T*r.orbitDir+k/T*v*.9)*.55,m+=(k/T*r.orbitDir+E/T*v*.9)*.55}for(let k of n)if(k!==r)for(let E=0;E<j;E+=4){let T=M-k.nodes[E*2],I=u-k.nodes[E*2+1],v=Math.hypot(T,I),U=(f+k.length)*.45;if(v<U&&v>.001){let V=(1-v/U)*3;x+=T/v*V,m+=I/v*V}}let D=(M-c)/(e*.3),h=(u-d)/(s*.16),R=D*D+h*h;if(R<1){let k=Math.sqrt(R)||.001,E=(1-k)*(A?1:2.5);x+=D/k*E,m+=h/k*E}let q=Math.max(-M,M-e,-u,u-s);if(q>-f*.05){let k=P((q+f*.05)/(f*.35),0,1)*3.5,E=c-M,T=d-u,I=Math.hypot(E,T)||1;x+=E/I*k,m+=T/I*k}let $=Math.atan2(m,x),H=Math.min(A?1.7+z:.8,r.speed/(f*.22))*t,S=P(wt(r.heading,$),-H,H);r.heading+=S,r.turn+=(S/t-r.turn)*Math.min(1,t*3);let g=30+f*.04,b=A?g*(1.45+z*1.5):g;r.speed+=(b-r.speed)*Math.min(1,t*1.1),r.phase+=t*(2+r.speed/24),p[0]+=Math.cos(r.heading)*r.speed*t,p[1]+=Math.sin(r.heading)*r.speed*t;let w=f/(j-1),K=.16,C=r.heading+Math.PI;for(let k=1;k<j;k++){let E=p[(k-1)*2],T=p[(k-1)*2+1],I=Math.atan2(p[k*2+1]-T,p[k*2]-E);I=C+P(wt(C,I),-K,K),p[k*2]=E+Math.cos(I)*w,p[k*2+1]=T+Math.sin(I)*w,C=I}if(r.hunger>.15){let k=f*.05+8,E=p[0],T=p[1];for(let I of this.fish)I.alive&&(I.x-E)**2+(I.y-T)**2<k*k&&(I.alive=!1,I.respawnAt=o+L(3,8),r.hunger=Math.max(0,r.hunger-.16),this.events.push({kind:"eat",x:I.x,y:I.y}))}}}findPrey(t){let n=t.length*.9+160,e=t.nodes[0],s=t.nodes[1],o=Math.cos(t.heading),a=Math.sin(t.heading),c=null,d=1/0,r=1/0;for(let f of this.fish){if(!f.alive)continue;let p=f.x-e,M=f.y-s,u=Math.hypot(p,M);if(u>n||u<.001)continue;let x=(p*o+M*a)/u;if(x<.2)continue;let m=this.bucketCount[this.bucketOf(f.x,f.y)],F=u*(1+(1-x)*.8)*(1+m*.07);F<d&&(d=F,c=f),f===t.target&&(r=F)}return t.target&&r<d*1.3?t.target:c}respawn(){let{time:t,width:n,height:e}=this,s=[];for(let u of this.fish)!u.alive&&u.respawnAt<=t&&s.push(u);if(s.length===0||s.length<6&&t-this.lastSpawn<9)return;this.lastSpawn=t;let o=Et(0,3),a=L(.15,.85),c=o===0?-20:o===1?n+20:a*n,d=o===2?-20:o===3?e+20:a*e,r=Math.atan2(e/2-d,n/2-c)+L(-.5,.5),f=Tt(),p=et[f],M=Math.random()<.5?1:-1;for(let u of s.slice(0,p.schoolSize[1]))u.alive=!0,u.species=f,u.alarm=0,u.turn=0,u.millDir=M,u.x=c+L(-1,1)*this.perception,u.y=d+L(-1,1)*this.perception,u.vx=Math.cos(r)*p.cruise*1.4,u.vy=Math.sin(r)*p.cruise*1.4}};var nt=6,xt=[.28,.42,.58,.74,.9],Dt=[[48,52,235],[52,205,60],[228,50,44],[190,212,255],[110,230,255]],ae=[1,1,1,1,1],Ut=Dt.length-1,St=["#e0892c","#e03a32","#b44ae0","#33c8cc","#3cb54a","#3150e8","#d9c14a"],Gt=":;t%SX8#@",$t="%;tS:",Bt="@8%",he=":;",ce=".',`",Yt=1,jt=2,Rt=3,Xt=4,At=5,Ft=6,Vt="#%@",zt=[.25,.3,.75,.3,.25,.72,.75,.72];function Ht(i){if(i<.13)return .09*Math.pow(Math.sin(i/.13*Math.PI/2),.95);if(i<.3)return .09+.016*J(.13,.3,i);if(i<.84)return .019+.087*Math.pow(1-(i-.3)/.54,1.25);let t=(i-.84)/.16;return .019*(1-t)+.012*Math.sin(t*Math.PI)}var lt={classic:{halfWidth:Ht,pectoral:[.15,.43,.55,.26],falcate:!0,pelvic:[.57,.65,.69,.085],caudal:.085,dorsal:[.33,.47],secondDorsal:[.71,.76],eye:[.1,.14],gills:[.19,.29],tint:[.92,.97,1.05]},hammerhead:{halfWidth:i=>i<.06?.045:i<.3?.045+.061*J(.06,.3,i):Ht(i)*.92,head:{span:.17,sweep:.035,depth:.09,notch:0},pectoral:[.17,.4,.5,.22],falcate:!0,pelvic:[.56,.63,.67,.075],caudal:.11,dorsal:[.28,.44],secondDorsal:[.7,.74],eye:null,gills:[.16,.26],tint:[.96,.98,.9]},tiger:{halfWidth:i=>{if(i<.13)return .1*Math.pow(Math.sin(i/.13*Math.PI/2),.45);if(i<.3)return .1+.014*J(.13,.3,i);if(i<.84)return .019+.095*Math.pow(1-(i-.3)/.54,1.2);let t=(i-.84)/.16;return .019*(1-t)+.012*Math.sin(t*Math.PI)},pectoral:[.15,.42,.53,.25],falcate:!0,pelvic:[.57,.65,.69,.085],caudal:.095,dorsal:[.33,.46],secondDorsal:[.71,.75],eye:[.08,.12],gills:[.19,.28],tint:[1.02,.95,.84]},zebra:{halfWidth:i=>{if(i<.1)return .075*Math.pow(Math.sin(i/.1*Math.PI/2),.7);if(i<.28)return .075+.025*J(.1,.28,i);if(i<.55)return .022+.078*Math.pow(1-(i-.28)/.27,1.1);let t=(i-.55)/.45;return .022*(1-t*t)+.012*Math.sin(t*Math.PI)},pectoral:[.12,.3,.36,.19],falcate:!1,pelvic:[.42,.48,.51,.065],caudal:0,dorsal:[.36,.44],secondDorsal:[.49,.53],eye:[.06,.09],gills:[.13,.2],tint:[1.08,.97,.74]},greathammer:{halfWidth:i=>i<.05?.04:i<.3?.04+.07*J(.05,.3,i):Ht(i)*.95,head:{span:.21,sweep:.006,depth:.085,notch:.014},pectoral:[.16,.38,.49,.24],falcate:!0,pelvic:[.55,.62,.67,.085],caudal:.13,dorsal:[.24,.45],secondDorsal:[.68,.74],eye:null,gills:[.15,.25],tint:[.86,.93,1.02]},mako:{halfWidth:i=>{if(i<.17)return .088*Math.pow(Math.sin(i/.17*Math.PI/2),1.5);if(i<.32)return .088+.012*J(.17,.32,i);if(i<.86)return .014+.086*Math.pow(1-(i-.32)/.54,1.45);let t=(i-.86)/.14;return .014*(1-t)+.01*Math.sin(t*Math.PI)},pectoral:[.18,.4,.5,.21],falcate:!0,pelvic:[.58,.64,.68,.06],caudal:.13,dorsal:[.34,.45],secondDorsal:[.76,.79],eye:[.11,.15],gills:[.2,.3],tint:[.78,.9,1.2]},thresher:{halfWidth:i=>{if(i<.08)return .07*Math.pow(Math.sin(i/.08*Math.PI/2),.75);if(i<.2)return .07+.02*J(.08,.2,i);if(i<.48)return .012+.078*Math.pow(1-(i-.2)/.28,1.3);let t=(i-.48)/.52;return .012*(1-t)+.006*Math.sin(t*Math.PI*.9)+.002},pectoral:[.12,.27,.36,.2],falcate:!0,pelvic:[.37,.41,.44,.045],caudal:0,dorsal:[.24,.32],secondDorsal:[.45,.47],eye:[.05,.1],gills:[.11,.18],tint:[1,.9,1.08]},nurse:{halfWidth:i=>{if(i<.08)return .085*Math.pow(Math.sin(i/.08*Math.PI/2),.4);if(i<.3)return .085+.02*J(.08,.3,i);if(i<.72)return .022+.083*Math.pow(1-(i-.3)/.42,1.1);let t=(i-.72)/.28;return .022*(1-t*t)+.014*Math.sin(t*Math.PI)},pectoral:[.16,.34,.4,.17],falcate:!1,pelvic:[.45,.52,.55,.075],caudal:0,dorsal:[.5,.58],secondDorsal:[.63,.69],eye:[.05,.075],gills:[.14,.22],tint:[1.1,.96,.76]},whale:{halfWidth:i=>{if(i<.12)return .115*Math.pow(Math.sin(i/.12*Math.PI/2),.45);if(i<.35)return .115+.02*Math.sin((i-.12)/.23*Math.PI);if(i<.87)return .018+.097*Math.pow(1-(i-.35)/.52,1.1);return .018*(1-(i-.87)/.13)},pectoral:[.25,.36,.41,.32],falcate:!1,pelvic:[.5,.6,.65,.05],caudal:.22,dorsal:[.6,.65],secondDorsal:[0,0],eye:[.1,.13],gills:[0,0],tint:[.45,.65,1.3]}},Qt=Object.keys(lt);function It(i,t,n,e,s,o,a,c){let d=(i-s)*(e-o)-(n-s)*(t-o),r=(i-a)*(o-c)-(s-a)*(t-c),f=(i-n)*(c-e)-(a-n)*(t-e),p=d<0||r<0||f<0,M=d>0||r>0||f>0;return!(p&&M)}function Jt(i,t,n,e,s,o){i.setTransform(1,0,0,1,0,0),i.strokeStyle="rgba(255,255,255,0.055)",i.lineWidth=1,i.beginPath();for(let a=0;a<=Math.ceil(t/e);a++){let c=Math.round(a*e*o)+.5;i.moveTo(c,0),i.lineTo(c,n*o)}for(let a=0;a<=Math.ceil(n/s);a++){let c=Math.round(a*s*o)+.5;i.moveTo(0,c),i.lineTo(t*o,c)}i.stroke()}var Mt=class{constructor(t){this.canvas=t;l(this,"ctx");l(this,"bg");l(this,"dpr",1);l(this,"width",0);l(this,"height",0);l(this,"cw",12);l(this,"ch",18);l(this,"cols",0);l(this,"rows",0);l(this,"fontFamily","ui-monospace, Menlo, monospace");l(this,"dotKind",new Uint8Array(0));l(this,"dotPhase",new Float32Array(0));l(this,"dotFreq",new Float32Array(0));l(this,"energy",new Float32Array(0));l(this,"energyTmp",new Float32Array(0));l(this,"heat",new Float32Array(0));l(this,"bucketOf",new Uint8Array(0));l(this,"bucketOrder",new Int32Array(0));l(this,"bucketCounts",new Int32Array(Dt.length*nt+1));l(this,"dotStyles",[]);l(this,"sharkFlag",new Uint8Array(0));l(this,"sharkShade",new Float32Array(0));l(this,"sharkKey",new Uint32Array(0));l(this,"sharkDepth",new Float32Array(0));l(this,"sharkKind",new Uint8Array(0));l(this,"sharkShadow",new Uint8Array(0));l(this,"spine",new Float32Array(j*2));l(this,"arc",new Float32Array(j));l(this,"arcTotal",1);l(this,"shape",lt.classic);l(this,"sharkId",0);l(this,"finTipLeft",0);l(this,"finTipRight",0);l(this,"hitFlag",0);l(this,"hitShade",0);l(this,"hitS",0);l(this,"hitV",0);l(this,"hitDist",0);l(this,"fishStamp",new Uint32Array(0));l(this,"frameId",0);l(this,"fishBuckets",xt.map(()=>[]));l(this,"fishStyles",xt.map(t=>`rgba(230,238,255,${t})`));let n=t.getContext("2d",{alpha:!1});if(!n)throw new Error("2D canvas unavailable");this.ctx=n,this.bg=document.createElement("canvas");for(let e=0;e<Dt.length;e++){let[s,o,a]=Dt[e];for(let c=0;c<nt;c++){let d=ae[e]*(c+1)/nt;this.dotStyles.push(`rgba(${s},${o},${a},${d.toFixed(3)})`)}}}get cellWidth(){return this.cw}get cellHeight(){return this.ch}setFontFamily(t){t&&(this.fontFamily=t)}resize(t,n,e){this.width=t,this.height=n,this.dpr=e,this.cw=P(Math.round(t/124),8,13),this.ch=Math.round(this.cw*1.45),this.cols=Math.ceil(t/this.cw),this.rows=Math.ceil(n/this.ch),this.canvas.width=Math.round(t*e),this.canvas.height=Math.round(n*e),this.bg.width=this.canvas.width,this.bg.height=this.canvas.height;let s=this.cols*this.rows;this.dotKind=new Uint8Array(s),this.dotPhase=new Float32Array(s),this.dotFreq=new Float32Array(s),this.energy=new Float32Array(s),this.energyTmp=new Float32Array(s),this.heat=new Float32Array(s),this.bucketOf=new Uint8Array(s),this.bucketOrder=new Int32Array(s),this.sharkFlag=new Uint8Array(s),this.sharkShade=new Float32Array(s),this.sharkKey=new Uint32Array(s),this.sharkDepth=new Float32Array(s),this.sharkKind=new Uint8Array(s),this.sharkShadow=new Uint8Array(s),this.fishStamp=new Uint32Array(s),this.speciesOf=new Uint8Array(s);for(let o=0;o<s;o++){let a=o%this.cols,c=o/this.cols|0;this.dotKind[o]=0,this.dotPhase[o]=rt(a,c,23)*Math.PI*2,this.dotFreq[o]=.3+rt(a,c,37)*1.1}this.paintBackground()}paintBackground(){let t=this.bg.getContext("2d");if(!t)return;let{width:n,height:e,dpr:s,cw:o,ch:a}=this;t.setTransform(s,0,0,s,0,0),t.fillStyle="#000",t.fillRect(0,0,n,e),Jt(t,n,e,o,a,s)}render(t,n){let{ctx:e,dpr:s,cols:o,ch:a}=this;if(o===0)return;let c=t.time;this.consumeEvents(t),this.rasterizeSharks(t.sharks,c),this.depositWake(t),this.diffuse(n),e.setTransform(1,0,0,1,0,0),e.drawImage(this.bg,0,0),e.setTransform(s,0,0,s,0,0),this.markFish(t),this.drawDots(c),e.font=`600 ${Math.round(a*.74)}px ${this.fontFamily}`,e.textAlign="center",e.textBaseline="middle",this.drawHeat(),this.drawFish(),t.creature==="jellyfish"?this.drawJellies(t,c):this.drawSharks(c)}drawJellies(t,n){if(!t.jellies)return;var e=this.ctx,s=this.cw,o=this.ch;for(var a of t.jellies){var c=a.x/s,d=a.y/o,r=Math.max(3,Math.round(a.S/s)),q=Math.max(2,Math.round(a.S*.55/o)),u=a.pulse%1,g=u<.25?Math.sin(u/.25*Math.PI/2):1-(u-.25)/.75,W=1+g*.14;for(var dx=-r;dx<=r;dx++)for(var dy=-q;dy<=Math.ceil(q*.45);dy++){var nx=dx/(r*W),ny=dy/q,dd=Math.hypot(nx,ny);if(dd>1||ny>.4)continue;var rim=dd>.72||ny>.26,inner=Math.hypot(nx*1.55,(ny+.55)*1.55)<.55,ch2=rim?(ny>.26?"\u2580":"\u2588"):inner?"\u2593":"\u2592",al=.35+.5*(1-dd)+g*.2;e.fillStyle=rim?"rgba(190,245,255,"+Math.min(1,al)+")":inner?"rgba(120,205,240,"+Math.min(1,al*.9)+")":"rgba(90,165,215,"+Math.min(1,al*.7)+")";e.fillText(ch2,(c+dx)*s+s/2,(d+dy)*o+o/2);}var tn=a.tent||9;for(var k=0;k<tn;k++){var ox=c+(k/(tn-1)-.5)*r*1.5,amp=1+Math.sin(a.pulse*3.1+k)*.4;for(var m=1;m<=q*2.4;m++){var px=ox+Math.sin(m*.55-t.time*2.2+a.phase*6)*(.4+m*.16*amp),py=d+q*.35+m*(1+g*.1);e.fillStyle="rgba(150,225,250,"+Math.max(.12,.55-m*.03)+")";e.fillText(m%3===0?"\u2593":"\u2592",px*s+s/2,py*o+o/2);}}}}cellIndex(t,n){let e=Math.floor(t/this.cw),s=Math.floor(n/this.ch);return e<0||s<0||e>=this.cols||s>=this.rows?-1:s*this.cols+e}stamp(t,n,e,s,o){let a=Math.floor(n/this.cw),c=Math.floor(e/this.ch);for(let d=c-s;d<=c+s;d++)for(let r=a-s;r<=a+s;r++){if(r<0||d<0||r>=this.cols||d>=this.rows)continue;let f=Math.hypot(r-a,(d-c)*1.4);if(f>s+.5)continue;let p=d*this.cols+r;t[p]=Math.min(1.6,t[p]+o*(1-f/(s+1)))}}consumeEvents(t){for(let n of t.events)n.kind==="eat"?(this.stamp(this.heat,n.x,n.y,2,1),this.stamp(this.energy,n.x,n.y,3,.9)):this.stamp(this.energy,n.x,n.y,6,1.4);t.events.length=0}depositWake(t){let{energy:n}=this;for(let e of t.fish){if(!e.alive)continue;let s=this.cellIndex(e.x,e.y);s>=0&&(n[s]=Math.min(1.6,n[s]+.012+e.alarm*.03))}for(let e of t.sharks)for(let s=j-6;s<j;s++){let o=this.cellIndex(e.nodes[s*2],e.nodes[s*2+1]);o>=0&&(n[o]=Math.min(1.6,n[o]+.05+e.speed*.0012))}t.pointer.active&&this.stamp(n,t.pointer.x,t.pointer.y,1,.08)}diffuse(t){let{cols:n,rows:e,energy:s,energyTmp:o,heat:a}=this,c=Math.exp(-t*1.5);for(let r=0;r<e;r++)for(let f=0;f<n;f++){let p=r*n+f,M=f>0?s[p-1]:s[p],u=f<n-1?s[p+1]:s[p],x=r>0?s[p-n]:s[p],m=r<e-1?s[p+n]:s[p];o[p]=(s[p]*4+M+u+x+m)*.125*c}this.energy=o,this.energyTmp=s;let d=Math.exp(-t*2.2);for(let r=0;r<a.length;r++)a[r]*=d}sampleShark(t,n,e){let{spine:s,arc:o}=this,a=j,c=1/0,d=0,r=1,f=0,p=0;for(let S=0;S<a-1;S++){let g=s[S*2],b=s[S*2+1],w=s[(S+1)*2]-g,K=s[(S+1)*2+1]-b,C=w*w+K*K||1,k=P(((t-g)*w+(n-b)*K)/C,0,1),E=g+w*k,T=b+K*k,I=(t-E)**2+(n-T)**2;if(I<c){c=I;let v=Math.sqrt(C);d=(o[S]+k*v)/this.arcTotal,r=w*(n-b)-K*(t-g)>=0?1:-1,f=-K/v*r,p=w/v*r}}let M=Math.sqrt(c),u=d,x=u*e,m=this.shape,F=m.halfWidth(u)*e;this.hitDist=M,this.hitS=u,this.hitV=M*r;let A=this.shape.head;if(A&&x<e*(A.sweep+A.depth+A.notch)){let S=e*A.span,g=M/S,b=e*A.sweep*g*g+e*A.notch*Math.max(0,1-g/.14),w=e*A.depth*(1-.2*g*g*g*g);if(g<=1&&x>=b&&x<=b+w)return this.hitFlag=g>.84?At:Yt,this.hitShade=g>.84?0:.62-.2*g+(x<b+e*.012?.1:0),!0}if(M<=F){let S=M/(F||1),g=(f*-.6+p*-.8)*S,b=.58-S*S*.42+g*.26,w=Yt;return u>m.dorsal[0]&&u<m.dorsal[1]&&S<.3?(w=Xt,b=1):u>m.secondDorsal[0]&&u<m.secondDorsal[1]&&S<.4?b=Math.max(b,.82):m.eye&&u>m.eye[0]&&u<m.eye[1]&&S>.6?(w=At,b=0):u>m.gills[0]&&u<m.gills[1]&&S>.58?Math.floor((u-m.gills[0])/(m.gills[1]-m.gills[0])*5)%2===0&&(b*=.45):u<.05?b=Math.max(b,.7):m===lt.zebra&&u>.08&&u<.55&&(S<.1||Math.abs(S-.6)<.08)?b=Math.max(b,.8):this.marked(u,M*r,e,S)&&(w=Ft),this.hitFlag=w,this.hitShade=b,!0}let z=r>0?this.finTipRight:this.finTipLeft,[D,h,R]=m.pectoral;if(It(x,M,e*D,0,e*h,0,e*R,z)&&!(m.falcate&&It(x,M,e*h,0,e*(h+(R-h)*.33),z*.55,e*R,z)))return this.hitFlag=this.marked(u,M*r,e,0)?Ft:Rt,this.hitShade=.38+.22*(1-P(M/z,0,1)),!0;let[q,$,y,H]=m.pelvic;return It(x,M,e*q,0,e*$,0,e*y,e*H)||m.caudal>0&&It(x,M,e*.86,0,e*.95,0,e,e*m.caudal)?(this.hitFlag=Rt,this.hitShade=.36,!0):!1}marked(t,n,e,s){if(this.shape===lt.tiger){if(t<.2||t>.9||s>.85)return!1;let o=.35*Math.sin(n/e*25+t*5);return Math.sin(t*Math.PI*2*9+o)>.65-.5*J(.2,.42,t)+.4*J(.8,.9,t)}if(this.shape===lt.zebra){if(t<.07)return!1;let o=t*e/(e*.06),a=n/(e*.045),c=Math.floor(o),d=Math.floor(a),r=rt(c,d,this.sharkId)*.5+.25,f=rt(c,d,this.sharkId+11)*.5+.25;return(o-c-r)**2+(a-d-f)**2<.08}return!1}rasterizeSharks(t,n){let{sharkFlag:e,sharkShade:s,sharkKey:o,sharkDepth:a,sharkKind:c,sharkShadow:d,spine:r,arc:f,cw:p,ch:M,cols:u,rows:x}=this;e.fill(0),d.fill(0);for(let m of t){let F=m.length,A=j,z=m.nodes,D=P(m.speed/60,.4,1.4);this.shape=lt[m.kind],this.sharkId=m.id;let h=Qt.indexOf(m.kind);for(let v=0;v<A;v++){let U=v/(A-1),V=Math.max(0,v-1),st=Math.min(A-1,v+1),B=z[V*2]-z[st*2],Z=z[V*2+1]-z[st*2+1],ot=Math.hypot(B,Z)||1;B/=ot,Z/=ot;let at=F*.05*(.1+.9*Math.pow(U,1.8))*D*Math.sin(m.phase-U*5.2);r[v*2]=z[v*2]-Z*at,r[v*2+1]=z[v*2+1]+B*at}f[0]=0;for(let v=1;v<A;v++)f[v]=f[v-1]+Math.hypot(r[v*2]-r[(v-1)*2],r[v*2+1]-r[(v-1)*2+1]);this.arcTotal=f[A-1]||1;let R=P(m.turn*.45,-.35,.35),q=1+.06*Math.sin(m.phase*.5),$=this.shape.pectoral[3];this.finTipRight=F*$*q*(1-R),this.finTipLeft=F*$*q*(1+R);let y=1/0,H=1/0,S=-1/0,g=-1/0;for(let v=0;v<A;v++)y=Math.min(y,r[v*2]),S=Math.max(S,r[v*2]),H=Math.min(H,r[v*2+1]),g=Math.max(g,r[v*2+1]);let b=F*.36,w=Math.max(0,Math.floor((y-b)/p)),K=Math.min(u-1,Math.floor((S+b)/p)),C=Math.max(0,Math.floor((H-b)/M)),k=Math.min(x-1,Math.floor((g+b)/M));if(w>K||C>k)continue;let E=b+Math.hypot(p,M),T=Math.round(F*.035/p)+1,I=Math.round(F*.02/M)+1;for(let v=C;v<=k;v++)for(let U=w;U<=K;U++){let V=U*p,st=v*M,B=this.sampleShark(V+p/2,st+M/2,F);if(!B&&this.hitDist>E)continue;let Z=this.hitFlag,ot=this.hitShade,Q=this.hitS,at=this.hitV,ft=B?1:0;for(let O=0;O<zt.length;O+=2)this.sampleShark(V+zt[O]*p,st+zt[O+1]*M,F)&&ft++;if(ft===0)continue;let ut=ft/5,G=v*u+U,N=rt(Math.round(Q*52),Math.round(at/(p*.9)),m.id)*4294967295>>>0;if(o[G]=N,a[G]=m.depth,c[G]=h,B&&ut>=.6){e[G]=Z;let O=(rt(U,v,Math.floor(n*6))-.5)*.06;s[G]=P(ot+O,0,1);let W=U+T,_=v+I;W<u&&_<x&&(d[_*u+W]=1)}else e[G]=jt,s[G]=ut}}}drawSharks(t){let{ctx:n,cols:e,rows:s,cw:o,ch:a,sharkFlag:c,sharkShade:d,sharkKey:r,sharkDepth:f,sharkKind:p}=this,M=e*s;for(let u=0;u<M;u++){let x=c[u];if(!x)continue;let m=u%e,F=u/e|0,A=m*o,z=F*a,D=r[u],h=d[u],R=.7+.3*f[u],[q,$,y]=lt[Qt[p[u]]].tint,H=Math.floor(t*2.4+D%997/97),S=rt(D,H,7);if(x===jt){let K=h>=.5?he:ce,C=(70+h*80)*R;n.fillStyle=S<.07?St[D%St.length]:`rgb(${Math.round(C*q)},${Math.round(C*$)},${Math.min(255,Math.round(C*y+6))})`,n.fillText(K[(D>>>8)%K.length],A+o/2,z+a/2+1);continue}let g,b;if(x===Xt)g=226,b=Bt[(D>>>8)%Bt.length];else if(x===At)g=12,b="o";else if(x===Ft)g=24+h*22,b=Vt[(D>>>8)%Vt.length];else if(x===Rt)g=40+h*120,b=$t[(D>>>8)%$t.length];else{g=46+h*160;let K=(D>>>4)%3-1;b=Gt[P(Math.floor((1-h)*8.99)+K,0,Gt.length-1)]}g*=R,n.fillStyle=`rgb(${Math.min(255,Math.round(g*q))},${Math.min(255,Math.round(g*$))},${Math.min(255,Math.round(g*y+4))})`,n.fillRect(A+1,z+1,o-1,a-1);let w;x===At?w="#9aa0ad":x===Ft?w=`rgb(${Math.round(70*q)},${Math.round(70*$)},${Math.round(70*y)})`:S<.09?w=St[D%St.length]:S<.13?w="#ffffff":w=h>.55?"#0e0f13":"#1b1d24",n.fillStyle=w,n.fillText(b,A+o/2,z+a/2+1)}}markFish(t){let{fishStamp:n,fishBuckets:e,sharkFlag:s}=this,o=++this.frameId;for(let a of e)a.length=0;for(let a=0;a<2;a++)for(let c of t.fish){if(!c.alive||(c.depth>.78?0:1)!==a)continue;let d=this.cellIndex(c.x,c.y);if(d<0||n[d]===o||s[d])continue;n[d]=o,this.speciesOf[d]=c.species;let r=P(Math.abs(c.turn)/3.5,0,1),f=.3+.4*(c.depth-.55)/.45+.3*Math.max(r,c.alarm);e[P(Math.floor(f*xt.length),0,xt.length-1)].push(d)}}drawFish(){let{ctx:t,cw:n,ch:e,cols:s,fishBuckets:o}=this;for(let a=0;a<o.length;a++){let c=o[a];if(c.length){t.fillStyle=this.fishStyles[a];for(let d of c)t.fillText(FISH_CHARS[this.speciesOf[d]]||"-",d%s*n+n/2,(d/s|0)*e+e/2+1)}}}drawHeat(){let{ctx:t,heat:n,cols:e,cw:s,ch:o}=this;for(let a=0;a<n.length;a++){let c=n[a];if(c<.08)continue;let d=a%e,r=a/e|0;t.fillStyle=c>.5?`rgba(255,120,60,${c.toFixed(2)})`:`rgba(220,40,40,${(c*1.6).toFixed(2)})`,t.fillText(c>.6?"*":"\xB7",d*s+s/2,r*o+o/2+1)}}drawDots(t){let{ctx:n,cols:e,rows:s,cw:o,ch:a,dotKind:c,dotPhase:d,dotFreq:r,energy:f,sharkFlag:p,sharkShadow:M,fishStamp:u,frameId:x}=this,{bucketOf:m,bucketOrder:F,bucketCounts:A}=this,z=e*s,D=A.length-1;A.fill(0);for(let y=0;y<z;y++){let H=f[y],S=c[y];if(p[y]||u[y]===x||S===0&&H<.45){m[y]=D;continue}let g;if(H>.45){let b=P(Math.floor((H-.45)*5),0,nt-1);g=Ut*nt+b}else{let b=y%e,w=y/e|0,K=.5+.5*Math.sin(t*r[y]+d[y]),C=.85+.15*Math.sin(b*.11+t*.35)*Math.sin(w*.17-t*.27),k=P((.55+.45*K)*C+H*2,0,1);M[y]&&(k*=.2),g=(S-1)*nt+P(Math.floor(k*nt),0,nt-1)}m[y]=g,A[g]++}let h=new Int32Array(A.length);for(let y=1;y<A.length;y++)h[y]=h[y-1]+A[y-1];let R=h.slice();for(let y=0;y<z;y++){let H=m[y];H!==D&&(F[R[H]++]=y)}let q=Math.max(2,Math.round(o*.19)),$=q+1;for(let y=0;y<D;y++){let H=A[y];if(!H)continue;n.fillStyle=this.dotStyles[y];let S=y>=Ut*nt?$:q,g=h[y];for(let b=g;b<g+H;b++){let w=F[b],K=w%e,C=w/e|0;n.fillRect(Math.round(K*o+o*.66-S/2),Math.round(C*a+a*.64-S/2),S,S)}}}};var gt=1/60,Zt=4,yt=class{constructor(t,n){this.canvas=t;l(this,"world");l(this,"renderer");l(this,"raf",0);l(this,"last",0);l(this,"acc",0);l(this,"visible",!0);l(this,"reducedMotion");l(this,"resizeObserver");l(this,"intersectionObserver");l(this,"disposed",!1);l(this,"frame",t=>{let n=Math.min(.1,(t-this.last)/1e3);this.last=t,this.acc+=n;let e=0;for(;this.acc>=gt&&e<Zt;)this.world.step(gt),this.acc-=gt,e++;e===Zt&&(this.acc=0),t-(this.lastPaint||0)>=(this.minFrameMs||0)&&(this.lastPaint=t,this.renderer.render(this.world,n)),this.raf=requestAnimationFrame(this.frame)});l(this,"onMotionPreference",()=>{this.reducedMotion.matches?(cancelAnimationFrame(this.raf),this.drawStill()):this.schedule()});l(this,"onPointerMove",t=>{let{x:n,y:e,inside:s}=this.toLocal(t),o=this.world.pointer;o.x=n,o.y=e,o.active=s&&t.pointerType!=="touch"});l(this,"onPointerDown",t=>{let{x:n,y:e,inside:s}=this.toLocal(t);s&&!this.reducedMotion.matches&&this.world.splash(n,e)});l(this,"onPointerLeave",()=>{this.world.pointer.active=!1});this.world=new vt(n),this.renderer=new Mt(t),this.renderer.setFontFamily(getComputedStyle(t).fontFamily),this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)"),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.intersectionObserver=new IntersectionObserver(([e])=>{this.visible=e.isIntersecting,this.schedule()}),this.intersectionObserver.observe(t),this.reducedMotion.addEventListener("change",this.onMotionPreference),window.addEventListener("pointermove",this.onPointerMove,{passive:!0}),window.addEventListener("pointerdown",this.onPointerDown,{passive:!0}),document.documentElement.addEventListener("pointerleave",this.onPointerLeave),window.addEventListener("blur",this.onPointerLeave),this.resize(),document.fonts?.load(`600 16px ${getComputedStyle(t).fontFamily}`).then(()=>{!this.disposed&&this.reducedMotion.matches&&this.drawStill()}),this.schedule()}destroy(){this.disposed=!0,cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.intersectionObserver.disconnect(),this.reducedMotion.removeEventListener("change",this.onMotionPreference),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerdown",this.onPointerDown),document.documentElement.removeEventListener("pointerleave",this.onPointerLeave),window.removeEventListener("blur",this.onPointerLeave)}setCreature(t){this.world.creature=t,this.world.seed()}resize(){let t=this.canvas.getBoundingClientRect();if(t.width<1||t.height<1)return;let n=Math.min(window.devicePixelRatio||1,window.__DSH_SHARKS_DPR__||1);this.renderer.resize(t.width,t.height,n),this.world.resize(t.width,t.height,this.renderer.cellWidth,this.renderer.cellHeight),this.reducedMotion.matches&&this.drawStill()}schedule(){cancelAnimationFrame(this.raf),!(this.disposed||!this.visible||this.reducedMotion.matches)&&(this.last=performance.now(),this.raf=requestAnimationFrame(this.frame))}drawStill(){if(this.world.time<4)for(let t=0;t<240;t++)this.world.step(gt);this.renderer.render(this.world,gt)}toLocal(t){let n=this.canvas.getBoundingClientRect(),e=t.clientX-n.left,s=t.clientY-n.top,o=e>=0&&s>=0&&e<=n.width&&s<=n.height;return{x:e,y:s,inside:o}}};var le=new URLSearchParams(location.search).get("sharks")?.split(",").filter(Boolean),ue=le?.map((i,t)=>({kind:i,size:1-t*.1}));window.__DSH_ASCII_SHARKS_ENGINE__=yt;})();


    // ── Backdrop ────────────────────────────────────────────────────────────
    // One canvas, one token override. This intentionally does NOT touch the
    // frame columns or any other layout node: the canvas sits at z-index -1
    // inside the frame, and the base surface is made translucent so the art
    // can show through. Disabling the plugin removes both changes.
    // ── 遮罩参数 ────────────────────────────────────────────────────────────
    // 两套形状：空白态（DSH 的 hero 阶段）用椭圆，进对话用竖条。
    // 想在运行时试数，直接在 DevTools 里改 window.__DSH_SHARKS_MASK__。
    // ── 现成作品：ascii-magic-art（MIT，kailashsr38/ascii-magic-art）──────────
    // 这一整块是从作者的 lib/kit.js + pieces/swimming-whale.js 原样内联进来的，
    // 只做了一件事：把 import/export 去掉、包进一个 IIFE。算法一个字没改。
    const SCENE_WHALE = (function () {
/*
 * kit.js: the small toolbox every piece is built from. No dependencies, runs
 * the same in a browser and in Node.
 *
 * A piece draws into a Grid and returns grid.frame(). A Grid holds one
 * character and one colour key per cell. Colour keys are single characters
 * that index the piece's meta.palette; a space means "default ink".
 */

const RAMPS = {
  classic: " .:-=+*#%@",
  fine: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  dots: " .·•●",
  blocks: " ░▒▓█",
  soft: " .,-~:;=!*#$@",
  lines: " -=≡",
};

/** Map 0..1 to a character of a ramp. */
function ramp(v, chars = RAMPS.classic) {
  const i = Math.max(0, Math.min(chars.length - 1, Math.floor(v * chars.length)));
  return chars[i];
}

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const fract = (v) => v - Math.floor(v);
const TAU = Math.PI * 2;

/** Deterministic PRNG (mulberry32). Same seed, same art on every load. */
function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── noise ──────────────────────────────────────────────────────────── */
function hash2(x, y, s) {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
/** 2D value noise in 0..1. */
function noise2(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, xf), lerp(c, d, xf), yf);
}
/** Fractal noise, a few octaves of noise2, in 0..1. */
function fbm(x, y, octaves = 4, seed = 0) {
  let v = 0, amp = 0.5, f = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    v += amp * noise2(x * f, y * f, seed + i * 17);
    norm += amp; amp *= 0.5; f *= 2;
  }
  return v / norm;
}

/* ── colour ─────────────────────────────────────────────────────────── */
function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const x = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return "#" + x(f(0)) + x(f(8)) + x(f(4));
}
/** Build a palette object from a list of hex colours: keys "0".."9","a".."z". */
const KEYS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function palette(hexes) {
  const p = {};
  hexes.forEach((h, i) => (p[KEYS[i]] = h));
  return p;
}
/** A gradient palette of n steps between colour stops, for shading by value. */
function gradient(stops, n = 10) {
  const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgb = stops.map(toRgb);
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * (rgb.length - 1);
    const j = Math.min(rgb.length - 2, Math.floor(t)), f = t - j;
    const c = rgb[j].map((v, k) => Math.round(lerp(v, rgb[j + 1][k], f)));
    out.push("#" + c.map((v) => v.toString(16).padStart(2, "0")).join(""));
  }
  return out;
}

/* ── the grid ───────────────────────────────────────────────────────── */
class Grid {
  constructor(cols, rows) {
    this.cols = cols; this.rows = rows;
    this.ch = new Array(cols * rows).fill(" ");
    this.co = new Array(cols * rows).fill(" ");
    this.z = new Float32Array(cols * rows);
  }
  clear(ch = " ", co = " ") { this.ch.fill(ch); this.co.fill(co); this.z.fill(-Infinity); return this; }
  inside(x, y) { return x >= 0 && y >= 0 && x < this.cols && y < this.rows; }
  /** Put a character (and optional colour key) at integer x,y. */
  set(x, y, ch, co) {
    x = Math.floor(x); y = Math.floor(y);
    if (!this.inside(x, y)) return;
    const i = x + y * this.cols;
    this.ch[i] = ch; if (co !== undefined) this.co[i] = co;
  }
  /** Depth-tested put: only draws when z is nearer (larger) than what is there. */
  setZ(x, y, z, ch, co) {
    x = Math.floor(x); y = Math.floor(y);
    if (!this.inside(x, y)) return;
    const i = x + y * this.cols;
    if (z <= this.z[i]) return;
    this.z[i] = z; this.ch[i] = ch; if (co !== undefined) this.co[i] = co;
  }
  get(x, y) { return this.inside(x, y) ? this.ch[Math.floor(x) + Math.floor(y) * this.cols] : " "; }
  /** Write a string left to right. */
  text(x, y, s, co) { for (let i = 0; i < s.length; i++) this.set(x + i, y, s[i], co); }
  /** Write a multi-line block (lines split on \n). Spaces are transparent unless solid. */
  block(x, y, s, co, solid = false) {
    s.split("\n").forEach((line, r) => {
      for (let i = 0; i < line.length; i++) if (solid || line[i] !== " ") this.set(x + i, y + r, line[i], co);
    });
  }
  hline(x0, x1, y, ch = "─", co) { for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) this.set(x, y, ch, co); }
  vline(x, y0, y1, ch = "│", co) { for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) this.set(x, y, ch, co); }
  /** Box with light, heavy, double or round corners. */
  box(x, y, w, h, style = "light", co) {
    const S = {
      light: "┌┐└┘─│", heavy: "┏┓┗┛━┃", double: "╔╗╚╝═║", round: "╭╮╰╯─│", ascii: "++++-|",
    }[style] || style;
    this.hline(x + 1, x + w - 2, y, S[4], co); this.hline(x + 1, x + w - 2, y + h - 1, S[4], co);
    this.vline(x, y + 1, y + h - 2, S[5], co); this.vline(x + w - 1, y + 1, y + h - 2, S[5], co);
    this.set(x, y, S[0], co); this.set(x + w - 1, y, S[1], co);
    this.set(x, y + h - 1, S[2], co); this.set(x + w - 1, y + h - 1, S[3], co);
  }
  fill(x, y, w, h, ch = " ", co) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, ch, co); }
  /** Bresenham line. */
  line(x0, y0, x1, y1, ch = "*", co) {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let e = dx + dy;
    for (let n = 0; n < 4000; n++) {
      this.set(x0, y0, typeof ch === "function" ? ch(x0, y0) : ch, co);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * e;
      if (e2 >= dy) { e += dy; x0 += sx; }
      if (e2 <= dx) { e += dx; y0 += sy; }
    }
  }
  /** Ellipse outline, corrected for tall cells when aspect=0.5. */
  circle(cx, cy, r, ch = "o", co, aspect = 0.5) {
    const n = Math.max(12, Math.ceil(r * 8));
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      this.set(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * aspect), ch, co);
    }
  }
  /** Call fn(x, y, u, v) for every cell; u,v in 0..1. Write via the return value [ch, co]. */
  shade(fn) {
    for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
      const r = fn(x, y, x / (this.cols - 1), y / (this.rows - 1));
      if (r) this.set(x, y, r[0], r[1]);
    }
  }
  /** The frame a piece returns: plain text when no colours were used, else {text, color}. */
  frame() {
    const lines = [], cl = [];
    let colored = false;
    for (let y = 0; y < this.rows; y++) {
      lines.push(this.ch.slice(y * this.cols, (y + 1) * this.cols).join(""));
      const c = this.co.slice(y * this.cols, (y + 1) * this.cols).join("");
      if (!colored && c.trim()) colored = true;
      cl.push(c);
    }
    return colored ? { text: lines.join("\n"), color: cl.join("\n") } : lines.join("\n");
  }
}

/* ── 3D ─────────────────────────────────────────────────────────────── */
function rotX([x, y, z], a) { const c = Math.cos(a), s = Math.sin(a); return [x, y * c - z * s, y * s + z * c]; }
function rotY([x, y, z], a) { const c = Math.cos(a), s = Math.sin(a); return [x * c + z * s, y, -x * s + z * c]; }
function rotZ([x, y, z], a) { const c = Math.cos(a), s = Math.sin(a); return [x * c - y * s, x * s + y * c, z]; }
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
/** Perspective-project a point to grid coords. Cells are ~2x taller than wide. */
function project([x, y, z], cols, rows, fov = 1.6, dist = 4) {
  const k = fov / (z + dist);
  const s = Math.min(cols * 0.5, rows);
  return [cols / 2 + x * k * s, rows / 2 - y * k * s * 0.5, k];
}
/** Draw a wireframe from vertices + edge index pairs. */
function wire(g, verts, edges, ch = "·", co) {
  for (const [a, b] of edges) g.line(verts[a][0], verts[a][1], verts[b][0], verts[b][1], ch, co);
}

/* ── small text font (3x5) for numbers and short labels ─────────────── */
const F3 = {
  "0": "███│█ █│█ █│█ █│███", "1": " █ │██ │ █ │ █ │███", "2": "███│  █│███│█  │███",
  "3": "███│  █│███│  █│███", "4": "█ █│█ █│███│  █│  █", "5": "███│█  │███│  █│███",
  "6": "███│█  │███│█ █│███", "7": "███│  █│  █│  █│  █", "8": "███│█ █│███│█ █│███",
  "9": "███│█ █│███│  █│███", ":": "   │ █ │   │ █ │   ", " ": "   │   │   │   │   ",
  "-": "   │   │███│   │   ", ".": "   │   │   │   │ █ ", "%": "█ █│  █│ █ │█  │█ █",
};
/** Draw digits in a 3x5 block font. Returns the width used. */
function bigText(g, x, y, s, co, on = "█") {
  let cx = x;
  for (const c of String(s)) {
    const glyph = F3[c] || F3[" "];
    glyph.split("│").forEach((row, r) => { for (let i = 0; i < 3; i++) if (row[i] !== " ") g.set(cx + i, y + r, on, co); });
    cx += 4;
  }
  return cx - x;
}


/* swimming-whale: a humpback whale gliding beneath the waves, surfacing now and then to blow a spout. */

const P = [];
const add = (c) => { const o = P.length; P.push(...c); return o; };
const SKY = add(gradient(["#3a78c0", "#6aa2dc", "#a4ccec", "#d8ecf8"], 8));
const CLOUD = add(["#e4eef6", "#ffffff"]);
const SEA = add(gradient(["#0a2a50", "#104070", "#185890", "#2270a8", "#3a8cc0", "#5aa8d4", "#84c4e4"], 14));
const BACK = add(gradient(["#06080e", "#0e1420", "#182232", "#243248", "#36485e"], 8));
const BELLY = add(gradient(["#7a8ea4", "#a4b6c8", "#cad8e4"], 4));
const FOAM = add(["#bfe4f4", "#ffffff"]);
const EYE = add(["#05080e"]);

const meta = {
  slug: "swimming-whale",
  name: "Swimming Whale",
  category: "animals",
  note: "A humpback whale glides beneath the waves through shafts of light, rising now and then to blow a spout.",
  tags: ["whale", "ocean", "sea", "underwater", "hero", "wallpaper"],
  cols: 100, rows: 34, fps: 24,
  palette: palette(P),
};

const SH = " ░▒▓█";
const CYCLE = 12;

function create() {
  const { cols, rows } = meta;
  const g = new Grid(cols, rows);
  const surf = 8;
  const r = rng(17);
  const motes = Array.from({ length: 70 }, () => [r() * cols, surf + 1 + r() * (rows - surf - 1), 0.5 + r() * 2, r() < 0.15]);
  const spout = Array.from({ length: 60 }, () => [r() - 0.5, r(), 0.6 + r() * 0.6]);
  const L = 56;
  return (t) => {
    g.clear();
    const p = (t % CYCLE) / CYCLE;
    const rise = smooth(clamp((p - 0.35) / 0.2)) * (1 - smooth(clamp((p - 0.75) / 0.2)));
    const wy = 21 - rise * 9.2 + Math.sin(t * 0.8) * 0.6;
    const hx = 72 + Math.sin(t * 0.3) * 4;
    for (let y = 0; y < surf; y++) for (let x = 0; x < cols; x++) {
      const c = fbm(x * 0.04 - t * 0.05, y * 0.3, 3, 4);
      const v = clamp(0.2 + (y / surf) * 0.75);
      if (c > 0.6 && y < surf - 2) g.set(x, y, c > 0.67 ? "█" : "▓", KEYS[CLOUD + (c > 0.65 ? 1 : 0)]);
      else g.set(x, y, SH[1 + Math.min(2, Math.floor(v * 3))], KEYS[SKY + Math.min(7, Math.floor(v * 8))]);
    }
    for (let y = surf; y < rows; y++) for (let x = 0; x < cols; x++) {
      const d = (y - surf) / (rows - surf);
      const ray = Math.sin((x + y * 0.7) * 0.16 - t * 0.25) > 0.75 ? 0.12 * (1 - d) : 0;
      const n = fbm(x * 0.05 + t * 0.15, y * 0.15, 3, 2);
      const v = clamp(0.92 - d * 0.75 + ray + (n - 0.5) * 0.25);
      g.set(x, y, ray > 0.03 ? "▒" : "▓", KEYS[SEA + Math.min(13, Math.floor(v * 14))]);
    }
    for (let x = 0; x < cols; x++) {
      const n = noise2(x * 0.3 + t * 1.2, 1, 3);
      g.set(x, surf, n > 0.6 ? "~" : n > 0.3 ? "≈" : "▀", KEYS[FOAM + (n > 0.6 ? 1 : 0)]);
    }
    for (const [mx, my, sp, big] of motes) {
      let x = (mx - t * sp * 2.2) % cols; if (x < 0) x += cols;
      g.set(x, my, big ? "o" : "·", KEYS[big ? FOAM : SEA + 12]);
    }
    const yc = (s) => wy + Math.sin(s * 3.2 - t * 2.4) * s * s * 2.2 + rise * s * 2.5;
    const half = (s) => s < 0.1 ? 1.8 + 3.4 * Math.sqrt(s / 0.1) : s < 0.42 ? 5.2 : 5.2 * Math.pow(1 - (s - 0.42) / 0.58, 1.3) + 0.45 + (s > 0.6 && s < 0.66 ? 0.8 : 0);
    const finA = Math.sin(t * 1.3) * 0.25;
    const finFront = () => { for (let k = 0; k <= 16; k++) {
      const fx = hx - L * 0.22 - k * 1.1, fy = yc(0.22) + 3.5 + k * 0.5 + Math.sin(finA) * k * 0.2;
      const w = k < 12 ? 2 : 1;
      for (let q = 0; q <= w; q++) g.set(fx + q, fy, "█", KEYS[BELLY + (q ? 2 : 1)]);
      if (k % 4 === 2) g.set(fx, fy + 1, "▀", KEYS[BELLY + 3]);
    } };
    for (let x = Math.floor(hx - L); x <= hx + 1; x++) {
      const s = (hx - x) / L;
      if (s < 0 || s > 1) continue;
      const c = yc(s), h = half(s);
      for (let y = Math.floor(c - h); y <= c + h; y++) {
        const rel = (y - c) / h;
        if (Math.abs(rel) > 1) continue;
        if (rel > 0.25) {
          const groove = s < 0.5 && Math.round(y) % 2 === 0;
          g.set(x, y, groove ? "▄" : "█", KEYS[BELLY + Math.min(3, Math.floor((rel - 0.25) * 3) + (groove ? 0 : 1))]);
        } else {
          const n = noise2(x * 0.4, y * 0.7, 6);
          const lit = clamp(0.55 - rel * 0.35 + (n - 0.5) * 0.3 - (rel < -0.8 ? 0.15 : 0) + (y < surf ? 0.3 : 0));
          g.set(x, y, n > 0.82 ? "▒" : "█", KEYS[BACK + Math.min(7, Math.floor(lit * 8))]);
        }
      }
      if (s < 0.2) g.set(x, Math.round(c + h * 0.3), "▀", KEYS[BACK]);
    }
    finFront();
    g.set(hx - L * 0.13, Math.round(yc(0.13) + 0.5), "●", KEYS[EYE]);
    for (let k = 0; k < 6; k++) g.set(hx - 1 - k * 1.6, Math.round(yc(0.02 + k * 0.03) - half(0.02 + k * 0.03) + 0.4), "▪", KEYS[BACK + 5]);
    const tx = hx - L, ty = yc(1);
    const flap = Math.sin(t * 2.4 - 3.2) * 1.5;
    for (let k = 0; k <= 11; k++) {
      const yy = ty + flap * k / 11;
      const th = k < 2 ? 1 : k < 9 ? 1.6 : 0.6;
      for (let q = -th; q <= th; q += 1) g.set(tx - k, yy + q * 0.6, Math.abs(q) >= th - 0.1 ? "▓" : "█", KEYS[BACK + (q < 0 ? 4 : 2)]);
    }
    g.set(tx - 6, ty + flap * 6 / 11, "▒", KEYS[BACK + 1]);
    if (rise > 0.6) {
      const bx = hx - L * 0.12, by = yc(0.12) - half(0.12);
      const amt = clamp((rise - 0.6) / 0.4);
      for (const [sx, ph, sp] of spout) {
        const a = (t * sp * 1.4 + ph) % 1;
        const h = a * 8 * amt;
        const x = bx + sx * (2 + a * 12) * amt;
        const y = Math.min(by, surf) - h + a * a * 3;
        if (y < -1) continue;
        g.set(x, y, a < 0.4 ? "█" : a < 0.7 ? "▓" : "░", KEYS[FOAM + (a < 0.6 ? 1 : 0)]);
      }
    }
    return g.frame();
  };
}


      return { create: create, meta: meta };
    })();

    // ── 现成作品的播放器 ────────────────────────────────────────────────────
    // frame 长这样：{ text: "行\n行\n行", color: "0a9\nzzz" }。color 里每个字符是
    // palette 的键，palette[键] 才是真颜色。这里按颜色分组批量 fillText，
    // 一帧大约 3400 格、二三十种颜色，比逐格改 fillStyle 快一个量级。
    function paintFrame(ctx2, frame, pal, cw, ch, ox, oy, ink) {
      if (!frame) return;
      const text = typeof frame === 'string' ? frame : frame.text;
      const color = typeof frame === 'string' ? null : frame.color;
      if (!text) return;
      const rows = text.split('\n');
      const crows = color ? color.split('\n') : null;
      const groups = new Map();
      for (let y = 0; y < rows.length; y++) {
        const row = rows[y];
        const crow = crows ? crows[y] : null;
        for (let x = 0; x < row.length; x++) {
          const g = row[x];
          if (g === ' ' || g === '\u3000' || g === '\u00a0') continue;
          let hex = ink;
          if (crow) {
            const k = crow[x];
            if (k && pal && pal[k]) hex = pal[k];
            else if (k === ' ') continue;
          }
          let bucket = groups.get(hex);
          if (!bucket) { bucket = []; groups.set(hex, bucket); }
          bucket.push(x, y, g);
        }
      }
      for (const entry of groups) {
        const hex = entry[0];
        const bucket = entry[1];
        ctx2.fillStyle = hex;
        for (let i = 0; i < bucket.length; i += 3) {
          ctx2.fillText(bucket[i + 2], ox + bucket[i] * cw + cw / 2, oy + bucket[i + 1] * ch + ch / 2);
        }
      }
    }

    // 播放器：按作品自己的 cols/rows/fps 走，等比铺满窗口（裁边不拉伸）。
    // 对外的面子和原来那个引擎一致：resize / destroy / minFrameMs / setCreature，
    // 所以 applyMask 里那套限帧、真停、DPR 的代码一行都不用改。
    function createSceneRunner(canvas, scene) {
      const ctx2 = canvas.getContext('2d');
      const meta = scene.meta;
      const pal = meta.palette || {};
      const step = scene.create();
      const cellAspect = meta.cell === 'square' ? 1 : 1 / 0.602;
      const self = {
        minFrameMs: 1000 / (meta.fps || 24),
        setCreature() { /* 现成作品模式下没有生物切换，占位以免按钮报错 */ },
      };
      const started = performance.now();
      let raf = 0;
      let lastPaint = 0;
      let disposed = false;
      let cw = 10;
      let ch = 16.6;
      let ox = 0;
      let oy = 0;
      let dpr = 1;
      let W = 0;
      let H = 0;

      function resize() {
        const r = canvas.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return;
        W = r.width;
        H = r.height;
        dpr = Math.min(window.devicePixelRatio || 1, window.__DSH_SHARKS_DPR__ || 1);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
        cw = Math.max(W / meta.cols, H / (meta.rows * cellAspect));
        ch = cw * cellAspect;
        ox = (W - meta.cols * cw) / 2;
        oy = (H - meta.rows * ch) / 2;
        ctx2.font = '600 ' + Math.round(cw / 0.602) + 'px ' + getComputedStyle(canvas).fontFamily;
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        lastPaint = 0;
      }
      self.resize = resize;

      function render(ts) {
        if (!W) return;
        ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx2.clearRect(0, 0, W, H);
        let frame = null;
        try { frame = step((ts - started) / 1000); } catch (error) { frame = null; }
        paintFrame(ctx2, frame, pal, cw, ch, ox, oy, 'canvastext');
      }

      function loop(ts) {
        if (disposed) return;
        if (ts - lastPaint >= self.minFrameMs) {
          lastPaint = ts;
          render(ts);
        }
        raf = requestAnimationFrame(loop);
      }
      function start() {
        if (raf || disposed) return;
        raf = requestAnimationFrame(loop);
      }
      function stop() {
        if (!raf) return;
        cancelAnimationFrame(raf);
        raf = 0;
      }

      let io = null;
      try {
        io = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) start(); else stop();
        });
        io.observe(canvas);
      } catch (error) { io = null; }

      let ro = null;
      try {
        ro = new ResizeObserver(function () { resize(); });
        ro.observe(canvas);
      } catch (error) { ro = null; }

      const motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
      function onMotion() {
        stop();
        render(started + 4000);
        if (!motion || !motion.matches) start();
      }
      if (motion) {
        try { motion.addEventListener('change', onMotion); } catch (error) { /* 老浏览器 */ }
      }

      self.destroy = function () {
        disposed = true;
        stop();
        if (io) { try { io.disconnect(); } catch (error) {} }
        if (ro) { try { ro.disconnect(); } catch (error) {} }
        if (motion) { try { motion.removeEventListener('change', onMotion); } catch (error) {} }
      };

      resize();
      render(started + 4000);
      if (!motion || !motion.matches) start();
      return self;
    }

    const MASK_DEFAULTS = {
      // fit: 'content' = 跟着 DSH 自己的正文列宽走（推荐）；'window' = 按屏宽比例（试车台那套）
      ellipse: { fit: 'content', hole: 0.20, pad: 40, fade: 0.55, aspect: 0.48, nudge: 0 },
      rect: { fit: 'content', hole: 0.21, pad: 40, fade: 0.30, aspect: 1.50, nudge: 0 },
      // 'auto' = 空白态椭圆 / 有对话竖条；'none' = 不遮罩，全局可见（只有亮度一个旋钮）
      maskMode: 'auto',
      sidebarPad: 50,
      maxHalf: 0.45,
      darkOpacity: 0.32,
      lightOpacity: 0.10,
      showInChat: true,
      // 画帧上限。引擎原本跟着屏幕刷新率跑：240Hz 屏就是每秒 240 次整屏重画
      // （约 7400 个格子 × fillText），这是风扇狂转和页面卡的根源。
      // 试着改：window.__DSH_SHARKS_MASK__.fpsCap = 60 / 24 / 15
      fpsCap: 30,
      // 画布像素密度上限。ASCII 不需要 2x，砍到 1 就少 4 倍像素。
      // 改了会强制重排一次画布（engine.resize），约 0.7s 内生效。
      dpr: 1,
      // 'jellyfish' | 'shark'：背景只放一种大鱼，不混放
      creature: 'whale',
    };

    function Backdrop(ctx) {
      React.useEffect(function () {
        const overlay = document.querySelector('[data-shell-overlay]');
        const frame = overlay && overlay.parentElement;
        if (!frame) return;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('data-dsh-ascii-sharks', '');
        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.cssText =
          'position:absolute;inset:0;display:block;width:100%;height:100%;' +
          'z-index:10;pointer-events:none;mix-blend-mode:screen;' +
          "font-family:'Cascadia Mono','Cascadia Code',ui-monospace,'SF Mono',Menlo,Consolas,monospace;" +
          'filter:saturate(0.85) brightness(1.06);';

        frame.insertBefore(canvas, frame.firstChild);

        let engine = null;
        try {
          if (typeof window.__DSH_ASCII_SHARKS_ENGINE__ !== 'function') {
            throw new Error('ascii-sharks engine was not registered');
          }
          engine = createSceneRunner(canvas, SCENE_WHALE);
        } catch (error) {
          console.error('[dsh-ascii-sharks] engine', error);
        }

        const P = window.__DSH_SHARKS_MASK__ || MASK_DEFAULTS;
        window.__DSH_SHARKS_MASK__ = P;
        const info = window.__DSH_SHARKS_MASK_INFO__ || {};
        window.__DSH_SHARKS_MASK_INFO__ = info;

        // 大鱼切换：水母 / 鲨鱼，一次只放一种
        const CREATURES = [
          { id: 'whale', label: '鲸鱼' },
          { id: 'jellyfish', label: '水母' },
          { id: 'shark', label: '鲨鱼' },
        ];
        try {
          const saved = window.localStorage.getItem('dsh-ascii-sharks.creature');
          for (const c of CREATURES) if (c.id === saved) P.creature = saved;
        } catch (e) { /* 隐私模式下没有 localStorage，忽略 */ }
        window.__DSH_SHARKS_CREATURE__ = P.creature || 'jellyfish';

        const btn = document.createElement('button');
        // 现成作品模式下没有生物可切，先把按钮藏起来；下一步改成作品切换器。
        btn.style.setProperty('display', 'none', 'important');
        btn.type = 'button';
        btn.setAttribute('data-dsh-ascii-sharks-switch', '');
        btn.style.cssText =
          'position:fixed;right:18px;bottom:18px;z-index:2147483000;pointer-events:auto;' +
          'width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.16);' +
          'background:rgba(8,12,18,.55);color:#bcd8ef;font:600 11px/1 ui-monospace,monospace;' +
          'cursor:pointer;opacity:.35;transition:opacity .15s;padding:0;' +
          'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);';
        btn.addEventListener('mouseenter', function () { btn.style.opacity = '1'; });
        btn.addEventListener('mouseleave', function () { btn.style.opacity = '.35'; });
        function syncBtn() {
          let cur = CREATURES[0];
          for (const c of CREATURES) if (c.id === P.creature) cur = c;
          btn.textContent = cur.label;
          btn.title = '背景大鱼：' + cur.label + '（点击切换）';
        }
        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          let i = 0;
          for (let k = 0; k < CREATURES.length; k++) if (CREATURES[k].id === P.creature) i = k;
          const next = CREATURES[(i + 1) % CREATURES.length];
          P.creature = next.id;
          window.__DSH_SHARKS_CREATURE__ = next.id;
          try { window.localStorage.setItem('dsh-ascii-sharks.creature', next.id); } catch (e) {}
          if (engine && engine.setCreature) engine.setCreature(next.id);
          syncBtn();
        });
        syncBtn();
        document.body.appendChild(btn);

        let dark = true;
        let lastMask = '';
        let lastPhase = '';
        let lastMode = '';
        let lastDpr = 0;

        function phaseElement() {
          return document.querySelector('[data-content-phase]')
            || document.querySelector('[data-conversation-content]')
            || null;
        }

        function round(n) { return Math.round(n) + 'px'; }

        // 一次性把 DSH 各个锚点的位置都量出来，写进诊断日志
        function probe() {
          const fr = frame.getBoundingClientRect();
          const out = {};
          const anchors = {
            frame: null,
            phase: '[data-content-phase]',
            region: '[data-conversation-region]',
            scroll: '[data-conversation-scroll]',
            content: '[data-conversation-content]',
            leading: '[data-shell-leading]',
          };
          for (const key in anchors) {
            if (key === 'frame') {
              out[key] = [0, 0, Math.round(fr.width), Math.round(fr.height)];
              continue;
            }
            const node = document.querySelector(anchors[key]);
            if (!node) { out[key] = null; continue; }
            const r = node.getBoundingClientRect();
            out[key] = [
              Math.round(r.left - fr.left),
              Math.round(r.top - fr.top),
              Math.round(r.width),
              Math.round(r.height),
            ];
          }
          return out;
        }

        function applyMask() {
          const fr = frame.getBoundingClientRect();
          const W = fr.width || window.innerWidth || 1;
          const H = fr.height || window.innerHeight || 1;

          const el = phaseElement();
          let phase = 'active';
          if (el) {
            phase = el.getAttribute('data-content-phase')
              || el.getAttribute('data-phase')
              || 'active';
          }
          const hero = phase === 'hero';

          // maskMode: 'auto'（默认）= 空白态椭圆 + 有对话竖条；'none' = 不遮罩，整屏都亮。
          // 运行时切换：DevTools 里写 window.__DSH_SHARKS_MASK__.maskMode = 'none'
          const maskMode = P.maskMode || 'auto';
          const masked = maskMode !== 'none';

          // 省电：帧率上限 + 像素密度上限。两个都是热改的（applyMask 每 0.7s 轮询一次）。
          const fpsCap = P.fpsCap == null ? 30 : P.fpsCap;
          if (engine && fpsCap > 0) {
            const ms = 1000 / fpsCap;
            if (engine.minFrameMs !== ms) engine.minFrameMs = ms;
          }
          const dprWant = P.dpr == null ? 1 : P.dpr;
          window.__DSH_SHARKS_DPR__ = dprWant;
          if (engine && lastDpr !== dprWant) {
            lastDpr = dprWant;
            try { engine.resize(); } catch (error) { /* 重排失败就用旧尺寸 */ }
          }

          // 对话区实际位置：有就量，量不出可信值就退回「侧栏 236px 之右」
          let colLeft = 236;
          let colWidth = Math.max(0, W - 236);
          let cx = W / 2;
          let cy = H * 0.5;
          const p = hero
            ? (P.ellipse || MASK_DEFAULTS.ellipse)
            : (P.rect || MASK_DEFAULTS.rect);

          // 'none' 模式不量正文列，也就绕开了插件对 DSH 布局的所有依赖。
          if (masked) {
            if (el) {
              const r = el.getBoundingClientRect();
              const left = r.left - fr.left;
              if (r.width > 120 && left > -8 && left + r.width < W + 8) {
                colLeft = left;
                colWidth = r.width;
              }
            }
            cx = colLeft + colWidth / 2 + (p.nudge || 0);
          }

          let textW = 0;
          let cardW = 0;
          let hw = 0;
          let hh = 0;
          let oh = 0;
          if (masked) {
            // DSH 自己的两个宽度常量（抄自它的样式表，不是猜的）：
            //   正文列 --dsh-chat-content-width     = min(100% - 32px, 920px)
            //   输入卡 --dsh-composer-card-max-width = min(100% - 16px, 952px)
            textW = Math.min(Math.max(0, colWidth - 32), 920);
            cardW = Math.min(Math.max(0, colWidth - 16), 952);
            const pad = p.pad == null ? 40 : p.pad;
            const contentHalf = (hero ? cardW : textW) / 2 + pad;
            const windowHalf = W * (p.hole == null ? 0.21 : p.hole);
            const maxHalf = W * (P.maxHalf == null ? 0.45 : P.maxHalf);
            hw = Math.min(
              p.fit === 'window' ? windowHalf : Math.max(contentHalf, 120),
              maxHalf
            );
            hh = hw * p.aspect;
            oh = hw * (1 + p.fade);
          }

          const layers = [];

          // 1) 侧栏：左边不放鱼
          if (masked && colLeft > 8) {
            const sidebarPad = P.sidebarPad == null ? 50 : P.sidebarPad;
            const fadeStart = Math.max(0, Math.round(colLeft));
            const fadeEnd = Math.round(Math.max(fadeStart + 1, colLeft + sidebarPad));
            layers.push(
              'linear-gradient(90deg,transparent 0,' + round(fadeStart) +
              ',#000 ' + round(fadeEnd) + ')'
            );
          }

          // 2) 形状
          if (masked && hero) {
            layers.push(
              'radial-gradient(ellipse ' + round(oh) + ' ' + round(hh * (1 + p.fade)) +
              ' at ' + round(cx) + ' ' + round(cy) +
              ',transparent 0,transparent ' + round(hw) + ',#000 100%)'
            );
          } else if (masked) {
            layers.push(
              'linear-gradient(90deg,#000 0,#000 ' + round(cx - oh) +
              ',transparent ' + round(cx - hw) + ',transparent ' + round(cx + hw) +
              ',#000 ' + round(cx + oh) + ',#000 100%)'
            );
          }

          const value = masked ? layers.join(',') : 'none';
          if (value !== lastMask) {
            lastMask = value;
            canvas.style.maskImage = masked ? value : 'none';
            canvas.style.webkitMaskImage = masked ? value : 'none';
            canvas.style.maskComposite = masked ? 'intersect' : 'add';
            canvas.style.webkitMaskComposite = masked ? 'source-in' : 'source-over';
          }

          // shown=false 时真停，而不是把透明度调 0：canvas 设成 display:none，
          // 引擎自带的 IntersectionObserver 会判定它不可见并停止排帧，不用另写暂停逻辑。
          const shown = hero || P.showInChat !== false;
          const nextDisplay = shown ? 'block' : 'none';
          if (canvas.style.display !== nextDisplay) canvas.style.display = nextDisplay;
          const op = shown ? (dark ? P.darkOpacity : P.lightOpacity) : 0;
          if (String(op) !== canvas.style.opacity) canvas.style.opacity = String(op);

          info.maskMode = maskMode;
          info.fpsCap = fpsCap;
          info.dpr = dprWant;
          info.shape = !masked ? 'none' : (hero ? 'ellipse' : 'rect');
          info.phase = phase;
          info.shown = shown;
          info.W = Math.round(W);
          info.H = Math.round(H);
          info.colLeft = Math.round(colLeft);
          info.colWidth = Math.round(colWidth);
          info.textW = Math.round(textW);
          info.cardW = Math.round(cardW);
          info.cx = Math.round(cx);
          info.hw = Math.round(hw);
          info.hh = Math.round(hh);
          info.oh = Math.round(oh);

          // 诊断：进渲染进程控制台，也会落进 DSH 的崩溃日志，方便离线核对
          if (phase !== lastPhase || maskMode !== lastMode) {
            const first = lastPhase === '';
            lastPhase = phase;
            lastMode = maskMode;
            console.error('[dsh-ascii-sharks][diag] ' + JSON.stringify({
              phase: phase, shape: info.shape, first: first, fit: p.fit,
              maskMode: maskMode,
              W: info.W, H: info.H, colLeft: info.colLeft, colWidth: info.colWidth,
              textW: info.textW, cardW: info.cardW,
              cx: info.cx, hw: info.hw, hh: info.hh, oh: info.oh,
              anchor: probe(),
            }));
          }
        }

        function applyScheme(snapshot) {
          dark = snapshot && snapshot.active
            ? snapshot.active.colorScheme === 'dark'
            : true;
          applyMask();
        }

        try { applyMask(); } catch (error) {
          console.error('[dsh-ascii-sharks] mask', error);
        }
        applyScheme(ctx.theme.getTheme());
        if (engine && engine.setCreature) engine.setCreature(P.creature || 'jellyfish');

        let offTheme = null;
        try { offTheme = ctx.on('theme/change', applyScheme); } catch {}

        let raf = 0;
        function schedule() {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            raf = 0;
            try { applyMask(); } catch (error) { /* 一次量错不该影响界面 */ }
          });
        }

        window.addEventListener('resize', schedule);
        const mutation = new MutationObserver(schedule);
        try {
          mutation.observe(document.body, {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-content-phase', 'data-phase'],
          });
        } catch {}
        const poll = setInterval(schedule, 700);

        return function () {
          if (offTheme) offTheme();
          window.removeEventListener('resize', schedule);
          mutation.disconnect();
          clearInterval(poll);
          if (raf) cancelAnimationFrame(raf);
          if (engine) engine.destroy();
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          if (btn.parentNode) btn.parentNode.removeChild(btn);
        };
      }, []);

      return null;
    }

    return {
      inject: ['slots', 'theme'],
      apply(ctx) {
        try {
          ctx.slots.inject('shell.overlay', function () {
            return ctx.slots.register({
              name: 'shell.overlay',
              id: 'ascii-sharks',
              order: -100,
            }, function () { return Backdrop(ctx); });
          });
        } catch (error) {
          console.error('[dsh-ascii-sharks] slot', error);
        }
      },
    };
  },
});
