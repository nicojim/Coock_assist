// Vercel serverless endpoint. Only publicly accessible HTTPS recipe pages.
function safeUrl(value){
 const u=new URL(value);const h=u.hostname.toLowerCase();
 if(u.protocol!=='https:'||u.username||u.password||u.port||h==='localhost'||h.endsWith('.local')||h.endsWith('.internal')||h.endsWith('.localhost')||!h.includes('.')||/^\d+\.\d+\.\d+\.\d+$/.test(h)||h.includes(':'))throw Error('Adresse non autorisée');
 return u;
}
function decodeHtml(s){return String(s).replace(/&(?:amp|quot|apos|lt|gt|nbsp|#39|#x27);/g,x=>({'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' ','&#39;':"'",'&#x27;':"'"}[x]||x))}
function plain(v){return decodeHtml(String(v??'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim())}
function findRecipe(obj){if(!obj||typeof obj!=='object')return null;if(Array.isArray(obj)){for(const x of obj){const r=findRecipe(x);if(r)return r}return null}const t=obj['@type'];if(t==='Recipe'||(Array.isArray(t)&&t.includes('Recipe')))return obj;for(const k of ['@graph','mainEntity','itemListElement']){const r=findRecipe(obj[k]);if(r)return r}return null}
function instructions(v){if(!v)return [];if(typeof v==='string')return [plain(v)];if(Array.isArray(v))return v.flatMap(instructions);if(typeof v==='object')return instructions(v.text||v.itemListElement||v.name);return []}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');if(req.method!=='GET')return res.status(405).json({error:'Méthode non autorisée'});
 try{
 let u=safeUrl(req.query.url);let response;
 for(let i=0;i<3;i++){
  const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),9000);
  try{response=await fetch(u.toString(),{redirect:'manual',signal:ctrl.signal,headers:{'User-Agent':'Mozilla/5.0 (compatible; MaxiMangeMange/1.0)','Accept':'text/html'}})}finally{clearTimeout(timer)}
  if([301,302,303,307,308].includes(response.status)){u=safeUrl(new URL(response.headers.get('location'),u).toString());continue}break;
 }
 if(!response||!response.ok)throw Error('Page inaccessible');if(!(response.headers.get('content-type')||'').includes('html'))throw Error('Ce lien ne contient pas de page HTML');
 const reader=response.body.getReader();const chunks=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1500000)throw Error('Page trop volumineuse');chunks.push(Buffer.from(value))}
 const html=Buffer.concat(chunks).toString('utf8');const scripts=[...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 let recipe=null;for(const m of scripts){try{recipe=findRecipe(JSON.parse(m[1]));if(recipe)break}catch{}}
 if(!recipe)throw Error('Aucune recette structurée détectée sur ce site');
 const rawServings=Array.isArray(recipe.recipeYield)?recipe.recipeYield[0]:recipe.recipeYield;const match=String(rawServings||'').match(/\d+/);
 return res.status(200).json({name:plain(recipe.name||''),servings:match?Number(match[0]):null,ingredients:(recipe.recipeIngredient||[]).map(plain),steps:instructions(recipe.recipeInstructions)});
 }catch(e){return res.status(422).json({error:e.message||'Import impossible'})}
};
