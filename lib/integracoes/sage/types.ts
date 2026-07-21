export type SageToken = { access_token:string; refresh_token:string; expires_in:number; token_type:"Bearer"; scope:string };
export type SageProduct = { id:number; product_code:string; description:string; sales_price:string; last_cost_price?:string };
export type SageInvoiceLine = { description:string; quantity:number; unit_price:number; product_id?:number; tax_rate_id?:number };
export type SageInvoiceInput = { contact_id:number; date:string; due_date?:string; reference?:string; notes?:string; invoice_lines:SageInvoiceLine[] };
export type SageResource<T> = { $totalResults:number; $startIndex:number; $itemsPerPage:number; $resources:T[] };
