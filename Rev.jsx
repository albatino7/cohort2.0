import React, { useState } from 'react'

const Rev2 = () => {
    const [user, setUser]= useState([
        {
            name:"Rada Rani",
            class:"Goad"
        },
        {

            name:"Krishna Bhaiya",
            class :"Gooood"
        },
          {

            name:"mahadev jii",
            class :"Gooood"
        },
           {

            name:"Ganesh ji",
            class :"Gooood"
        }

    ])

    const [editIndex, setEditIndex] = useState(null)

    const[ editData , setEditData] = useState({
        name:"",
        class:""
    })

    const updateData =()=>{

        const copyUser = [...user]
        copyUser[editIndex]= editData
        setUser(copyUser)
        

        setEditIndex(null)
    }









  return (
    <div>
            {

                user.map((value, index)=>(
                    editIndex === index ?(
                        <div>
                            <input type="text" placeholder='name' value={editData.name} onChange={(e)=>{
                                setEditData({
                                    ...editData,
                                    name:e.target.value
                                })
                            }} />

                            <input type="text" placeholder='class' value={editData.class} onChange={(e)=>{

                                setEditData({
                                    ...editData,
                                    name:e.target.value
                                })
                            }} />

                           
                           
                           
                            <button onClick={updateData}>Submit</button>

                            
                        </div>
                    ) :(

                        <div>

                                <h1>{value.name}</h1>
                                <h2>{value.class}</h2>
                                <button onClick={()=>{

                                        setEditIndex(index)
                                        setEditData({
                                            ...editData,
                                            name:value.name,
                                            class:value.class
                                        })

                                }}>edit</button>

                        </div>







                    )


                ))



            }
    </div>
  )
}

export default Rev2
