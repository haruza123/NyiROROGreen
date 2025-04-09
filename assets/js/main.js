/**
 * Template Name: BizLand
 * Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
 * Updated: Dec 05 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });


  //Animasi angka
  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.count');
    const speed = 50;
  
    const runCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/\./g, '');
      const increment = target / speed;
  
      const updateCount = () => {
        const current = +counter.innerText.replace(/\./g, '');
        if (current < target) {
          const newCount = Math.ceil(current + increment);
          counter.innerText = newCount.toLocaleString('id-ID');
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target.toLocaleString('id-ID');
        }
      };
  
      updateCount();
    };
  
    // ✅ Pakai Intersection Observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target); // hanya jalankan sekali
        }
      });
    }, {
      threshold: 0.6 // 60% elemen terlihat baru dijalankan
    });
  
    counters.forEach(counter => {
      observer.observe(counter);
    });
  });
  
  

  /*Story animation */
  document.addEventListener("DOMContentLoaded", function () {
    let stories = document.querySelectorAll(".story");
    let currentIndex = 0;
    let storyContainer = document.querySelector(".story-container");
    let storyActive = false;
    let isScrolling = false;
    let startY = 0; 
    let endY = 0;   

    function showStory(index) {
        stories.forEach((story, i) => {
            if (i === index) {
                story.classList.add("active");
                story.classList.remove("exit");
            } else if (i < index) {
                story.classList.add("exit"); 
                story.classList.remove("active");
            } else {
                story.classList.remove("active", "exit");
            }
        });
    }

    function nextStory() {
        if (!isScrolling && currentIndex < stories.length - 1) {
            isScrolling = true;
            currentIndex++;
            showStory(currentIndex);
            setTimeout(() => (isScrolling = false), 1000);
        } else if (currentIndex === stories.length - 1) {
            enableScroll();
        }
    }

    function prevStory() {
        if (!isScrolling && currentIndex > 0) {
            isScrolling = true;
            currentIndex--;
            showStory(currentIndex);
            setTimeout(() => (isScrolling = false), 1000);
        } else if (currentIndex === 0) {
            enableScroll();
        }
    }

    function disableScroll() {
        document.body.style.overflow = "hidden";
    }

    function enableScroll() {
        document.body.style.overflow = "auto";
        storyActive = false;
    }

    function disableScrollAgain() {
        document.body.style.overflow = "hidden";
        storyActive = true;
    }

    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    storyActive = true;
                    disableScrollAgain();
                    showStory(currentIndex);
                }
            });
        },
        { threshold: 0.8 }
    );

    observer.observe(storyContainer);

    window.addEventListener("wheel", function (event) {
        if (storyActive) {
            if (event.deltaY > 0) {
                nextStory();
            } else {
                prevStory();
            }
        }
    });

    storyContainer.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
    });

    storyContainer.addEventListener("touchend", function (event) {
        endY = event.changedTouches[0].clientY;

        if (storyActive) {
            let diff = startY - endY;

            if (diff > 50) {
                nextStory();
            } else if (diff < -50) {
                prevStory();
            }
        }
    });

});

/**slider */
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const afterImage = document.querySelector(".after");
  const sliderBar = document.querySelector(".slider-bar");

  slider.value = 100;
  afterImage.style.clipPath = `inset(0 0% 0 0)`; 
  sliderBar.style.left = `100%`; 

  slider.addEventListener("input", function () {
      let sliderValue = slider.value;

      afterImage.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
      sliderBar.style.left = `${sliderValue}%`;
  });
});

// Fungsi untuk menambahkan animasi saat elemen masuk layar
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('section-title')) {
        entry.target.classList.add('fade-in-title'); 
      } else if (entry.target.classList.contains('text-container')) {
        entry.target.classList.add('fade-in-left'); 
      } else if (entry.target.classList.contains('image-container')) {
        entry.target.classList.add('fade-in-right'); 
      }
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.5 
});

const titleElement = document.querySelector('#yogyakarta-info .section-title');
const textElement = document.querySelector('#yogyakarta-info .text-container');
const imageElement = document.querySelector('#yogyakarta-info .image-container');

observer.observe(titleElement);
observer.observe(textElement);
observer.observe(imageElement);


