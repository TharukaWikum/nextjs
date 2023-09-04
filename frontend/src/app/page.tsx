import UserData from "@/components/userdata"
import AddUser from "@/addUser/addUser"


export default function Home() {
  return (<>
    <main style={{ padding: '20px' }}>

   
    <AddUser />
    <div><UserData /></div>
    
    
    </main>
    
    

    </>
  )
}
