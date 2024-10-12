import {auth} from '../Firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {addDoc, getDocs, collection, doc, setDoc} from 'firebase/firestore'
import { db } from '../Firebase'
const provider = new GoogleAuthProvider()


export const authProvider = (data:(res: any)=> void) => {
    signInWithPopup(auth, provider)
    .then((res: any)=> {
        console.log(res.user)
        data(res.user)
        // fetchUsers()
    })

}


    export const handleSignOut = async (name: string, data: any, func: ()=> void) => {
      try {
        addData(name, data)
        setTimeout(async () => {
        await signOut(auth);
        func()
            },500)

        console.log('User signed out');
      } catch (err) {
        console.error('Error signing out:', err);
      }
    };
  
export const fetchUsers = async (name: any, func: (res: any)=> void, res: any) => {
    let user = ''
    let data: any = {}
    try {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      querySnapshot.forEach((doc) => {
        if( name === doc.id){
          func(doc.data())
          console.log(doc.data)
        }else{
            addData(name, data)
        }
        // setTimeout(()=>{
        //     if(data){
                
        //     }else{
        //         addData()
        //     }
        // },300)
      });
    } catch (error) {
      console.log('Error fetching users:');
    }
  };

  const addData = async(userId: string, userData: any) => {
    console.log(userId, userData, "mama")
    const querySnapshot2 = doc(db, 'Users' ,userId);
    await setDoc(querySnapshot2, {folders: userData})
  }