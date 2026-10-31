/* ==========================================
   AADIL FURNITURE HOUSE
   FINAL SCRIPT.JS
========================================== */

"use strict";


/* ==========================================
   WEBSITE LOADED
========================================== */

console.log(
    "Aadil Furniture House - Website Loaded Successfully"
);


/* ==========================================
   HEADER
========================================== */

const header =
    document.querySelector(".header");


function updateHeaderShadow() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 25px rgba(0,0,0,0.15)";

    } else {

        header.style.boxShadow =
            "0 3px 15px rgba(0,0,0,0.08)";

    }

}


window.addEventListener(
    "scroll",
    updateHeaderShadow
);


updateHeaderShadow();



/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


function closeMobileMenu() {

    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuToggle.textContent = "☰";

}


function toggleMobileMenu() {

    if (!navMenu || !menuToggle) return;

    const isOpen =
        navMenu.classList.toggle("active");


    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );


    menuToggle.textContent =
        isOpen ? "✕" : "☰";

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}



/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const navLinks =
    document.querySelectorAll(
        ".nav-menu .nav-links a"
    );


const navSections = [

    document.getElementById("home"),

    document.getElementById("products"),

    document.getElementById("categories"),

    document.getElementById("about"),

    document.getElementById("contact")

].filter(Boolean);



function updateActiveNavigation() {

    if (!navSections.length) return;


    let currentSection =
        navSections[0].id;


    navSections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;


        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);



/* ==========================================
   SMOOTH NAVIGATION
========================================== */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});



/* ==========================================
   SCROLL TO TOP
========================================== */

const scrollTopBtn =
    document.getElementById(
        "scrollTopBtn"
    );


function updateScrollTopButton() {

    if (!scrollTopBtn) return;


    scrollTopBtn.style.display =
        window.scrollY > 300
            ? "flex"
            : "none";

}


window.addEventListener(
    "scroll",
    updateScrollTopButton
);


updateScrollTopButton();


if (scrollTopBtn) {

    scrollTopBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}



/* ==========================================
   GALLERY LIGHTBOX
========================================== */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImg =
    document.getElementById(
        "lightbox-img"
    );


const closeBtn =
    document.querySelector(
        ".close"
    );


const galleryImages =
    document.querySelectorAll(
        ".gallery-grid img"
    );


function closeLightbox() {

    if (!lightbox) return;


    lightbox.style.display =
        "none";


    if (lightboxImg) {

        lightboxImg.src = "";

    }

}


function openLightbox(img) {

    if (
        !lightbox ||
        !lightboxImg ||
        !img
    ) {

        return;

    }


    lightbox.style.display =
        "flex";


    lightboxImg.src =
        img.src;


    lightboxImg.alt =
        img.alt ||
        "Gallery Image";

}


galleryImages.forEach(img => {

    img.addEventListener(
        "click",
        () => {

            openLightbox(img);

        }
    );

});


