import React, { useState } from 'react'
import axios from 'axios'
import gambar1 from '../aset/gambar1.jpg'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const register = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    axios.post(process.env.REACT_APP_api_backend + '/login', formData, {
      headers: {
        'Content-Type': 'apication/json'
      }
    }).then((res) => {
      console.log(res.data.data, 'berhasil')
      alert(res.data.message)
      localStorage.setItem('user', JSON.stringify(res.data.data))
      localStorage.setItem('token', res.data.data.token)
      navigate('/')
    }).catch((err) => {
      console.log(err.response.data.message, 'gagal')
      alert(err.response.data.message)
    })
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  return (
    <div className='container' style={{marginBottom:'100px',marginTop:'100px'}}>
      <div className='row'>
        <div className='col-6 '>
          <img src={gambar1} height={500} width={500} className='img-fluid' alt='gambar_1'/>
        </div>
        <div className='col-6 py-lg-5'>
          <h3 className='mt-2 mt-lg-5 mb-lg-5'>Login</h3>
          <div className='mb-3'>
            <input type='email' className='form-control my-4'
              id='exampleFormControlInput1'
              name='email'
              value={data.email}
              onChange={handleChange} />
            <input type='password' className='form-control'
              id='exampleFormControlInput1'
              name='password'
              value={data.password}
              onChange={handleChange} />
            <button className='btn btn-primary mt-4 col-12'
              onClick={register}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
