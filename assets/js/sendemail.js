// console.log("Script loaded");
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('http://13.53.132.1:5000/send_email', {
    method: 'POST',
    body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            displayAlert('Email sent successfully!', 'success');
        } else {
            displayAlert('Failed to send email.', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayAlert('Error sending message.', 'danger');
    });
});

function displayAlert(message, type) {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const alert = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    alertPlaceholder.innerHTML = alert;
}
