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
  captions: (el) => el.dataset.alt,
});

galleryList.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = event.target.dataset.source;
  lightbox.open({ content: `<img src="${largeImageUrl}" alt="${event.target.alt}">` });
});



console.log(galleryItems);
