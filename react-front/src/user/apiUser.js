export const read = (userId,token) => {
    return fetch(`http://localhost:8080/user/${userId}`,{
         method:"GET",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }
 export const readabout = (userId,token) => {
    return fetch(`http://localhost:8080/user/aboutp/${userId}`,{
         method:"GET",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const readAllUsers = (userId,token) => {
    return fetch(`http://localhost:8080/users`,{
         method:"GET",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const readfollow = (userId,token) => {
    return fetch(`http://localhost:8080/userss/follow/${userId}`,{
         method:"GET",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     })
     .then(response => {

         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const update = (userId, token,user) => {
    return fetch(`http://localhost:8080/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error"))
}

export const updatep = (userId, token,user) => {
    return fetch(`http://localhost:8080/user/aboutpp/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error"))
}
export const updatePP = (userId, token,user) => {
    return fetch(`http://localhost:8080/user/aboutpp/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error"))
}


 export const remove = (userId,token) => {
    return fetch(`http://localhost:8080/user/${userId}`,{
         method:"DELETE",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const list = () => {
    return fetch(`http://localhost:8080/users`,{
         method:"GET",
        
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const updateUser = (user,next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth=JSON.parse(localStorage.getItem('jwt'))
            auth.user=user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next();
        }
    }
 }

 export const follow = (userId,token,followId,followName) => {
    console.log(followName)
    return fetch(`http://localhost:8080/userss/follow`,{
         method:"PUT",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         },
         body: JSON.stringify({userId,followId,followName})
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const unfollow = (userId,token,unfollowId) => {
    return fetch(`http://localhost:8080/userss/unfollow`,{
         method:"PUT",
         headers:{
             Accept:"application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         },
         body: JSON.stringify({userId,unfollowId})
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }