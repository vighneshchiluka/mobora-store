/** Original illustrative geometry, not manufacturing cutout templates.
 * Match explicit models only; never infer camera positions from a brand name.
 */
export const cameraLayouts={
 'ai-nova2':{label:'Two · square camera island',lenses:[[28,27,12],[28,59,12]],plate:[11,10,67,66,14],flash:[60,59],rings:[[60,27,12]]},
 'ai-nova2-pro':{label:'Two · vertical pill camera island',lenses:[[28,27,13],[28,61,13]],plate:[11,10,34,69,17],flash:[58,44]},
 'ai-nova2-neo':{label:'Two · vertical pill with decorative ring',lenses:[[28,27,12],[28,55,9]],plate:[12,10,32,88,15],flash:[57,40],rings:[[28,81,10]]},
 'ai-nova2-ultra':{label:'Two · separate camera rings',lenses:[[28,27,13],[28,61,13]],flash:[59,44]},
 'ai-pulse2':{label:'Two · rectangular camera island',lenses:[[28,27,12],[28,59,12]],plate:[11,10,67,66,12],flash:[59,26]},
 'hmd-crest':{label:'Two · rectangular camera island',lenses:[[34,32,18],[34,73,18]],plate:[12,10,74,85,5],flash:[67,53]},
 'iqoo-neo9pro':{label:'Two · rounded square camera rings',lenses:[[29,30,16],[29,70,16]],flash:[58,37],sensors:[[58,25,3]]},
 'lava-agni2':{label:'Four · centre circular island',lenses:[[55,30,9],[79,52,11],[55,75,8],[103,75,8]],circle:[80,53,43],flash:[103,30]},
 'samsung-quad-island':{label:'Four · vertical island with side depth lens',lenses:[[28,28,12],[28,57,12],[28,86,12],[56,43,7]],plate:[11,11,61,93,10],flash:[56,72]},
 'samsung-dual-rings':{label:'Two · separate vertical camera rings',lenses:[[28,28,12],[28,59,12]],flash:[53,39]},
 'honor8x':{label:'Two · separate vertical rings · rear fingerprint',lenses:[[24,24,9],[24,49,9]],flash:[24,70],fingerprint:[80,79,10]},
 'poco-f1':{label:'Two · central vertical · rear fingerprint',lenses:[[80,26,9],[80,49,9]],plate:[67,12,26,51,13],flash:[53,26],fingerprint:[80,87,10]},
 'asus-flip':{label:'Two · centre flip-camera module',lenses:[[55,25,12],[104,25,12]],plate:[36,8,87,37,6],flash:[80,25],fingerprint:[80,71,10]},
 'asus-rog3':{label:'Three · horizontal camera module',lenses:[[28,32,10],[52,32,10],[76,32,8]],plate:[12,15,84,34,8],flash:[110,32]},
 'dual-left-fingerprint':{label:'Two · left vertical · rear fingerprint',lenses:[[26,25,9],[26,49,9]],plate:[13,12,26,50,13],flash:[26,72],fingerprint:[80,77,10]},
 'dual-left-flash-between':{label:'Two · vertical · flash between lenses · rear fingerprint',lenses:[[26,25,9],[26,64,9]],plate:[13,12,26,65,13],flash:[26,44],fingerprint:[80,77,10]},
 'dual-horizontal-fingerprint':{label:'Two · horizontal · rear fingerprint',lenses:[[27,26,9],[51,26,9]],plate:[13,13,52,26,13],flash:[77,26],fingerprint:[80,73,10]},
 'dual-center-fingerprint':{label:'Two · centre vertical · rear fingerprint',lenses:[[80,26,10],[80,52,10]],plate:[66,12,28,54,14],flash:[80,79],fingerprint:[80,103,10]},
 'center-triple-flash-below':{label:'Three · centre vertical · flash below',lenses:[[80,25,10],[80,50,10],[80,75,10]],plate:[66,11,28,78,14],flash:[80,101]},
 'center-circle-horizontal':{label:'Three · horizontal inside centre circle',lenses:[[55,42,10],[80,42,10],[105,42,10]],circle:[80,43,39],flash:[80,66]},
 'nokia-circle-fingerprint':{label:'Three · centre circle · rear fingerprint',lenses:[[64,31,8],[95,31,8],[64,57,8]],circle:[80,44,32],flash:[95,57],fingerprint:[80,102,10]},
 'nothing-dual':{label:'Two · left vertical camera rings',lenses:[[25,27,11],[25,56,11]],flash:[49,30]},
 'nothing-center-dual':{label:'Two · centre horizontal pill',lenses:[[64,68,12],[96,68,12]],plate:[47,51,66,34,17],flash:[125,68]},
 'hmd-crest-max':{label:'Three · rectangular camera island',lenses:[[34,32,18],[34,73,18],[67,53,9]],plate:[12,10,74,85,5],flash:[67,74]},
 'motorola-edge30-pro':{label:'Three · rounded vertical island',lenses:[[29,29,11],[29,55,11],[29,81,9]],plate:[12,11,48,87,20],flash:[48,30]},
 'triple-left-pill':{label:'Three · vertical pill · flash below',lenses:[[25,25,9],[25,48,9],[25,71,9]],plate:[12,12,26,72,13],flash:[25,94]},
 's10-horizontal':{label:'Three · centre horizontal camera bar',lenses:[[48,31,10],[74,31,10],[100,31,10]],plate:[29,14,108,34,5],flash:[122,31]},
 'quad-left-fingerprint':{label:'Four · left vertical · rear fingerprint',lenses:[[25,24,9],[25,46,9],[25,68,9],[25,90,9]],plate:[12,11,26,92,13],flash:[49,24],fingerprint:[80,83,10]},
 'quad-center-side-fingerprint':{label:'Three centre lenses · side macro lens · rear fingerprint',lenses:[[80,24,9],[80,47,9],[80,70,9],[106,47,6]],plate:[67,11,26,97,13],flash:[106,25],fingerprint:[80,94,9]},
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
register("asus-rog3","https://rog.asus.com/phones/rog-phone-3-model/",["Asus Rog 3"]);
register("asus-flip","https://www.asus.com/us/mobile-handhelds/phones/zenfone/zenfone-6/techspec/",["Asus Zenfone 6Z"]);
register("dual-left-fingerprint","https://www.asus.com/event/2019/productguide/ph/ZenFone-Max-Pro-M2_Q4-2018-Product-Guide.pdf",["Asus Zenfone 5Z","Asus Zenfone Max Pro M1 Zb601Kl","Asus Zenfone Max Pro M2"]);
register("motorola-edge30-pro","https://help.motorola.com/hc/7130/13/global/en-us/CGT2002173049.html",["Motorola Edge 30 Pro"]);
register("hmd-crest-max","https://www.hmd.com/en_in/hmd-crest-max",["HMD Crest Max (5G)"]);
register("nothing-dual","https://us.nothing.tech/pages/phone-1",["Nothing Phone 1"]);
register("nothing-center-dual","https://nl.nothing.tech/pages/phone-2a",["Nothing Phone 2A"]);
register("nokia-circle-fingerprint","https://www.hmd.com/ar_ae/support/nokia-7-2-user-guide/keys-and-parts",["Nokia 7.2"]);
register("center-circle-horizontal","https://community.oneplus.com/thread/1117753",["OnePlus 7T"]);
register("dual-center-fingerprint","https://service.oneplus.com/content/dam/support/user-manuals/common/OnePlus_6_User_Manual_EN.pdf",["OnePlus 6"]);
register("dual-center","https://community.oneplus.com/thread/933985",["OnePlus 6T"]);
register("center-triple-flash-below","https://www.oneplus.com/7pro",["OnePlus 7 Pro"]);
register("center-triple-flash-below","https://www.oneplus.com/us/8",["OnePlus 8"]);
register("quad-left-fingerprint","https://www.realme.com/sg/realme-5-pro/specs",["Realme 5 Pro"]);
register("quad-left-fingerprint","https://www.realme.com/global/realme-5i/specs",["Realme 5I"]);
register("quad-left-fingerprint","https://www.realme.com/in/realme-5s",["Realme 5S"]);
register("quad-vertical","https://www.realme.com/in/realme-6",["Realme 6"]);
register("quad-vertical","https://www.realme.com/in/realme-7",["Realme 7"]);
register("dual-left-fingerprint","https://www.mi.com/uk/redmi-note-7/specs/",["Redmi Note 7"]);
register("dual-left-flash-between","https://www.mi.com/in/redmi-note-5-pro",["Redmi Note 5 Pro"]);
register("quad-center-side-fingerprint","https://www.mi.com/in/redmi-note-8-pro/",["Redmi Note 8 Pro"]);
register("triple-left-pill","https://news.samsung.com/ar/samsung-renueva-integramente-su-portfolio-con-la-nueva-familia-galaxy-a",["Galaxy A50","Galaxy A70"]);
register("s10-horizontal","https://www.samsung.com/ch/support/mobile-devices/wie-sind-die-kameras-des-galaxy-s10-plus-s10e-aufgebaut/",["Galaxy S10","Galaxy S10 Plus"]);
register("triple-left-pill","https://www.vivo.com/en/products/v15pro",["Vivo V15 Pro"]);
register("dual-horizontal-fingerprint","https://www.oppo.com/ae/newsroom/press/futuristic-flagship-oppo-find-x-makes-regional-debut/",["Oppo F9"]);
register("dual-horizontal-fingerprint","https://www.mi.co.id/id/mi-a1/",["Xiaomi Mi A1"]);
register("dual-left-flash-between","https://www.mi.com/in/mi-a2/",["Xiaomi Mi A2"]);
register("ai-nova2","https://aiplusstore.com/products/ai-nova-2-5g",["Ai+ Nova 2 (5G)"]);
register("ai-nova2-pro","https://aiplusstore.com/products/ai-nova-2-pro-5g",["Ai+ Nova 2 Pro (5G)"]);
register("ai-nova2-neo","https://aiplusstore.com/products/ai-nova-2-neo-5g",["Ai+ Nova 2 Neo (5G)"]);
register("ai-nova2-ultra","https://aiplusstore.com/products/ai-nova-2-ultra-5g",["Ai+ Nova 2 Ultra (5G)"]);
register("ai-pulse2","https://aiplusstore.com/products/ai-pulse-2",["Ai+ Pulse 2 (4G)"]);
register("hmd-crest","https://www.hmd.com/en_int/hmd-crest",["HMD Crest (5G)"]);
register("iqoo-neo9pro","https://www.iqoo.com/in/products/picture/neo9pro",["iQOO Neo 9 Pro (5G)"]);
register("lava-agni2","https://shop.lavamobiles.com/products/agni2",["Lava Agni 2 (5G)"]);
register("honor8x","https://www.honor.com/mx/album/honor8x/1.14/",["Honor 8X"]);
register("dual-horizontal-fingerprint","https://www.ztedevices.mx/wp-content/uploads/2020/02/v8-mini-quick-start-guide.pdf",["Zte Blade V8 Mini"]);
register("nothing-dual","https://in.nothing.tech/pages/phone-2",["Nothing Phone 2"]);
register("poco-f1","https://www.mi.com/sg/support/faq/details/KA-12741/",["Poco F1"]);
register("dual-left-fingerprint","https://www.mi.com/in/redmi-note-7-pro",["Redmi Note 7 Pro"]);
register("triple-vertical","https://news.samsung.com/in/samsung-galaxy-a25-5g-galaxy-a15-5g-with-awesome-camera-and-new-editing-features-launched-in-india",["Galaxy A15 (5G)","Galaxy A25 (5G)"]);
register("triple-vertical","https://news.samsung.com/za/continuous-innovation-creating-awesome-camera-experiences-with-the-galaxy-a-series",["Galaxy A35 (5G)","Galaxy A55"]);
register("samsung-dual-rings","https://news.samsung.com/ph/awesome-within-reach-the-new-samsung-galaxy-a05-and-a05s-are-now-available-starting-p5690",["Galaxy A05"]);
register("triple-vertical","https://news.samsung.com/ph/awesome-within-reach-the-new-samsung-galaxy-a05-and-a05s-are-now-available-starting-p5690",["Galaxy A05S"]);
register("samsung-dual-rings","https://news.samsung.com/ph/the-galaxy-a06-and-a16-are-now-more-accessible-than-ever",["Galaxy A06 (4G)"]);
register("triple-vertical","https://news.samsung.com/ph/the-galaxy-a06-and-a16-are-now-more-accessible-than-ever",["Galaxy A16 (5G)"]);
register("samsung-quad-island","https://news.samsung.com/be/samsung-galaxy-a52-a52-5g-en-a72-maken-innovatie-voor-iedereen-toegankelijk",["Galaxy A52 (5G)","Galaxy A72"]);
register("samsung-quad-island","https://news.samsung.com/global/galaxy-a53-5g-and-galaxy-a33-5g-awesome-mobile-experiences-open-to-everyone",["Galaxy A53 (5G)","Galaxy A33 (5G)"]);
export function getPhonePreview(model=''){return profiles[normalizePhone(model)]}
export function resolveCameraLayout(model=''){return getPhonePreview(model)?.cameraLayout}
export function cameraDescription(layout?:CameraLayout){return isCameraLayout(layout)?cameraLayouts[layout].label:'Camera layout awaiting verification'}
