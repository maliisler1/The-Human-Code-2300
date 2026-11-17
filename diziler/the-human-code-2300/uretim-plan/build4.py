import subprocess,sys,json
C="c4/"
OFF={'A1':1.21,'E1':0.46,'S1':0.79,'M1':1.51,'A2':2.16,'M2':0.97,'G1':2.25,'A3':1.92,'G2':1.68,'E2':2.64,'S2':2.52,'A4':1.34,'G3':2.55,'M3':2.06}
CROP={"L_E2":"crop=1280:630:0:44,","L_G1":"crop=1280:672:0:0,","L_G2":"crop=1280:532:0:94,","L_G3":"crop=1280:634:0:43,","L_M1":"crop=1280:678:0:20,"}
def dur(k): return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'vo_w/{k}.wav'],capture_output=True,text=True).stdout)
B=[('b',['T34','T01','T25'],['R','R2']),('b',['G03','T29','T04'],['P5','P1']),('l','A1'),('l','E1'),('b',['T30'],['E3']),('l','S1'),('l','M1'),
('b',['T05'],['P2']),('b',['T02','RG06','RE07','RE31','RE09'],['P6','E4','P7','E5','S3']),('l','A2'),('b',['T12','RG35'],['P8','A5']),('b',['T11'],['M4']),('l','M2'),
('b',['RG27','T13'],['P9']),('l','G1'),('l','A3'),('l','G2'),('b',['T14'],[]),('l','E2'),('b',['RG15'],['P3']),('b',['RG16','RE17'],['S4','E6']),
('b',['RG18','T33','T19'],['P10','R3']),('l','S2'),('b',['T20','T26'],['P4','G4']),('l','A4'),('b',['RT21'],['L1']),('b',['T22'],['P11']),('l','G3'),('b',['T23'],[]),('l','M3'),('b',['T24','T28'],['N2'])]
T=0.35;GAP=0.3;MAXS=5.15
E=[];vo=[];V=T;A=0.0;mark={}
for bi,b in enumerate(B):
    mark[bi]=V-T
    if b[0]=='l':
        k=b[1];d=dur(k);pre=min(0.45,OFF[k]);s=OFF[k]-pre;e=min(5.04,OFF[k]+d+0.4)
        S=V-T
        if S+pre<A+0.25: # push: hold previous? increase pre
            need=A+0.25-(S+pre);add=min(need,s);pre+=add;s-=add
            if S+pre<A+0.25: print("UYARI cakisma",k,round(A+0.25-(S+pre),2))
        E.append(("L_"+k,round(s,3),round(e,3)));vo.append((k,S+pre));A=S+pre+d;V=S+(e-s)
    else:
        shots,lines=b[1],b[2];S=V-T;t=max(A+GAP,S+0.35)
        for k in lines: d=dur(k);vo.append((k,t));t+=d+GAP;A=t-GAP
        end=max(t+0.05,S+1.6*len(shots)) if lines else S+1.4
        L=end-S;n=len(shots);seg=(L+(n-1)*T)/n
        if seg>MAXS: print("UYARI uzun",bi,round(seg,2))
        seg=min(seg,MAXS)
        for sh in shots: o=(5.0 if sh=='RG15' else 4.5) if sh.startswith('R') else 0.0; E.append((sh,o,round(o+seg,3)))
        V=S+n*seg-(n-1)*T
