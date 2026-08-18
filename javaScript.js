/* =====================================================
   CARROSSEL - LOGICDEV
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carrosseis = document.querySelectorAll(".carousel");

    carrosseis.forEach((carousel) => {

        const cardsContainer = carousel.querySelector(".cards");
        const cardsOriginais =
            Array.from(cardsContainer.querySelectorAll(".service-card"));

        const buttons =
            carousel.querySelectorAll(".carousel-arrow");

        /* ==============================================
           LOCALIZA OS 4 PONTOS DO CARROSSEL
        ============================================== */

        const section = carousel.closest(".services, .development");

        const dots = section
            ? section.querySelectorAll(".carousel-dots span")
            : [];

        /* ==============================================
           CONFIGURAÇÃO
        ============================================== */

        const totalCards = cardsOriginais.length;

        let currentIndex = 0;

        let animando = false;

        let intervaloMobile = null;


        /* ==============================================
           CRIA A ÁREA DE VISUALIZAÇÃO
           
           Isso permite que os cards deslizem sem
           alterar o restante do HTML.
        ============================================== */

        const viewport =
            document.createElement("div");

        viewport.className =
            "carousel-viewport";


        cardsContainer.parentNode.insertBefore(
            viewport,
            cardsContainer
        );


        viewport.appendChild(
            cardsContainer
        );


        /* ==============================================
           CRIA CLONES DOS CARDS
           
           Os clones permitem que o carrossel seja
           infinito, sem chegar em uma tela vazia.
        ============================================== */

        const cloneInicio =
            cardsOriginais[totalCards - 1].cloneNode(true);

        const cloneFim =
            cardsOriginais[0].cloneNode(true);


        cardsContainer.prepend(
            cloneInicio
        );

        cardsContainer.append(
            cloneFim
        );


        /* ==============================================
           TODOS OS CARDS INCLUINDO OS CLONES
        ============================================== */

        const cards =
            cardsContainer.querySelectorAll(
                ".service-card"
            );


        /* ==============================================
           ATUALIZA OS 4 PONTOS
        ============================================== */

        function atualizarDots() {

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });

        }


        /* ==============================================
           CALCULA O DESLOCAMENTO
        ============================================== */

        function obterDeslocamento() {

            if (!cards[0]) {
                return 0;
            }

            const larguraCard =
                cards[0].getBoundingClientRect().width;

            const gap = 18;

            return larguraCard + gap;

        }


        /* ==============================================
           POSICIONA O CARROSSEL
        ============================================== */

        function posicionarCarrossel(
            animacao = true
        ) {

            const deslocamento =
                obterDeslocamento();

            cardsContainer.style.transition =
                animacao
                    ? "transform 0.6s ease"
                    : "none";


            /*
               +1 porque existe um clone
               antes do primeiro card.
            */

            const posicao =
                currentIndex + 1;


            cardsContainer.style.transform =
                `translateX(-${posicao * deslocamento}px)`;

        }


        /* ==============================================
           INICIA O CARROSSEL
        ============================================== */

        function iniciarCarrossel() {

            posicionarCarrossel(false);

            atualizarDots();

        }


        /* ==============================================
           IR PARA A DIREITA
        ============================================== */

        function proximoCard() {

            if (animando) {
                return;
            }

            animando = true;

            currentIndex++;


            /*
               Se chegou depois do último card,
               vai para o clone e depois retorna
               silenciosamente para o primeiro.
            */

            posicionarCarrossel(true);

            atualizarDots();


            if (currentIndex >= totalCards) {

                currentIndex = 0;

            }

        }


        /* ==============================================
           IR PARA A ESQUERDA
        ============================================== */

        function cardAnterior() {

            if (animando) {
                return;
            }

            animando = true;

            currentIndex--;


            /*
               Se passou do primeiro card,
               vai para o clone e depois volta
               silenciosamente para o último.
            */

            posicionarCarrossel(true);

            atualizarDots();


            if (currentIndex < 0) {

                currentIndex =
                    totalCards - 1;

            }

        }


        /* ==============================================
           CORRIGE O LOOP APÓS A ANIMAÇÃO
        ============================================== */

        cardsContainer.addEventListener(
            "transitionend",
            () => {

                /*
                   Chegou no clone final.
                   Volta para o primeiro card.
                */

                if (
                    currentIndex === 0 &&
                    cardsContainer.style.transform.includes(
                        `${totalCards + 1}`
                    )
                ) {

                    posicionarCarrossel(false);

                }


                /*
                   Chegou no clone inicial.
                   Volta para o último card.
                */

                animando = false;

            }
        );


        /* ==============================================
           BOTÃO ESQUERDO
        ============================================== */

        if (buttons[0]) {

            buttons[0].addEventListener(
                "click",
                cardAnterior
            );

        }


        /* ==============================================
           BOTÃO DIREITO
        ============================================== */

        if (buttons[1]) {

            buttons[1].addEventListener(
                "click",
                proximoCard
            );

        }


        /* ==============================================
           CLIQUE NOS 4 PONTOS
        ============================================== */

        dots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    if (animando) {
                        return;
                    }

                    currentIndex = index;

                    posicionarCarrossel(true);

                    atualizarDots();

                }
            );

        });


        /* ==============================================
           CARROSSEL AUTOMÁTICO NO CELULAR
           
           Somente telas de celular recebem
           troca automática.
        ============================================== */

        function iniciarAutoMobile() {

            clearInterval(
                intervaloMobile
            );


            intervaloMobile =
                setInterval(() => {

                    if (
                        window.innerWidth <= 650
                    ) {

                        proximoCard();

                    }

                }, 3500);

        }


        /* ==============================================
           PAUSA AUTOMÁTICA AO INTERAGIR
        ============================================== */

        carousel.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    intervaloMobile
                );

            }
        );


        carousel.addEventListener(
            "mouseleave",
            () => {

                iniciarAutoMobile();

            }
        );


        /* ==============================================
           REDIMENSIONAMENTO DA TELA
        ============================================== */

        window.addEventListener(
            "resize",
            () => {

                animando = false;

                posicionarCarrossel(false);

                atualizarDots();

                iniciarAutoMobile();

            }
        );


        /* ==============================================
           INICIALIZA
        ============================================== */

        iniciarCarrossel();

        iniciarAutoMobile();

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

        link.addEventListener(
            "click",
            () => {

                const destino =
                    link.getAttribute("href");

                const elemento =
                    document.querySelector(destino);


                if (elemento) {

                    elemento.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });

});