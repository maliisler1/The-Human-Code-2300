import sys,subprocess,numpy as np,json
from scipy.ndimage import gaussian_filter
src,dst=sys.argv[1],sys.argv[2]
info=json.loads(subprocess.run(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate','-of','json',src],capture_output=True,text=True).stdout)['streams'][0]
W,H=info['width'],info['height'];fps=info['r_frame_rate']
rd=subprocess.Popen(['ffmpeg','-v','error','-i',src,'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
wr=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',fps,'-i','-','-i',src,'-map','0:v','-map','1:a?','-c:v','libx264','-crf','16','-preset','medium','-pix_fmt','yuv420p','-c:a','copy',dst],stdin=subprocess.PIPE)
n=W*H*3
while True:
    b=rd.stdout.read(n)
    if len(b)<n: break
    x=np.frombuffer(b,np.uint8).reshape(H,W,3).astype(np.float32)/255
    mx=x.max(2);mn=x.min(2);d=mx-mn+1e-6
    r,g,bb=x[...,0],x[...,1],x[...,2]
    h=np.where(mx==r,((g-bb)/d)%6,np.where(mx==g,(bb-r)/d+2,(r-g)/d+4))*60
    s=d/(mx+1e-6);v=mx
    m=((h>5)&(h<32)&(s>0.5)&(v>0.12)).astype(np.float32)
    w=gaussian_filter(m,2)
    h2=h*(1-w)+h*0.15*w;s2=np.clip(s*(1+0.25*w),0,1);v2=np.clip(v*(1+0.05*w),0,1)
    c=v2*s2;hp=h2/60;X=c*(1-np.abs(hp%2-1));z=np.zeros_like(c);i=np.floor(hp).astype(int)%6
    R=np.choose(i,[c,X,z,z,X,c]);G=np.choose(i,[X,c,c,X,z,z]);B=np.choose(i,[z,z,X,c,c,X]);mm=v2-c
    o=np.stack([R+mm,G+mm,B+mm],-1)
    wr.stdin.write((np.clip(o,0,1)*255+0.5).astype(np.uint8).tobytes())
wr.stdin.close();wr.wait();print('ok',dst)
