let mainDiv = document.getElementById("container");
let photoLength = 0;

function createPhotoCard(photo, containerDiv){
  let photoDiv = document.createElement("div");
  photoDiv.classList.add("photocard");
  photoDiv.addEventListener('click', fadeOut);


  let img = document.createElement("img");
  img.src = photo.url;
  img.height = 250;
  img.width = 250;
  img.classList.add("photo");
  

  let imgTitle = document.createElement("p");
  let textNode = document.createTextNode(photo.title);
  imgTitle.appendChild(textNode);
  imgTitle.className = "title";

  photoDiv.appendChild(img);
  photoDiv.appendChild(imgTitle);
  
  containerDiv.appendChild(photoDiv);
}

function fadeOut(){
  this.style.opacity = 1;
  var timer = setInterval(() => {
    this.style.opacity -= 0.02
    if(this.style.opacity <= 0){
      clearInterval(timer);
      this.remove();
      document.getElementById("item-count").innerHTML = `There are ${mainDiv.childElementCount} photos being shown`;
    }
  },10);
}


if(mainDiv){
  let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
  fetch(fetchURL)
  .then((data) => data.json())
  .then((photos) =>{
    photos.forEach((photo) => createPhotoCard(photo, mainDiv));
    photoLength = photos.length;
    document.getElementById("item-count").innerHTML = `There are ${photoLength} photos being shown`;
  })
  .catch(err => console.error(err));  
}

