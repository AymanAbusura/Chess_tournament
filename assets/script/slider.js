document.addEventListener('DOMContentLoaded', () => {
    let sliderInitialized = false;
    let currentIndex = 0;
    let slideWidth = 0;
    let resizeTimeout;

    const slides = document.querySelectorAll('.slider__item');
    const sliderContainer = document.querySelector('.slider__container');
    const prevButton = document.querySelector('.btn__prev');
    const nextButton = document.querySelector('.btn__next');
    const indicatorContainer = document.querySelector('.indicator');

    const clearSlider = () => {
        sliderContainer.style.display = '';
        sliderContainer.style.transition = '';
        sliderContainer.style.transform = '';

        slides.forEach(slide => {
            slide.style.minWidth = '';
        });

        indicatorContainer.innerHTML = '';

        const newPrev = prevButton.cloneNode(true);
        const newNext = nextButton.cloneNode(true);
        prevButton.parentNode.replaceChild(newPrev, prevButton);
        nextButton.parentNode.replaceChild(newNext, nextButton);
    };

    const initSlider = () => {
        if (window.innerWidth >= 768) {
            if (sliderInitialized) {
                clearSlider();
                sliderInitialized = false;
            }
            return;
        }

        if (sliderInitialized) return;
        sliderInitialized = true;

        currentIndex = 0;
        sliderContainer.style.display = 'flex';
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';

        const updateWidths = () => {
            slideWidth = document.querySelector('.slider').offsetWidth;
            slides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}px`;
            });
            updatePosition();
        };

        const updatePosition = () => {
            sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const updateDots = () => {
            document.querySelectorAll('.indicator .dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updatePosition();
            updateDots();
            updateButtons();
        };

        const updateButtons = () => {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slides.length - 1;
        };

        updateWidths();

        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            indicatorContainer.appendChild(dot);
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
        });

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateWidths, 200);
        });
    };

    initSlider();
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initSlider, 200);
    });
});
