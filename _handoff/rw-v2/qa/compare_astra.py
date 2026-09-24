from pathlib import Path
from PIL import Image, ImageDraw
import run_qa as q
out=q.ROOT/'docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra'
refs=Path('/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS')
labels=['01-entry','02-first-scroll','03-artifact','04-thread','05-evidence','06-figure','07-variation','08-conclusion']
for i,(ref,label) in enumerate(zip(sorted(refs.glob('*.png')),labels),1):
 sheet=Image.new('RGB',(1920,720),'#e9edf4');d=ImageDraw.Draw(sheet)
 for x,path,title in [(0,ref,'TIER A REFERENCE'),(960,out/f'{label}--dark.jpg','IMPLEMENTATION / DARK')]:
  im=Image.open(path);im.thumbnail((950,670));sheet.paste(im,(x+(950-im.width)//2,34));d.text((x+14,12),title,fill='#122036')
 sheet.save(out/f'compare-{i:02}.jpg',quality=76,optimize=True)
ref=sorted(refs.glob('*.png'))[-1]
sheet=Image.new('RGB',(1920,720),'#e9edf4');d=ImageDraw.Draw(sheet);im=Image.open(ref);im.thumbnail((950,670));sheet.paste(im,(0,34));d.text((14,12),'TIER A / MOBILE',fill='#122036')
for i,label in enumerate(['entry','contents','thread','evidence']):
 im=Image.open(out/f'09-mobile-{label}--dark.jpg');im.thumbnail((231,650));sheet.paste(im,(960+i*239,34));d.text((960+i*239,12),label.upper(),fill='#122036')
sheet.save(out/'compare-09.jpg',quality=76,optimize=True)
print('JPEG total',round(sum(p.stat().st_size for p in out.glob('*.jpg'))/1e6,2),'MB')
