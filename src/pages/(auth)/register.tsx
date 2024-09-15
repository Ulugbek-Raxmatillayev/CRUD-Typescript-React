import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { link } from '../../helpers/link'
import { registerType } from '../../interface/registerType'
import { AxiosResponse } from 'axios'

function Register() {
  const [add, setAdd] = useState<registerType | null>(null)
  const firstname = useRef<registerType["firstname"]>('')
  const lastname = useRef<registerType["lastname"]>('')
  const userName = useRef<registerType["userName"]>('')
  const password = useRef<registerType["password"]>('')
  const prePassword = useRef<registerType["prePassword"]>('')
  const navigate = useNavigate()

  const loginPage = () => {
    navigate('/login')
  }

  const addUser = () => {
    const user:registerType = {
      "firstname": firstname.current.value,
      "lastname": lastname.current.value,
      "userName": userName.current.value,
      "password": password.current.value,
      "prePassword": prePassword.current.value
    }
    axios.post(link + 'auth/register', user)
      .then((res: AxiosResponse) => {
        console.log(res);
        setAdd(res.config.data)
        if(res.status == 200 || res.status == 201){
          navigate("/")
        }else {
        }
      }).catch(err => {
        console.error(err);
      })

  }


  return (
    <div className='relative flex items-center justify-center h-[100vh] container mx-auto'>
      <div className='w-[500px] h-[560px] rounded-xl border px-20'>
        <div className='flex justify-center items-center py-5'>
          <h1 className='text-3xl text-white'>Register</h1>
        </div>
        <div className='flex flex-col gap-3'>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input ref={firstname} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input ref={lastname} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input ref={userName} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input ref={password} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prew Password</label>
            <input ref={prePassword} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="reset" onClick={addUser} className='btn w-[350px] rounded-3xl text-white bg-orange-400 py-2 border'>Sign in</button>
          <button onClick={loginPage} className='w-[350px] py-2 border rounded-full text-white'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Register