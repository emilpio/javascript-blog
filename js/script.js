"use strict";

function titleClickHandler(event) {
    console.log("Link was clicked!");
    console.log(event);
    event.preventDefault();

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active ");

    for (let activeLink of activeLinks) {
        activeLink.classList.remove("active");
    }

    /* add class 'active' to the clicked link */

    const clickedElement = this;

    clickedElement.classList.add("active");

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
/*nowa funkcja */

const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

function generateTitleLinks() {
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";
    console.log("usuniecie lisy z lewej");

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = "";

    for (let article of articles) {
        /* get the article id */

        const articleId = article.getAttribute("id");
        console.log(articleId);

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        const linkHTML =
            '<li><a href="#' +
            articleId +
            '"><span>' +
            articleTitle +
            "</span></a></li>";
        console.log("link html");

        /* insert link into html variable */
        html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll(".titles a");

    for (let link of links) {
        link.addEventListener("click", titleClickHandler);
    }
}

generateTitleLinks();
