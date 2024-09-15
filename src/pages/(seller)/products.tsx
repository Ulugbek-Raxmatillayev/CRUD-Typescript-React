import React, { useCallback, useEffect, useRef, useState } from 'react'
import { adminProductsType } from '../../interface/adminInterface/adminProductsType'
import { link } from '../../helpers/link'
import { config } from '../../helpers/token'
import { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'
import { adminCategoryType } from '../../interface/adminInterface/adminCategoryType'
import SellerScreen from '.'
import axios from 'axios'

function SellerProduct(): JSX.Element {
    const [product, setProduct] = useState<adminProductsType[] | null>([])
    const [categorys, setCategories] = useState<adminCategoryType[] | null>([])
    const [selected, setSelected] = useState<null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const name = useRef<adminProductsType["name"]>('')
    const desc = useRef<adminProductsType["description"]>('')
    const cate = useRef<adminProductsType["categoryId"]>(0)
    const price = useRef<adminProductsType["price"]>(0)


    const getCategory = useCallback(() => {
        axios.get(`${link}category/list`, config)
            .then((res: AxiosResponse) => {
                setCategories(res.data.body)
                console.log(res);

            }).catch((err: AxiosError) => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        getCategory()
    }, [])



    const getProduct = useCallback(() => {
        axios.get(`${link}product/list`, config)
            .then((res: AxiosResponse) => {
                setProduct(res.data.body)
                console.log(res);

            }).catch((err: AxiosError) => {
                console.error(err);
            })
    }, [])

    const selectedItem = (id: adminProductsType["id"]) => {
        const filter: adminProductsType[] | undefined = product?.filter(item => item.id === id)
        setSelected(filter[0])
        console.log(selected);

    }

    const openAdd = () => {
        setIsAdd(!isAdd)
    }

    const openDelete = () => {
        setIsDelete(!isDelete)
    }
    const openEdit = () => {
        setIsEdit(!isEdit)
    }

    const addItem = () => {
        const newData: adminProductsType = {
            "id": 0,
            "name": name.current.value,
            "description": desc.current.value,
            "categoryId": cate.current.value,
            "price": price.current.value,
            "file": [],
        }

        axios.post(`${link}product/save`, newData, config)
            .then((res: AxiosResponse) => {
                setCategories(res.data.body)
                getProduct()
                openAdd()
            }).catch((err: AxiosError) => {
                console.error(err);
                alert(err)
            })
    }

    const editItem = (id: adminProductsType["id"]) => {
        const editData: adminProductsType = {
            "id": 0,
            "name": name.current.value,
            "description": desc.current.value,
            "categoryId": cate.current.value,
            "price": price.current.value,
            "file": [],
        }

        axios.put(`${link}product/update/${id}`, editData, config)
            .then((res: AxiosResponse) => {
                setCategories(res.data.body)
                getProduct()
                console.log(res);

            }).catch((err: AxiosError) => {
                console.error(err);
                alert(err)
            })
        openEdit()
    }

    const deleteCategory = (id: adminProductsType["id"]) => {
        axios.delete(`${link}product/${id}`, config)
            .then((res: AxiosResponse) => {
                setCategories(res.data.body)
                getProduct()
                openDelete()
            }).catch((err: AxiosError) => {
                console.error(err);
            })
    }

    useEffect(() => {
        getProduct()
    }, [])
    return (
        <SellerScreen title='Products' footerTxt='seller'>
            <div>
                <button onClick={openAdd} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Category</button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {product && product.map((category, key) =>
                            <>
                                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {key + 1}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {category.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {category.description}
                                    </td>
                                    <td className="px-6 py-4 flex gap-5">
                                        <p onClick={() => (selectedItem(category.id), openEdit())} className="font-medium text-green-600  hover:underline">Edit</p>
                                        <p onClick={() => (selectedItem(category.id), openDelete())} className="font-medium text-red-600  hover:underline">delete</p>
                                    </td>
                                </tr>



                            </>


                        )}
                    </tbody>
                </table>
            </div>
            {isDelete &&
                <div id="popup-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={openDelete} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button onClick={() => deleteCategory(selected.id)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={openDelete} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {isEdit &&
                <div id="crud-modal" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Category
                                </h3>
                                <button onClick={openEdit} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input ref={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                    </div>
                                    <div className="col-span-2">
                                        <label for="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describtion</label>
                                        <input ref={desc} type="text" id="desc" name="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Type product describtion' />
                                    </div>
                                    <div className="col-span-2">
                                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input ref={price} type="text" id="price" name="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Type product describtion' />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select ref={cate} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option selected disabled>Select category</option>
                                            {categorys && categorys.length > 0 && categorys.map((item: adminCategoryType) => {
                                                return <option value={item.id}>{item.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={() => editItem(selected.id)} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {isAdd &&
                <div id="crud-modal" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Product
                                </h3>
                                <button onClick={openAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input ref={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input ref={price} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select ref={cate} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option selected disabled>Select category</option>
                                            {categorys && categorys.length > 0 && categorys.map((item: adminCategoryType) => {
                                                return <option value={item.id}>{item.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                        <input ref={desc} type="text" id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" />
                                    </div>
                                </div>
                                <button onClick={addItem} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Add new product
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </SellerScreen>
    )
}

export default SellerProduct