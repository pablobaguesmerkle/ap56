console.log('AP56 loader');

if (!window._AP56_global_click_listener) {
  window._AP56_global_click_listener = true;

  document.body.addEventListener('click', function (e) {
    try {
      // Solo actuamos si estamos en la página de precios (p2)
      if (!window.location.href.includes('/tarificador/precios')) return;

      // Capturamos clicks en el botón (o en el span dentro del botón)
      const clicked = e.target.closest('button, .mat-mdc-button-persistent-ripple');
      if (!clicked) return;

      // Subimos hasta la tarjeta correspondiente
      const card = clicked.closest('.card-prices-content');
      if (!card) return;

      // Leemos el precio de esa tarjeta
      const priceEl = card.querySelector('.discount-price');
      if (!priceEl) return;

      const txt = priceEl.textContent.trim();
      const m = txt.match(/[\d.,]+/);
      if (!m) return;

      const price = parseFloat(m[0].replace(',', '.'));
      if (isNaN(price)) return;

      // Guardamos en sessionStorage (misma clave que usas en el script)
      sessionStorage.setItem('tarificador_price', String(price));
      sessionStorage.setItem('tarificador_price_time', String(Date.now()));

      console.log('AP56: precio guardado (listener global):', price);
    } catch (err) {
      console.error('AP56: error guardando precio (global listener)', err);
    }
  }, true); // capture = true para ejecutarse antes de que Angular intercepte/navegue
}

/** 
 * 25_AP56_TC Mascotas_Incentivos
 * 4548812049400004
 */
var timeout = 10000;
var interval = 200;
var elapsedTime = 0;
var checkAP56 = setInterval(function () {
    if (document.querySelectorAll(".main__container").length > 0) {
        clearInterval(checkAP56);
        window.mainLoadAP56();

    } else if (elapsedTime <= timeout) {
        elapsedTime += interval;

    } else {
        clearInterval(checkAP56);
    }
}, interval);

window.mainLoadAP56 = function () {
    window.AP56();
}

