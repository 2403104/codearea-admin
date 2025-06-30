import React,{useContext,useEffect}  from 'react'
import AddProblem from './AddProblem'
const ManageProblem = () => {

  return (
    <div className="w-80 mx-5">
      <h1 className="text-center text-primary mt-2 mb-0">Add Problem</h1>
      <AddProblem />
    </div>
  )
}

export default ManageProblem
