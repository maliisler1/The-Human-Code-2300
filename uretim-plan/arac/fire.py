import sys
from PIL import Image
import numpy as np
from scipy.ndimage import binary_opening,gaussian_filter
def fire(src,dst):
    im=Image.open(src).convert('RGB')
    hsv=np.array(im.convert('HSV')).astype(float)
    H,S,V=hsv[...,0]*360/255,hsv[...,1]/255,hsv[...,2]/255
    m=(H>5)&(H<32)&(S>0.55)&(V>0.12)
    m=binary_opening(m,iterations=2)
    w=gaussian_filter(m.astype(float),2)
    H2=H*(1-w)+(H*0.15)*w
    S2=np.clip(S*(1-w)+np.minimum(1,S*1.25)*w,0,1)
    V2=np.clip(V*(1-w)+np.minimum(1,V*1.05)*w,0,1)
    o=np.stack([H2/360*255,S2*255,V2*255],-1).astype(np.uint8)
    Image.fromarray(o,'HSV').convert('RGB').save(dst,quality=95)
fire(sys.argv[1],sys.argv[2])
