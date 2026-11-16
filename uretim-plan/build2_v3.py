import subprocess,sys
C="c2/"
# (file, start, end, speed, [(vo, local_t_out)])
E=[("g_cliff",0,5.17,1,[("R0",0.6)]),
("forest_dawn",0,5.17,1,[]),
("sleep",7.0,10.1,1,[("N1a",1.0)]),
("eyes",0,5.17,1,[("N1b",0.4)]),
("orb_red",0,5.17,1,[("P1",0.3)]),
("islands",0,5.17,1,[("L1",0.3)]),
("L_A1",0.5,5.0,1,[("A1",0.84)]),
("L_T1b",0,5.0,1,[("T1",1.23)]),
("holo_map",0,5.17,1,[("P2",0.6)]),
("run_bridge",4.5,10.1,1,[]),
("y1_jump",0,5.17,1,[("S4",0.5)]),
("bridge_collapse",0,5.17,1,[]),
("x_slide",0,5.17,1,[]),
("fall_grab",5.0,10.1,1,[("S1",0.4)]),
("L_S2",0,5.0,1,[("S2",0.42)]),
("L_A5",0.5,5.0,1,[("A5",1.5)]),
("L_S5",0,5.0,1,[("S5",1.5)]),
("y5_island",0,5.17,1,[]),
("x_ridge",0,5.17,1,[("N2",0.8)]),
("W1",4.5,9.1,1,[("S3",0.8)]),("W2",5.0,7.35,1,[]),
("cave_entr",0,5.17,1,[("P3",1.0)]),
("y2_swarm",0,5.17,1,[]),
("L_A2",0.6,5.0,1,[("A2",1.12)]),
("Y3",4.8,7.4,1,[]),
("L_E1",0.3,5.0,1,[("E1",0.79)]),
("y4_eray_run",0,1.5,1,[]),
("eray_pet",4.0,10.1,1,[("E2",0.2)]),
("L_A6",0,5.0,1,[("A6",0.40)]),
("L_E4",0,5.0,1,[("E4",0.4)]),
("palm23",6.0,10.1,1,[("P4",1.5)]),
("x_gate",0,5.17,1,[("P6",1.1)]),
("capsule7",0,5.17,1,[]),
("L_A3",1.4,5.0,1,[("A3",0.76)]),
("L_M1",0,5.0,1,[("M1",1.78)]),
("L_A7",0.8,5.0,1,[("A7",0.83)]),
("L_M3",0,3.8,1,[("M3",0.4)]),
("g_cave",0,5.15,1,[("M2",0.5),("E3",4.3)]),
("z4_hood",0,5.15,1,[("G1a",2.2),("G1b",3.8)]),
("y6_hood",0,2.8,1,[])]
T=0.35;ET=1.0
n=len(E);DL=[(e-s)/sp for _,s,e,sp,_ in E];ST=[sum(DL[:i])-i*T for i in range(n)]
vlen=sum(DL)-(n-1)*T;END=10.0;total=vlen-ET+END
idx={E[i][0]:i for i in range(n)}
print("sure",round(total,2),"END",round(END,1))
MUS=[("../b01/cues/sakin_acilis.wav",0.0,0.26,22),
     ("../b01/cues/doruk_heyecan.wav",ST[idx["run_bridge"]]+0.3,0.24,22),
     ("../b01/cues/yukselis.wav",ST[idx["x_gate"]]+0.3,0.18,14),
     ("../b01/cues/kapanis.wav",vlen-ET-1.0,0.5,END+1.5)]
import sys as _s;_s.path.insert(0,'/home/claude');import seri
PEAKS=[(ST[idx['run_bridge']],ST[idx['L_S2']]-ST[idx['run_bridge']]),(ST[idx['y2_swarm']],ST[idx['eray_pet']]-ST[idx['y2_swarm']]),(ST[idx['z4_hood']]-1.0,ST[idx['y6_hood']]-ST[idx['z4_hood']]+1.0)]
MUS=seri.mus(vlen,ET,END,PEAKS)
a=["ffmpeg","-y","-v","error"]
for f,s,e,sp,_ in E:a+=["-ss",str(s),"-t",str(e-s),"-i",C+f+".mp4"]
a+=["-f","lavfi","-t",str(END),"-i","color=c=black:s=1920x1080:r=24"]
a+=["-f","lavfi","-t",str(total),"-i","anoisesrc=color=brown:amplitude=0.015:r=48000"]
base=n+2
for c,_,_,_ in MUS:a+=["-i",c]
vb=base+len(MUS);vo=[]
for i,(f,s,e,sp,evs) in enumerate(E):
    for nm,t in evs: vo.append((nm,ST[i]+t)); a+=["-i",f"vo/{nm}.wav"]
for nm,t in seri.nar("b02"): vo.append((nm,t)); a+=["-i",f"vo/{nm}.wav"]
F=[]
for i in range(n):
    F.append(f"[{i}:v]setpts=(PTS-STARTPTS)/{E[i][3]},scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080,unsharp=5:5:0.5,setsar=1,fps=24,format=yuv420p,trim=duration={DL[i]:.3f},setpts=PTS-STARTPTS[v{i}]")
font="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F.append(f"[{n}:v]format=yuv420p,drawtext=fontfile={font}:text='The Human Code\\: 2300':fontsize=78:fontcolor=white:x=(w-tw)/2:y=h/2-110,drawtext=fontfile={font}:text='Bölüm 3 — Gölgenin Adı':fontsize=46:fontcolor=0xff5a5a:x=(w-tw)/2:y=h/2+10,drawtext=fontfile={font}:text='Yakında':fontsize=34:fontcolor=white@0.8:x=(w-tw)/2:y=h/2+80,fade=t=in:st=0:d=1[vend]")
p="v0"
for i in range(1,n):
    F.append(f"[{p}][v{i}]xfade=transition=fade:duration={T}:offset={ST[i]:.3f}[x{i}]");p=f"x{i}"
F.append(f"[{p}][vend]xfade=transition=fade:duration={ET}:offset={vlen-ET:.3f},fade=t=in:st=0:d=1.2[vout]")
L=[]
for j,(nm,t) in enumerate(vo):
    ms=int(t*1000);F.append(f"[{vb+j}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={ms}|{ms}[e{j}]");L.append(f"[e{j}]")
F.append(f"{''.join(L)}amix=inputs={len(L)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f},volume=1.7,asplit=2[dlg][sc]")
ML=[]
for k,(c,t0,vol,dur) in enumerate(MUS):
    ms=int(max(t0,0)*1000);F.append(f"[{base+k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=duration={dur:.2f},afade=t=in:d=1.5,afade=t=out:st={max(dur-2.5,0.5):.2f}:d=2.5,volume={vol},adelay={ms}|{ms}[m{k}]");ML.append(f"[m{k}]")
F.append(f"{''.join(ML)}amix=inputs={len(ML)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f}[mus]")
F.append(f"[{n+1}:a]lowpass=f=400,aformat=channel_layouts=stereo[amb]")
F.append("[mus][amb]amix=inputs=2:normalize=0[bed]")
F.append("[bed][sc]sidechaincompress=threshold=0.05:ratio=2.5:attack=40:release=700[duck]")
F.append("[dlg][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
a+=["-filter_complex",";".join(F),"-map","[vout]","-map","[aout]","-c:v","libx264","-preset","medium","-crf","17","-maxrate","12M","-bufsize","24M","-pix_fmt","yuv420p","-ar","48000","-c:a","aac","-b:a","160k","-movflags","+faststart","-t",f"{total:.2f}",sys.argv[1]]
subprocess.run(a,check=True);print("ok")
