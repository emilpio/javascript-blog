"use strict";

function titleClickHandler(event) {
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

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add("active");
}
/*nowa funkcja */

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author";

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let html = "";

  for (let article of articles) {
    /* get the article id */

    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";

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

function generateTags() {
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = "";

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */

    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";

      /* insert link into html variable */
      html = html + linkHTML;

      /* add generated code to html variable */

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace("#tag-", "");

  /* find all tag links with class active */

  const tagActives = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagActive of tagActives) {
    /* remove class active */
    tagActive.classlist.remove("active");

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const findAllTags = document.querySelectorAll('[data-tags~="' + tag + '"]');

  /* START LOOP: for each found tag link */

  for (let findAllTag of findAllTags) {
    /* add class active */
    findAllTag.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = "";
    const authorNames = article.getAttribute("data-author");
    const linkHTML =
      '<a href="#author-' +
      authorNames +
      '"><span>' +
      authorNames +
      "</span></a>";
    html = html + linkHTML;

    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  console.log(href);
  const author = href.replace("#author", "");
  const authorActives = document.querySelectorAll('a.active[href^="#author-"]');
  for (let authorActives of authorActives) {
    /* remove class active */
    authorActive.classlist.remove("active");

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const findAllAuthors = document.querySelectorAll(
    '[data-author="' + author + '"]'
  );

  /* START LOOP: for each found tag link */

  for (let findAllAuthor of findAllAuthors) {
    /* add class active */
    findAllAuthor.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */

  const links = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
