import {cameraLayouts,resolveCameraLayout} from '@/lib/phone-preview';
export default function PhoneCamera({model}:{model?:string}){
 const id=resolveCameraLayout(model);
 if(!id)return null;
 const profile=cameraLayouts[id] as {label:string;lenses:readonly (readonly number[])[];plate?:readonly number[];circle?:readonly number[];flash:readonly number[];sensors?:readonly (readonly number[])[]};
 const p=profile.plate,c=profile.circle;
 return <svg className="phone-camera-overlay" viewBox="0 0 160 300" preserveAspectRatio="none" aria-hidden="true" data-camera-layout={id} data-lens-count={profile.lenses.length}>
  {p&&<rect x={p[0]} y={p[1]} width={p[2]} height={p[3]} rx={p[4]} fill="#303b3d" stroke="#9aa3a0" strokeWidth="1.5"/>}
  {c&&<circle cx={c[0]} cy={c[1]} r={c[2]} fill="#303b3d" stroke="#9aa3a0" strokeWidth="1.5"/>}
  {profile.lenses.map(([cx,cy,r],i)=><g key={i} data-lens="true"><circle cx={cx} cy={cy} r={r} fill="#111b20" stroke="#909b98" strokeWidth="1.3"/><circle cx={cx} cy={cy} r={r*.76} fill="#304149" stroke="#091015" strokeWidth="1.6"/><circle cx={cx} cy={cy} r={r*.48} fill="#080d15"/><ellipse cx={cx-r*.22} cy={cy-r*.31} rx={r*.29} ry={r*.16} fill="#92a9a9" opacity=".7"/></g>)}
  <circle cx={profile.flash[0]} cy={profile.flash[1]} r="3.8" fill="#fff4d1" stroke="#c5c5ad" strokeWidth=".7"/>
  {profile.sensors?.map(([cx,cy,r],i)=><circle key={i} cx={cx} cy={cy} r={r} fill="#171c22" stroke="#71837e" strokeWidth=".7"/>)}
 </svg>;
}
