export function coverTextSize(context:Pick<CanvasRenderingContext2D,'font'|'measureText'>,text:string){
 context.font='italic 180px Georgia';
 return Math.min(180,180*1000/Math.max(1,context.measureText(text).width));
}
export function coverTextColour(background:string){
 const value=background.replace('#','');
 const rgb=[0,2,4].map(i=>parseInt(value.slice(i,i+2),16)||0);
 return (rgb[0]*.299+rgb[1]*.587+rgb[2]*.114)>150?'#25251f':'#fff9ef';
}
