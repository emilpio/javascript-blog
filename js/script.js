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
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".tags .list";

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
  /* [NEW] create a new variable allTags with an empty OBJECT */
  let allTags = {};
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
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";
      console.log(linkHTML);
      /* insert link into html variable */
      html = html + " " + linkHTML;

      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */

  /* [NEW] add html from allTags to tagList */
  let allTagsHTML = "";
  for (let tag in allTags) {
    allTagsHTML += tag + " (" + allTags[tag] + ")";
  }
  //tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  console.log("Function tagClickHandler has been run.");

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log("clicked tag");

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
    console.log(authorWrapper);

    let html = "";
    const authorNames = article.getAttribute("data-author");
    console.log(authorNames);

    const linkHTML =
      '<a href="#author' +
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
  console.log("autor klknięty");
  const href = clickedElement.getAttribute("href");
  console.log(href);
  const author = href.replace("#author", "");
  const authorActives = document.querySelectorAll('a.active[href^="#author"]');
  for (let authorActive of authorActives) {
    /* remove class active */
    authorActive.classList.remove("active");

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const findAllAuthors = document.querySelectorAll('a[href="' + href + '"]');
  console.log(findAllAuthors);

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

  const links = document.querySelectorAll('a[href^="#author"]');
  console.log(links);

  /* START LOOP: for each link */

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
