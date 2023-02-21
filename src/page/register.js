import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import gambar1 from '../aset/gambar1.jpg'



export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
    nama_depan: '',
    nama_belakang: '',
    no_hp: '',
    alamat: ''
  })

  const register = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('nama_depan', data.nama_depan)
    formData.append('nama_belakang', data.nama_belakang)
    formData.append('no_hp', data.no_hp)
    formData.append('alamat', data.alamat)

    axios.post(process.env.REACT_APP_api_backend + '/register', formData, {
      headers: {
        "Content-Type": "apication/json"
      }
    }).then((res) => {
      console.log(res.data.message, 'berhasil')
      alert(res.data.message)
      navigate('/login')
    }).catch((err) => {
      console.log(err.response.data, 'gagal')
      alert(err.response.data.data)
    })
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  return (
    <div className='container'>
      <div className='row' style={{marginTop:'20px',marginBottom:'20px'}}>
        <div className='col-lg-6'>
          <img src={gambar1} height={500} width={500} className='img-fluid' alt='gambar_1' />
        </div>
        <div className='col-lg-6'>
        <h3 className='mt-lg-5'>Register </h3>
          <div className='row'>
            <div className='col-6'>
              <input type='text' className='form-control my-4'
                id='exampleFormControlInput1'
                name='nama_depan'
                value={data.nama_depan}
                onChange={handleChange}
                placeholder='First Name' />
              <input type='email' className='form-control my-4'
                id='exampleFormControlInput1'
                name='email'
                value={data.email}
                onChange={handleChange}
                placeholder='Email' />
            </div>
            <div className='col-6'>
              <input type='text' className='form-control my-4'
                id='exampleFormControlInput1'
                name='nama_belakang'
                value={data.nama_belakang}
                onChange={handleChange}
                placeholder='Last Name' />
              <input type='text' className='form-control my-4'
                id='exampleFormControlInput1'
                name='no_hp'
                value={data.no_hp}
                onChange={handleChange}
                placeholder='No Hp' />
            </div>
            <div>
              <textarea className="form-control"
                id="floatingTextarea2"
                name='alamat'
                value={data.alamat}
                onChange={handleChange}
                placeholder='Adress' />
            </div>
            <div className='col-6'>
              <input type='password' className='form-control my-4'
                id='exampleFormControlInput1'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Password' />
            </div>
            <div className='col-6'>
              <input type='password' className='form-control my-4'
                id='exampleFormControlInput1'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Convirmasi password' />
            </div>
            <button className='btn btn-primary' onClick={register}>Daftar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
