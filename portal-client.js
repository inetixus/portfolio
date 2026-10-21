import {createClient} from './assets/supabase-client.js?v=portal-3';
import {supabaseUrl,supabasePublishableKey} from './auth-config.js?v=portal-3';
export const client=createClient(supabaseUrl,supabasePublishableKey,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const local=['localhost','127.0.0.1'].includes(location.hostname)||location.hostname.endsWith('.chatgpt.site');
export const portalOrigin=local?location.origin:'https://dashboard.inetixus.it';
export const portalHome='/dashboard/';
export const portalUrl=path=>new URL(path,portalOrigin).href;
export const portfolioUrl=local?'/':'https://inetixus.it/';
