import AdminHeader from "../../components/headers/adminHeader"
import { AdminScreenProps } from "../../interface/adminInterface/adminScreenType"

function AdminScreen({title, children,footerTxt}: AdminScreenProps): JSX.Element {
    return (
        <>
            <AdminHeader />
            <div className='even:dark:bg-gray-800 py-5'>
                <div className='container mx-auto h-max'>
                    {title && <h1 className='text-2xl font-bold py-5 text-white'>{title}</h1>}
                    {children}
                </div>
            </div >
            <div className='w-full h-[51px] items-center bg-gray-900 flex justify-center text-gray-500'>
                {footerTxt &&  <span>© This is {footerTxt} panel</span>}
            </div>
        </>
    )
}

export default AdminScreen