if (closeBtn) {

    closeBtn.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* ==========================================
   CART ELEMENTS
========================================== */

const cartIcon =
    document.querySelector(
        ".cart-icon"
    );


const cartPanel =
    document.getElementById(
        "cartPanel"
    );


const cartItems =
    document.getElementById(
        "cartItems"
    );


const cartCount =
    document.getElementById(
        "cart-count"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const clearCart =
    document.getElementById(
        "clearCart"
    );


const whatsappOrderBtn =
    document.getElementById(
        "whatsappOrder"
    );


/*
   WhatsApp number
   Country code +91
*/

const phoneNumber =
    "917668504290";


let cart = [];



/* ==========================================
   VALIDATE CART DATA
========================================== */

function validateCartData(data) {

    if (!Array.isArray(data)) {
        return [];
    }


    return data
        .filter(item => {

            return (
                item &&
                typeof item.name === "string" &&
                Number.isFinite(
                    Number(item.price)
                ) &&
                Number(item.price) > 0 &&
                Number.isFinite(
                    Number(item.quantity)
                ) &&
                Number(item.quantity) > 0
            );

        })
        .map(item => {

            return {

                name: item.name.trim(),

                price: Number(item.price),

                quantity: Math.max(
                    1,
                    Math.floor(
                        Number(item.quantity)
                    )
                )

            };

        });

}



/* ==========================================
   LOAD CART
========================================== */

try {

    const savedCart =
        localStorage.getItem(
            "aadilFurnitureCart"
        );


    if (savedCart) {

        cart =
            validateCartData(
                JSON.parse(savedCart)
            );

    }

} catch (error) {

    console.warn(
        "Could not load saved cart."
    );

    cart = [];

}



/* ==========================================
   SAVE CART
========================================== */

function saveCart() {

    try {

        localStorage.setItem(
            "aadilFurnitureCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.warn(
            "Could not save cart."
        );

    }

}



/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {

    return Number(price)
        .toLocaleString(
            "en-IN"
        );

}



/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    if (
        !cartItems ||
        !cartCount ||
        !cartTotal
    ) {

        return;

    }


    cartItems.innerHTML = "";


    let totalQuantity = 0;

    let totalPrice = 0;



    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    /* CART PRODUCTS */

    else {

        cart.forEach(
            (item, index) => {

                const itemTotal =
                    item.price *
                    item.quantity;


                totalQuantity +=
                    item.quantity;


                totalPrice +=
                    itemTotal;



                const cartItem =
                    document.createElement(
                        "div"
                    );


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <div class="cart-item-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            ₹${formatPrice(item.price)} each
                        </span>

                    </div>


                    <div class="cart-item-bottom">


                        <div class="quantity-controls">


                            <button
                                type="button"
                                class="quantity-btn decrease"
                                data-index="${index}"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>


                            <span class="quantity">
                                ${item.quantity}
                            </span>


                            <button
                                type="button"
                                class="quantity-btn increase"
                                data-index="${index}"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>


                        </div>


                        <strong class="cart-item-price">
                            ₹${formatPrice(itemTotal)}
                        </strong>


                        <button
                            type="button"
                            class="btn-remove"
                            data-index="${index}"
                            aria-label="Remove ${escapeHTML(item.name)}"
                        >
                            ❌ Remove
                        </button>


                    </div>

                `;


                cartItems.appendChild(
                    cartItem
                );

            }
        );

    }


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        formatPrice(totalPrice);


    saveCart();

}



/* ==========================================
   CART OPEN / CLOSE
========================================== */

function openCart() {

    if (!cartPanel) return;

    cartPanel.classList.add(
        "active"
    );

}


function closeCart() {

    if (!cartPanel) return;

    cartPanel.classList.remove(
        "active"
    );

}


function toggleCart() {

    if (!cartPanel) return;

    cartPanel.classList.toggle(
        "active"
    );

}


if (cartIcon) {

    cartIcon.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleCart();

        }
    );


    cartIcon.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                toggleCart();

            }

        }
    );

}



/* ==========================================
   CLOSE CART OUTSIDE
========================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !cartPanel ||
            !cartIcon
        ) {

            return;

        }


        if (
            cartPanel.classList.contains(
                "active"
            ) &&
            !cartPanel.contains(
                event.target
            ) &&
            !cartIcon.contains(
                event.target
            )
        ) {

            closeCart();

        }

    }
);



/* ==========================================
   ADD TO CART
========================================== */

const addCartButtons =
    document.querySelectorAll(
        ".add-cart"
    );


addCartButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const name =
                    button.dataset.name;


                const price =
                    Number(
                        button.dataset.price
                    );


                if (
                    !name ||
                    !Number.isFinite(price) ||
                    price <= 0
                ) {

                    return;

                }


                const existingItem =
                    cart.find(
                        item =>
                            item.name === name
                    );


                if (existingItem) {

                    existingItem.quantity += 1;

                } else {

                    cart.push({

                        name: name,

                        price: price,

                        quantity: 1

                    });

                }


                updateCart();


                openCart();

            }
        );

    }
);



/* ==========================================
   CART QUANTITY / REMOVE
========================================== */

if (cartItems) {

    cartItems.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) return;


            const index =
                Number(
                    button.dataset.index
                );


            if (
                !Number.isInteger(index) ||
                !cart[index]
            ) {

                return;

            }



            /* INCREASE */

            if (
                button.classList.contains(
                    "increase"
                )
            ) {

                cart[index].quantity += 1;

                updateCart();

            }



            /* DECREASE */

            else if (
                button.classList.contains(
                    "decrease"
                )
            ) {

                cart[index].quantity -= 1;


                if (
                    cart[index].quantity <= 0
                ) {

                    cart.splice(
                        index,
                        1
                    );

                }


                updateCart();

            }



            /* REMOVE */

            else if (
                button.classList.contains(
                    "btn-remove"
                )
            ) {

                cart.splice(
                    index,
                    1
                );


                updateCart();

            }

        }
    );

}



/* ==========================================
   CLEAR CART
========================================== */

if (clearCart) {

    clearCart.addEventListener(
        "click",
        () => {

            if (
                cart.length === 0
            ) {

                return;

            }


            const confirmClear =
                confirm(
                    "Are you sure you want to clear your cart?"
                );


            if (!confirmClear) return;


            cart = [];


            updateCart();

        }
    );

}



/* ==========================================
   WHATSAPP CART ORDER
========================================== */

if (whatsappOrderBtn) {

    whatsappOrderBtn.addEventListener(
        "click",
        () => {

            if (
                cart.length === 0
            ) {

                alert(
                    "Please add at least one product to your cart."
                );

                return;

            }


            let total = 0;


            let message =
                "Hello Aadil Furniture House,\n\n" +
                "I want to order:\n\n";



            cart.forEach(
                (item, index) => {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    total +=
                        itemTotal;


                    message +=

                        `${index + 1}. ${item.name}\n` +

                        `   Quantity: ${item.quantity}\n` +

                        `   Price: ₹${formatPrice(itemTotal)}\n\n`;

                }
            );


            message +=

                `Total Amount: ₹${formatPrice(total)}\n\n` +

                "Please confirm availability and delivery details.";



            const whatsappURL =

                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}



/* ==========================================
   WISHLIST
========================================== */

const wishlistButtons =
    document.querySelectorAll(
        ".wishlist"
    );


let wishlist = [];



/* LOAD WISHLIST */

try {

    const savedWishlist =
        localStorage.getItem(
            "aadilFurnitureWishlist"
        );


    if (savedWishlist) {

        const parsedWishlist =
            JSON.parse(
                savedWishlist
            );


        if (
            Array.isArray(
                parsedWishlist
            )
        ) {

            wishlist =
                parsedWishlist
                    .filter(
                        item =>
                            typeof item ===
                            "string"
                    );

        }

    }

} catch (error) {

    console.warn(
        "Could not load wishlist."
    );

    wishlist = [];

}



/* UPDATE WISHLIST STORAGE */

function saveWishlist() {

    try {

        localStorage.setItem(
            "aadilFurnitureWishlist",
            JSON.stringify(wishlist)
        );

    } catch (error) {

        console.warn(
            "Could not save wishlist."
        );

    }

}



/* UPDATE HEART */

function updateWishlistButton(
    heart,
    isActive
) {

    heart.classList.toggle(
        "active",
        isActive
    );


    heart.textContent =
        isActive
            ? "❤️"
            : "🤍";


    heart.setAttribute(
        "aria-label",
        isActive
            ? "Remove from wishlist"
            : "Add to wishlist"
    );

}



/* APPLY SAVED WISHLIST */

wishlistButtons.forEach(
    heart => {

        const productCard =
            heart.closest(
                ".product-card"
            );


        const productName =
            productCard
                ?.querySelector(
                    "h3"
                )
                ?.textContent
                .trim();


        if (!productName) return;


        heart.setAttribute(
            "role",
            "button"
        );


        heart.setAttribute(
            "tabindex",
            "0"
        );


        const isActive =
            wishlist.includes(
                productName
            );


        updateWishlistButton(
            heart,
            isActive
        );



        /* CLICK */

        heart.addEventListener(
            "click",
            () => {

                const currentlyActive =
                    heart.classList.contains(
                        "active"
                    );


                if (
                    currentlyActive
                ) {

                    wishlist =
                        wishlist.filter(
                            item =>
                                item !==
                                productName
                        );

                } else {

                    if (
                        !wishlist.includes(
                            productName
                        )
                    ) {

                        wishlist.push(
                            productName
                        );

                    }

                }


                updateWishlistButton(
                    heart,
                    !currentlyActive
                );


                saveWishlist();

            }
        );



        /* KEYBOARD */

        heart.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    heart.click();

                }

            }
        );

    }
);



/* ==========================================
   PRODUCT SEARCH
========================================== */

const productSearch =
    document.getElementById(
        "productSearch"
    );


const productCards =
    document.querySelectorAll(
        ".product-card"
    );


if (productSearch) {

    productSearch.addEventListener(
        "input",
        () => {

            const searchText =
                productSearch.value
                    .toLowerCase()
                    .trim();


            let visibleProducts = 0;



            productCards.forEach(
                card => {

                    const productName =
                        card
                            .querySelector(
                                "h3"
                            )
                            ?.textContent
                            .toLowerCase() ||
                        "";


                    const productAlt =
                        card
                            .querySelector(
                                "img"
                            )
                            ?.alt
                            .toLowerCase() ||
                        "";


                    const matches =
                        productName.includes(
                            searchText
                        ) ||
                        productAlt.includes(
                            searchText
                        );


                    card.style.display =
                        matches
                            ? ""
                            : "none";


                    if (matches) {

                        visibleProducts++;

                    }

                }
            );



            let noResult =
                document.getElementById(
                    "noSearchResult"
                );



            /* NO RESULT */

            if (
                searchText &&
                visibleProducts === 0
            ) {

                if (!noResult) {

                    noResult =
                        document.createElement(
                            "p"
                        );


                    noResult.id =
                        "noSearchResult";


                    noResult.textContent =
                        "No furniture found. Try another search.";


                    productSearch
                        .parentElement
                        .after(
                            noResult
                        );

                }

            }


            /* REMOVE NO RESULT */

            else if (noResult) {

                noResult.remove();

            }

        }
    );

}



/* ==========================================
   CONTACT FORM → WHATSAPP
========================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();



            const name =
                document
                    .getElementById(
                        "contactName"
                    )
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById(
                        "contactEmail"
                    )
                    ?.value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "contactPhone"
                    )
                    ?.value
                    .trim();


            const messageText =
                document
                    .getElementById(
                        "contactMessage"
                    )
                    ?.value
                    .trim();



            if (
                !name ||
                !email ||
                !phone
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }



            /* BASIC PHONE VALIDATION */

            const phoneDigits =
                phone.replace(
                    /\D/g,
                    ""
                );


            if (
                phoneDigits.length < 10
            ) {

                alert(
                    "Please enter a valid phone number."
                );

                return;

            }



            const message =

                "Hello Aadil Furniture House,\n\n" +

                "New Website Enquiry\n\n" +

                `Name: ${name}\n` +

                `Email: ${email}\n` +

                `Phone: ${phone}\n` +

                `Message: ${
                    messageText ||
                    "No message provided"
                }\n\n` +

                "Thank you.";



            const whatsappURL =

                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;



            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            contactForm.reset();

        }
    );

}



/* ==========================================
   CLOSE MOBILE MENU ON RESIZE
========================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768
        ) {

            closeMobileMenu();

        }

    }
);



/* ==========================================
   INITIAL CART UPDATE
========================================== */

updateCart();



/* ==========================================
   FINAL MESSAGE
========================================== */

console.log(
    "Aadil Furniture House - All JavaScript Features Ready"
);