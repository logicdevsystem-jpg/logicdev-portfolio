/* =====================================================
   LOGICDEV
   CARROSSEL + ANIMAÇÕES + MENU MOBILE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CARROSSEL
    ===================================================== */

    const carrosseis =
        document.querySelectorAll(".carousel");


    carrosseis.forEach((carousel) => {


        /* CARDS */

        const cards =
            carousel.querySelectorAll(
                ".service-card"
            );


        /* SETAS */

        const buttons =
            carousel.querySelectorAll(
                ".carousel-arrow"
            );


        /* PONTOS */

        const section =
            carousel.closest(
                ".services, .development"
            );


        const dots =
            section
                ? section.querySelectorAll(
                    ".carousel-dots span"
                )
                : [];


        /* ÍNDICE ATUAL */

        let currentIndex = 0;


        /* =================================================
           ATUALIZA O CARROSSEL
        ================================================= */

        function atualizarCarrossel() {

            cards.forEach((card, index) => {

                card.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });


            /* Atualiza os pontos */

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });

        }


        /* =================================================
           SETA ESQUERDA
        ================================================= */

        if (buttons[0]) {

            buttons[0].addEventListener(
                "click",
                () => {

                    currentIndex--;

                    if (currentIndex < 0) {

                        currentIndex =
                            cards.length - 1;

                    }

                    atualizarCarrossel();

                }
            );

        }


        /* =================================================
           SETA DIREITA
        ================================================= */

        if (buttons[1]) {

            buttons[1].addEventListener(
                "click",
                () => {

                    currentIndex++;

                    if (
                        currentIndex >=
                        cards.length
                    ) {

                        currentIndex = 0;

                    }

                    atualizarCarrossel();

                }
            );

        }


        /* =================================================
           CLIQUE NOS PONTOS
        ================================================= */

        dots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    currentIndex = index;

                    atualizarCarrossel();

                }
            );

        });


        /* =================================================
           INICIA NO PRIMEIRO CARD
        ================================================= */

        atualizarCarrossel();

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

                    if (
                        entry.isIntersecting
                    ) {

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
        document.querySelectorAll(
            ".menu a"
        );


    linksMenu.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                const destino =
                    link.getAttribute(
                        "href"
                    );


                const elemento =
                    document.querySelector(
                        destino
                    );


                if (elemento) {

                    elemento.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });

});