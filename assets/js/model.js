function openModal() {
    document.getElementById("cvModal").style.display = "block";
}

function closeModal() {
    document.getElementById("cvModal").style.display = "none";
}

// Optional: Close the modal if the user clicks outside of it
window.onclick = function(event) {
    let modal = document.getElementById("cvModal");
    if (event.target == modal) {
        closeModal();
    }
}
