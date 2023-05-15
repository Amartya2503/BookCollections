
const url = 'http://127.0.0.1:8000/book'

 const xhr = new XMLHttpRequest()
 xhr.open('GET',url,true)
 xhr.onload = ()=>{
    if(xhr.status == 200 || xhr.status == 201){

        let objects = JSON.parse(xhr.response)
       
        let card = document.getElementById('CardId')
        resp = ''
        for(obj in objects){
            resp += `<div class="card" style="width: 18rem;">
            <!-- <img src="..." class="card-img-top" alt="..."> -->
            <div class="card-body">
              <h5 class="card-title">${objects[obj].name}</h5>
              <p class="card-text">${objects[obj].summary.slice(0,150)}...</p>
              <a href="#" class="btn btn-outline-primary" id="EditBtn" onclick="EditClick()">Edit </a>
              <a href="./index.html" class="btn btn-outline-danger" id = "${objects[obj].id}" onclick ="DeleteClick()">Delete</a>
              <a href="#" class="btn btn btn-outline-dark">Completed</a>
            </div>
          </div>`
        }
        card.innerHTML = resp;

        
    }
    else{
        console.log(xhr.status)
    }
    
 }

 xhr.onerror = ()=>{
    console.log(xhr.status)
 }
 xhr.send()

 function postData() {
    const url = 'http://127.0.0.1:8000/book'
    
    let dataName = document.getElementById('nameAdd')
    let dataAuthor = document.getElementById('authorAdd')
    let dataSummary = document.getElementById('summaryAdd')
    
    console.log('here post',dataName.value,dataAuthor.value,dataSummary.value)  
    data = {'name':`${dataName.value}`,
                 'author' : `${dataAuthor.value}`,
                 'summary': `${dataSummary.value}`
               } 
    console.log(typeof(data))
    const xhr = new XMLHttpRequest()
    xhr.open('POST',url,true)
    xhr.getResponseHeader('Content-Type','application/json')
    xhr.setRequestHeader('Content-Type','application/json')

    xhr.send(JSON.stringify(data))
    console.log("done",xhr.responseText)
 }

 function DeleteClick(){
    console.log('here delete',event.target.id)
    const xhr = new XMLHttpRequest()
    const url = `http://127.0.0.1:8000/book/${event.target.id}`
    xhr.open('DELETE',url,true)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send()


 }