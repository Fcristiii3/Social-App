export const create = (userId, token,post) => {
    return fetch(`http://localhost:8080/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error"))
};

export const list = () => {
    return fetch(`http://localhost:8080/posts`,{
         method:"GET",
        
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const listByUser = (userId,token) => {
    return fetch(`http://localhost:8080/posts/by/${userId}`,{
         method:"GET",
         headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        
     })
     .then(response => {
         return response.json()
     })
     .catch(err=>console.log("error"))
 }

 export const like = (userId,postId) => {
    console.log(userId,postId)
    return fetch(`http://localhost:8080/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId,postId})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error"))
};
export const likeGet = (token,postId) => {
    return fetch(`http://localhost:8080/post/like`, {
        method:"GET",
         headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({postId})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error"))
};

export const getLikes = (posId) => {
     likeGet(posId).then(data=>{
        
        if(data.error){console.log(data.error)}  
        else 
        {
            console.log(data);
            this.setState({infoLikes:data})
        }
    })
}