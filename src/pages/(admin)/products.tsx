import { useEffect, useState } from 'react'
import AdminScreen from '.'
import { link } from '../../helpers/link'
import axios from 'axios'
import { config } from '../../helpers/token'
import { AxiosResponse, AxiosError } from 'axios'
import { adminProductsType } from '../../interface/adminInterface/adminProductsType'
import { } from 'axios'

function AdminProducts(): JSX.Element {
  const [products, setProducts] = useState<adminProductsType[] | null>([])
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [selected, setSelected] = useState<null>(null)

  const selectedItem = (id: adminProductsType["id"]) => {
    const filter: adminProductsType[] | undefined = products?.filter(item => item.id === id)
    setSelected(filter[0])
    console.log(selected);

  }

  const openDelete = () => {
    setIsDelete(!isDelete)
  }

  function fetchProducts() {
    axios.get(`${link}product/list`)
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          setProducts(response.data.body)
        } else {
          setProducts([])
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function deleteProduct(productId: adminProductsType['id']) {
    if (config && productId) {
      axios.delete(`${link}product/${productId}`, config)
        .then((response: AxiosResponse) => {
          if (response.data.success) {
            fetchProducts()
            openDelete()
          } else {
          }
        }).catch((err: AxiosError) => {
          console.error(err);
        })
    } else {
      alert('server error')
    }
  }

  return (
    <AdminScreen title={'Client'} footerTxt={'admin-controller'}>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product, key) =>
              <>
                <tr  key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {key + 1}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </th>
                  <td className="px-6 py-4">
                    {product.description}
                  </td>
                  <td className="px-6 py-4">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <p onClick={() => (selectedItem(product.id), openDelete())} className="font-medium text-red-600 dark:text-red-500 hover:underline">delete</p>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {
        isDelete &&
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
                <button onClick={() => deleteProduct(selected.id)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes, I'm sure
                </button>
                <button onClick={openDelete} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
    
      }
    </AdminScreen>
  )
}

export default AdminProducts