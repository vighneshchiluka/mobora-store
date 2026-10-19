'use client';
import type {CameraLayout} from './phone-preview';
import {configureStore,createSlice,PayloadAction} from '@reduxjs/toolkit';
export type CartItem={id:string;name:string;model:string;price:number;quantity:number;design?:string;cameraLayout?:CameraLayout};
const slice=createSlice({name:'cart',initialState:[] as CartItem[],reducers:{add:(s,a:PayloadAction<Omit<CartItem,'quantity'>>)=>{const item=s.find(x=>x.id===a.payload.id&&x.model===a.payload.model&&x.design===a.payload.design&&x.cameraLayout===a.payload.cameraLayout);if(item)item.quantity++;else s.push({...a.payload,quantity:1})},remove:(s,a:PayloadAction<number>)=>{s.splice(a.payload,1)},restore:(_,a:PayloadAction<CartItem[]>)=>a.payload,clear:()=>[]}});
export const {add,remove,restore,clear}=slice.actions;
export const makeStore=()=>configureStore({reducer:{cart:slice.reducer}});
