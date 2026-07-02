import { Request } from "express";

export type Params<T> = Request<T,{},{}>
export type Body<T> = Request<{},{},T>
export type Query<T> = Request<{},{},{},T>

// cuando se tienen varios en uno solo.
export type Req<TParams = {}, TBody ={}, TQuery={}> = Request<TParams, {}, TBody, TQuery>