n=len(E);DL=[e-s for _,s,e in E];ST=[sum(DL[:i])-i*T for i in range(n)]
vlen=sum(DL)-(n-1)*T;ET=1.0;END=9.0;total=vlen-ET+END
DUR={k:dur(k) for k,_ in vo}
vs=sorted(vo,key=lambda x:x[1]);gaps=[(vs[i][0],vs[i+1][0],round(vs[i+1][1]-vs[i][1]-DUR[vs[i][0]],2)) for i in range(len(vs)-1)]
print("sure",round(total,2),"replik",len(vo),"max bosluk",max(g[2] for g in gaps),"min",min(g[2] for g in gaps))
print([g for g in gaps if g[2]>1.0 or g[2]<0.1])
json.dump({"E":E,"vo":vo,"dur":DUR,"total":total,"mark":mark},open("edl4.json","w"))
if len(sys.argv)<2: sys.exit()
bt=lambda bi:mark[bi]
import sys as _s;_s.path.insert(0,'/home/claude');import seri
MUS=seri.mus(vlen,ET,END,[(bt(7)-0.5,bt(13)-bt(7)+0.5),(bt(16),bt(19)-bt(16)),(bt(26),bt(30)-bt(26))])+[("cues/hiss.wav",bt(28)+0.1,0.9,2.0)]
a=["ffmpeg","-y","-v","error"]
for f,s,e in E:a+=["-ss",str(s),"-t",str(e-s),"-i",C+f+".mp4"]
a+=["-f","lavfi","-t",str(END),"-i","color=c=black:s=1920x1080:r=24"]
a+=["-f","lavfi","-t",str(total),"-i","anoisesrc=color=brown:amplitude=0.015:r=48000"]
base=n+2
for c,_,_,_ in MUS:a+=["-i",c]
vb=base+len(MUS)
for nm,t in vo:a+=["-i",f"vo_w/{nm}.wav"]
F=[]
for i in range(n):
    F.append(f"[{i}:v]{CROP.get(E[i][0],'')}scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080,unsharp=5:5:0.5,eq=brightness=0.02:saturation=1.05,setsar=1,fps=24,format=yuv420p,trim=duration={DL[i]:.3f},setpts=PTS-STARTPTS[v{i}]")
font="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F.append(f"[{n}:v]format=yuv420p,drawtext=fontfile={font}:text='The Human Code\\: 2300':fontsize=78:fontcolor=white:x=(w-tw)/2:y=h/2-110,drawtext=fontfile={font}:text='Bölüm 5 — Leon':fontsize=46:fontcolor=0xff5a5a:x=(w-tw)/2:y=h/2+10,drawtext=fontfile={font}:text='Yakında':fontsize=34:fontcolor=white@0.8:x=(w-tw)/2:y=h/2+80,fade=t=in:st=0:d=1[vend]")
p="v0"
for i in range(1,n):
    F.append(f"[{p}][v{i}]xfade=transition=fade:duration={T}:offset={ST[i]:.3f}[x{i}]");p=f"x{i}"
F.append(f"[{p}][vend]xfade=transition=fade:duration={ET}:offset={vlen-ET:.3f},fade=t=in:st=0:d=1.2[vout]")
L=[]
for j,(nm,t) in enumerate(vo):
    ms=int(t*1000);fx=""
    if nm.startswith("G"): fx="asetrate=48000*0.9,aresample=48000,atempo=1.1111,aecho=0.8:0.6:70:0.22,"
    if nm=="L1": fx="highpass=f=350,lowpass=f=3200,acrusher=bits=10:mix=0.25,"
    F.append(f"[{vb+j}:a]aresample=48000,{fx}aformat=channel_layouts=stereo,adelay={ms}|{ms}[e{j}]");L.append(f"[e{j}]")
F.append(f"{''.join(L)}amix=inputs={len(L)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f},volume=1.7,asplit=2[dlg][sc]")
ML=[]
for k,(c,t0,vol,d) in enumerate(MUS):
    ms=int(max(t0,0)*1000);F.append(f"[{base+k}:a]aresample=48000,aformat=channel_layouts=stereo,aloop=loop=3:size=3072000,atrim=duration={d:.2f},afade=t=in:d={0.05 if 'hiss' in c else 1.2},afade=t=out:st={max(d-2.0,0.5):.2f}:d=2.0,volume={vol},adelay={ms}|{ms}[m{k}]");ML.append(f"[m{k}]")
F.append(f"{''.join(ML)}amix=inputs={len(ML)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f}[mus]")
F.append(f"[{n+1}:a]lowpass=f=400,aformat=channel_layouts=stereo[amb]")
F.append("[mus][amb]amix=inputs=2:normalize=0[bed]")
F.append("[bed][sc]sidechaincompress=threshold=0.05:ratio=2.5:attack=40:release=700[duck]")
F.append("[dlg][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
a+=["-filter_complex",";".join(F),"-map","[vout]","-map","[aout]","-c:v","libx264","-preset","medium","-crf","17","-pix_fmt","yuv420p","-ar","48000","-c:a","aac","-b:a","160k","-movflags","+faststart","-t",f"{total:.2f}",sys.argv[1]]
subprocess.run(a,check=True);print("ok")
