import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminScreen from '.'
import axios from 'axios'
import { config } from '../../helpers/token'
import { link } from '../../helpers/link'
import { AxiosResponse, AxiosError } from 'axios'
import { adminUsersType } from '../../interface/adminInterface/adminUserType'


const AdminUsers = (): JSX.Element => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [user, setUser] = useState<adminUsersType[] | null>([])
  const [selected, setSelected] = useState<null>(null)
  const role = useRef<string>('')

  const selectedItem = (id: adminUsersType["id"]) => {
    const filter: adminUsersType[] | undefined = user?.filter(item => item.id === id)
    setSelected(filter[0])
    console.log(selected);

  } 
  
  useEffect(() => {
    getUser()
  }, [])

  const openDelete = () => {
    setIsDelete(!isDelete)
  }

  const openEdit = () => {
    setIsEdit(!isEdit)
  }

  const getUser = useCallback(() => {
    axios.get(`${link}user/list`, config)
      .then((res: AxiosResponse) => {
        let filter = res.data.body.filter(item => item.role !== "ROLE_ADMIN")
        console.log(res);
        setUser(filter)
      }).catch((err: AxiosError) => {
        console.error(err);
      })
  }, [])

  const deleteUser = (id: adminUsersType["id"]) => {
    axios.delete(`${link}user/delete/${id}`, config)
      .then((res: AxiosResponse) => {
        setUser(res.data.body)
        getUser()
        openDelete()
      }).catch((err: AxiosError) => {
        console.error(err);
      })
  }

  function updateUser(id: adminUsersType['id']) {
    if (config && selected) {
      const roleSelect: string = role.current.value
      axios.put(`${link}user/update/role/${id}?role=${roleSelect}`, selected, config)
        .then((res: AxiosResponse) => {
          setUser(res.data.body)
          getUser()
          openEdit()
        }).catch((err: AxiosError) => {
          console.error(err);
        })
    }
  }
  return (
    <AdminScreen title={'Users Control'} footerTxt={"admin"}>
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
            {user && user.map((item, key) =>
              <>
                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {key + 1}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.fullName}
                  </th>
                  <td className="px-6 py-4">
                    {item.userName}
                  </td>
                  <td className="px-6 py-4">
                    {item.role == "ROLE_SELLER" ? "Seller" : "Client"}
                  </td>
                  <td className="px-6 py-4 flex gap-5">
                    <p onClick={() => (selectedItem(item.id), openEdit())} className="font-medium text-green-600  hover:underline">Edit</p>
                    <p onClick={() => (selectedItem(item.id), openDelete())} className="font-medium text-red-600  hover:underline">delete</p>
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
                <button onClick={() => deleteUser(selected.id)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
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
                  Create New Product
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

                  <div className="max-w-sm mx-auto">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                    <select ref={role} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected disabled>Choose a role</option>
                      <option value="ROLE_BUYER">Buyer</option>
                      <option value="ROLE_SELLER">Seller</option>
                    </select>
                  </div>


                </div>
                <button  type="submit" onClick={() => updateUser(selected.id)} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </AdminScreen>
  )
}

export default AdminUsers