/**SImulasi Banjir */
  document.addEventListener("DOMContentLoaded", function () {
    let sungai = document.getElementById("sungai");
    let simulasiContainer = document.getElementById("simulasi-container");
    let lubangAir = document.getElementById("lubang-air");
    let jumlahSampah = 0;
    let sampahTersumbat = 0;
    let sampahList = [];
    let alertShown = false;

    function updateSungai() {
        let tinggiAir = 90 + (sampahTersumbat >= 4 ? (jumlahSampah - 4) * 10 : 0);
        let warnaAir = jumlahSampah > 6
            ? "linear-gradient(to bottom, rgba(100,50,50,0.8), rgba(70,30,30,0.8))"
            : jumlahSampah > 4
            ? "linear-gradient(to bottom, rgba(0,150,100,0.8), rgba(0,100,80,0.8))"
            : "linear-gradient(to bottom, rgba(0,119,190,0.8), rgba(0,87,150,0.8))";

        sungai.style.height = tinggiAir + "px";
        sungai.style.background = warnaAir;

        if (sampahTersumbat >= 4 && !alertShown) {
            alert("🚨 Air mulai naik akibat sampah yang menyumbat!");
            alertShown = true;
        }
    }

    window.tambahSampah = function () {
        if (jumlahSampah < 10) {
            jumlahSampah++;
            let sampah = document.createElement("div");
            sampah.className = "sampah";

            let containerRect = simulasiContainer.getBoundingClientRect();
            let sungaiRect = sungai.getBoundingClientRect();
            let lubangRect = lubangAir.getBoundingClientRect();

            let lubangX = lubangRect.left - containerRect.left + (lubangRect.width / 2) - 25;
            let lubangY = lubangRect.top - containerRect.top;


            let startX = Math.random() * 80 + "%"; 
            let startY = sungaiRect.top - containerRect.top + 30; 

            sampah.style.left = startX;
            sampah.style.top = startY + "px";

            simulasiContainer.appendChild(sampah);
            sampahList.push(sampah);

            let moveSampah = setInterval(() => {
                let sampahX = parseFloat(sampah.style.left);
                let sampahY = parseFloat(sampah.style.top);
                
                let dx = (lubangX - sampahX) * 0.1;
                let dy = (lubangY - sampahY) * 0.1;

                sampah.style.left = sampahX + dx + "px";
                sampah.style.top = sampahY + dy + "px";

                if (Math.abs(sampahX - lubangX) < 5 && Math.abs(sampahY - lubangY) < 5) {
                    clearInterval(moveSampah);
                    if (sampahTersumbat < 4) {
                        sampah.style.left = lubangX + "px";
                        sampah.style.top = lubangY + "px";
                        sampahTersumbat++;
                    } 
                    else {
                        sampah.style.left = lubangX + "px";
                        sampah.style.top = (lubangY - 20) + "px";
                    }
                    updateSungai();
                }
            }, 100);
        } else {
            alert("⚠️ Terlalu banyak sampah! Sungai penuh!");
        }
    };

    window.resetSimulation = function () {
        jumlahSampah = 0;
        sampahTersumbat = 0;
        alertShown = false;
        sungai.style.height = "90px";
        sungai.style.background = "linear-gradient(to bottom, rgba(0,119,190,0.8), rgba(0,87,150,0.8))";
        sampahList.forEach(sampah => sampah.remove());
        sampahList = [];
    };
});


  /**
   * Toggle
   */
  window.onload = function() {
    function toggleImage(element) {
        let img1 = element.getAttribute("data-img1");
        let img2 = element.getAttribute("data-img2");
        let text1 = element.getAttribute("data-text1");
        let text2 = element.getAttribute("data-text2");

        let textElement = element.parentElement.querySelector(".perbedaan-text");

        let currentBg = element.style.backgroundImage;
        let currentImg = currentBg.replace('url("', '').replace('")', ''); // Hapus `url("")`

        if (currentImg.includes(img1.split('/').pop())) {
            element.style.backgroundImage = `url("${img2}")`;
            textElement.innerText = text2;
        } else {
            element.style.backgroundImage = `url("${img1}")`;
            textElement.innerText = text1;
        }
    }

    // Tambahkan event listener ke semua elemen dengan class `.perbedaan-item`
    document.querySelectorAll('.perbedaan-item').forEach(item => {
        item.onclick = function() {
            toggleImage(this);
        };
    });
    
};

