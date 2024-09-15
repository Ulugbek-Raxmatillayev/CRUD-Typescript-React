import React, { useCallback, useEffect, useState } from 'react'
import AdminScreen from '.'
import axios from 'axios'
import { config } from '../../helpers/token'
import { useNavigate } from 'react-router-dom'
import { link } from '../../helpers/link'
import { AxiosResponse } from 'axios'
import { adminUsersType } from '../../interface/adminInterface/adminUserType'
import { adminCategoryType } from '../../interface/adminInterface/adminCategoryType'
import { adminProductsType } from '../../interface/adminInterface/adminProductsType'

function Admin():JSX.Element {
    const navigate = useNavigate()
    const [user, setUser] = useState<adminUsersType[]>([])
    const [category, setCategory] = useState<adminCategoryType[] | null>([])
    const [product, setProduct] = useState<adminProductsType[] | null>([])

    const users = useCallback(() => {
        axios.get(`${link}user/list`, config)
            .then((res:AxiosResponse) => {
                setUser((res?.data?.body))
                console.log(res);
            }).catch((err) => {
                console.error(err);
            })
    }, [])

    const cates = useCallback(() => {
        axios.get(`${link}category/list`, config)
            .then((res:AxiosResponse) => {
                setCategory(res.data.body)
                console.log(res);
            }).catch((err) => {
                console.error(err);
            })
    }, [])

    const products = useCallback(() => {
        axios.get(`${link}product/list`, config)
            .then((res:AxiosResponse) => {
                setProduct(res.data.body)
                console.log(res);
            }).catch((err) => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        users()
    }, [])

    useEffect(() => {
        cates()
    }, [cates])

    useEffect(() => {
        products()
    }, [products])


    const navUser = () => {
        navigate("/admin/users-control")
    }

    const navCate = () => {
        navigate("/admin/categories-control")
    }

    const navPro = () => {
        navigate("/admin/products-control")
    }

    return (
        <div>
            <AdminScreen title={"Controls"} footerTxt={"admin"}>
                <div className=' h-[420px] '>
                    <div className='flex flex-wrap justify-center  gap-16'>
                        <a onClick={navUser} className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h2 className='text-2xl text-orange-400'>Users list</h2>
                            <h1 className='text-3xl text-center text-white'>{user.length} <p className='text-lg'>users</p></h1>
                        </a>
                        <a onClick={navCate} className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h2 className='text-2xl text-green-400'>Categories list</h2>
                            <h1 className='text-3xl text-center text-white'>{category.length} <p className='text-lg'>categories</p></h1>
                        </a>
                        <a onClick={navPro} className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h2 className='text-2xl text-red-400'>Products list</h2>
                            <h1 className='text-3xl text-center text-white'>{product.length} <p className='text-lg'>products</p></h1>
                        </a>
                    </div>
                    
                </div>
            </AdminScreen>
        </div>
    )
}

export default Admin