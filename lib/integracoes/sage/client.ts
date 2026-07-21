import crypto from "node:crypto";
import { withRetry } from "../retry";
const baseUrl = "https://api.sageone.com/accounts/v2";
function enc(v:string){return encodeURIComponent(v).replace(/[!'()*]/g,c=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`)}
function flatten(obj:Record<string,unknown>, prefix=""):Record<string,string>{const out:Record<string,string>={};for(const [k,v] of Object.entries(obj)){const key=prefix?`${prefix}[${k}]`:k;if(v!==undefined&&v!==null){if(typeof v==="object"&&!Array.isArray(v))Object.assign(out,flatten(v as Record<string,unknown>,key));else out[key]=String(v)}}return out}
export class SageClient {
  constructor(private accessToken=process.env.SAGE_ACCESS_TOKEN||"", private signingSecret=process.env.SAGE_SIGNING_SECRET||""){}
  async request<T>(path:string, init:{method?:string; query?:Record<string,string>; body?:Record<string,unknown>}={}){
    if(!this.accessToken||!this.signingSecret) throw new Error("Sage não configurado: defina SAGE_ACCESS_TOKEN e SAGE_SIGNING_SECRET.");
    const method=(init.method||"GET").toUpperCase(); const url=new URL(`${baseUrl}${path}`); Object.entries(init.query||{}).forEach(([k,v])=>url.searchParams.set(k,v));
    const body=flatten(init.body||{}); const params=[...Array.from(url.searchParams.entries()),...Object.entries(body)].sort(([a],[b])=>enc(a).localeCompare(enc(b))).map(([k,v])=>`${enc(k)}=${enc(v)}`).join("&");
    const nonce=crypto.randomBytes(24).toString("hex"); const base=`${method}&${enc(url.origin+url.pathname)}&${enc(params)}&${enc(nonce)}`; const key=`${enc(this.signingSecret)}&${enc(this.accessToken)}`; const signature=crypto.createHmac("sha1",key).update(base).digest("base64");
    return withRetry(async()=>{const r=await fetch(url,{method,headers:{Authorization:`Bearer ${this.accessToken}`,"X-Signature":signature,"X-Nonce":nonce,Accept:"*/*","Content-Type":"application/x-www-form-urlencoded","User-Agent":"Mar-e-Moveis-Shop"},body:["POST","PUT"].includes(method)?new URLSearchParams(body):undefined,cache:"no-store"});if(!r.ok) throw new Error(`Sage ${r.status}: ${await r.text()}`);return r.json() as Promise<T>;});
  }
}
