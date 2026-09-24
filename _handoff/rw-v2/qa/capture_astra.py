from pathlib import Path
import sys
from playwright.sync_api import sync_playwright
import run_qa as q
OUT=q.ROOT/'docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra'
OUT.mkdir(parents=True,exist_ok=True)
def align(p,selector,top=110):
 p.locator(selector).first.evaluate('(el, top) => scrollTo({top: scrollY + el.getBoundingClientRect().top - top, behavior: "instant"})',top)
 p.wait_for_timeout(550)
def capture(group='all'):
 with sync_playwright() as pw:
  b=pw.chromium.launch()
  states=[('01-entry',q.ESSAY,None),('02-first-scroll',q.ESSAY,'.section-marker'),('02-pullquote',q.ESSAY,'.pull-quote--quote:has-text("Copy and paste")'),('03-artifact',q.ESSAY,'#what-counts-as-an-artifact'),('04-thread',q.THREAD+'use/',None),('05-evidence',q.EVIDENCE,None),('06-figure',q.ESSAY,'overlay'),('07-variation',q.ESSAY,'.section-marker:has(h2#the-harder-problem-not-every-difference-should-disappear)'),('08-conclusion',q.ESSAY,'.where-this-sits')]
  if group=='entry': states=states[:1]
  elif group=='narrative': states=[s for s in states if s[0][:2] in ('02','03','07','08')]
  elif group=='focus': states=[s for s in states if s[0][:2] in ('04','05','06')]
  for label,path,selector in states:
   for dark in (True,False):
    c=q.capture_context(b,1440,1000,dark);p=q.new_page(c,path,dark);q.preload(p);p.evaluate("scrollTo({top:0,behavior:'instant'})");p.evaluate("document.fonts.ready");p.wait_for_timeout(250)
    if selector=='overlay':
     p.locator("a[href*='/figure/']").first.click();p.locator('[data-focus-dialog]').wait_for(state='visible');p.wait_for_timeout(550);q.wait_for_images(p)
    elif selector: align(p,selector,140 if label=='07-variation' else 110)
    p.screenshot(path=str(OUT/f'{label}--{"dark" if dark else "light"}.jpg'),type='jpeg',quality=78)
    if label=='01-entry':
     print(p.locator('#post-header h1').bounding_box());print(p.locator('.registry-wave-rail').bounding_box())
    p.close();c.close()
  if group in ('mobile','all','entry'):
   for dark in (True,False):
    for label,path in [('entry',q.ESSAY),('contents',q.ESSAY),('thread',q.THREAD+'use/'),('evidence',q.EVIDENCE)]:
     if group=='entry' and label!='entry':continue
     c=q.capture_context(b,390,844,dark);p=q.new_page(c,path,dark);q.preload(p);p.evaluate("scrollTo({top:0,behavior:'instant'})");p.evaluate("document.fonts.ready");p.wait_for_timeout(250)
     if label=='contents': p.locator('[data-mobile-contents-trigger]').click();p.locator('[data-mobile-contents]').wait_for(state='visible');p.wait_for_timeout(550)
     p.screenshot(path=str(OUT/f'09-mobile-{label}--{"dark" if dark else "light"}.jpg'),type='jpeg',quality=78);p.close();c.close()
  b.close()
if __name__=='__main__':capture(sys.argv[1] if len(sys.argv)>1 else 'all')
