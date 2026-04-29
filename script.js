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

// This object starts empty and will automatically fill itself as you click buttons
const sliderStates = {};

function moveSlider(sliderId, direction) {
    const container = document.getElementById(sliderId);
    
    // Safety check: if the ID in HTML doesn't match the ID passed here, stop
    if (!container) {
        console.error("Slider not found: " + sliderId);
        return;
    }

    const track = container.querySelector('.slider-track');
    const totalImages = track.querySelectorAll('img').length;
    
    // PRO-FIX LOGIC: If this is the first time clicking this slider, 
    // it automatically creates a starting position (0) in the memory.
    if (sliderStates[sliderId] === undefined) {
        sliderStates[sliderId] = 0;
    }

    // Calculate new index
    let newIndex = sliderStates[sliderId] + direction;

    // Handle looping
    if (newIndex >= totalImages) {
        newIndex = 0; // Back to first photo
    } else if (newIndex < 0) {
        newIndex = totalImages - 1; // Back to last photo
    }

    // Update the memory for this specific slider
    sliderStates[sliderId] = newIndex;

    // Physically move the slider images
    const translateValue = newIndex * -100;
    track.style.transform = `translateX(${translateValue}%)`;
}

// Keep track of the current index for each slider independently
// const sliderStates = {
//     bangladeshSlider: 0,
//     vietnamSlider: 0,
//     russiaSlider: 0,
//     georgiaSlider: 0,
//     kyrgyzSlider: 0,
//     uzbekSlider: 0
// };

// function moveSlider(sliderId, direction) {
//     const container = document.getElementById(sliderId);
//     const track = container.querySelector('.slider-track');
//     const totalImages = track.querySelectorAll('img').length;
    
//     // Calculate new index based on direction (-1 for prev, 1 for next)
//     let newIndex = sliderStates[sliderId] + direction;

//     // Handle looping: go from last back to first, or first back to last
//     if (newIndex >= totalImages) {
//         newIndex = 0; // Loop to the beginning
//     } else if (newIndex < 0) {
//         newIndex = totalImages - 1; // Loop to the end
//     }

//     // Update state
//     sliderStates[sliderId] = newIndex;

//     // Calculate the translation percentage. Since each img is 100% wide,
//     // translating by -100% shows the 2nd image, -200% shows the 3rd, etc.
//     const translateValue = newIndex * -100;
//     track.style.transform = `translateX(${translateValue}%)`;
// }

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.classList.toggle('active');
    });
});

// Function to open the Portal Modal
function openPortal() {
    document.getElementById("portalModal").style.display = "flex";
}

// Function to close the Portal Modal
function closePortal() {
    document.getElementById("portalModal").style.display = "none";
}

// Handle Portal Form Submission
const portalForm = document.getElementById('portalForm');
portalForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const portalBtn = portalForm.querySelector('.btn-apply');
    portalBtn.innerHTML = "Sending...";
    portalBtn.disabled = true;

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(portalForm)
    })
    .then(response => {
        alert("Verification Successful! Opening your brochure...");
        // Replace the link below with your actual brochure link
        window.open('Medhavi_Educare_MBBS_Brochure_2026.pdf', '_blank');
        portalForm.reset();
        closePortal();
        portalBtn.innerHTML = "Get Brochure Now";
        portalBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error!', error.message);
        portalBtn.disabled = false;
    });
});

