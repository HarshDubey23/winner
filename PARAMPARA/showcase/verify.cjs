const { chromium } = require('C:/Users/gaura/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--autoplay-policy=no-user-gesture-required']});
const errors=[];
try {
if(process.argv.includes('--lite')){
 const results={};
 await Promise.all([['on_time',0,true,6],['late_60ms',60,true,6],['silent',0,false,2]].map(async([name,offset,play,cycles])=>{
  const page=await browser.newPage({viewport:{width:1200,height:1000}});
  await page.goto('http://127.0.0.1:8765/lite/index.html');await page.waitForTimeout(800);
  await page.evaluate(()=>window.__plTest.setLatency(0));await page.fill('#bpm','110');await page.dispatchEvent('#bpm','input');
  await page.evaluate(([offset,play])=>{window.__seen=new Set();window.__timer=setInterval(()=>{const c=window.__plTest.current();if(!c||!c.plan||window.__seen.has(c.cycle+':'+c.kind))return;window.__seen.add(c.cycle+':'+c.kind);if(!play||(c.kind!=='check'&&c.kind!=='practice'))return;const both=[1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1];c.plan.forEach((T,i)=>{const at=T+offset;setTimeout(()=>{window.__plTest.tap('R',at);if(both[i])window.__plTest.tap('L',at)},Math.max(0,at-performance.now()))})},40)},[offset,play]);
  await page.click('#btnStart');await page.waitForTimeout((4+16*cycles)*60/110*1000+1500);await page.click('#btnStart');await page.waitForTimeout(1200);
  results[name]=await page.evaluate(()=>({unaided:window.__plTest.unaided(),guidance:window.__plTest.guidance()}));await page.screenshot({path:`evidence/lite-${name}.png`});await page.close();
 }));
 const a=results.on_time,b=results.late_60ms,c=results.silent;
 const pass=a.unaided.length>=2&&Math.min(...a.unaided)>.95&&a.guidance<1&&b.unaided.length>=2&&b.unaided.every(x=>x>.70&&x<.80)&&c.unaided.length>=1&&Math.max(...c.unaided)===0&&c.guidance===1;
 fs.writeFileSync('evidence/lite-fresh-results.json',JSON.stringify({runDate:new Date().toISOString(),method:'Repository scripted-player methodology, run in three isolated Chromium pages',pass,results},null,2));console.log({pass,results});if(!pass)process.exitCode=1;
} else {
 const page=await browser.newPage({viewport:{width:1500,height:940}});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 await page.goto('http://127.0.0.1:8765');await page.waitForFunction(()=>window.viewerState?.meshes>0,{timeout:120000});
 const scenes=[];
 for(let i=0;i<9;i++){await page.locator('#nav button').nth(i).click();await page.waitForFunction(()=>document.getElementById('loading').hidden);await page.waitForTimeout(300);scenes.push(await page.evaluate(()=>window.viewerState));await page.screenshot({path:`evidence/view-${i}.png`});}
 await page.locator('#nav button').nth(1).click();await page.waitForFunction(()=>window.viewerState.view==='hand');await page.click('#labelToggle');await page.click('#rotate');await page.waitForTimeout(1000);await page.click('#rotate');await page.click('#reset');
 const download=page.waitForEvent('download');await page.click('#snapshot');const d=await download;await d.saveAs('evidence/hand-presentation.png');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'evidence/mobile.png',fullPage:true});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)errors.push('mobile horizontal overflow');
 fs.writeFileSync('evidence/viewer-checks.json',JSON.stringify({date:new Date().toISOString(),scenes,errors,mobileOverflow:overflow,pngExport:true},null,2));console.log({scenes,errors});if(errors.length)process.exitCode=1;
}
} finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
