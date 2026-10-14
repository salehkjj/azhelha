export type Vehicle = {make:string;model:string;year:string};
export const makes:Record<string,string[]> = {Toyota:['Camry','Corolla','Yaris'],Hyundai:['Elantra','Sonata','Accent'],Kia:['K5','Cerato','Sportage'],Nissan:['Altima','Sunny','Patrol'],Honda:['Accord','Civic'],Ford:['Taurus','Explorer']};
export const services = [
 {id:'oil',name:'صيانة دورية',detail:'تغيير زيت المحرك والفلتر',fixed:true,base:180},
 {id:'brake',name:'مكابح',detail:'تغيير فحمات المكابح الأمامية',fixed:true,base:320},
 {id:'electric',name:'كهرباء',detail:'تشخيص الأعطال الكهربائية',fixed:false,base:80},
 {id:'ac',name:'مكيف',detail:'فحص نظام التكييف',fixed:false,base:90},
 {id:'engine',name:'محرك',detail:'تشخيص المحرك',fixed:false,base:120},
 {id:'tire',name:'إطارات',detail:'ترصيص وموازنة الإطارات',fixed:true,base:100},
 {id:'diagnosis',name:'فحص وتشخيص',detail:'فحص شامل وتحديد المشكلة',fixed:false,base:100},
 {id:'other',name:'خدمات أخرى',detail:'تشخيص المشكلة وتقديم عرض سعر',fixed:false,base:100}
];
export type Workshop={id:number;name:string;area:string;distance:number;rating:number;reviews:number;factor:number;warranty:number;available:boolean;specialty:string;services:string[];color:string};
const names=['ورشة مدار العناية','مركز نقطة صيانة','ورشة إتقان الخرج','مركز المسار الحديث','ورشة عناية بلس','مركز خطوة للصيانة','ورشة نخبة المحرك','مركز راحة السيارة','ورشة درب الجودة','مركز سهل للصيانة'];
export const workshops:Workshop[]=names.map((name,i)=>({id:i+1,name,area:['حي الخزامى','حي الفيصلية','الصناعية الجديدة','حي السلام','حي اليرموك'][i%5],distance:1.2+i*.65,rating:[4.9,4.8,4.7,4.6,4.8,4.5,4.7,4.4,4.6,4.8][i],reviews:42+i*17,factor:1+i*.09,warranty:i===7?0:[30,90,60][i%3],available:i%4!==3,specialty:['متخصصون في السيارات اليابانية','صيانة شاملة لكل السيارات','خبرة في السيارات الكورية'][i%3],services:i===6?['engine','electric','diagnosis','other']:services.map(s=>s.id),color:['mint','sand','blue'][i%3]}));
export function price(w:Workshop,service:string,overrides:Record<string,number>={}){return overrides[`${w.id}:${service}`]??Math.round((services.find(s=>s.id===service)?.base??100)*w.factor/5)*5}
export const sar=(n:number)=>new Intl.NumberFormat('ar-SA',{maximumFractionDigits:0}).format(n)+' ر.س';
export const statuses=['تم استلام الحجز','بانتظار الفحص','جاري التشخيص','بانتظار موافقة العميل','جاري الإصلاح','جاهزة للاستلام','مكتمل'];
export type Quote={id:string;diagnosis:string;labor:number;parts:number;fees:number;eta:string;warranty:string;status:'pending'|'approved'|'rejected';kind:'initial'|'additional'};
export type Review={quality:number;transparency:number;timeliness:number;overall:number;text:string};
export type Booking={id:string;workshop:number;service:string;vehicle:Vehicle;date:string;time:string;problem:string;status:number;price:number;quotes:Quote[];updates:{text:string;at:string}[];completedAt?:string;review?:Review};
export type DemoState={vehicle:Vehicle;bookings:Booking[];prices:Record<string,number>;enabled:Record<string,boolean>};
const vehicle={make:'Toyota',model:'Camry',year:'2022'};
export function initialState():DemoState{return {vehicle,prices:{},enabled:{},bookings:[
{id:'AZ-26001',workshop:1,service:'engine',vehicle,date:'2026-10-15',time:'10:00',problem:'صوت غير معتاد عند تشغيل المحرك',status:3,price:120,quotes:[{id:'Q-1001',diagnosis:'تآكل سير المحرك؛ يوصى باستبداله وضبط الشد.',labor:180,parts:220,fees:0,eta:'يوم عمل واحد',warranty:'90 يومًا على القطعة وأعمال التركيب من الورشة',status:'pending',kind:'initial'}],updates:[{text:'اكتمل الفحص وأرسلنا لك عرض السعر للمراجعة.',at:'10:30'}]},
{id:'AZ-25988',workshop:2,service:'oil',vehicle,date:'2026-10-10',time:'09:00',problem:'',status:6,price:195,quotes:[],updates:[{text:'تم تغيير الزيت والفلتر وتسليم السيارة.',at:'11:15'}]},
{id:'AZ-26002',workshop:3,service:'brake',vehicle,date:'2026-10-16',time:'16:00',problem:'',status:0,price:380,quotes:[],updates:[]}
]}}
export const totalQuote=(q:Quote)=>q.labor+q.parts+q.fees;
export const totalBooking=(b:Booking)=>b.price+b.quotes.filter(q=>q.status==='approved').reduce((a,q)=>a+totalQuote(q),0);
export function transition(b:Booking,next:number):Booking {
 if(next!==b.status+1||next>6)throw new Error('انتقل إلى الخطوة التالية بالترتيب.');
 const fixed=services.find(s=>s.id===b.service)?.fixed;
 if(next===4&&(!fixed&&!b.quotes.some(q=>q.kind==='initial'&&q.status==='approved')||b.quotes.some(q=>q.status==='pending')))throw new Error('يجب الحصول على موافقة العميل على عرض السعر قبل بدء الإصلاح.');
 if(next===3&&fixed)return {...b,status:4};
 if(next>=4&&b.quotes.some(q=>q.status==='pending'))throw new Error('بانتظار موافقة العميل على التكاليف الإضافية.');
 return {...b,status:next,completedAt:next===6?new Date().toISOString().slice(0,10):b.completedAt};
}
export function decide(b:Booking,id:string,approve:boolean):Booking{
 const q=b.quotes.find(q=>q.id===id); if(!q||q.status!=='pending')throw new Error('تم التعامل مع هذا العرض مسبقًا.');
 return {...b,quotes:b.quotes.map(q=>q.id===id?{...q,status:approve?'approved':'rejected'}:q),updates:[...b.updates,{text:approve?'وافق العميل على عرض السعر.':'رفض العميل عرض السعر؛ لن تُنفذ الأعمال المقترحة.',at:new Date().toLocaleTimeString('ar-SA',{hour:'2-digit',minute:'2-digit'})}]};
}
export function submitQuote(b:Booking,q:Quote):Booking{
 if(b.status===6||b.status===5)throw new Error('لا يمكن إضافة تكاليف بعد اكتمال الإصلاح.');
 if(b.quotes.some(x=>x.status==='pending'))throw new Error('يوجد عرض بانتظار العميل بالفعل.');
 if(!q.diagnosis.trim()||!q.warranty.trim()||!q.eta.trim()||[q.labor,q.parts,q.fees].some(n=>!Number.isFinite(n)||n<0)||totalQuote(q)<=0)throw new Error('أكمل تفاصيل العرض وأدخل مبالغ صحيحة.');
 if(q.kind==='initial'&&b.status!==2&&b.status!==3)throw new Error('ابدأ التشخيص أولًا.');
 return {...b,status:3,quotes:[...b.quotes,q],updates:[...b.updates,{text:q.kind==='additional'?'أُوقف الإصلاح لحين الموافقة على عرض إضافي.':'تم إرسال عرض السعر؛ بانتظار موافقتك.',at:'الآن'}]};
}
export function addReview(b:Booking,r:Review):Booking{if(b.status!==6||b.review)throw new Error('التقييم متاح مرة واحدة للحجوزات المكتملة فقط.');if([r.quality,r.transparency,r.timeliness,r.overall].some(n=>n<1||n>5))throw new Error('اختر التقييم من 1 إلى 5.');return {...b,review:r}}
