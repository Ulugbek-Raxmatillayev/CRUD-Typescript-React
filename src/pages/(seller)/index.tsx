import SellerHeader from '../../components/headers/sellerHeader'
import { SellerScreenProps } from '../../interface/sellerInterface/sellerScreenProps'

function SellerScreen({ children, title, footerTxt }: SellerScreenProps) {
    return (
        <>
            <SellerHeader />
            <div className='even:dark:bg-gray-800 py-5'>
                <div className='container mx-auto h-max'>
                    {title && <h1 className='text-2xl font-bold py-5 text-white'>{title}</h1>}
                    {children}
                </div>
            </div >
            <div className='w-full h-[51px] items-center bg-gray-900 flex justify-center text-gray-500'>
                {footerTxt && <span>© This is {footerTxt} panel</span>}
            </div>
        </>
    )
}

export default SellerScreen