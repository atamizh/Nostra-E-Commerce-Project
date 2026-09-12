
/* ========================================
   MOBILE NAVIGATION
======================================== */

function openMenu() {

    const sideNavbar = document.getElementById("sideNavbar");
    const overlay = document.getElementById("overlay");

    if (sideNavbar) {
        sideNavbar.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

}


function closeMenu() {

    const sideNavbar = document.getElementById("sideNavbar");
    const overlay = document.getElementById("overlay");

    if (sideNavbar) {
        sideNavbar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

}


/* ========================================
   OFFER BAR
======================================== */

function closeOffer() {

    const offerBar = document.querySelector(".offer-bar");

    if (offerBar) {
        offerBar.style.display = "none";
    }

}


/* ========================================
   COLLECTION SEARCH + FILTER
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("searchInput");

    const products =
        document.querySelectorAll(".product-card");

    const productCount =
        document.getElementById("productCount");

    const noResults =
        document.getElementById("noResults");


    /*
        If the current page doesn't contain
        the collections elements, stop here.
    */

    if (!searchInput || products.length === 0) {
        return;
    }


    /*
        Search input
    */

    searchInput.addEventListener("input", function () {

        filterProducts();

    });


    /*
        Category filters
    */

    const categoryFilters =
        document.querySelectorAll(".category-filter");

    categoryFilters.forEach(function (filter) {

        filter.addEventListener("change", function () {

            filterProducts();

        });

    });


    /*
        Gender filters
    */

    const genderFilters =
        document.querySelectorAll(".gender-filter");

    genderFilters.forEach(function (filter) {

        filter.addEventListener("change", function () {

            filterProducts();

        });

    });


    /*
        Price filters
    */

    const priceFilters =
        document.querySelectorAll(".price-filter");

    priceFilters.forEach(function (filter) {

        filter.addEventListener("change", function () {

            filterProducts();

        });

    });


    /*
        Color filters
    */

    const colorFilters =
        document.querySelectorAll(".color-filter");

    colorFilters.forEach(function (filter) {

        filter.addEventListener("change", function () {

            filterProducts();

        });

    });


    /*
        MAIN FILTER FUNCTION
    */

    function filterProducts() {

        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();


        /*
            Get selected categories
        */

        const selectedCategories =
            Array.from(categoryFilters)

                .filter(function (checkbox) {
                    return checkbox.checked;
                })

                .map(function (checkbox) {
                    return checkbox.value;
                });


        /*
            Get selected genders
        */

        const selectedGenders =
            Array.from(genderFilters)

                .filter(function (checkbox) {
                    return checkbox.checked;
                })

                .map(function (checkbox) {
                    return checkbox.value;
                });


        /*
            Get selected prices
        */

        const selectedPrices =
            Array.from(priceFilters)

                .filter(function (checkbox) {
                    return checkbox.checked;
                })

                .map(function (checkbox) {
                    return checkbox.value;
                });


        /*
            Get selected colors
        */

        const selectedColors =
            Array.from(colorFilters)

                .filter(function (checkbox) {
                    return checkbox.checked;
                })

                .map(function (checkbox) {
                    return checkbox.value;
                });


        let visibleProducts = 0;


        /*
            Loop through every product
        */

        products.forEach(function (product) {

            const productName =
                product.dataset.name.toLowerCase();

            const productCategory =
                product.dataset.category;

            const productGender =
                product.dataset.gender;

            const productPrice =
                Number(product.dataset.price);

            const productColor =
                product.dataset.color;


            /*
                SEARCH MATCH
            */

            const searchMatch =
                productName.includes(searchValue);


            /*
                CATEGORY MATCH
            */

            const categoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(productCategory);


            /*
                GENDER MATCH
            */

            const genderMatch =
                selectedGenders.length === 0 ||
                selectedGenders.includes(productGender);


            /*
                PRICE MATCH
            */

            let priceMatch = true;


            if (selectedPrices.length > 0) {

                priceMatch =
                    selectedPrices.some(function (range) {

                        const values =
                            range.split("-");

                        const min =
                            Number(values[0]);

                        const max =
                            Number(values[1]);

                        return (
                            productPrice >= min &&
                            productPrice <= max
                        );

                    });

            }


            /*
                COLOR MATCH
            */

            const colorMatch =
                selectedColors.length === 0 ||
                selectedColors.includes(productColor);


            /*
                FINAL RESULT
            */

            const shouldShow =
                searchMatch &&
                categoryMatch &&
                genderMatch &&
                priceMatch &&
                colorMatch;


            if (shouldShow) {

                product.style.display = "block";

                visibleProducts++;

            } else {

                product.style.display = "none";

            }

        });


        /*
            Update product count
        */

        productCount.textContent =
            visibleProducts +
            (visibleProducts === 1
                ? " Product"
                : " Products");


        /*
            Show / hide no-result message
        */

        if (visibleProducts === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    /*
        Run once when page loads
    */

    filterProducts();

});


/* ========================================
   CLEAR FILTERS
======================================== */

function clearFilters() {

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = "";
    }


    const filters =
        document.querySelectorAll(
            ".category-filter, " +
            ".gender-filter, " +
            ".price-filter, " +
            ".color-filter"
        );


    filters.forEach(function (filter) {

        filter.checked = false;

    });


    /*
        Trigger search/filter update
    */

    if (searchInput) {

        searchInput.dispatchEvent(
            new Event("input")
        );

    }

}


/* ========================================
   NEWSLETTER
======================================== */

function subscribeNewsletter(event) {

    event.preventDefault();

    const emailInput =
        event.target.querySelector("input");

    if (!emailInput) {
        return;
    }

    alert(
        "Thank you for subscribing to Nostra!"
    );

    emailInput.value = "";

}


/* ========================================
   CONTACT FORM
======================================== */

function submitContact(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        "Thank you " +
        name +
        "! Your message has been sent successfully."
    );

    event.target.reset();

}

