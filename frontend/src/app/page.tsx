import UserData from "@/components/user/userData/userdata"
import AddUser from "@/components/user/addUser/addUser"


export default function Home() {
  return (<>
    <main style={{ padding: '20px' }}>

   
    <AddUser />
    <div><UserData /></div>
    
    
    </main>
    
    

    </>
  )
}
