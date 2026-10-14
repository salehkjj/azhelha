import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('out');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.woff2':'font/woff2','.woff':'font/woff','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.json':'application/json'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const path=resolve(root,'.'+decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403).end();return}const data=await readFile(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404,{'Content-Type':'text/html'}).end(await readFile(resolve(root,'404.html')).catch(()=>Buffer.from('Not found')))}}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log(`AZHELHA preview: http://localhost:${process.env.PORT||3000}`));
