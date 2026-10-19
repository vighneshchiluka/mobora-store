import {identity} from '@/lib/commerce';
import AdminDashboard from '@/components/admin-dashboard';
import ShopShell from '@/components/shop-shell';
export const dynamic='force-dynamic';
export const metadata={title:'Admin Dashboard',robots:{index:false,follow:false}};
export default async function Page(){const u=await identity();if(!u?.admin)return <ShopShell><section className="surface empty-state"><p className="page-eyebrow">MOBORA ADMIN</p><h1>Your store, behind the scenes.</h1><p>{u?'This account does not have admin access. Sign in using the authorised store email.':'Sign in with the authorised store email to manage orders, customers and enquiries.'}</p><a className="primary" href={u?'/signout-with-chatgpt?return_to=%2Fadmin':'/signin-with-chatgpt?return_to=%2Fadmin'} target="_top">{u?'Switch account':'Sign in to admin'}</a></section></ShopShell>;return <AdminDashboard/>}