/**Form */
document.getElementById("toggle-form").addEventListener("click", function() {
  var form = document.getElementById("laporan-form");
  if (form.style.display === "none" || form.style.display === "") {
      form.style.display = "block";
      this.textContent = "Tutup Form";
  } else {
      form.style.display = "none";
      this.textContent = "Laporkan Sampah";
  }
});

/**education */
document.querySelectorAll(".accordion").forEach((button) => {
  button.addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

const quizData = [
  { question: "Apa yang paling berdampak dalam mengurangi sampah plastik?", options: ["Menggunakan plastik sekali pakai", "Membawa botol minum sendiri", "Membakar sampah plastik", "Membuang plastik ke laut"], answer: "B" },
  { question: "Apa tujuan utama dari daur ulang?", options: ["Mengurangi limbah", "Meningkatkan polusi", "Memperbanyak produksi plastik", "Membuang sampah lebih cepat"], answer: "A" },
  { question: "Apa yang termasuk sampah organik?", options: ["Botol plastik", "Daun kering", "Kaca", "Kaleng aluminium"], answer: "B" },
  { question: "Apa warna tempat sampah untuk sampah organik di Indonesia?", options: ["Biru", "Hijau", "Merah", "Kuning"], answer: "B" },
  { question: "Apa yang dapat dilakukan dengan kertas bekas untuk mengurangi sampah?", options: ["Dibuang ke sungai", "Dibakar", "Didaur ulang", "Dibuang ke tempat sampah biasa"], answer: "C" },
  { question: "Apa yang bukan termasuk sampah elektronik?", options: ["Baterai bekas", "Monitor rusak", "Sisa makanan", "Handphone bekas"], answer: "C" },
  { question: "Apa efek utama dari sampah plastik di laut?", options: ["Membantu ikan berenang", "Meningkatkan populasi ikan", "Membahayakan kehidupan laut", "Tidak ada efek"], answer: "C" },
  { question: "Apa manfaat dari composting?", options: ["Mengurangi sampah organik", "Meningkatkan polusi udara", "Membuat plastik lebih tahan lama", "Menambah limbah B3"], answer: "A" },
  { question: "Bagaimana cara terbaik mengelola sampah di rumah?", options: ["Membuangnya sembarangan", "Memisahkan sampah organik dan anorganik", "Membakar semua sampah", "Membuang ke tempat sampah biasa"], answer: "B" },
  { question: "Apa yang dimaksud dengan ekonomi sirkular?", options: ["Menggunakan kembali produk bekas", "Membuang semua barang lama", "Menghindari penggunaan produk daur ulang", "Memproduksi lebih banyak plastik"], answer: "A" }
];

let currentQuestionIndex = 0;

function loadQuestion() {
  const questionContainer = document.getElementById("question");
  const buttons = document.querySelectorAll(".quiz-btn");

  if (currentQuestionIndex < quizData.length) {
      const quizItem = quizData[currentQuestionIndex];
      questionContainer.innerText = quizItem.question;

      buttons.forEach((button, index) => {
          button.innerText = `${["A", "B", "C", "D"][index]}. ${quizItem.options[index]}`;
          button.dataset.answer = ["A", "B", "C", "D"][index];
          button.style.background = "#007bff"; 
          button.disabled = false; 
      });
  } else {
      questionContainer.innerText = "🎉 Selamat! Anda telah menyelesaikan quiz!";
      buttons.forEach((button) => (button.style.display = "none"));
  }
}

document.querySelectorAll(".quiz-btn").forEach(button => {
  button.addEventListener("click", function () {
      checkAnswer(this.dataset.answer, this);
  });
});

function checkAnswer(answer, button) {
  if (!button) return; 

  if (answer === quizData[currentQuestionIndex].answer) {
      button.style.background = "green"; 
      setTimeout(() => {
          currentQuestionIndex++; 
          loadQuestion();
      }, 1000);
  } else {
      button.style.background = "red"; 
      button.disabled = true; 
      alert("❌ Jawaban Salah! Coba lagi.");
  }
}

document.addEventListener("DOMContentLoaded", loadQuestion);



  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
