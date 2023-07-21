import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

const loadFormState = () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  } else {
    emailInput.value = ''; // Поля будуть порожніми, якщо в сховищі немає збережених даних
    messageTextarea.value = '';
  }
};

// Викликаємо функцію безпосередньо, без події DOMContentLoaded
loadFormState();

form.addEventListener('input', () => {
  saveFormState();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formState);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';
});
