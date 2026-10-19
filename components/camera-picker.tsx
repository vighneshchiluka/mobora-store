import PhoneCamera from './phone-camera';
import {cameraLayouts,CameraLayout,getPhonePreview} from '@/lib/phone-preview';
export default function CameraPicker({model,value,onChange}:{model:string;value?:CameraLayout;onChange:(layout?:CameraLayout)=>void}){
 const automatic=getPhonePreview(model)?.cameraLayout;
 return <details className="camera-picker" key={model}><summary>{automatic?'Adjust camera preview':'Choose your camera layout'}<span>{automatic?'Optional':'Preview only'}</span></summary><p>Pick the arrangement on the back of your phone. This changes the illustration; we confirm the actual cutout before printing.</p><button type="button" className="camera-auto" onClick={()=>onChange(undefined)} disabled={!value}>{automatic?'Use model layout':'Clear selection'}</button><div className="camera-choices" role="group" aria-label="Camera layout">{(Object.keys(cameraLayouts) as CameraLayout[]).map(id=><button type="button" key={id} aria-pressed={(value||automatic)===id} onClick={()=>onChange(id)}><span className="camera-swatch"><PhoneCamera layout={id}/></span><span>{cameraLayouts[id].label}</span></button>)}</div></details>;
}
