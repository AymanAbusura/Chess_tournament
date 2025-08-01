document.addEventListener('DOMContentLoaded', () => {
  const heroTitleBlocks = document.querySelectorAll('.title__first_block');
  const descriptionText = document.querySelector('.description-text');

  heroTitleBlocks.forEach((block, i) => {
    block.classList.add('animate-fade-slide');
    setTimeout(() => {
      block.classList.add('active');
    }, i * 300);
  });

  if (descriptionText) {
    descriptionText.classList.add('animate-fade-slide');
    setTimeout(() => {
      descriptionText.classList.add('active');
    }, heroTitleBlocks.length * 300 + 300);
  }

  const scrollAnimElements = document.querySelectorAll('.tournament-section__item_img, .tournament-section__item_img-2, .tournament-section__item-description-card');

  const observerOptions = {
    threshold: 0.2,
  };

  const onEntry = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-zoom', 'active');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onEntry, observerOptions);
  scrollAnimElements.forEach(el => {
    el.classList.add('animate-zoom');
    observer.observe(el);
  });

  const carouselItems = document.querySelectorAll('.carousel__item');

  carouselItems.forEach(item => {
    item.classList.add('animate-fade-slide');
  });

  const carouselObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.5});

  carouselItems.forEach(item => carouselObserver.observe(item));
});