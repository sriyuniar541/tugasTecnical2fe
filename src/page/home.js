import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const token = localStorage.getItem('token')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const getUser = () => {
    axios.get(process.env.REACT_APP_api_backend + `?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data.data)
      setdata(res.data.data)
    }).catch((err) => {
      console.log(err.response.data.message, 'gagal')
      alert(err.response.data.message, 'please login again')
      navigate('/login')
    })
  }


  const nextPage = () => {
    setPage(page + 1)
  }

  const backPage = () => {
    if (page <= 0) {
      setPage(1)
    } else {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    getUser()
  }, [page, limit])


  return (
    <div className='container bg-light p-lg-5'>
      <h2>Daftar User</h2>
      <hr/>
      <div className='row justify-content-between mt-5'>
        {data?data.map((p) => (
          <div className=' col-lg-4 col-5 bg-primary mb-3 p-4 text-white ' style={{ borderRadius: '20px' ,lineHeight:'10px'}} >
            <h3 className=''>{p.nama_depan} {p.nama_belakang}</h3>
            <hr/>
            <p>Email : {p.email}</p>
            <p>Nomor Hp : {p.no_hp}</p>
            <p>Alamat : {p.alamat}</p>
          </div>
        )) : 'Please login ...!'}
      </div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <p className='mt-5 me-3'>Tampilan</p>
      <Dropdown className='mt-5'>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {page}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={((e) => setPage(1))}>1</Dropdown.Item>
            <Dropdown.Item onClick={((e) => setPage(3))}>3</Dropdown.Item>
            <Dropdown.Item onClick={((e) => setPage(5))}>5</Dropdown.Item>
            <Dropdown.Item onClick={((e) => setPage(10))}>10</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        <div className='d-flex justify-content-end mt-5 bg-white'>
          <button className='btn btn-secondary' onClick={backPage}>Back</button>
          <p className='px-2 my-2'>page {page}</p>
          <button className='btn btn-secondary' onClick={nextPage}>Next</button>
        </div>
        
      </div>
    </div>
  )
}
