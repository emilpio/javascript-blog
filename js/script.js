"use strict";

function titleClickHandler(event) {
    console.log("Link was clicked!");
    console.log(event);
    event.preventDefault();

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll("titles ");

    for (let activeLink of activeLinks) {
        activeLink.classList.remove("active");
    }

    /* add class 'active' to the clicked link */

    const clickedElement = this;
    console.log("clickedElement:" + clickedElement);
    for (let activeLink of activeLinks) {
        activeLink.classList.add("active");
    }

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(".post ");

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log("Article ID  " + articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log("Article " + targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add("active");
    console.log("corecct class to article ");
}

const links = document.querySelectorAll(".titles a");

for (let link of links) {
    link.addEventListener("click", titleClickHandler);
}
