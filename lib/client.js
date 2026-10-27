window.__ModuleLoader__.load({
  id: 'dsh-ascii-sharks',
  factory(require) {
    const React = require('react');

    // ── ascii-sharks 引擎（内联区，别手改）─────────────────────────────────
    // 上游：stackedlol/ascii-sharks（MIT，Copyright (c) 2026 drewdi）。源码快照
    // 取自 dsh-ascii-whales 0.1.5 的 vendor/ascii-sharks/，放在本仓库 vendor/ 下。
    // 改源码 → 跑 node scripts/build-engine.mjs 重编，产物替换下面 @engine 标记
    // 之间那一行。以前这里是上游的压缩产物（29204 字符），我们只能在外壳做文章。
    // 我方对引擎只加了两处补丁（都在 vendor/ascii-sharks/engine.ts 里，带
    // 「[dsh-ascii-sharks 补]」注释）：
    //   ① dpr 上限改读 window.__DSH_SHARKS_DPR__（上游硬编码 min(dpr, 2)）
    //   ② minFrameMs 画帧上限（上游每个 rAF 都重绘，240Hz 屏上就是每秒 240 次）
                // @engine:start
(()=>{var Se=Object.defineProperty;var Ae=(o,t,i)=>t in o?Se(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var g=(o,t,i)=>Ae(o,typeof t!="symbol"?t+"":t,i);function At(o,t){let i=Math.max(1,Math.round(8*o)),e=Math.round(i*1.45),s=Math.max(4,Math.round(Math.sqrt(i*e)));return t?[s,s]:[i,e]}var bt=Math.PI*2,H=(o,t,i)=>o<t?t:o>i?i:o,$=(o,t)=>o+Math.random()*(t-o),jt=(o,t)=>Math.floor($(o,t+1));function st(o,t,i){let e=H((i-o)/(t-o),0,1);return e*e*(3-2*e)}function Rt(o,t){let i=(t-o)%bt;return i>Math.PI&&(i-=bt),i<-Math.PI&&(i+=bt),i}function dt(o,t,i){let e=Math.imul(o|0,374761393)^Math.imul(t|0,668265263)^Math.imul(i|0,1442695041);return e=Math.imul(e^e>>>13,1274126177),e^=e>>>16,(e>>>0)/4294967296}var ce=1/260,le=1/310,Yt=1/190,fe=3400;function ue(o,t,i,e){let s=o*ce+i*.07,n=t*le-i*.05,r=(o+t)*Yt+i*.11;return e.x=(-le*Math.sin(s)*Math.sin(n)+.5*Yt*Math.cos(r))*fe,e.y=(-ce*Math.cos(s)*Math.cos(n)-.5*Yt*Math.cos(r))*fe,e}var ct=[{name:"sardine",cruise:36,maxSpeed:64,minSpeed:18,weight:3,schoolSize:[18,28],spacing:[1.8,1.1],align:1.6,cohesion:1.6,jitter:40,mill:70,verticalDrag:.5},{name:"anchovy",cruise:46,maxSpeed:78,minSpeed:22,weight:3,schoolSize:[20,32],spacing:[1.5,1],align:3.2,cohesion:.45,jitter:30,mill:0,verticalDrag:1.4},{name:"silverside",cruise:40,maxSpeed:70,minSpeed:20,weight:3,schoolSize:[12,20],spacing:[2,1.1],align:2.4,cohesion:1.1,jitter:35,mill:0,verticalDrag:1.6},{name:"mackerel",cruise:32,maxSpeed:60,minSpeed:16,weight:2,schoolSize:[5,9],spacing:[2.6,1.3],align:2,cohesion:.9,jitter:25,mill:0,verticalDrag:2},{name:"goby",cruise:26,maxSpeed:56,minSpeed:10,weight:1,schoolSize:[8,12],spacing:[1.4,1.1],align:.35,cohesion:1.4,jitter:110,mill:0,verticalDrag:.3}],Fe=ct.reduce((o,t)=>o+t.weight,0);function Xt(){let o=Math.random()*Fe;for(let t=0;t<ct.length;t++)if(o-=ct[t].weight,o<=0)return t;return 0}var W=20,Ie=[{kind:"classic",size:1},{kind:"classic",size:.7},{kind:"classic",size:.84},{kind:"classic",size:.77}],pe=420,Ee=1.4,Te=1,zt=1100,Pe=-.6,Ft=class{constructor(t=Ie,i){this.sharkSpecs=t;this.fishCount=i;g(this,"turnAgility",1);g(this,"tailFrequency",1);g(this,"width",0);g(this,"height",0);g(this,"time",0);g(this,"fish",[]);g(this,"sharks",[]);g(this,"events",[]);g(this,"pointer",{x:0,y:0,active:!1});g(this,"perception",60);g(this,"sepX",[]);g(this,"sepY",[]);g(this,"foreignSep",40);g(this,"bucketCols",0);g(this,"bucketRows",0);g(this,"bucketHead",new Int32Array(0));g(this,"bucketCount",new Uint16Array(0));g(this,"bucketNext",new Int32Array(0));g(this,"lastSpawn",0);g(this,"tmp",{x:0,y:0})}resize(t,i,e,s){let n=this.width===0;if(this.width=t,this.height=i,this.sepX=ct.map(r=>r.spacing[0]*e),this.sepY=ct.map(r=>r.spacing[1]*s),this.perception=Math.max(s*3,e*5.5),this.foreignSep=e*3,n||this.fish.length===0){this.seed();return}for(let r of this.fish)r.x=H(r.x,0,t),r.y=H(r.y,0,i)}seed(){let{width:t,height:i}=this,e=Math.min(t,i),s=H(e*.44,170,430),n=this.sharkSpecs.length;this.sharks=[];for(let a=0;a<n;a++){let{kind:c,size:h}=this.sharkSpecs[a],l=s*h,m=e*$(.28,.4),f=a/n*bt+$(-.4,.4),d=a%2===0?1:-1,b=t/2+Math.cos(f)*m*(t/e)*.9,p=i/2+Math.sin(f)*m,M=f+d*Math.PI/2,I=new Float32Array(W*2),P=l/(W-1);for(let C=0;C<W;C++)I[C*2]=b-Math.cos(M)*P*C,I[C*2+1]=p-Math.sin(M)*P*C;this.sharks.push({id:a+1,kind:c,length:l,nodes:I,heading:M,speed:30,phase:$(0,bt),turn:0,hunger:$(.25,.75),wander:0,orbitDir:d,orbitRadius:m,target:null,retargetAt:0,depth:h})}this.sharks.sort((a,c)=>a.length-c.length);let r=this.fishCount??H(Math.round(t*i/4400),85,340);for(this.fish=[];this.fish.length<r;){let a=Xt(),c=ct[a],h=Math.min(jt(c.schoolSize[0],c.schoolSize[1]),r-this.fish.length),l=Math.random()<.5?1:-1,m=$(t*.06,t*.94),f=$(i*.08,i*.92),d=(Math.random()<.5?0:Math.PI)+$(-.5,.5);for(let b=0;b<h;b++)this.fish.push({x:m+$(-1,1)*this.sepX[a]*Math.sqrt(h),y:f+$(-1,1)*this.sepY[a]*Math.sqrt(h)*.6,vx:Math.cos(d)*c.cruise,vy:Math.sin(d)*c.cruise,species:a,alarm:0,alive:!0,respawnAt:0,phase:$(0,bt),turn:0,depth:$(.55,1),millDir:l})}this.bucketNext=new Int32Array(this.fish.length)}splash(t,i){this.events.push({kind:"splash",x:t,y:i});let e=240;for(let s of this.fish){if(!s.alive)continue;let n=s.x-t,r=s.y-i,a=Math.hypot(n,r);if(a>e||a<.001)continue;let c=(1-a/e)*260;s.vx+=n/a*c,s.vy+=r/a*c,s.alarm=1}}step(t,i=t){this.time+=t,this.rebuildHash(),this.stepFish(t),this.stepSharks(t,i),this.respawn()}rebuildHash(){let t=this.perception,i=2;this.bucketCols=Math.ceil(this.width/t)+i*2,this.bucketRows=Math.ceil(this.height/t)+i*2;let e=this.bucketCols*this.bucketRows;this.bucketHead.length!==e&&(this.bucketHead=new Int32Array(e),this.bucketCount=new Uint16Array(e)),this.bucketHead.fill(-1),this.bucketCount.fill(0),this.bucketNext.length!==this.fish.length&&(this.bucketNext=new Int32Array(this.fish.length));for(let s=0;s<this.fish.length;s++){let n=this.fish[s];if(!n.alive)continue;let r=this.bucketOf(n.x,n.y);this.bucketNext[s]=this.bucketHead[r],this.bucketHead[r]=s,this.bucketCount[r]++}}bucketOf(t,i){let e=this.perception,s=H(Math.floor(t/e)+2,0,this.bucketCols-1);return H(Math.floor(i/e)+2,0,this.bucketRows-1)*this.bucketCols+s}stepFish(t){let{fish:i,sharks:e,pointer:s,width:n,height:r,time:a}=this,c=this.perception,h=c*c,l=this.foreignSep,m=this.perception,f=this.bucketCols,d=this.bucketRows,b=this.bucketHead,p=this.bucketNext,M=this.tmp,I=Math.exp(-t*.7),P=Math.min(1,t*6);for(let C=0;C<i.length;C++){let u=i[C];if(!u.alive)continue;let v=ct[u.species],N=1+1.8*u.alarm,Y=this.sepX[u.species]*N,S=this.sepY[u.species]*N,z=Math.hypot(u.vx,u.vy)||1,A=u.vx/z,F=u.vy/z,y=0,x=0,R=0,_=0,q=0,E=0,D=0,T=0,w=0,G=0,k=H(Math.floor(u.x/m)+2,0,f-1),K=H(Math.floor(u.y/m)+2,0,d-1);for(let B=Math.max(0,K-1);B<=Math.min(d-1,K+1);B++)for(let L=Math.max(0,k-1);L<=Math.min(f-1,k+1);L++){let j=b[B*f+L];for(;j!==-1;){if(j!==C){let O=i[j],X=O.x-u.x,V=O.y-u.y,Z=X*X+V*V;if(Z<h&&Z>1e-6){let it=Math.sqrt(Z);if((X*A+V*F)/it>Pe){let ut=X/Y,wt=V/S,St=ut*ut+wt*wt;if(St<1){let pt=Math.sqrt(St)||.001,gt=(1-pt)/pt;R-=ut*gt,_-=wt*gt}if(O.species===u.species)q+=O.vx,E+=O.vy,D+=X,T+=V,w++;else if(it<l){let pt=(1-it/l)/it*.6;R-=X*pt,_-=V*pt}O.alarm>G&&(G=O.alarm)}}}j=p[j]}}if(y+=R*pe,x+=_*pe,w>0){let B=Ee*v.align,L=Te*v.cohesion*(1-.8*u.alarm);if(y+=(q/w-u.vx)*B+D/w*L,x+=(E/w-u.vy)*B+T/w*L,v.mill>0){let j=Math.hypot(D,T)||1;y+=-T/j*u.millDir*v.mill*(1-u.alarm),x+=D/j*u.millDir*v.mill*(1-u.alarm)}}let J=0;for(let B of e){let L=B.length*.6+60,j=1/0,O=0,X=0;for(let gt=0;gt<=12;gt+=3){let ae=B.nodes[gt*2],he=B.nodes[gt*2+1],oe=(u.x-ae)**2+(u.y-he)**2;oe<j&&(j=oe,O=ae,X=he)}let V=Math.sqrt(j);if(V>=L||V<.001)continue;let Z=1-V/L;Z*=Z;let it=(u.x-O)/V,ut=(u.y-X)/V,wt=Math.cos(B.heading),St=Math.sin(B.heading),pt=wt*(u.y-B.nodes[1])-St*(u.x-B.nodes[0])>=0?1:-1;y+=(it*.7-St*pt*.9)*zt*Z,x+=(ut*.7+wt*pt*.9)*zt*Z,J=Math.max(J,Math.sqrt(Z))}if(s.active){let L=u.x-s.x,j=u.y-s.y,O=Math.hypot(L,j);if(O<130&&O>.001){let X=(1-O/130)**2;y+=L/O*zt*X,x+=j/O*zt*X,J=Math.max(J,Math.sqrt(X)*.8)}}let rt=Math.max(u.alarm*I,J),at=G*.86;at>rt&&(rt+=(at-rt)*P),u.alarm=rt;let U=36;u.x<U?y+=(U-u.x)*7:u.x>n-U&&(y-=(u.x-(n-U))*7),u.y<U?x+=(U-u.y)*7:u.y>r-U&&(x-=(u.y-(r-U))*7),ue(u.x,u.y,a,M),y+=M.x*.5+(Math.random()-.5)*v.jitter,x+=M.y*.5+(Math.random()-.5)*v.jitter,x-=u.vy*v.verticalDrag*(1-.7*u.alarm);let mt=v.cruise*(1+1.3*u.alarm);y+=(mt-z)*A*1.6,x+=(mt-z)*F*1.6;let Q=Math.atan2(u.vy,u.vx);u.vx+=y*t,u.vy+=x*t;let tt=v.maxSpeed*(1+1.8*u.alarm),et=Math.hypot(u.vx,u.vy);et>tt?(u.vx*=tt/et,u.vy*=tt/et):et<v.minSpeed&&et>.001&&(u.vx*=v.minSpeed/et,u.vy*=v.minSpeed/et),u.turn+=(Rt(Q,Math.atan2(u.vy,u.vx))/t-u.turn)*Math.min(1,t*8),u.phase+=t*(7+Math.hypot(u.vx,u.vy)*.12),u.x=H(u.x+u.vx*t,-60,n+60),u.y=H(u.y+u.vy*t,-60,r+60)}}stepSharks(t,i){let{sharks:e,width:s,height:n,time:r}=this,a=Math.min(s,n),c=s/2,h=n/2;for(let l of e){let m=l.length,f=l.nodes,d=f[0],b=f[1];l.hunger=Math.min(1,l.hunger+t*.03);let p=Math.cos(l.heading),M=Math.sin(l.heading);l.wander=H(l.wander+(Math.random()-.5)*t*3.2,-1.1,1.1),p+=Math.cos(l.heading+l.wander)*.45,M+=Math.sin(l.heading+l.wander)*.45,r>=l.retargetAt&&(l.target=this.findPrey(l),l.retargetAt=r+.45);let I=l.target,P=!1,C=0;if(I&&I.alive&&l.hunger>.3){let E=I.x+I.vx*.35-d,D=I.y+I.vy*.35-b,T=Math.hypot(E,D)||1,w=1.4+2.6*l.hunger;p+=E/T*w,M+=D/T*w,P=!0,C=H(1-T/(m*.9),0,1)}else{let E=(d-c)/(s/a),D=b-h,T=Math.hypot(E,D)||1,w=l.orbitRadius*(1+.15*Math.sin(r*.05+l.id)),G=H((w-T)/w,-1,1);p+=(-D/T*l.orbitDir+E/T*G*.9)*.55,M+=(E/T*l.orbitDir+D/T*G*.9)*.55}for(let E of e)if(E!==l)for(let D=0;D<W;D+=4){let T=d-E.nodes[D*2],w=b-E.nodes[D*2+1],G=Math.hypot(T,w),k=(m+E.length)*.45;if(G<k&&G>.001){let K=(1-G/k)*3;p+=T/G*K,M+=w/G*K}}let u=(d-c)/(s*.3),v=(b-h)/(n*.16),N=u*u+v*v;if(N<1){let E=Math.sqrt(N)||.001,D=(1-E)*(P?1:2.5);p+=u/E*D,M+=v/E*D}let Y=Math.max(-d,d-s,-b,b-n);if(Y>-m*.05){let E=H((Y+m*.05)/(m*.35),0,1)*3.5,D=c-d,T=h-b,w=Math.hypot(D,T)||1;p+=D/w*E,M+=T/w*E}let S=Math.atan2(M,p),A=Math.min(P?1.7+C:.8,l.speed/(m*.22))*this.turnAgility*t,F=H(Rt(l.heading,S),-A,A);l.heading+=F,l.turn+=(F/t-l.turn)*Math.min(1,t*3);let y=30+m*.04,x=P?y*(1.45+C*1.5):y;l.speed+=(x-l.speed)*Math.min(1,t*1.1),l.phase+=i*this.tailFrequency*(2+(30+m*.04)/24),f[0]+=Math.cos(l.heading)*l.speed*t,f[1]+=Math.sin(l.heading)*l.speed*t;let R=m/(W-1),_=.16*this.turnAgility,q=l.heading+Math.PI;for(let E=1;E<W;E++){let D=f[(E-1)*2],T=f[(E-1)*2+1],w=Math.atan2(f[E*2+1]-T,f[E*2]-D);w=q+H(Rt(q,w),-_,_),f[E*2]=D+Math.cos(w)*R,f[E*2+1]=T+Math.sin(w)*R,q=w}if(l.hunger>.15){let E=m*.05+8,D=f[0],T=f[1];for(let w of this.fish)w.alive&&(w.x-D)**2+(w.y-T)**2<E*E&&(w.alive=!1,w.respawnAt=r+$(3,8),l.hunger=Math.max(0,l.hunger-.16),this.events.push({kind:"eat",x:w.x,y:w.y}))}}}findPrey(t){let i=t.length*.9+160,e=t.nodes[0],s=t.nodes[1],n=Math.cos(t.heading),r=Math.sin(t.heading),a=null,c=1/0,h=1/0;for(let l of this.fish){if(!l.alive)continue;let m=l.x-e,f=l.y-s,d=Math.hypot(m,f);if(d>i||d<.001)continue;let b=(m*n+f*r)/d;if(b<.2)continue;let p=this.bucketCount[this.bucketOf(l.x,l.y)],M=d*(1+(1-b)*.8)*(1+p*.07);M<c&&(c=M,a=l),l===t.target&&(h=M)}return t.target&&h<c*1.3?t.target:a}respawn(){let{time:t,width:i,height:e}=this,s=[];for(let d of this.fish)!d.alive&&d.respawnAt<=t&&s.push(d);if(s.length===0||s.length<6&&t-this.lastSpawn<9)return;this.lastSpawn=t;let n=jt(0,3),r=$(.15,.85),a=n===0?-20:n===1?i+20:r*i,c=n===2?-20:n===3?e+20:r*e,h=Math.atan2(e/2-c,i/2-a)+$(-.5,.5),l=Xt(),m=ct[l],f=Math.random()<.5?1:-1;for(let d of s.slice(0,m.schoolSize[1]))d.alive=!0,d.species=l,d.alarm=0,d.turn=0,d.millDir=f,d.x=a+$(-1,1)*this.perception,d.y=c+$(-1,1)*this.perception,d.vx=Math.cos(h)*m.cruise*1.4,d.vy=Math.sin(h)*m.cruise*1.4}};var lt={halfWidth:o=>o<.12?.115*Math.pow(Math.sin(o/.12*Math.PI/2),.45):o<.35?.115+.02*Math.sin((o-.12)/.23*Math.PI):o<.87?.018+.097*Math.pow(1-(o-.35)/.52,1.1):.018*(1-(o-.87)/.13),pectoral:[.25,.36,.41,.32],falcate:!1,pelvic:[0,0,0,0],caudal:.22,dorsal:[.6,.65],secondDorsal:[0,0],eye:[.1,.13],gills:[0,0],tint:[.92,.96,1.08]},ht={...lt,halfWidth:o=>o<.14?.15*Math.pow(Math.sin(o/.14*Math.PI/2),.35):o<.38?.15+.012*Math.sin((o-.14)/.24*Math.PI):o<.88?.018+.132*Math.pow(1-(o-.38)/.5,1.3):.018*(1-(o-.88)/.12),pectoral:[.25,.47,.43,.23],dorsal:[.43,.55],tint:[.99,1,1.02]};function Ct(o,t){return((o-.205)/.067)**2+((t-.75)/.22)**2<1||((o-.68)/.12)**2+((t-.88)/.26)**2<1}function Ht(o,t,i){let e=t/i;return e>=0&&e<=1&&((o-(.31+.1*e))/.085)**2+((e-.48)/.52)**2<=1}function Wt(o,t,i){let e=t/i;if(e<0||e>1)return!1;let s=.29+.12*e-.04*Math.sin(Math.PI*e),n=1-.2*Math.exp(-(((e-.43)/.14)**2)),r=.05*(1-.5*e)*Math.sqrt(1-e**6)*n;return Math.abs(o-s)<=r}function _t(o,t){let i=t/.22;if(i<0||i>1)return!1;let e=.86+.12*i**1.7,s=.945+.035*i+.028*Math.sin(Math.PI*i);return o>=e&&o<=s}var ft=6,It=[.28,.42,.58,.74,.9],Nt=[[48,52,235],[52,205,60],[228,50,44],[190,212,255],[110,230,255]],De=[1,1,1,1,1],de=Nt.length-1,Re=["#e0892c","#e03a32","#b44ae0","#33c8cc","#3cb54a","#3150e8","#d9c14a"],me={ascii:{skin:":;t%SX8#@",fin:"%;tS:",ridge:"@8%",edgeHeavy:":;",edgeLight:".',`",mark:"#%@",eye:"o",fish:"-"},hanzi:{skin:"水川汐沙浪海潮鲸深",fin:"鳍",ridge:"鳍",edgeHeavy:"丿丨",edgeLight:"丶一",mark:"鲸海潮",eye:"目",fish:"鱼鲤鲭鲱"}},Vt=1,ge=2,Kt=3,Jt=4,yt=5,Lt=6,Qt=7,Zt=[.25,.3,.75,.3,.25,.72,.75,.72];function te(o){if(o<.13)return .09*Math.pow(Math.sin(o/.13*Math.PI/2),.95);if(o<.3)return .09+.016*st(.13,.3,o);if(o<.84)return .019+.087*Math.pow(1-(o-.3)/.54,1.25);let t=(o-.84)/.16;return .019*(1-t)+.012*Math.sin(t*Math.PI)}var Mt={whale:lt,orca:ht,classic:{halfWidth:te,pectoral:[.15,.43,.55,.26],falcate:!0,pelvic:[.57,.65,.69,.085],caudal:.085,dorsal:[.33,.47],secondDorsal:[.71,.76],eye:[.1,.14],gills:[.19,.29],tint:[.92,.97,1.05]},hammerhead:{halfWidth:o=>o<.06?.045:o<.3?.045+.061*st(.06,.3,o):te(o)*.92,head:{span:.17,sweep:.035,depth:.09,notch:0},pectoral:[.17,.4,.5,.22],falcate:!0,pelvic:[.56,.63,.67,.075],caudal:.11,dorsal:[.28,.44],secondDorsal:[.7,.74],eye:null,gills:[.16,.26],tint:[.96,.98,.9]},tiger:{halfWidth:o=>{if(o<.13)return .1*Math.pow(Math.sin(o/.13*Math.PI/2),.45);if(o<.3)return .1+.014*st(.13,.3,o);if(o<.84)return .019+.095*Math.pow(1-(o-.3)/.54,1.2);let t=(o-.84)/.16;return .019*(1-t)+.012*Math.sin(t*Math.PI)},pectoral:[.15,.42,.53,.25],falcate:!0,pelvic:[.57,.65,.69,.085],caudal:.095,dorsal:[.33,.46],secondDorsal:[.71,.75],eye:[.08,.12],gills:[.19,.28],tint:[1.02,.95,.84]},zebra:{halfWidth:o=>{if(o<.1)return .075*Math.pow(Math.sin(o/.1*Math.PI/2),.7);if(o<.28)return .075+.025*st(.1,.28,o);if(o<.55)return .022+.078*Math.pow(1-(o-.28)/.27,1.1);let t=(o-.55)/.45;return .022*(1-t*t)+.012*Math.sin(t*Math.PI)},pectoral:[.12,.3,.36,.19],falcate:!1,pelvic:[.42,.48,.51,.065],caudal:0,dorsal:[.36,.44],secondDorsal:[.49,.53],eye:[.06,.09],gills:[.13,.2],tint:[1.08,.97,.74]},greathammer:{halfWidth:o=>o<.05?.04:o<.3?.04+.07*st(.05,.3,o):te(o)*.95,head:{span:.21,sweep:.006,depth:.085,notch:.014},pectoral:[.16,.38,.49,.24],falcate:!0,pelvic:[.55,.62,.67,.085],caudal:.13,dorsal:[.24,.45],secondDorsal:[.68,.74],eye:null,gills:[.15,.25],tint:[.86,.93,1.02]},mako:{halfWidth:o=>{if(o<.17)return .088*Math.pow(Math.sin(o/.17*Math.PI/2),1.5);if(o<.32)return .088+.012*st(.17,.32,o);if(o<.86)return .014+.086*Math.pow(1-(o-.32)/.54,1.45);let t=(o-.86)/.14;return .014*(1-t)+.01*Math.sin(t*Math.PI)},pectoral:[.18,.4,.5,.21],falcate:!0,pelvic:[.58,.64,.68,.06],caudal:.13,dorsal:[.34,.45],secondDorsal:[.76,.79],eye:[.11,.15],gills:[.2,.3],tint:[.78,.9,1.2]},thresher:{halfWidth:o=>{if(o<.08)return .07*Math.pow(Math.sin(o/.08*Math.PI/2),.75);if(o<.2)return .07+.02*st(.08,.2,o);if(o<.48)return .012+.078*Math.pow(1-(o-.2)/.28,1.3);let t=(o-.48)/.52;return .012*(1-t)+.006*Math.sin(t*Math.PI*.9)+.002},pectoral:[.12,.27,.36,.2],falcate:!0,pelvic:[.37,.41,.44,.045],caudal:0,dorsal:[.24,.32],secondDorsal:[.45,.47],eye:[.05,.1],gills:[.11,.18],tint:[1,.9,1.08]},nurse:{halfWidth:o=>{if(o<.08)return .085*Math.pow(Math.sin(o/.08*Math.PI/2),.4);if(o<.3)return .085+.02*st(.08,.3,o);if(o<.72)return .022+.083*Math.pow(1-(o-.3)/.42,1.1);let t=(o-.72)/.28;return .022*(1-t*t)+.014*Math.sin(t*Math.PI)},pectoral:[.16,.34,.4,.17],falcate:!1,pelvic:[.45,.52,.55,.075],caudal:0,dorsal:[.5,.58],secondDorsal:[.63,.69],eye:[.05,.075],gills:[.14,.22],tint:[1.1,.96,.76]}},be=Object.keys(Mt);function Ot(o,t,i,e,s,n,r,a){let c=(o-s)*(e-n)-(i-s)*(t-n),h=(o-r)*(n-a)-(s-r)*(t-a),l=(o-i)*(a-e)-(r-i)*(t-e),m=c<0||h<0||l<0,f=c>0||h>0||l>0;return!(m&&f)}function ye(o,t,i,e,s,n,r=!0,a=.05){if(a!==0){o.setTransform(1,0,0,1,0,0),o.strokeStyle=r?`rgba(255,255,255,${a})`:`rgba(77,107,254,${a})`,o.lineWidth=1,o.beginPath();for(let c=0;c<=Math.ceil(t/e);c++){let h=Math.round(c*e*n)+.5;o.moveTo(h,0),o.lineTo(h,i*n)}for(let c=0;c<=Math.ceil(i/s);c++){let h=Math.round(c*s*n)+.5;o.moveTo(0,h),o.lineTo(t*n,h)}o.stroke()}}var vt=class{constructor(t,i=!1,e=1,s=.05,n=1,r="ascii"){this.canvas=t;this.dark=i;this.gridScale=e;this.gridOpacity=s;this.wake=n;this.glyphMode=r;g(this,"bodySwing",1);g(this,"ctx");g(this,"bg");g(this,"dpr",1);g(this,"width",0);g(this,"height",0);g(this,"cw",12);g(this,"ch",18);g(this,"cols",0);g(this,"rows",0);g(this,"fontFamily","ui-monospace, Menlo, monospace");g(this,"rgb",[77,107,254]);g(this,"eyeColor","");g(this,"accents",[]);g(this,"dotKind",new Uint8Array(0));g(this,"dotPhase",new Float32Array(0));g(this,"dotFreq",new Float32Array(0));g(this,"energy",new Float32Array(0));g(this,"energyTmp",new Float32Array(0));g(this,"heat",new Float32Array(0));g(this,"bucketOf",new Uint8Array(0));g(this,"bucketOrder",new Int32Array(0));g(this,"bucketCounts",new Int32Array(Nt.length*ft+1));g(this,"dotStyles",[]);g(this,"sharkFlag",new Uint8Array(0));g(this,"sharkShade",new Float32Array(0));g(this,"sharkKey",new Uint32Array(0));g(this,"sharkDepth",new Float32Array(0));g(this,"sharkKind",new Uint8Array(0));g(this,"sharkGlyph",new Uint16Array(0));g(this,"sharkShadow",new Uint8Array(0));g(this,"spine",new Float32Array(W*2));g(this,"arc",new Float32Array(W));g(this,"arcTotal",1);g(this,"shape",Mt.classic);g(this,"sharkId",0);g(this,"finTipLeft",0);g(this,"finTipRight",0);g(this,"hitFlag",0);g(this,"hitShade",0);g(this,"hitS",0);g(this,"hitV",0);g(this,"hitDist",0);g(this,"fishStamp",new Uint32Array(0));g(this,"frameId",0);g(this,"fishBuckets",It.map(()=>[]));g(this,"fishStyles",It.map(t=>`rgba(230,238,255,${t})`));let a=t.getContext("2d",{alpha:!0});if(!a)throw new Error("2D canvas unavailable");this.ctx=a,this.bg=document.createElement("canvas"),this.setTheme(i)}get cellWidth(){return this.cw}get cellHeight(){return this.ch}setFontFamily(t){t&&(this.fontFamily=t)}setTheme(t,i=this.gridOpacity,e=this.wake,s,n=!1,r="primary"){this.dark=t,this.gridOpacity=i,this.wake=e,s&&(this.rgb=[1,3,5].map(a=>parseInt(s.slice(a,a+2),16))),this.eyeColor=r==="primary"?"":r==="black"?"#000000":"#ffffff",this.fishStyles=It.map(a=>`rgba(230,238,255,${a})`),this.accents=n?Re:[0,.2,.6,-.1,.35,-.2,.5].map(a=>`rgb(${this.rgb.map(c=>Math.round(a>=0?c+(255-c)*a:c*(1+a))).join(",")})`),this.dotStyles=[];for(let a=0;a<Nt.length;a++)for(let c=0;c<ft;c++){let h=De[a]*(c+1)/ft;this.dotStyles.push(`rgba(${Nt[a].join(",")},${h.toFixed(3)})`)}this.paintBackground()}bodyColor(t,i=[1,1,1]){let[e,s,n]=i;return`rgb(${Math.min(255,Math.round(t*e))},${Math.min(255,Math.round(t*s))},${Math.min(255,Math.round(t*n+6))})`}resize(t,i,e){this.width=t,this.height=i,this.dpr=e,[this.cw,this.ch]=At(this.gridScale,this.glyphMode==="hanzi"),this.cols=Math.ceil(t/this.cw),this.rows=Math.ceil(i/this.ch),this.canvas.width=Math.round(t*e),this.canvas.height=Math.round(i*e),this.bg.width=this.canvas.width,this.bg.height=this.canvas.height;let s=this.cols*this.rows;this.dotKind=new Uint8Array(s),this.dotPhase=new Float32Array(s),this.dotFreq=new Float32Array(s),this.energy=new Float32Array(s),this.energyTmp=new Float32Array(s),this.heat=new Float32Array(s),this.bucketOf=new Uint8Array(s),this.bucketOrder=new Int32Array(s),this.sharkFlag=new Uint8Array(s),this.sharkShade=new Float32Array(s),this.sharkKey=new Uint32Array(s),this.sharkDepth=new Float32Array(s),this.sharkKind=new Uint8Array(s),this.sharkGlyph=new Uint16Array(s),this.sharkShadow=new Uint8Array(s),this.fishStamp=new Uint32Array(s);for(let n=0;n<s;n++){let r=n%this.cols,a=n/this.cols|0;this.dotKind[n]=0,this.dotPhase[n]=dt(r,a,23)*Math.PI*2,this.dotFreq[n]=.3+dt(r,a,37)*1.1}this.paintBackground()}paintBackground(){let t=this.bg.getContext("2d");if(!t)return;let{width:i,height:e,dpr:s,cw:n,ch:r}=this;t.setTransform(s,0,0,s,0,0),t.clearRect(0,0,i,e),ye(t,i,e,n,r,s,this.dark,this.gridOpacity)}render(t,i){let{ctx:e,dpr:s,cols:n,ch:r}=this;if(n===0)return;let a=t.time;this.consumeEvents(t),this.rasterizeSharks(t.sharks,a),this.depositWake(t),this.diffuse(i),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,this.canvas.width,this.canvas.height),e.drawImage(this.bg,0,0),e.setTransform(s,0,0,s,0,0),this.markFish(t),this.drawDots(a),e.font=`${this.glyphMode==="hanzi"?400:600} ${Math.round(r*.74)}px ${this.fontFamily}`,e.textAlign="center",e.textBaseline="middle",this.drawHeat(),this.drawFish(),this.drawSharks(a)}cellIndex(t,i){let e=Math.floor(t/this.cw),s=Math.floor(i/this.ch);return e<0||s<0||e>=this.cols||s>=this.rows?-1:s*this.cols+e}stamp(t,i,e,s,n){let r=Math.floor(i/this.cw),a=Math.floor(e/this.ch);for(let c=a-s;c<=a+s;c++)for(let h=r-s;h<=r+s;h++){if(h<0||c<0||h>=this.cols||c>=this.rows)continue;let l=Math.hypot(h-r,(c-a)*1.4);if(l>s+.5)continue;let m=c*this.cols+h;t[m]=Math.min(1.6,t[m]+n*(1-l/(s+1)))}}consumeEvents(t){for(let i of t.events)i.kind==="eat"?(this.stamp(this.heat,i.x,i.y,2,1),this.stamp(this.energy,i.x,i.y,3,.9)):this.stamp(this.energy,i.x,i.y,6,1.4);t.events.length=0}depositWake(t){let{energy:i}=this;for(let e of t.fish){if(!e.alive)continue;let s=this.cellIndex(e.x,e.y);s>=0&&(i[s]=Math.min(1.6,i[s]+.012+e.alarm*.03))}for(let e of t.sharks)for(let s=W-6;s<W;s++){let n=this.cellIndex(e.nodes[s*2],e.nodes[s*2+1]);n>=0&&(i[n]=Math.min(1.6,i[n]+.05+e.speed*.0012))}t.pointer.active&&this.stamp(i,t.pointer.x,t.pointer.y,1,.08)}diffuse(t){let{cols:i,rows:e,energy:s,energyTmp:n,heat:r}=this,a=Math.exp(-t*1.5);for(let h=0;h<e;h++)for(let l=0;l<i;l++){let m=h*i+l,f=l>0?s[m-1]:s[m],d=l<i-1?s[m+1]:s[m],b=h>0?s[m-i]:s[m],p=h<e-1?s[m+i]:s[m];n[m]=(s[m]*4+f+d+b+p)*.125*a}this.energy=n,this.energyTmp=s;let c=Math.exp(-t*2.2);for(let h=0;h<r.length;h++)r[h]*=c}sampleShark(t,i,e){let{spine:s,arc:n}=this,r=W,a=1/0,c=0,h=1,l=0,m=0;for(let A=0;A<r-1;A++){let F=s[A*2],y=s[A*2+1],x=s[(A+1)*2]-F,R=s[(A+1)*2+1]-y,_=x*x+R*R||1,q=H(((t-F)*x+(i-y)*R)/_,0,1),E=F+x*q,D=y+R*q,T=(t-E)**2+(i-D)**2;if(T<a){a=T;let w=Math.sqrt(_);c=(n[A]+q*w)/this.arcTotal,h=x*(i-y)-R*(t-F)>=0?1:-1,l=-R/w*h,m=x/w*h}}let f=Math.sqrt(a),d=c,b=d*e,p=this.shape,M=p.halfWidth(d)*e;this.hitDist=f,this.hitS=d,this.hitV=f*h;let I=this.shape.head;if(I&&b<e*(I.sweep+I.depth+I.notch)){let A=e*I.span,F=f/A,y=e*I.sweep*F*F+e*I.notch*Math.max(0,1-F/.14),x=e*I.depth*(1-.2*F*F*F*F);if(F<=1&&b>=y&&b<=y+x)return this.hitFlag=F>.84?yt:Vt,this.hitShade=F>.84?0:.62-.2*F+(b<y+e*.012?.1:0),!0}if(f<=M&&(p!==lt&&p!==ht||d<=.945)){let A=f/(M||1),F=(l*-.6+m*-.8)*A,y=.58-A*A*.42+F*.26,x=Vt;return d>p.dorsal[0]&&d<p.dorsal[1]&&A<.3?(x=Jt,y=1):d>p.secondDorsal[0]&&d<p.secondDorsal[1]&&A<.4?y=Math.max(y,.82):p.eye&&d>p.eye[0]&&d<p.eye[1]&&A>.6?(x=yt,y=0):p===ht&&Ct(d,A)?x=Qt:d>p.gills[0]&&d<p.gills[1]&&A>.58?Math.floor((d-p.gills[0])/(p.gills[1]-p.gills[0])*5)%2===0&&(y*=.45):d<.05?y=Math.max(y,.7):p===Mt.zebra&&d>.08&&d<.55&&(A<.1||Math.abs(A-.6)<.08)?y=Math.max(y,.8):this.marked(d,f*h,e,A)&&(x=Lt),this.hitFlag=x,this.hitShade=y,!0}let P=h>0?this.finTipRight:this.finTipLeft,[C,u,v]=p.pectoral;if((p===lt?Wt(d,f,P):p===ht?Ht(d,f,P):Ot(b,f,e*C,0,e*u,0,e*v,P))&&!(p.falcate&&Ot(b,f,e*u,0,e*(u+(v-u)*.33),P*.55,e*v,P)))return this.hitFlag=this.marked(d,f*h,e,0)?Lt:Kt,this.hitShade=.38+.22*(1-H(f/P,0,1)),!0;let[N,Y,S,z]=p.pelvic;return z>0&&Ot(b,f,e*N,0,e*Y,0,e*S,e*z)||(p===lt||p===ht?_t(d,f/e):p.caudal>0&&Ot(b,f,e*.86,0,e*.95,0,e,e*p.caudal))?(this.hitFlag=Kt,this.hitShade=.36,!0):!1}marked(t,i,e,s){if(this.shape===Mt.tiger){if(t<.2||t>.9||s>.85)return!1;let n=.35*Math.sin(i/e*25+t*5);return Math.sin(t*Math.PI*2*9+n)>.65-.5*st(.2,.42,t)+.4*st(.8,.9,t)}if(this.shape===Mt.zebra){if(t<.07)return!1;let n=t*e/(e*.06),r=i/(e*.045),a=Math.floor(n),c=Math.floor(r),h=dt(a,c,this.sharkId)*.5+.25,l=dt(a,c,this.sharkId+11)*.5+.25;return(n-a-h)**2+(r-c-l)**2<.08}return!1}rasterizeSharks(t,i){let{sharkFlag:e,sharkShade:s,sharkKey:n,sharkDepth:r,sharkKind:a,sharkShadow:c,spine:h,arc:l,cw:m,ch:f,cols:d,rows:b}=this;e.fill(0),c.fill(0),this.sharkGlyph.fill(0);for(let p of t){let M=p.length,I=W,P=p.nodes,C=H(p.speed/60,.4,1.4);this.shape=Mt[p.kind],this.sharkId=p.id;let u=be.indexOf(p.kind),v=this.glyphMode==="hanzi"&&(p.kind==="whale"||p.kind==="orca")&&p.id===1?[-1,-1,-1,-1]:null,N=[1/0,1/0,1/0,1/0];for(let k=0;k<I;k++){let K=k/(I-1),J=Math.max(0,k-1),rt=Math.min(I-1,k+1),at=P[J*2]-P[rt*2],U=P[J*2+1]-P[rt*2+1],mt=Math.hypot(at,U)||1;at/=mt,U/=mt;let tt=M*.05*(.1+.9*Math.pow(K,1.8))*C*this.bodySwing*Math.sin(p.phase-K*5.2);h[k*2]=P[k*2]-U*tt,h[k*2+1]=P[k*2+1]+at*tt}l[0]=0;for(let k=1;k<I;k++)l[k]=l[k-1]+Math.hypot(h[k*2]-h[(k-1)*2],h[k*2+1]-h[(k-1)*2+1]);this.arcTotal=l[I-1]||1;let Y=H(p.turn*.45,-.35,.35),S=1+.06*Math.sin(p.phase*.5),z=this.shape.pectoral[3];this.finTipRight=M*z*S*(1-Y),this.finTipLeft=M*z*S*(1+Y);let A=1/0,F=1/0,y=-1/0,x=-1/0;for(let k=0;k<I;k++)A=Math.min(A,h[k*2]),y=Math.max(y,h[k*2]),F=Math.min(F,h[k*2+1]),x=Math.max(x,h[k*2+1]);let R=Math.max(M*.36,this.finTipLeft,this.finTipRight),_=Math.max(0,Math.floor((A-R)/m)),q=Math.min(d-1,Math.floor((y+R)/m)),E=Math.max(0,Math.floor((F-R)/f)),D=Math.min(b-1,Math.floor((x+R)/f));if(_>q||E>D)continue;let T=R+Math.hypot(m,f),w=Math.round(M*.035/m)+1,G=Math.round(M*.02/f)+1;for(let k=E;k<=D;k++)for(let K=_;K<=q;K++){let J=K*m,rt=k*f,at=this.sampleShark(J+m/2,rt+f/2,M);if(!at&&this.hitDist>T)continue;let U=this.hitFlag,mt=this.hitShade,Q=this.hitS,tt=this.hitV,et=at?1:0;for(let O=0;O<Zt.length;O+=2)this.sampleShark(J+Zt[O]*m,rt+Zt[O+1]*f,M)&&et++;if(et===0)continue;let B=et/5,L=k*d+K,j=dt(Math.round(Q*52),Math.round(tt/(m*.9)),p.id)*4294967295>>>0;if(n[L]=j,r[L]=p.depth,a[L]=u,at&&B>=.6){if(e[L]=U,this.glyphMode==="hanzi"&&(p.kind==="whale"||p.kind==="orca")){let Z=U===yt?"目":U===Kt?Q>=.84?"尾":"鳍":U===Jt?"鳍":Q<.1?"吻":Q<.6&&Math.abs(tt)<this.shape.halfWidth(Q)*M*.32?"背":"";if(this.sharkGlyph[L]=Z?Z.charCodeAt(0):0,v&&!Z&&U===Vt&&tt>0&&Q>=.28&&Q<.64){let it=Math.min(3,Math.floor((Q-.28)/.09)),ut=((Q-(.325+it*.09))*M)**2+(tt-this.shape.halfWidth(Q)*M*.6)**2;ut<N[it]&&(N[it]=ut,v[it]=L)}}else this.sharkGlyph[L]=0;let O=(dt(K,k,Math.floor(i*6))-.5)*.06;s[L]=H(mt+O,0,1);let X=K+w,V=k+G;X<d&&V<b&&(c[V*d+X]=1)}else e[L]=ge,this.sharkGlyph[L]=0,s[L]=B}if(v?.every(k=>k>=0))for(let k=0;k<4;k++)this.sharkGlyph[v[k]]="深度求索".charCodeAt(k)}}drawSharks(t){let{ctx:i,cols:e,rows:s,cw:n,ch:r,sharkFlag:a,sharkShade:c,sharkKey:h,sharkDepth:l,sharkKind:m}=this,f=me[this.glyphMode],d=e*s;for(let b=0;b<d;b++){let p=a[b];if(!p)continue;let M=b%e,I=b/e|0,P=M*n,C=I*r,u=h[b],v=c[b],N=.7+.3*l[b],[Y,S,z]=Mt[be[m[b]]].tint,A=Math.floor(t*2.4+u%997/97),F=dt(u,A,7);if(p===ge){let _=v>=.5?f.edgeHeavy:f.edgeLight,q=(70+v*80)*N;i.fillStyle=F<.07?this.accents[u%this.accents.length]:this.bodyColor(q),i.fillText(_[(u>>>8)%_.length],P+n/2,C+r/2+1,Math.max(1,n-1));continue}let y,x;if(p===Jt)y=226,x=f.ridge[(u>>>8)%f.ridge.length];else if(p===yt)y=46+v*160,x=f.eye;else if(p===Lt)y=24+v*22,x=f.mark[(u>>>8)%f.mark.length];else if(p===Kt)y=40+v*120,x=f.fin[(u>>>8)%f.fin.length];else{y=46+v*160;let _=(u>>>4)%3-1;x=f.skin[H(Math.floor((1-v)*(f.skin.length-.01))+_,0,f.skin.length-1)]}y*=N,this.sharkGlyph[b]&&(x=String.fromCharCode(this.sharkGlyph[b])),i.fillStyle=p===Qt?"#f5f5f0":p===yt&&this.eyeColor?this.eyeColor:this.bodyColor(y,[Y,S,z]),i.fillRect(P+1,C+1,n-1,r-1);let R;p===Qt?R="#181818":p===yt&&this.eyeColor?R=this.eyeColor==="#000000"?"#ffffff":"#181818":p===yt?R=v>.55?"#181818":"#eeeeee":p===Lt?R=`rgb(${Math.round(70*Y)},${Math.round(70*S)},${Math.round(70*z)})`:F<.09?R=this.accents[u%this.accents.length]:F<.13?R="#ffffff":R=v>.55?"#181818":"#eeeeee",i.fillStyle=R,i.fillText(x,P+n/2,C+r/2+1,Math.max(1,n-1))}}markFish(t){let{fishStamp:i,fishBuckets:e,sharkFlag:s}=this,n=++this.frameId;for(let r of e)r.length=0;for(let r=0;r<2;r++)for(let a of t.fish){if(!a.alive||(a.depth>.78?0:1)!==r)continue;let c=this.cellIndex(a.x,a.y);if(c<0||i[c]===n||s[c])continue;i[c]=n;let h=H(Math.abs(a.turn)/3.5,0,1),l=.3+.4*(a.depth-.55)/.45+.3*Math.max(h,a.alarm);e[H(Math.floor(l*It.length),0,It.length-1)].push(c)}}drawFish(){let{ctx:t,cw:i,ch:e,cols:s,fishBuckets:n}=this,r=me[this.glyphMode].fish;for(let a=0;a<n.length;a++){let c=n[a];if(c.length){t.fillStyle=this.fishStyles[a];for(let h of c)t.fillText(r[h%r.length],h%s*i+i/2,(h/s|0)*e+e/2+1,Math.max(1,i-1))}}}drawHeat(){let{ctx:t,heat:i,cols:e,cw:s,ch:n}=this;for(let r=0;r<i.length;r++){let a=i[r];if(a<.08)continue;let c=r%e,h=r/e|0;t.fillStyle=`rgba(${this.rgb.join(",")},${Math.min(1,a*1.6).toFixed(2)})`,t.fillText(a>.6?"*":"·",c*s+s/2,h*n+n/2+1,Math.max(1,s-1))}}drawDots(t){let{ctx:i,cols:e,rows:s,cw:n,ch:r,dotKind:a,dotPhase:c,dotFreq:h,energy:l,sharkFlag:m,sharkShadow:f,fishStamp:d,frameId:b}=this,{bucketOf:p,bucketOrder:M,bucketCounts:I}=this,P=e*s,C=I.length-1;I.fill(0);for(let S=0;S<P;S++){let z=l[S]*this.wake,A=a[S];if(m[S]||d[S]===b||A===0&&z<.45){p[S]=C;continue}let F;if(z>.45){let y=H(Math.floor((z-.45)*5),0,ft-1);F=de*ft+y}else{let y=S%e,x=S/e|0,R=.5+.5*Math.sin(t*h[S]+c[S]),_=.85+.15*Math.sin(y*.11+t*.35)*Math.sin(x*.17-t*.27),q=H((.55+.45*R)*_+z*2,0,1);f[S]&&(q*=.2),F=(A-1)*ft+H(Math.floor(q*ft),0,ft-1)}p[S]=F,I[F]++}let u=new Int32Array(I.length);for(let S=1;S<I.length;S++)u[S]=u[S-1]+I[S-1];let v=u.slice();for(let S=0;S<P;S++){let z=p[S];z!==C&&(M[v[z]++]=S)}let N=Math.max(2,Math.round(n*.19)),Y=N+1;for(let S=0;S<C;S++){let z=I[S];if(!z)continue;i.fillStyle=this.dotStyles[S];let A=S>=de*ft?Y:N,F=u[S];for(let y=F;y<F+z;y++){let x=M[y],R=x%e,_=x/e|0;i.fillRect(Math.round(R*n+n*.66-A/2),Math.round(_*r+r*.64-A/2),A,A)}}}};var ze="丶ノ一二小川水氷永汐泳波海浪潮濤鯨",kt={eye:"目",fin:"鰭",tail:"尾",scale:"鱗",name:"鯨"},Et={flat:"一",upright:"丨",down:"丶",up:"ノ"},Ut=["、","〜","氵"],Me="喰",ve="丶",ie={chomp:"ガブッ",splash:"ザバッ"},ee=(o,t)=>`400 ${o}px ${t}`;function Ce(o,t){let e=document.createElement("canvas");e.width=e.height=64;let s=e.getContext("2d",{willReadFrequently:!0});return s.font=ee(64*.9,t),s.textAlign="center",s.textBaseline="middle",s.fillStyle="#fff",[...o].map(n=>{s.clearRect(0,0,64,64),s.fillText(n,64/2,64/2);let r=s.getImageData(0,0,64,64).data,a=0;for(let c=3;c<r.length;c+=4)a+=r[c];return{ch:n,ink:a/(16320*64)}})}var qt=class{constructor(t,i=ze){let e=Ce(i,t).sort((a,c)=>a.ink-c.ink),s=e[0].ink,n=e[e.length-1].ink||1;this.entries=e.map(a=>({ch:a.ch,tone:(a.ink-s)/(n-s||1)})),this.table=[];let r=64;for(let a=0;a<r;a++){let c=a/(r-1),h=this.entries[0];for(let l of this.entries)Math.abs(l.tone-c)<Math.abs(h.tone-c)&&(h=l);this.table.push(h.ch)}}pick(t){let i=Math.round(Math.min(1,Math.max(0,t))*(this.table.length-1));return this.table[i]}},Gt=class{constructor(t){this.family=t,this.tiles=new Map,this.px=0}setCell(t){if(t===this.px)return;this.px=t,this.tiles.clear();let i=document.createElement("canvas").getContext("2d");i.font=ee(Math.round(t*.86),this.family);let e=i.measureText("国");this.baseline=t/2+(e.actualBoundingBoxAscent-e.actualBoundingBoxDescent)/2}get(t,i){let e=t+i,s=this.tiles.get(e);if(s)return s;this.tiles.size>6e3&&this.tiles.clear();let n=this.px;s=document.createElement("canvas"),s.width=s.height=n;let r=s.getContext("2d");return r.font=ee(Math.round(n*.86),this.family),r.textAlign="center",r.textBaseline="alphabetic",r.fillStyle=i,r.fillText(t,n/2,this.baseline),this.tiles.set(e,s),s}};var ni=Math.PI*2,ot=(o,t,i)=>o<t?t:o>i?i:o;function se(o,t,i){let e=Math.imul(o|0,668265261)^Math.imul(t|0,374761393)^Math.imul(i|0,2654435761);return e=Math.imul(e^e>>>15,2246822507),e=Math.imul(e^e>>>13,3266489909),((e^e>>>16)>>>0)/4294967296}var He=["鰯","鰊","鯵","鯖","鰯"];function nt(o,t,i){let e=[];for(let s=0;s<i;s++){let n=s/(i-1),r=o.map((a,c)=>Math.round(a+(t[c]-a)*n));e.push(`rgb(${r[0]},${r[1]},${r[2]})`)}return e}var xe={night:{bg:"#03070d",vignette:"rgba(0,0,0,0.6)",grid:"rgba(120,160,220,0.05)",skin:nt([34,48,70],[230,240,252],16),fill:nt([12,20,33],[40,56,80],8),fish:nt([48,64,88],[176,196,222],8),wake:nt([16,52,78],[110,216,250],8),red:"#ff5b3a",eye:"#ffc861",glint:"#ffffff"},paper:{bg:"#f1e9d6",vignette:"rgba(110,80,40,0.2)",grid:"rgba(196,72,52,0.14)",skin:nt([196,188,172],[16,15,14],16),fill:nt([228,219,200],[200,189,169],8),fish:nt([176,168,152],[48,45,42],8),wake:nt([206,206,196],[64,100,140],8),red:"#c4302a",eye:"#c4302a",glint:"#2f4a8a"}},Tt=0,ne=1,we=4,ke=5,We=7,_e=1,Ke=2,Bt=3,re=[-.28,-.28,.28,-.28,-.28,.28,.28,.28],Le=-.6,Oe=-.8,Pt=(o,t)=>o[Math.round(ot(t,0,1)*(o.length-1))],$t=class{constructor(t,i=1){this.shape=lt,this.gridScale=i,this.bodySwing=1,this.cell=At(i,!0)[0],this.wake=1,this.canvas=t,this.ctx=t.getContext("2d",{alpha:!0}),this.bg=document.createElement("canvas"),this.setFontFamily(getComputedStyle(t).fontFamily),this.theme=xe.paper,this.cols=0,this.rows=0,this.frame=0,this.touched=[],this.fx=[],this.spine=new Float32Array(W*2),this.arc=new Float32Array(W),this.arcTotal=1,this.finLeft=0,this.finRight=0,this.hitS=0,this.hitD=0,this.hitSide=1,this.hitTx=1,this.hitTy=0}setFontFamily(t){this.atlas=new Gt(t),this.ramp=new qt(t),this.dpr&&this.atlas.setCell(Math.round(this.cell*this.dpr))}get cellWidth(){return this.cell}get cellHeight(){return this.cell}setTheme(t,i=.05,e=1,s="#4d6bfe",n="primary"){this.wake=e;let r=[1,3,5].map(a=>parseInt(s.slice(a,a+2),16));this.theme={...xe[t?"night":"paper"],grid:`rgba(128,128,128,${i})`,eye:n==="primary"?s:n==="black"?"#ffffff":"#181818",eyeFill:n==="primary"?null:n==="black"?"#000000":"#ffffff",skin:nt(r.map(a=>a*.45),r.map(a=>a+(255-a)*.35),16),fill:Array(8).fill(null),fish:nt(r.map(a=>a*.6),r,8),wake:nt(r.map(a=>a*.6),r,8)},this.paintBackground()}resize(t,i,e){let s=At(this.gridScale,!0)[0];this.width=t,this.height=i,this.cell=s,this.dpr=e,this.cols=Math.ceil(t/s),this.rows=Math.ceil(i/s),this.canvas.width=Math.round(t*e),this.canvas.height=Math.round(i*e),this.bg.width=this.canvas.width,this.bg.height=this.canvas.height,this.atlas.setCell(Math.round(s*e));let n=this.cols*this.rows;this.layer=new Uint8Array(n),this.depth=new Float32Array(n),this.stamp=new Uint32Array(n),this.glyph=new Array(n).fill(""),this.color=new Array(n).fill(""),this.fill=new Array(n).fill(null),this.alpha=new Float32Array(n),this.energy=new Float32Array(n),this.energyNext=new Float32Array(n),this.touched.length=0,this.fx.length=0,this.paintBackground()}paintBackground(){let t=this.bg.getContext("2d");if(!t||!this.cols)return;let{theme:i,cell:e,dpr:s}=this,n=this.bg.width,r=this.bg.height;t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,n,r),t.strokeStyle=i.grid,t.lineWidth=1,t.beginPath();for(let a=0;a<=this.cols;a++){let c=Math.round(a*e*s)+.5;t.moveTo(c,0),t.lineTo(c,r)}for(let a=0;a<=this.rows;a++){let c=Math.round(a*e*s)+.5;t.moveTo(0,c),t.lineTo(n,c)}t.stroke()}render(t,i){if(this.cols){this.frame++,this.touched.length=0,this.consumeEvents(t),this.depositWake(t,i);for(let e of t.sharks)this.rasterShark(e,t.time);this.placeFish(t),this.placeWake(),this.draw(t.time,i)}}cellAt(t,i){let e=Math.floor(t/this.cell),s=Math.floor(i/this.cell);return e<0||s<0||e>=this.cols||s>=this.rows?-1:s*this.cols+e}put(t,i,e,s,n,r=null){if(this.stamp[t]!==this.frame)this.stamp[t]=this.frame,this.layer[t]=0,this.touched.push(t);else if(i<this.layer[t]||i===this.layer[t]&&e<this.depth[t])return;this.layer[t]=i,this.depth[t]=e,this.glyph[t]=s,this.color[t]=n,this.fill[t]=r}classify(t,i,e){let{spine:s,arc:n}=this,r=1/0,a=0;for(let f=0;f<W-1;f++){let d=s[f*2],b=s[f*2+1],p=s[f*2+2]-d,M=s[f*2+3]-b,I=p*p+M*M||1,P=ot(((t-d)*p+(i-b)*M)/I,0,1),C=(t-d-p*P)**2+(i-b-M*P)**2;if(C<r){r=C;let u=Math.sqrt(I);a=(n[f]+P*u)/this.arcTotal,this.hitSide=p*(i-b)-M*(t-d)>=0?1:-1,this.hitTx=p/u,this.hitTy=M/u}}let c=Math.sqrt(r),h=a,l=this.shape.halfWidth(h)*e;if(this.hitS=h,this.hitD=c,c<=l&&h<=.945){let f=c/(l||1);return h>this.shape.dorsal[0]&&h<this.shape.dorsal[1]&&f<.3?we:ne}let m=this.hitSide>0?this.finRight:this.finLeft;return(this.shape===ht?Ht(h,c,m):Wt(h,c,m))?ke:_t(h,c/e)?We:Tt}buildSpine(t){this.shape=t.kind==="orca"?ht:lt;let{spine:i,arc:e}=this,s=t.nodes,n=t.length,r=ot(t.speed/60,.4,1.4);for(let h=0;h<W;h++){let l=h/(W-1),m=Math.max(0,h-1),f=Math.min(W-1,h+1),d=s[m*2]-s[f*2],b=s[m*2+1]-s[f*2+1],p=Math.hypot(d,b)||1;d/=p,b/=p;let M=n*.05*(.1+.9*Math.pow(l,1.8))*r*this.bodySwing*Math.sin(t.phase-l*5.2);i[h*2]=s[h*2]-b*M,i[h*2+1]=s[h*2+1]+d*M}e[0]=0;for(let h=1;h<W;h++)e[h]=e[h-1]+Math.hypot(i[h*2]-i[h*2-2],i[h*2+1]-i[h*2-1]);this.arcTotal=e[W-1]||1;let a=ot(t.turn*.45,-.35,.35),c=1+.06*Math.sin(t.phase*.5);this.finRight=n*this.shape.pectoral[3]*c*(1-a),this.finLeft=n*this.shape.pectoral[3]*c*(1+a)}placeEyes(t){let{spine:i,arc:e}=this,s=.1,n=s*this.arcTotal,r=0;for(;r<W-2&&e[r+1]<n;)r++;let a=e[r+1]-e[r]||1,c=(n-e[r])/a,h=(i[r*2+2]-i[r*2])/a,l=(i[r*2+3]-i[r*2+1])/a,m=i[r*2]+(i[r*2+2]-i[r*2])*c,f=i[r*2+1]+(i[r*2+3]-i[r*2+1])*c,d=this.shape.halfWidth(s)*t.length*.62;for(let b of[-1,1]){let p=this.cellAt(m-l*d*b,f+h*d*b);p>=0&&this.stamp[p]===this.frame&&this.layer[p]===Bt&&this.put(p,Bt,t.depth,kt.eye,this.theme.eye,this.theme.eyeFill??this.fill[p])}}rasterShark(t,i){let{cell:e,cols:s,rows:n,spine:r,theme:a,ramp:c}=this,h=t.length;this.buildSpine(t);let l=1/0,m=1/0,f=-1/0,d=-1/0;for(let v=0;v<W;v++)l=Math.min(l,r[v*2]),f=Math.max(f,r[v*2]),m=Math.min(m,r[v*2+1]),d=Math.max(d,r[v*2+1]);let b=Math.max(h*.3,this.finLeft,this.finRight),p=Math.max(0,Math.floor((l-b)/e)),M=Math.min(s-1,Math.floor((f+b)/e)),I=Math.max(0,Math.floor((m-b)/e)),P=Math.min(n-1,Math.floor((d+b)/e)),C=b+e,u=.6+.4*t.depth;for(let v=I;v<=P;v++)for(let N=p;N<=M;N++){let Y=(N+.5)*e,S=(v+.5)*e,z=this.classify(Y,S,h);if(z===Tt&&this.hitD>C)continue;let A=this.hitS,F=this.hitD,y=this.hitSide,x=this.hitTx,R=this.hitTy,_=z===Tt?0:1;for(let K=0;K<re.length;K+=2)this.classify(Y+re[K]*e,S+re[K+1]*e,h)!==Tt&&_++;if(_===0)continue;let q=_/5,E=v*s+N,D=Math.floor(se(Math.round(A*h/e),Math.round(y*F/e),t.id)*1e9);if(z===Tt||q<.6){this.put(E,Bt,t.depth,this.stroke(x,R),Pt(a.skin,(.2+.3*q)*u));continue}let T,w,G=null;if(z===ne){let K=F/(this.shape.halfWidth(A)*h||1),J=(-R*y*Le+x*y*Oe)*K;w=1-.95*Math.pow(K,1.6)+.18*J+(D%7-3)*.02,T=c.pick(w),w>.55&&D%23===0&&(T=kt.name),w>.45&&se(D,Math.floor(i*2.5),3)<.025&&(G=a.glint)}else if(z===we)T=kt.fin,w=1;else if(z===ke){T=kt.fin;let K=y>0?this.finRight:this.finLeft;w=.42+.25*(1-ot(F/K,0,1))}else T=kt.tail,w=.55;G??(G=Pt(a.skin,w*u));let k=this.shape===ht&&z===ne&&Ct(A,F/(this.shape.halfWidth(A)*h||1));this.put(E,Bt,t.depth,T,k?"#181818":G,k?"#f5f5f0":Pt(a.fill,w*u))}this.placeEyes(t)}stroke(t,i){let e=Math.atan2(i,t);e<0&&(e+=Math.PI);let s=e*180/Math.PI;return s<22.5||s>=157.5?Et.flat:s<67.5?Et.down:s<112.5?Et.upright:Et.up}placeFish(t){let{theme:i}=this;for(let e of t.fish){if(!e.alive)continue;let s=this.cellAt(e.x,e.y);if(s<0)continue;let n=.2+.6*((e.depth-.5)/.5)+.35*e.alarm;this.put(s,Ke,e.depth,He[e.species],Pt(i.fish,n))}}depositWake(t,i){let{energy:e}=this,s=this.cell;for(let h of t.fish){if(!h.alive)continue;let l=this.cellAt(h.x,h.y);l>=0&&(e[l]=Math.min(1.5,e[l]+.008+h.alarm*.025))}for(let h of t.sharks)for(let l=W-5;l<W;l++){let m=this.cellAt(h.nodes[l*2],h.nodes[l*2+1]);m>=0&&(e[m]=Math.min(1.5,e[m]+.05+h.speed/s*.004))}t.pointer.active&&this.splashEnergy(t.pointer.x,t.pointer.y,1,.06);let{cols:n,rows:r,energyNext:a}=this,c=Math.exp(-i*1.4);for(let h=0;h<r;h++)for(let l=0;l<n;l++){let m=h*n+l,f=e[m],d=l>0?e[m-1]:f,b=l<n-1?e[m+1]:f,p=h>0?e[m-n]:f,M=h<r-1?e[m+n]:f;a[m]=(f*4+d+b+p+M)*.125*c}this.energyNext=e,this.energy=a}splashEnergy(t,i,e,s){let n=Math.floor(t/this.cell),r=Math.floor(i/this.cell);for(let a=r-e;a<=r+e;a++)for(let c=n-e;c<=n+e;c++){if(c<0||a<0||c>=this.cols||a>=this.rows)continue;let h=Math.hypot(c-n,a-r);if(h>e+.5)continue;let l=a*this.cols+c;this.energy[l]=Math.min(1.5,this.energy[l]+s*(1-h/(e+1)))}}placeWake(){let{energy:t,theme:i}=this;for(let e=0;e<t.length;e++){let s=t[e]*this.wake;if(s<.3||this.stamp[e]===this.frame)continue;let n=s>.95?Ut[2]:s>.6?Ut[1]:Ut[0];this.put(e,_e,0,n,Pt(i.wake,(s-.3)/.9))}}consumeEvents(t){let{cell:i}=this,e=Math.floor(this.width/i),s=Math.floor(this.height/i);for(let n of t.events){let r=Math.floor(n.x/i),a=Math.floor(n.y/i);if(n.kind==="eat"){this.addFx(r,a,Me,0,.9);for(let[m,f]of[[-1,-1],[1,-1],[-1,1],[1,1]])this.addFx(r+m,a+f,ve,.04,.45);this.splashEnergy(n.x,n.y,2,.8);let c=[...ie.chomp],h=ot(r+1,0,e-c.length),l=ot(a-1,0,s-1);c.forEach((m,f)=>this.addFx(h+f,l,m,f*.06,1.2))}else if(n.kind==="splash"){let c=[...ie.splash],h=ot(r-1,0,e-c.length),l=ot(a-2,0,s-1);c.forEach((m,f)=>this.addFx(h+f,l,m,f*.06,1)),this.splashEnergy(n.x,n.y,5,1.4)}}t.events.length=0}addFx(t,i,e,s,n){t<0||i<0||t>=this.cols||i>=this.rows||this.fx.push({col:t,row:i,glyph:e,age:-s,life:n})}draw(t,i){let{ctx:e,atlas:s,cell:n,dpr:r,cols:a,touched:c}=this,h=s.px;e.setTransform(1,0,0,1,0,0),e.globalAlpha=1,e.clearRect(0,0,this.canvas.width,this.canvas.height),e.drawImage(this.bg,0,0);for(let f of c){let d=Math.round(f%a*n*r),b=Math.round((f/a|0)*n*r),p=this.fill[f];p&&(e.fillStyle=p,e.fillRect(d+1,b+1,h-1,h-1)),e.drawImage(s.get(this.glyph[f],this.color[f]),d,b)}let l=this.theme.red,m=0;for(let f of this.fx){if(f.age+=i,f.age>=f.life||(this.fx[m++]=f,f.age<0))continue;let d=Math.round(f.col*n*r),b=Math.round(f.row*n*r);e.globalAlpha=1-(f.age/f.life)**2,e.clearRect(d,b,h,h),e.drawImage(s.get(f.glyph,l),d,b)}this.fx.length=m,e.globalAlpha=1}};var xt=1/60,Ne=4,Dt=class{constructor(t,i,e=1,s=!1,n=1,r=.05,a,c=1,h="#4d6bfe",l="ascii",m=!1,f="primary",d=1,b=1,p=1){this.canvas=t;this.speed=e;g(this,"world");g(this,"renderer");g(this,"raf",0);g(this,"last",0);g(this,"acc",0);g(this,"visible",!0);g(this,"reducedMotion");g(this,"resizeObserver");g(this,"intersectionObserver");g(this,"disposed",!1);g(this,"minFrameMs",0);g(this,"lastPaint",0);g(this,"scheduleVisibility",()=>this.schedule());g(this,"frame",t=>{let i=Math.min(.1,(t-this.last)/1e3);this.last=t,this.acc+=i*this.speed;let e=0,s=Math.ceil(Ne*Math.max(1,this.speed));for(;this.acc>=xt&&e<s;)this.world.step(xt,xt*.65/this.speed),this.acc-=xt,e++;e===s&&(this.acc=0),t-this.lastPaint>=this.minFrameMs&&(this.lastPaint=t,this.render(i*this.speed)),this.raf=requestAnimationFrame(this.frame)});g(this,"onMotionPreference",()=>{this.reducedMotion.matches?(cancelAnimationFrame(this.raf),this.drawStill()):this.schedule()});g(this,"onPointerMove",t=>{let{x:i,y:e,inside:s}=this.toLocal(t),n=this.world.pointer;n.x=i,n.y=e,n.active=s&&t.pointerType!=="touch"});g(this,"onPointerDown",t=>{let{x:i,y:e,inside:s}=this.toLocal(t);s&&!this.reducedMotion.matches&&this.world.splash(i,e)});g(this,"onPointerLeave",()=>{this.world.pointer.active=!1});this.world=new Ft(i,a),this.renderer=l==="kanji"?new $t(t,n):new vt(t,s,n,r,c,l),this.renderer instanceof vt?this.renderer.setTheme(s,r,c,h,m,f):this.renderer.setTheme(s,r,c,h,f),this.renderer.bodySwing=d,this.world.turnAgility=b,this.world.tailFrequency=p,this.renderer.setFontFamily(getComputedStyle(t).fontFamily),this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)"),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.intersectionObserver=new IntersectionObserver(([M])=>{this.visible=M.isIntersecting,this.schedule()}),this.intersectionObserver.observe(t),this.reducedMotion.addEventListener("change",this.onMotionPreference),window.addEventListener("pointermove",this.onPointerMove,{passive:!0}),window.addEventListener("pointerdown",this.onPointerDown,{passive:!0}),document.documentElement.addEventListener("pointerleave",this.onPointerLeave),window.addEventListener("blur",this.onPointerLeave),document.addEventListener("visibilitychange",this.scheduleVisibility),this.resize(),document.fonts?.load(`${l!=="ascii"?400:600} 16px ${getComputedStyle(t).fontFamily}`,l!=="ascii"?"鲸目鳍尾鮫鰓鰭鰯鰊鯵鯖":"S8@").then(()=>{this.disposed||(this.renderer.setFontFamily(getComputedStyle(t).fontFamily),this.reducedMotion.matches&&this.drawStill())}).catch(()=>{}),this.schedule()}destroy(){this.disposed=!0,cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.intersectionObserver.disconnect(),this.reducedMotion.removeEventListener("change",this.onMotionPreference),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerdown",this.onPointerDown),document.documentElement.removeEventListener("pointerleave",this.onPointerLeave),window.removeEventListener("blur",this.onPointerLeave),document.removeEventListener("visibilitychange",this.scheduleVisibility)}setAppearance(t,i,e=.05,s=1,n="#4d6bfe",r=!1,a="primary",c=1,h=1,l=1){this.speed=t,this.renderer.bodySwing=c,this.world.turnAgility=h,this.world.tailFrequency=l,this.renderer instanceof vt?this.renderer.setTheme(i,e,s,n,r,a):this.renderer.setTheme(i,e,s,n,a),this.reducedMotion.matches&&this.drawStill()}resize(){let t=this.canvas.getBoundingClientRect();if(t.width<1||t.height<1)return;let i=Math.min(window.devicePixelRatio||1,window.__DSH_SHARKS_DPR__??2);this.renderer.resize(t.width,t.height,i),this.world.resize(t.width,t.height,this.renderer.cellWidth,this.renderer.cellHeight),this.reducedMotion.matches&&this.drawStill()}schedule(){cancelAnimationFrame(this.raf),!(this.disposed||!this.visible||document.hidden||this.reducedMotion.matches)&&(this.last=performance.now(),this.raf=requestAnimationFrame(this.frame))}render(t){this.renderer.render(this.world,t)}drawStill(){if(this.world.time<4)for(let t=0;t<240;t++)this.world.step(xt,xt*.65/this.speed);this.render(xt)}toLocal(t){let i=this.canvas.getBoundingClientRect(),e=t.clientX-i.left,s=t.clientY-i.top,n=e>=0&&s>=0&&e<=i.width&&s<=i.height;return{x:e,y:s,inside:n}}};window.__DSH_ASCII_SHARKS_ENGINE__=Dt;})();
    // @engine:end


    // ── Backdrop ────────────────────────────────────────────────────────────
    // One canvas, one token override. This intentionally does NOT touch the
    // frame columns or any other layout node: the canvas sits at z-index -1
    // inside the frame, and the base surface is made translucent so the art
    // can show through. Disabling the plugin removes both changes.
    // ── 遮罩参数 ────────────────────────────────────────────────────────────
    // 两套形状：空白态（DSH 的 hero 阶段）用椭圆，进对话用竖条。
    // 想在运行时试数，直接在 DevTools 里改 window.__DSH_SHARKS_MASK__。
    const MASK_DEFAULTS = {
      // fit: 'content' = 跟着 DSH 自己的正文列宽走（推荐）；'window' = 按屏宽比例（试车台那套）
      ellipse: { fit: 'content', hole: 0.20, pad: 40, fade: 0.55, aspect: 0.48, nudge: 0 },
      rect: { fit: 'content', hole: 0.21, pad: 40, fade: 0.30, aspect: 1.50, nudge: 0 },
      // 'auto' = 空白态椭圆 / 有对话竖条；'none' = 不遮罩，全局可见（只有亮度一个旋钮）
      maskMode: 'auto',
      sidebarPad: 50,
      maxHalf: 0.45,
      // 小窗口兜底（0 = 自动）：净空外面至少留出这么宽的「看得见鱼」的带宽。
      // minBand 管横向（默认按窗口宽的 13%，夹在 48–190px），minBandV 管竖向（只用于空白态椭圆）。
      minBand: 0,
      minBandV: 0,
      // 净空被窗口挤小、鱼会压到正文边上时，整层再压暗到这个比例（1 = 不压暗）
      dimCrushed: 0.7,
      darkOpacity: 0.32,
      lightOpacity: 0.10,
      showInChat: true,
      // 画帧上限。引擎原本跟着屏幕刷新率跑：240Hz 屏就是每秒 240 次整屏重画
      // （约 7400 个格子 × fillText），这是风扇狂转和页面卡的根源。
      // 试着改：window.__DSH_SHARKS_MASK__.fpsCap = 60 / 24 / 15
      fpsCap: 30,
      // 画布像素密度上限。上游默认允许 2x（像素 ×4）。2026-10-26 从 1 抬到 1.25
      // （像素 ×1.56）：字清楚一档，还比上游省一半多；嫌贵改回 1 / 想要更清楚改 1.5。
      // 改了会强制重排一次画布（engine.resize），约 0.7s 内生效。
      dpr: 1.25,
    };

    // ── 体型（2026-10-26 换引擎后：8 鲨 + 座头鲸/虎鲸 = 10 种）──────────────
    // 上游 demo 用 ?sharks=a,b,c 选体型，但那个参数在插件里是死的：引擎只有
    // 默认的 4 条 classic。这里把 10 种做成可选，并把选择记在 localStorage。
    // 前两种是引擎里本来就有、但上游设置页没放出来的大鱼（kind 就叫 whale / orca）。
    const SHARK_SPECIES = [
      { kind: 'whale', label: '座头鲸', en: 'Humpback' },
      { kind: 'orca', label: '虎鲸', en: 'Orca' },
      { kind: 'classic', label: '经典', en: 'Great white' },
      { kind: 'hammerhead', label: '锤头', en: 'Hammerhead' },
      { kind: 'greathammer', label: '大锤头', en: 'Great hammerhead' },
      { kind: 'zebra', label: '斑马', en: 'Zebra' },
      { kind: 'tiger', label: '虎鲨', en: 'Tiger' },
      { kind: 'mako', label: '灰鲭', en: 'Mako' },
      { kind: 'thresher', label: '长尾', en: 'Thresher' },
      { kind: 'nurse', label: '护士鲨', en: 'Nurse' },
    ];
    const SHARK_KINDS = SHARK_SPECIES.map(function (s) { return s.kind; });
    const SPECIES_KEY = 'dsh-ascii-sharks:species';
    const MAX_COUNT = 12;
    // 2026-10-26：默认从 4 条降到 2 条（用户要求）。安静一半，也不容易跟背景
    // 那群小鱼糊成一片；想要热闹按 ＋ 就行，每个种类各自记着。
    const DEFAULT_COUNT = 2;
    // 背景那群小鱼（上游叫 school / fishCount）。2026-10-26 换引擎后才有的旋钮：
    // 旧引擎的鱼群数量是按窗口面积算死的（85–340），连参数都传不进去。
    // 上游两个集成方的取舍：whales 默认 170，scene 默认 40；我们取 170。
    const DEFAULT_FISH = 170;
    const MAX_FISH = 1000;
    // 一次只显示一种鱼。默认 2 条 classic；kind 为空 = 只剩鱼群和浮游点。
    // 每个种类只要没单独调过，条数也是 DEFAULT_COUNT（切过去就是 2 条）。
    const DEFAULT_STATE = { kind: 'classic', counts: {}, fish: DEFAULT_FISH };

    function isKind(kind) { return SHARK_KINDS.indexOf(kind) !== -1; }

    function clampCount(n) {
      n = Math.round(Number(n));
      if (!n || n < 1) return 1;
      return n > MAX_COUNT ? MAX_COUNT : n;
    }

    // 小鱼数量：0 是合法值（一条小鱼都不要），上限 1000。
    function clampFish(n) {
      n = Number(n);
      if (!isFinite(n)) return 0;
      n = Math.round(n);
      if (n < 0) return 0;
      return n > MAX_FISH ? MAX_FISH : n;
    }

    // kind 决定画谁；条数记在这个种类自己头上（切走再切回来还记着）。
    function normalizeState(value) {
      const state = { kind: null, counts: {}, fish: DEFAULT_FISH };
      if (Array.isArray(value)) {
        // 旧格式是一个 kind 列表（八种各一条那套）。原来直接拿总长度当条数，
        // 混编时就会被记成「第一条 × 总数」（比如 8 种各一条 → 8 条经典）。
        // 现在只数第一类真正出现了几次：八种各一条 → 经典 ×1，混编也不会夸大。
        if (value.length && isKind(value[0])) {
          state.kind = value[0];
          state.counts[value[0]] = clampCount(
            value.filter(function (k) { return k === value[0]; }).length
          );
        }
        return state;
      }
      if (value && typeof value === 'object') {
        if (isKind(value.kind)) state.kind = value.kind;
        const counts = value.counts && typeof value.counts === 'object' ? value.counts : {};
        for (const kind of SHARK_KINDS) {
          if (kind in counts) state.counts[kind] = clampCount(counts[kind]);
        }
        if (value.fish != null) state.fish = clampFish(value.fish);
      }
      return state;
    }

    function countOf(state, kind) {
      return clampCount(state.counts[kind] == null ? DEFAULT_COUNT : state.counts[kind]);
    }

    function fishOf(state) {
      return clampFish(state && state.fish == null ? DEFAULT_FISH : state.fish);
    }

    // 第一条最大，后面依次小下去；12 条也不会小到看不见。
    function specsFromState(state) {
      if (!state.kind || !isKind(state.kind)) return [];
      const n = countOf(state, state.kind);
      return Array.from({ length: n }, function (_, index) {
        return { kind: state.kind, size: n === 1 ? 1 : 1 - index * (0.55 / (n - 1)) };
      });
    }

    function loadState() {
      try {
        const raw = window.localStorage.getItem(SPECIES_KEY);
        if (raw) return normalizeState(JSON.parse(raw));
      } catch (error) { /* 读不到或坏了就用默认 */ }
      return normalizeState(DEFAULT_STATE);
    }

    // 迷你 store：设置页里点一下 → 背景立刻重建，不经过服务端，也不用重启。
    const species = {
      state: loadState(),
      listeners: new Set(),
      setState: function (next) {
        const state = normalizeState(next);
        this.state = state;
        try { window.localStorage.setItem(SPECIES_KEY, JSON.stringify(state)); } catch (error) {}
        this.listeners.forEach(function (fn) {
          try { fn(state); } catch (error) { console.error('[dsh-ascii-sharks] species', error); }
        });
      },
      // 点一个种类 = 换成它；点当前这个 = 收掉（只剩小鱼和浮游点）
      select: function (kind) {
        this.setState({
          kind: this.state.kind === kind ? null : kind,
          counts: Object.assign({}, this.state.counts),
          fish: this.state.fish,
        });
      },
      // 条数记在种类自己头上：切走再切回来还是这个数
      setCount: function (kind, n) {
        if (!isKind(kind)) return;
        const counts = Object.assign({}, this.state.counts);
        counts[kind] = clampCount(n);
        this.setState({ kind: this.state.kind, counts: counts, fish: this.state.fish });
      },
      count: function (kind) { return countOf(this.state, kind); },
      // 小鱼数量是全局的（跟选了哪种鱼无关）
      setFish: function (n) {
        this.setState({ kind: this.state.kind, counts: Object.assign({}, this.state.counts), fish: clampFish(n) });
      },
      fish: function () { return fishOf(this.state); },
      clear: function () {
        this.setState({ kind: null, counts: Object.assign({}, this.state.counts), fish: this.state.fish });
      },
      specs: function () { return specsFromState(this.state); },
      // 诊断用：当前实际画出来的 kind 列表（同一种会重复 N 次）
      kinds: function () { return this.specs().map(function (s) { return s.kind; }); },
      subscribe: function (fn) {
        this.listeners.add(fn);
        const self = this;
        return function () { self.listeners.delete(fn); };
      },
    };
    window.__DSH_SHARKS_SPECIES__ = species;
    // 诊断 + 自测用：纯函数也挂出来，tests/species.test.mjs 靠它断言状态机
    // （不依赖 React / 浏览器，Node 里直接跑）。
    window.__DSH_SHARKS_TEST__ = {
      normalizeState: normalizeState,
      clampCount: clampCount,
      clampFish: clampFish,
      countOf: countOf,
      fishOf: fishOf,
      specsFromState: specsFromState,
      SHARK_SPECIES: SHARK_SPECIES,
      DEFAULT_STATE: DEFAULT_STATE,
      DEFAULT_COUNT: DEFAULT_COUNT,
      MAX_COUNT: MAX_COUNT,
      DEFAULT_FISH: DEFAULT_FISH,
      MAX_FISH: MAX_FISH,
    };

    // ── 设置页「背景鱼」──────────────────────────────────────────────────────
    const SETTINGS_CSS_TAG = 'dsh-ascii-sharks/settings.css';
    const SETTINGS_CSS = [
      '.dsh-sharks-cfg{display:flex;flex-direction:column;gap:12px;max-width:720px;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}',
      '.dsh-sharks-cfg__card{display:flex;flex-direction:column;gap:10px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px}',
      '.dsh-sharks-cfg__title{font-size:13px;font-weight:500}',
      '.dsh-sharks-cfg__note{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-sharks-cfg__grid{display:flex;flex-wrap:wrap;gap:8px}',
      '.dsh-sharks-cfg__chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:inherit;border-radius:8px;padding:5px 12px;font:inherit;font-size:13px;line-height:20px;cursor:pointer;white-space:nowrap}',
      '.dsh-sharks-cfg__chip:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-sharks-cfg__chip.is-on{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-active)}',
      '.dsh-sharks-cfg__chip em{font-style:normal;font-size:11px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-sharks-cfg__row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}',
      '.dsh-sharks-cfg__label{font-size:12px;color:var(--dsw-alias-label-secondary)}',
      '.dsh-sharks-cfg__count{min-width:20px;text-align:center;font-size:13px;font-weight:500}',
      '.dsh-sharks-cfg__btn[disabled]{opacity:.4;cursor:default}',
      '.dsh-sharks-cfg__btn[disabled]:hover{background:transparent}',
      '.dsh-sharks-cfg__status{font-size:12px;color:var(--dsw-alias-label-tertiary)}',
      '.dsh-sharks-cfg__btn{border:1px dashed var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);border-radius:8px;padding:4px 12px;font:inherit;font-size:12px;line-height:20px;cursor:pointer;white-space:nowrap}',
      '.dsh-sharks-cfg__btn:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-sharks-cfg__range{flex:1 1 200px;min-width:160px;max-width:420px;accent-color:var(--dsw-alias-state-business-primary)}',
    ].join('');

    function injectSettingsCss() {
      if (typeof document === 'undefined') return;
      if (document.querySelector('style[data-plugin-css="' + SETTINGS_CSS_TAG + '"]')) return;
      const tag = document.createElement('style');
      tag.dataset.plugin = 'dsh-ascii-sharks';
      tag.dataset.pluginCss = SETTINGS_CSS_TAG;
      tag.textContent = SETTINGS_CSS;
      document.head.appendChild(tag);
    }

    function SpeciesSection() {
      const [state, setState] = React.useState(species.state);

      React.useEffect(function () {
        injectSettingsCss();
        return species.subscribe(function (next) { setState(next); });
      }, []);

      const current = state.kind;
      const n = current ? species.count(current) : 0;
      const currentLabel = current
        ? (SHARK_SPECIES.filter(function (s) { return s.kind === current; })[0] || {}).label
        : '';
      const counts = {};
      SHARK_KINDS.forEach(function (kind) { counts[kind] = species.count(kind); });

      const chip = function (item) {
        const on = item.kind === current;
        const count = counts[item.kind];
        return React.createElement('button', {
          key: item.kind,
          type: 'button',
          className: 'dsh-sharks-cfg__chip' + (on ? ' is-on' : ''),
          'aria-pressed': on,
          title: on ? '再点一次收掉，只剩鱼群和浮游点' : '换成它（这个种类记着 ' + count + ' 条）' + (item.en ? ' · ' + item.en : ''),
          onClick: function () { species.select(item.kind); },
        }, item.label, count > 1 ? React.createElement('em', null, '×' + count) : null);
      };

      const step = function (delta) {
        if (!current) return;
        species.setCount(current, species.count(current) + delta);
      };

      const fish = state.fish == null ? DEFAULT_FISH : state.fish;

      return React.createElement('div', { className: 'dsh-sharks-cfg' },
        React.createElement('div', { className: 'dsh-sharks-cfg__card' },
          React.createElement('div', { className: 'dsh-sharks-cfg__title' }, '体型（10 种）'),
          React.createElement('p', { className: 'dsh-sharks-cfg__note' },
            '一次只显示一种：点一个种类就换成它，再点一次收掉（只剩鱼群和浮游点）。条数记在各个种类自己头上，切走再切回来还是那个数。改完立刻生效，不用重启。'),
          React.createElement('div', { className: 'dsh-sharks-cfg__grid' }, SHARK_SPECIES.map(chip)),
          React.createElement('div', { className: 'dsh-sharks-cfg__row' },
            React.createElement('span', { className: 'dsh-sharks-cfg__label' }, '条数'),
            React.createElement('button', {
              type: 'button', className: 'dsh-sharks-cfg__btn', disabled: !current || n <= 1,
              onClick: function () { step(-1); },
            }, '−'),
            React.createElement('span', { className: 'dsh-sharks-cfg__count' }, current ? String(n) : '—'),
            React.createElement('button', {
              type: 'button', className: 'dsh-sharks-cfg__btn', disabled: !current || n >= MAX_COUNT,
              onClick: function () { step(1); },
            }, '＋'),
            React.createElement('span', { className: 'dsh-sharks-cfg__status' },
              current
                ? '当前 ' + n + ' 条' + currentLabel + '（同一种，第一条最大，往后依次小下去）'
                : '当前没有鲨鱼（只剩鱼群和浮游点）'),
          ),
          React.createElement('div', { className: 'dsh-sharks-cfg__row' },
            React.createElement('button', {
              type: 'button', className: 'dsh-sharks-cfg__btn',
              onClick: function () {
                species.setState({
                  kind: 'classic',
                  counts: Object.assign({}, species.state.counts, { classic: DEFAULT_COUNT }),
                });
              },
            }, '经典 ×' + DEFAULT_COUNT + '（默认）'),
            React.createElement('button', {
              type: 'button', className: 'dsh-sharks-cfg__btn',
              onClick: function () { species.clear(); },
            }, '不要大鱼，只看小鱼'),
            React.createElement('span', { className: 'dsh-sharks-cfg__status' },
              '每种 1–' + MAX_COUNT + ' 条，默认 ' + DEFAULT_COUNT + ' 条 · 前两种是鲸类'),
          )),
        React.createElement('div', { className: 'dsh-sharks-cfg__card' },
          React.createElement('div', { className: 'dsh-sharks-cfg__title' }, '背景小鱼'),
          React.createElement('p', { className: 'dsh-sharks-cfg__note' },
            '大鱼之外，背景里还有一群小鱼，大鱼会去追它们。数量改完立刻生效（引擎要重建一次，约 0.1 秒）。0 = 一条小鱼都不要。'),
          React.createElement('div', { className: 'dsh-sharks-cfg__row' },
            React.createElement('input', {
              type: 'range', className: 'dsh-sharks-cfg__range',
              min: 0, max: MAX_FISH, step: 10, value: fish,
              'aria-label': '小鱼数量',
              onChange: function (e) { species.setFish(e.target.value); },
            }),
            React.createElement('span', { className: 'dsh-sharks-cfg__count' }, String(fish)),
            React.createElement('span', { className: 'dsh-sharks-cfg__status' },
              fish === 0 ? '一条小鱼都不要' : '条（0–' + MAX_FISH + '，步长 10）'),
          ),
          React.createElement('div', { className: 'dsh-sharks-cfg__row' },
            React.createElement('button', {
              type: 'button', className: 'dsh-sharks-cfg__btn',
              onClick: function () { species.setFish(DEFAULT_FISH); },
            }, '小鱼 ' + DEFAULT_FISH + '（默认）'),
            React.createElement('button', {
              type: 'button', className: 'dsh-sharks-cfg__btn',
              onClick: function () { species.setFish(0); },
            }, '不要小鱼'),
          )));
    }

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

        // 引擎构造时就把 specs / 外观读进去了，所以换体型或调小鱼都要重建实例（canvas 不动）。
        // 参数顺序照 vendor/ascii-sharks/engine.ts 的构造签名，一共 15 个：
        //   canvas, sharks, speed, dark, gridScale, gridOpacity, fishCount,
        //   wake, color, glyphMode, colorfulShimmer, eyeColor, bodySwing, turnAgility, tailFrequency
        // dark 必须 true：引擎画黑底，靠 canvas 上的 mix-blend-mode:screen 把黑当透明；
        // 给 false 它会去画浅色前景，screen 之后就什么都看不见了。
        // 外观参数照最初那版引擎的观感（speed 1 / 网格 1×0.05 / wake 1 / ASCII）。
        // color：上游这一版拿它当「总色调」去派生身体、小鱼、海底尘埃和网格，传蓝色整幅就发蓝；
        // 身体 / 小鱼 / 尘埃 / 网格已经还原成最初那版的固定配色（见 vendor 的 patch:original-color），
        // 这个值现在只剩尾巴上的水花在用，取最初引擎自己的灰 #9aa0ad。
        const ENGINE_LOOK = { speed: 1, gridScale: 1, gridOpacity: 0.05, wake: 1, color: '#9aa0ad' };
        function buildEngine() {
          try {
            if (typeof window.__DSH_ASCII_SHARKS_ENGINE__ !== 'function') {
              throw new Error('ascii-sharks engine was not registered');
            }
            return new window.__DSH_ASCII_SHARKS_ENGINE__(
              canvas,
              species.specs(),
              ENGINE_LOOK.speed,
              true,
              ENGINE_LOOK.gridScale,
              ENGINE_LOOK.gridOpacity,
              species.fish(),
              ENGINE_LOOK.wake,
              ENGINE_LOOK.color,
              'ascii',
              true,
              'primary',
              1,
              1,
              1
            );
          } catch (error) {
            console.error('[dsh-ascii-sharks] engine', error);
            return null;
          }
        }
        let engine = buildEngine();
        window.__DSH_SHARKS_ENGINE_INSTANCE__ = engine;
        // 拖小鱼滑块时订阅会连着响，重建一次引擎几十毫秒，所以防抖 100ms：
        // 松手之后只重建最后那一次（拖 20 下不会重建 20 次）。
        let rebuildTimer = 0;
        const offSpecies = species.subscribe(function () {
          if (rebuildTimer) clearTimeout(rebuildTimer);
          rebuildTimer = setTimeout(function () {
            rebuildTimer = 0;
            if (engine) engine.destroy();
            engine = buildEngine();
            window.__DSH_SHARKS_ENGINE_INSTANCE__ = engine;
            // 新引擎的 minFrameMs 是 0（不设上限），当场补上，别等下一轮 0.7s 轮询
            if (engine) {
              const cap = P.fpsCap == null ? 30 : P.fpsCap;
              if (cap > 0) engine.minFrameMs = 1000 / cap;
            }
          }, 100);
        });

        const P = window.__DSH_SHARKS_MASK__ || MASK_DEFAULTS;
        window.__DSH_SHARKS_MASK__ = P;
        const info = window.__DSH_SHARKS_MASK_INFO__ || {};
        window.__DSH_SHARKS_MASK_INFO__ = info;

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
          let crushed = false;
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

            // 小窗口兜底（2026-10-26）：净空是照着 DSH 那套固定列宽（920px）算的，
            // 窗口一窄，「净空 + 渐变」就把整条宽度吃光，两边一条鱼都剩不下——
            // 得开全屏才看得见。这里反过来：先给两侧各留一段能看见鱼的带宽
            // （窗口的 13%，夹在 48–190px），再让净空缩到放得下为止。
            // 净空被压到不足正文半宽的一半时，把鱼整体再压暗一档，正文仍读得清。
            const bandMin = P.minBand
              ? P.minBand
              : Math.max(48, Math.min(190, W * 0.13));
            const bandMinV = P.minBandV
              ? P.minBandV
              : Math.max(40, Math.min(140, H * 0.10));
            const roomH = Math.max(24, Math.min(cx, W - cx) - bandMin) / (1 + p.fade);
            const roomV = hero
              ? Math.max(24, H / 2 - bandMinV) / ((1 + p.fade) * p.aspect)
              : Infinity;
            const fitHalf = Math.min(roomH, roomV);
            if (fitHalf < hw) {
              hw = fitHalf;
              if (p.fit !== 'window' && hw < contentHalf * 0.6) crushed = true;
            }
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
          // 窄窗口里净空被挤小、鱼会压到正文边上时，整层再压暗一档保住可读性
          const dimFactor = crushed ? (P.dimCrushed == null ? 0.7 : P.dimCrushed) : 1;
          const op = shown
            ? (dark ? P.darkOpacity : P.lightOpacity) * dimFactor
            : 0;
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
          const sideEnd = colLeft > 8 ? colLeft + (P.sidebarPad == null ? 50 : P.sidebarPad) : 0;
          info.bandL = Math.round(Math.max(0, cx - oh - sideEnd));
          info.bandR = Math.round(Math.max(0, W - cx - oh));
          info.crushed = crushed;

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
          if (rebuildTimer) clearTimeout(rebuildTimer);
          offSpecies();
          if (engine) engine.destroy();
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
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
        try {
          ctx.slots.inject('settings.section', function () {
            return ctx.slots.register({
              name: 'settings.section',
              id: 'ascii-sharks-species',
              order: 40,
              label: function () { return '背景鱼'; },
            }, function () { return SpeciesSection(); });
          });
        } catch (error) {
          console.error('[dsh-ascii-sharks] settings slot', error);
        }
      },
    };
  },
});
