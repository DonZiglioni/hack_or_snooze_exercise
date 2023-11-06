"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  //console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  //console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navStories.show();
}

// When a user clicks the Submit link in the nav bar

function navSubmit() {
  $allStoriesList.hide();
  $('.story-form').show();
}

$navSubmit.on("click", navSubmit)

// When a user clicks the My Stories link in the nav bar

function showMyStories() {
  $('.story-form').hide();
  $allStoriesList.empty();
  let isFaved = false;
  let myStories = new StoryList(currentUser.ownStories);

  for (let story of myStories.stories) {
    for (let fav of currentUser.favorites) {
      if (story.storyId === fav.storyId) {
        isFaved = true;
      }
    }
    const $story = generateStoryMarkup(story, isFaved, true);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

$navStories.on("click", showMyStories);

// When a user clicks the Favorites link in the nav bar

function showMyFavorites() {
  $('.story-form').hide();
  $allStoriesList.empty();
  let isFaved = false;
  let myFavorites = new StoryList(currentUser.favorites)

  for (let story of myFavorites.stories) {
    for (let fav of myFavorites.stories) {
      if (story.storyId === fav.storyId) {
        isFaved = true;
      }
    }
    const $story = generateStoryMarkup(story, isFaved);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

$navFavorites.on("click", showMyFavorites)




