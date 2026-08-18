/* =====================================================
   CARROSSEL - LOGICDEV
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carrosseis = document.querySelectorAll(".carousel");

    carrosseis.forEach((carousel) => {

        const cardsContainer = carousel.querySelector(".cards");
        const cards = carousel.querySelectorAll(".service-card");

        const buttons = carousel.querySelectorAll(".carousel-arrow");

        const section = carousel.closest(".services, .development");

        const dots = section
            ? section.querySelectorAll(".carousel-dots span")
            : [];

        let currentIndex = 0;


        /* ==============================================
           FUNÇÃO PARA ATUALIZAR O CARROSSEL
        ============================================== */

        function atualizarCarrossel() {

            const larguraCard = cards[0].offsetWidth;

            const gap = 18;

            const deslocamento =
                currentIndex * (larguraCard + gap);

            cardsContainer.style.transform =
                `translateX(-${deslocamento}px)`;


            /* Atualiza os indicadores */

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });

        }


        /* ==============================================
           BOTÃO ESQUERDO
        ============================================== */

        if (buttons[0]) {

            buttons[0].addEventListener("click", () => {

                currentIndex--;

                if (currentIndex < 0) {

                    currentIndex = cards.length - 1;

                }

                atualizarCarrossel();

            });

        }


        /* ==============================================
           BOTÃO DIREITO
        ============================================== */

        if (buttons[1]) {

            buttons[1].addEventListener("click", () => {

                currentIndex++;

                if (currentIndex >= cards.length) {

                    currentIndex = 0;

                }

                atualizarCarrossel();

            });

        }


        /* ==============================================
           CLIQUE NOS INDICADORES
        ============================================== */

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                currentIndex = index;

                atualizarCarrossel();

            });

        });


        /* ==============================================
           REDIMENSIONAMENTO DA TELA
        ============================================== */

        window.addEventListener("resize", () => {

            atualizarCarrossel();

        });

    });


    /* =====================================================
       ANIMAÇÃO DAS SEÇÕES
    ===================================================== */

    const elementos =
        document.querySelectorAll(
            ".section, .service-card, .project-card"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "mostrar"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elementos.forEach((elemento) => {

        observer.observe(elemento);

    });


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const linksMenu =
        document.querySelectorAll(".menu a");


    linksMenu.forEach((link) => {

        link.addEventListener("click", () => {

            const destino =
                link.getAttribute("href");

            const elemento =
                document.querySelector(destino);

            if (elemento) {

                elemento.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});