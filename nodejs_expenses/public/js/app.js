deleteShopName.addEventListener('submit', (event) => {
    event.preventDefault() //FORM will not refresh the page when submitting. Allows us to do what we want
    
    fetch('http://94.237.53.21:3001/submitShop/'+deleteShopNameSelect.value,{
        method: 'DELETE'
    }).then((response) => {
        response.json().then((data) => {
                  
           if (data.response){
                location.reload();
           } else {
                console.log(data)
           }

        })
    })

})


deleteDescription.addEventListener('submit', (event) => {
    event.preventDefault() //FORM will not refresh the page when submitting. Allows us to do what we want
    
    fetch('http://94.237.53.21:3001/submitDescription/'+deleteDescriptionSelect.value,{
        method: 'DELETE'
    }).then((response) => {
        response.json().then((data) => {
                  
           if (data.response){
                location.reload();
           } else {
                console.log(data)
           }

        })
    })

})