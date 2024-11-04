import React, {useState, useEffect} from 'react'
import {getAllWarehouses, createWarehouse, updateWarehouse, deleteWarehouse} from '../api/auth'


export default function WarehouseSection() {
    const [warehouses, setWarehouses] = useState([]);
    const [showModal, setShowModal] = useState(false)

  return (
    <div>WarehouseSection</div>
  )
}
