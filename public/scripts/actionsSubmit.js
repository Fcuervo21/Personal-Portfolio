// import Swal from 'sweetalert2';

const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('CONTENT-TYPE', 'application/json');

    xhr.onload = function () {
        console.log(xhr.responseText);
        if(xhr.responseText === 'success'){
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Done',
            //     text: 'Email sent successfully!'
            //   });
            alert('Email sent successfully');
              name.value = '';
              email.value = '';
              subject.value = '';
              message.value = '';
        } else {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops..',
            //     text: 'Something went wrong!'
            //   });
            alert('Oops! Something went wrong');
        }
    }
    xhr.send(JSON.stringify(formData));
})