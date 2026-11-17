import subprocess
# (file, start, end, [(name, local_t)])
E=[("01",0,10.125,[("N1",1.5)],1),
("02",0,10.125,[("N2",1.8)],0.85),
("SLEEP",0,5.04,[],1),
("z1_alarm",0,3.6,[("P8",0.2)],1),
("L_A11",1.0,5.04,[("A11",2.21)],1),
("04",1.5,5.8,[],1),
("L_A1",0.0,5.04,[("A1",2.07)],1),
("05",1.5,4.0,[],1),
("L_A2",0.0,5.04,[("A2",1.76)],1),
("o_room",0,5.17,[("P1",0.1)],1),
("o_room2",0,4.6,[("P2b",0.6)],1),
("08r",3.0,10.125,[("P3",0.3)],1),
("08",7.0,10.125,[],1),
("09",1.0,2.4,[],1),
("L_A4",0.3,5.04,[("A4",2.21)],1),
("o_forest",0,5.17,[("P4",0.3)],1),
("10r",5.0,10.125,[("A5",0.6)],1),
("o_forest2",0,3.0,[("P5",0.5)],1),
("z3_shards",0,5.17,[("P9",0.6)],1),
("z4_hood",0,5.17,[],1),
("12",5.6,10.125,[("A6",0.5)],1),
("L_T1",0.0,5.04,[("T1",2.18)],1),
("14",4.0,5.0,[("A7",0.05),("T2",0.95)],1),
("w_earth",0,5.17,[],1),
("w_dna",0,5.17,[],1),
("L_A8",2.1,5.04,[("A8",1.14)],1),
("16",4.0,10.125,[("T3",0.6)],1),
("L_A12",1.0,5.04,[("A12",1.44)],1),
("16r",2.0,4.8,[("A9",0.81)],1),
("z5_wave",0,5.17,[("P6",0.5)],1),
("17r",1.6,6.5,[],1),
("o_field",0,5.17,[("P7",0.5)],1),
("L_A10",1.5,5.04,[("A10",1.22)],1),
("18",2.0,10.125,[("L1",1.0),("L2",4.6)],1),
("L_A13",1.5,5.04,[("A13",1.2)],1),
("02",3.0,10.125,[],0.85)]
T=0.35;END=14.0;ET=1.0
n=len(E);DL=[(e-s)/sp for _,s,e,_,sp in E];ST=[sum(DL[:i])-i*T for i in range(n)]
vlen=sum(DL)-(n-1)*T;total=vlen-ET+END
print("sure",round(total,2))
# music cues: (cue file, start time, volume)
idx={i:ST[i] for i in range(n)}
MUS=[("cues/sakin_acilis.wav",0.0,0.30,34),("cues/doruk_heyecan.wav",ST[27]-0.5,0.32,24),("cues/kapanis.wav",vlen-ET-2.0,0.45,END+2.0)]
import sys as _s;_s.path.insert(0,'/home/claude');import seri
PEAKS=[(ST[18]-0.3,ST[21]-ST[18]+0.3),(ST[29],ST[32]-ST[29])]
MUS=[('cues/sakin_acilis.wav',0.0,0.30,34)]+[m for m in seri.mus(vlen,ET,END,PEAKS) if not (m[0].endswith('sakin.wav') and m[1]<30)]+[(seri.M+'sakin.wav',31.0,0.30,ST[18]-0.3-31.0+2.0)]
a=["ffmpeg","-y","-v","error"]
for f,s,e,_,sp in E:a+=["-ss",str(s),"-t",str(e-s),"-i",f+".mp4"]
a+=["-f","lavfi","-t",str(END),"-i","color=c=black:s=1920x1080:r=24"]
a+=["-f","lavfi","-t",str(total),"-i","anoisesrc=color=brown:amplitude=0.015:r=48000"]
base=n+2
for c,_,_,_ in MUS:a+=["-i",c]
vo=[];vb=base+len(MUS)
for i,(f,s,e,evs,sp) in enumerate(E):
    for nm,t in evs: vo.append((nm,ST[i]+t)); a+=["-i",f"vo/{nm}.wav"]
for nm,t in seri.nar("b01"): vo.append((nm,t)); a+=["-i",f"vo/{nm}.wav"]
F=[]
for i in range(n):
    F.append(f"[{i}:v]setpts=(PTS-STARTPTS)/{E[i][4]},scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080,unsharp=5:5:0.5,setsar=1,fps=24,format=yuv420p,trim=duration={DL[i]:.3f},setpts=PTS-STARTPTS[v{i}]")
font="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F.append(f"[{n}:v]format=yuv420p,drawtext=fontfile={font}:text='The Human Code\\: 2300':fontsize=78:fontcolor=white:x=(w-tw)/2:y=h/2-110,drawtext=fontfile={font}:text='Bölüm 2 — Kayıp Sinyal':fontsize=46:fontcolor=0x5fe3d6:x=(w-tw)/2:y=h/2+10,drawtext=fontfile={font}:text='Yakında':fontsize=34:fontcolor=white@0.8:x=(w-tw)/2:y=h/2+80,fade=t=in:st=0:d=1[vend]")
p="v0"
for i in range(1,n):
    F.append(f"[{p}][v{i}]xfade=transition=fade:duration={T}:offset={ST[i]:.3f}[x{i}]");p=f"x{i}"
F.append(f"[{p}][vend]xfade=transition=fade:duration={ET}:offset={vlen-ET:.3f},fade=t=in:st=0:d=1.2[vout]")
L=[]
for j,(nm,t) in enumerate(vo):
    ms=int(t*1000);fx="highpass=f=350,lowpass=f=3200,acrusher=bits=10:mix=0.25,volume=1.3," if nm in ("L1","L2") else ""
    F.append(f"[{vb+j}:a]{fx}aresample=48000,aformat=channel_layouts=stereo,adelay={ms}|{ms}[e{j}]");L.append(f"[e{j}]")
F.append(f"{''.join(L)}amix=inputs={len(L)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f},volume=1.7,asplit=2[dlg][sc]")
ML=[]
for k,(c,t0,vol,dur) in enumerate(MUS):
    ms=int(t0*1000);F.append(f"[{base+k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=duration={dur},afade=t=in:d=1.5,afade=t=out:st={dur-4}:d=4,volume={vol},adelay={ms}|{ms}[m{k}]");ML.append(f"[m{k}]")
F.append(f"{''.join(ML)}amix=inputs={len(ML)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f},afade=t=out:st={total-2.5:.2f}:d=2.5[mus]")
F.append(f"[{n+1}:a]lowpass=f=400,aformat=channel_layouts=stereo[amb]")
F.append("[mus][amb]amix=inputs=2:normalize=0[bed]")
F.append("[bed][sc]sidechaincompress=threshold=0.05:ratio=2.5:attack=40:release=700[duck]")
F.append("[dlg][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
a+=["-filter_complex",";".join(F),"-map","[vout]","-map","[aout]","-c:v","libx264","-crf","17","-maxrate","12M","-bufsize","24M","-preset:v","medium","-pix_fmt","yuv420p","-ar","48000","-c:a","aac","-b:a","160k","-movflags","+faststart","-t",f"{total:.2f}","bolum01_v20.mp4"]
subprocess.run(a,check=True);print("ok")
