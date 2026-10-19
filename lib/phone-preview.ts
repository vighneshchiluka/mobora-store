/** Original illustrative geometry, not manufacturing cutout templates.
 * Match explicit models only; never infer camera positions from a brand name.
 */
export const cameraLayouts={
 'lenovo-k6-center':{label:'Single centre camera · flash · fingerprint opening',lenses:[[80,28,10]],flash:[80,49],fingerprint:[80,76,10]},
 'lenovo-k8-center':{label:'Two centre cameras · fingerprint opening',lenses:[[80,26,9],[80,49,9]],plate:[66,12,28,52,13],flash:[55,38],fingerprint:[80,86,10]},
 'lenovo-k9-horizontal':{label:'Two horizontal cameras · fingerprint opening',lenses:[[24,23,8],[45,23,8]],plate:[11,11,64,25,12],flash:[64,23],fingerprint:[80,70,10]},
 'pixel-a-pill':{label:'Two · horizontal pill',lenses:[[34,40,7],[61,40,7]],plate:[16,21,65,38,19],flash:[99,40]},
 'single':{label:'Single camera',lenses:[[27,28,11]],plate:[12,12,48,32,14],flash:[48,28]},
 'dual-horizontal':{label:'Two · horizontal',lenses:[[26,27,10],[49,27,10]],plate:[12,13,65,29,14],flash:[68,27]},
 'dual-vertical':{label:'Two · vertical',lenses:[[28,28,12],[28,59,12]],plate:[12,12,33,64,17],flash:[54,42]},
 'dual-square':{label:'Two · square module',lenses:[[29,30,12],[29,62,12]],plate:[11,12,67,69,15],flash:[60,29]},
 'dual-diagonal':{label:'Two · diagonal',lenses:[[29,30,13],[60,61,13]],plate:[11,12,69,69,16],flash:[61,28]},
 'triple-triangle':{label:'Three · triangle',lenses:[[29,29,13],[29,62,13],[61,46,13]],plate:[11,11,70,71,16],flash:[61,23]},
 'triple-vertical':{label:'Three · vertical rings',lenses:[[28,28,12],[28,58,12],[28,88,12]],flash:[52,38]},
 'triple-plate':{label:'Three · vertical module',lenses:[[28,28,11],[28,56,11],[28,84,11]],plate:[12,12,49,91,10],flash:[49,41]},
 'quad-vertical':{label:'Four · vertical',lenses:[[27,24,9],[27,46,9],[27,68,9],[27,90,9]],plate:[13,11,29,92,12],flash:[52,24]},
 'quad-2x2':{label:'Four · square grid',lenses:[[28,30,12],[58,30,12],[28,60,12],[58,60,12]],plate:[11,12,65,79,11],flash:[62,80]},
 'triple-grid':{label:'Three · square module',lenses:[[27,29,11],[56,29,11],[27,58,11]],plate:[11,12,63,69,11],flash:[56,58]},
 'quad-center':{label:'Four · centre square',lenses:[[66,30,10],[93,30,10],[66,57,10],[93,57,10]],plate:[49,13,61,62,10],flash:[80,85]},
 'quad-l':{label:'Four · L shape',lenses:[[27,27,10],[27,53,10],[27,79,10],[53,79,8]],plate:[11,12,60,86,11],flash:[54,29]},
 'ultra':{label:'Four · separate rings',lenses:[[29,28,13],[29,61,13],[29,94,13],[59,30,9]],flash:[59,75],sensors:[[59,53,5]]},
 'circle-left':{label:'Three · round module',lenses:[[31,33,11],[58,33,11],[31,59,11]],circle:[44,46,36],flash:[58,59]},
 'circle-center':{label:'Three · centre circle',lenses:[[60,38,11],[99,38,11],[80,64,11]],circle:[80,46,41],flash:[80,94]},
 'dual-center':{label:'Two · centre vertical',lenses:[[80,27,10],[80,52,10]],plate:[65,12,30,56,14],flash:[80,79]},
 'triple-center':{label:'Three · centre vertical',lenses:[[80,25,9],[80,48,9],[80,71,9]],plate:[66,11,28,75,13],flash:[105,25]},
 'bar-dual':{label:'Two · camera bar',lenses:[[43,42,12],[76,42,12]],plate:[0,19,160,46,0],flash:[132,42]},
 'bar-triple':{label:'Three · camera bar',lenses:[[33,42,11],[64,42,11],[105,42,11]],plate:[0,19,160,46,0],flash:[139,42]},
 'two-rings':{label:'Two · large rings',lenses:[[29,30,15],[29,68,15]],flash:[57,39]},
 'three-two-rings':{label:'Three · two rings',lenses:[[29,30,15],[29,61,7],[29,78,7]],plate:[13,47,32,46,16],flash:[58,37]},
} as const;
export type CameraLayout=keyof typeof cameraLayouts;
export function isCameraLayout(value:unknown):value is CameraLayout{return typeof value==='string'&&Object.hasOwn(cameraLayouts,value)}
export function normalizePhone(model:string){return model.toLowerCase().replace(/^samsung\s+/,'').replace(/\s*\(logo cut\)/g,'').replace(/\s*\(([45])g\)/g,' $1g').replace(/\s+/g,' ').trim()}
type Profile={id:string;cameraLayout:CameraLayout;source:string};
const profiles:Record<string,Profile>=Object.create(null);
function register(layout:CameraLayout,source:string,models:string[]){for(const model of models)profiles[normalizePhone(model)]={id:normalizePhone(model).replace(/\W+/g,'-'),cameraLayout:layout,source}}
const apple='https://www.apple.com/in/iphone/compare/';
register('single',apple,['iPhone 6','iPhone 6 Plus','iPhone 6S','iPhone 6S Plus','iPhone 7','iPhone 8','iPhone SE (2020)','iPhone XR','iPhone 16E']);
register('dual-horizontal',apple,['iPhone 7 Plus','iPhone 8 Plus']);
register('dual-vertical',apple,['iPhone X','iPhone XS','iPhone XS Max','iPhone 16','iPhone 16 Plus']);
register('dual-square',apple,['iPhone 11','iPhone 12','iPhone 12 Mini']);
register('dual-diagonal',apple,['iPhone 13','iPhone 13 Mini','iPhone 14','iPhone 14 Plus','iPhone 15','iPhone 15 Plus']);
register('triple-triangle',apple,[11,12,13,14,15,16].flatMap(n=>['iPhone '+n+' Pro','iPhone '+n+' Pro Max']));
register('quad-2x2','https://www.realme.com/in/realme-8',['Realme 8','Realme 8 4G','Realme 8 Pro']);
register('triple-grid','https://www.realme.com/in/realme-8-5g',['Realme 8 5G']);
register('triple-vertical','https://news.samsung.com/fr/galaxy-a54-5g-a34-5g-a14-5g-a14',['Samsung Galaxy A14','Samsung Galaxy A14 5G','Samsung Galaxy A34 5G','Samsung Galaxy A54 5G','Samsung Galaxy S23','Samsung Galaxy S23 5G','Samsung Galaxy S23 Plus','Samsung Galaxy S23 Plus 5G','Samsung Galaxy S24','Samsung Galaxy S24 5G','Samsung Galaxy S24 Plus','Samsung Galaxy S24 Plus 5G']);
register('ultra','https://www.samsung.com/in/smartphones/galaxy-s24-ultra/',['Samsung Galaxy S22 Ultra','Samsung Galaxy S22 Ultra 5G','Samsung Galaxy S23 Ultra','Samsung Galaxy S23 Ultra 5G','Samsung Galaxy S24 Ultra','Samsung Galaxy S24 Ultra 5G']);
register('quad-vertical','https://www.mi.com/in/redmi-note-8/',['Xiaomi Redmi Note 8','Redmi Note 8']);
register('quad-center','https://www.mi.com/in/redmi-note-9/specs/',['Xiaomi Redmi Note 9','Redmi Note 9','Xiaomi Redmi Note 9 Pro','Redmi Note 9 Pro','Xiaomi Redmi Note 9 Pro Max','Redmi Note 9 Pro Max']);
register('bar-dual','https://blog.google/products-and-platforms/devices/pixel/google-pixel-camera-bar/',['Google Pixel 6','Google Pixel 6A','Google Pixel 7','Google Pixel 7A','Google Pixel 8','Google Pixel 8A']);
register('bar-triple','https://blog.google/products-and-platforms/devices/pixel/google-pixel-camera-bar/',['Google Pixel 6 Pro','Google Pixel 7 Pro','Google Pixel 8 Pro']);
register('pixel-a-pill','https://store.google.com/in/product/pixel_10a',['Google Pixel 10A']);
register('pixel-a-pill','https://blog.google/products-and-platforms/devices/pixel/pixel-9a-new-design-camera/',['Google Pixel 9A']);
register('two-rings','https://www.oneplus.in/nord-ce4-5g',['OnePlus Nord CE 4','OnePlus Nord CE 4 5G','OnePlus Nord CE 4 Lite 5G']);
register('three-two-rings','https://www.oneplus.in/nord-ce-3-lite-5g',['OnePlus Nord CE 3 Lite 5G','OnePlus Nord CE 3 5G']);
register('circle-left','https://www.oneplus.in/11',['OnePlus 11 5G','OnePlus 11R 5G']);
register('quad-l','https://images.samsung.com/is/content/samsung/p5/in/e-catalogues/eCatalogue-A-Series-Smartphones_0908.pdf',['Galaxy A51','Galaxy A71']);
register('lenovo-k6-center','https://support.lenovo.com/jm/en/solutions/PD105037',['Lenovo K6 Note']);
register('lenovo-k6-center','https://support.lenovo.com/my/en/solutions/pd104415-overview-for-lenovo-k6-lenovo-k6-power',['Lenovo K6 Power']);
register('lenovo-k6-center','https://support.lenovo.com/tc/en/solutions/pd104293-overview-for-lenovo-vibe-k5-note-smartphone',['Lenovo K5 Note']);
register('lenovo-k8-center','https://support.lenovo.com/au/en/solutions/pd500003-overview-for-lenovo-k8-plus',['Lenovo K8 Plus']);
register('lenovo-k9-horizontal','https://support.lenovo.com/za/en/solutions/ht507425-lenovo-k9-specifications',['Lenovo K9']);
export function getPhonePreview(model=''){return profiles[normalizePhone(model)]}
export function resolveCameraLayout(model=''){return getPhonePreview(model)?.cameraLayout}
export function cameraDescription(layout?:CameraLayout){return isCameraLayout(layout)?cameraLayouts[layout].label:'Camera layout awaiting verification'}
