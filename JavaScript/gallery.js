// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Image Modal Functionality
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-nav">
                <button class="prev-btn">❮</button>
                <button class="next-btn">❯</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    let currentImageIndex = 0;
    const imageArray = Array.from(images);
    
    // Open modal
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            showModal(img.src);
        });
    });
    
    function showModal(src) {
        modal.querySelector('.modal-image').src = src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Navigation
    modal.querySelector('.prev-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        showModal(imageArray[currentImageIndex].src);
    });
    
    modal.querySelector('.next-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
        showModal(imageArray[currentImageIndex].src);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') modal.querySelector('.prev-btn').click();
            if (e.key === 'ArrowRight') modal.querySelector('.next-btn').click();
        }
    });
});