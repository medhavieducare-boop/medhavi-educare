// Replace the URL below with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzbV0ikpEGkG28a2ie3_Q6SCcXxAjlBan-i70Ta847_cJ4JiEwPeQXPRlM-hz4s22UI/exec'  ;
const form = document.getElementById('admissionForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.btn-apply');
    submitBtn.innerHTML = "Processing...";
    submitBtn.disabled = true;

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        alert("Success! Medhavi Educare has received your details. We will contact you soon.");
        form.reset();
        submitBtn.innerHTML = "Submit Application";
        submitBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Submission failed. Please check your connection and try again.");
        submitBtn.disabled = false;
    });
});

// Function to close the modal
function closeModal() {
    document.getElementById("salesModal").style.display = "none";
}

// Optional: Close modal if user clicks outside of the box
window.onclick = function(event) {
    let modal = document.getElementById("salesModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Keep track of the current index for each slider independently
const sliderStates = {
    bangladeshSlider: 0,
    vietnamSlider: 0
};

function moveSlider(sliderId, direction) {
    const container = document.getElementById(sliderId);
    const track = container.querySelector('.slider-track');
    const totalImages = track.querySelectorAll('img').length;
    
    // Calculate new index based on direction (-1 for prev, 1 for next)
    let newIndex = sliderStates[sliderId] + direction;

    // Handle looping: go from last back to first, or first back to last
    if (newIndex >= totalImages) {
        newIndex = 0; // Loop to the beginning
    } else if (newIndex < 0) {
        newIndex = totalImages - 1; // Loop to the end
    }

    // Update state
    sliderStates[sliderId] = newIndex;

    // Calculate the translation percentage. Since each img is 100% wide,
    // translating by -100% shows the 2nd image, -200% shows the 3rd, etc.
    const translateValue = newIndex * -100;
    track.style.transform = `translateX(${translateValue}%)`;
}