window.AP56 = function () {
    const url = window.location.href;

    // Si ya hay banner y NO estamos en p3, no hagas nada
    if (document.querySelector("#J_contenedor_principal") && !url.includes("/tarificador/contratar")) {
        return;
    }
    // Si estamos en p3 y venimos con uno previo, elimínalo para poder montar el de oferta
    if (document.querySelector("#J_contenedor_principal") && url.includes("/tarificador/contratar")) {
        document.querySelector("#J_contenedor_principal").remove();
    }


    if (!document.querySelector("#AP56_incentivo")) {
    const style = document.createElement("style");
    style.id = "AP56_incentivo";
    style.innerHTML = `
        .J_banner_offer #J_porcentaje{
            background-color: #fff !important;
            color: #D81E05 !important;
            border: 2px solid #D81E05 !important;
        }
        .J_banner_offer #J_porcentaje p {
            display: flex !important;
            flex-wrap: wrap !important;
            align-content: center;
        }
        #J_contenedor_principal{
            width: 360px;
            height: 110px;
            font-family: sans-serif;
            text-align: center;
            margin-top: 24px;
            margin-bottom: 24px;
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
        #J_porcentaje{
            width: 29%;
            height: 100%;
            padding: 10px;
            float: left;
            background-color: #D81E05;
            color: white;
            border-top-left-radius: 15px;
        }
        #J_porcentaje_1{
            font-family: 'DM Sans';
            font-size: 36px;
            margin-left: auto;
            margin-right: auto;
            display: block;
            margin-bottom: 0px;
            font-weight: 700;
            height: 45px;
        }
        .J_porcentaje_2{
            font-family: 'DM Sans';
            font-size: 16px;
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
        #J_texto{
            width: 71%;
            height: 100%;
            float: right;
            border-top: 1px solid #CCCFD2;
            border-right: 1px solid #CCCFD2;
            border-bottom: 1px solid #CCCFD2;
            border-bottom-right-radius: 10px;
            padding: 6px 10px;
        }
        .J_texto_title {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            gap: 4px;
        }
        .J_texto_title img {
            width: 80px;
            height: auto;
            margin: 0 10px 0 0;
        }
        #J_barra{
            width: 100%;        
            color: #D81E05;
            margin-left: auto;
            margin-right: auto;
            border-color: #D81E05;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        #J_texto_1{
            font-family: 'DM Sans';
            font-size: 20px;
            font-weight: 700;
            color: rgba(216, 30, 5, 1);
            text-align: center !important;
        }
        #J_texto_2{
            font-family: 'DM Sans';
            font-size: 12px;
            font-weight: 400;
            margin-top: 5px !important;
            margin-bottom: 0px!important;
            text-align: left;
            color: rgba(116, 116, 116, 1);
        }
        #J_texto_2 a{
            color: rgba(216, 30, 5, 1);
        }
        #J_texto_3{
            font-size: 10px;
            font-weight: 400;
            color: #747474;
            margin-top: 0px!important;
        }
        #J_texto span{
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        @media screen and (max-width: 499px) {
        
            .J_texto_title {
                gap: 4px;
            }
            #J_contenedor_principal{
                width: 100%;
                display: inline-block;
            }
            #J_porcentaje{
                width: 29%;
            }
        
            #J_texto{
                width: 71%;
            }
        
            #J_texto_1{
            }
        
            #J_texto_2{
                font-size: 13px;
            }
        
            #J_texto_3{
                font-size: 9.5px;
            }
        
            #J_texto span{
                width: 100%;
            }
        }
            
        @media screen and (max-width: 390px) {
            #J_contenedor_principal {
                height: 123px;
            }
            #J_texto_1 {
                font-family: 'DM Sans';
                font-size: 18px;
                font-weight: 700;
                color: rgba(216, 30, 5, 1);
                text-align: center !important;
            }
            #J_texto_2 {
                font-size: 12px;
            }
        }
    
    `;
    document.head.appendChild(style);
    }
    
    // --- Helpers para gestionar precio ---
    const PRICE_KEY = "tarificador_price";
    const TIME_KEY = "tarificador_price_time";
    const MAX_AGE = 30 * 60 * 1000; // 30 minutos en ms

    function savePrice(price) {
        sessionStorage.setItem(PRICE_KEY, price);
        sessionStorage.setItem(TIME_KEY, Date.now());
    }

    function resetPrice() {
        sessionStorage.removeItem(PRICE_KEY);
        sessionStorage.removeItem(TIME_KEY);
    }

    function getPrice() {
        const price = sessionStorage.getItem(PRICE_KEY);
        const savedTime = sessionStorage.getItem(TIME_KEY);
        if (!price || !savedTime) return null;

        const age = Date.now() - parseInt(savedTime, 10);
        if (age > MAX_AGE) {
            console.warn("Precio caducado (>30 min).");
            resetPrice();
            return null;
        }
        return parseFloat(price);
    }

    // --- Tus funciones de widgets ---
    const img = 'data:image/png;base64,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';
    function showWidgetAP56() {
        console.log("Mostrar widget_AP56");
        // 👉 aquí va el HTML que ya tienes para widget_AP56
        let widget_AP56 = `
            <div id="J_contenedor_principal">
                <div id="J_porcentaje">
                    <p style="height: 100%; margin: 0%">
                        <span class="J_porcentaje_2">Hasta</span>
                        <span id="J_porcentaje_1">30€</span>
                        <span class="J_porcentaje_2">de regalo</span>
                    </p>
                </div>
                <div id="J_texto">
                        <div class="J_texto_title">
                            <span id="J_texto_1">Contrata online y gana</span>
                            <img src="${img}">
                        </div> 
                        <hr id="J_barra"></hr>
                        <span id="J_texto_2">Oferta válida a partir de 100€ hasta el 31/12/2025. Consulta las <a href="#">bases legales</a>.</span>
                </div>
            </div>
            `;
        const anchor = document.querySelector(".main__container .content") || document.querySelector(".main__container");
        if (anchor) {
        // por si existiera uno viejo (ej. venimos de p1→p3 y toca reemplazar)
        const prev = document.querySelector("#J_contenedor_principal");
        if (prev) prev.remove();

        const where = anchor.matches(".content") ? "beforebegin" : "afterbegin";
        anchor.insertAdjacentHTML(where, widget_AP56);
        } else {
        console.warn("AP56: no encontré .main__container para montar el banner");
        }
    }

    function showWidgetAP56Offer(offer) {
        console.log("Mostrar widget_AP56_offer con offer =", offer);
        let widget_AP56_offer = `
            <div id="J_contenedor_principal" class="J_banner_offer">
                <div id="J_porcentaje">
                    <p style="height: 100%; margin: 0%">
                        <span id="J_porcentaje_1">${offer}€</span>
                        <span class="J_porcentaje_2">de regalo</span>
                    </p>
                </div>
                <div id="J_texto">
                        <div class="J_texto_title">
                            <span id="J_texto_1">Contrata online y gana</span>
                            <img src="${img}">
                        </div> 
                        <hr id="J_barra"></hr>
                        <span id="J_texto_2">Oferta válida a partir de 100€ hasta el 31/12/2025. Consulta las <a href="#">bases legales</a>.</span>
                </div>
            </div>
            `;
        const anchor = document.querySelector(".main__container .content") || document.querySelector(".main__container");
        if (anchor) {
        const prev = document.querySelector("#J_contenedor_principal");
        if (prev) prev.remove();

        const where = anchor.matches(".content") ? "beforebegin" : "afterbegin";
        anchor.insertAdjacentHTML(where, widget_AP56_offer);
        } else {
        console.warn("AP56: no encontré .main__container para montar el banner de oferta");
        }
    }

        function showWidgetAP56Op4(offer) {
        console.log("Mostrar widget_AP56_p4");
        let widget_AP56_offer = `
            <div id="J_contenedor_principal" class="J_banner_offer">
                <div id="J_porcentaje">
                    <p style="height: 100%; margin: 0%">
                        <span id="J_porcentaje_1">${offer}€</span>
                        <span class="J_porcentaje_2">de regalo</span>
                    </p>
                </div>
                <div id="J_texto">
                        <div class="J_texto_title">
                            <span id="J_texto_1">¡Disfruta de tu regalo!</span>
                            <img src="${img}">
                        </div> 
                        <hr id="J_barra"></hr>
                        <span id="J_texto_2">Recibirás un correo electrónico con tu código de regalo al día siguiente del inicio de tu seguro.</span>
                </div>
            </div>
            `;
        const anchor = document.querySelector("ntc-m-sumary-carousel");
        if (anchor) {
            const prev = document.querySelector("#J_contenedor_principal");
        if (prev) prev.remove();
            const where = anchor ? "afterend" : "afterbegin";
            anchor.insertAdjacentHTML(where, widget_AP56_offer);
        } else {
            console.warn("AP56: no encontré .main__container para montar el banner de oferta");
        }
    }


    // P1 → reset precio + mostrar widget_AP56
    if (url.includes("/tarificador/simulador")) {
    // Observamos el stepper para saber en qué paso está el usuario
    const stepper = document.querySelector(".stepper__main-title-step");
    if (stepper) {
        // Función para comprobar el paso y mostrar el banner solo en Paso 1/4
        const checkStep = () => {
        const stepText = stepper.textContent.trim();
        if (stepText.includes("Paso 1/4")) {
            if (!document.querySelector("#J_contenedor_principal")) {
            showWidgetAP56();
            console.log("AP56: Banner mostrado en Paso 1/4 de p1");
            }
        } else {
            // Si ya habíamos mostrado el banner y el usuario avanza, lo quitamos
            const prev = document.querySelector("#J_contenedor_principal");
            if (prev) {
            prev.remove();
            console.log("AP56: Banner ocultado porque ya no es Paso 1/4");
            }
        }
        };

        // Chequeo inicial
        checkStep();

        // Observar cambios en el contenido del stepper (ej. cuando avanzas pasos)
        const obs = new MutationObserver(checkStep);
        obs.observe(stepper, { childList: true, characterData: true, subtree: true });
    }
    }


    // P2: pintar banner + capturar precio en click
    if (url.includes("/tarificador/precios")) {
        showWidgetAP56();

        // Delegación de eventos: capturamos clicks en los botones "Me interesa"
        // document.body.addEventListener("click", function (e) {
        //     const btn = e.target.closest(".mat-mdc-button-persistent-ripple, .form__btn-interesting button");
        //     if (!btn) return;

        //     // buscamos el contenedor tarjeta más cercano
        //     const card = btn.closest(".card-prices-content");
        //     if (!card) return;

        //     // dentro de esa tarjeta, cogemos su precio
        //     const priceEl = card.querySelector(".discount-price");
        //     if (priceEl) {
        //         const priceText = priceEl.textContent.trim();
        //         const match = priceText.match(/[\d,.]+/);
        //         if (match) {
        //             const price = parseFloat(match[0].replace(",", "."));
        //             if (!isNaN(price)) {
        //             savePrice(price);
        //             console.log("AP56: precio guardado al click en Me interesa:", price);
        //             }
        //         }
        //     }
        // }, true); // uso capture para pillar clicks antes de que Angular pueda re-renderizar
    }


    // P3 → usar precio guardado
    if (url.includes("tarificador/contratar")) {
        const precio = getPrice();
        if (precio !== null) {
            if (precio >= 100 && precio <= 300) {
                showWidgetAP56Offer(10);
            } else if (precio > 300) {
                showWidgetAP56Offer(30);
            } else {
                console.log("Precio < 100 → no mostrar nada");
            }
        } else {
            console.warn("No se encontró precio válido en sessionStorage");
        }
    }

    // P4 → usar precio guardado
    if (url.includes("tarificador/resultado")) { // CAMBIAR URL POR LA DE P4
        const precio = getPrice();
        if (precio !== null) {
            if (precio >= 100 && precio <= 300) {
                showWidgetAP56Op4(10);
            } else if (precio > 300) {
                showWidgetAP56Op4(30);
            } else {
                console.log("Precio < 100 → no mostrar nada");
            }
        } else {
            console.warn("No se encontró precio válido en sessionStorage");
        }
    }
}

function loadBanner() {
  if (!document.querySelector("#J_contenedor_principal")) {
    window.AP56();
  }
}
const observer = new MutationObserver(() => {
  if (document.querySelector(".main__container")) {
    loadBanner();
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
loadBanner();
