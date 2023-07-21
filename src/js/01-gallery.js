import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryList = document.querySelector('.gallery');

const imagesListArr = galleryItems.map((image) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${image.original}"> <img class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`;
});

const listTemplate = imagesListArr.join('');
galleryList.insertAdjacentHTML('beforeend', listTemplate);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt", 
  captionDelay: 250, 


});


