"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
let favClass;

function generateStoryMarkup(story, faved, isMine) {

  //  Checks the storyList if they are favorited, or if they are owned by currentUser

  if (faved === true) {
    favClass = 'fas fa-star';
  } else if (faved === false) {
    favClass = 'far fa-star';
  }

  //  Set's "Trash Can" Icon if story is owned by currentUser

  let trash;

  if (isMine === true) {
    trash = 'fas fa-trash';
  } else if (isMine !== true) {
    trash = 'fas fa-trash hidden';
  }

  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}">
        <i class="${trash}" id="trashcan"></i>
        <i class="${favClass}" id="not-fav"></i> 
            
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small><br>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  //console.debug("putStoriesOnPage");
  $allStoriesList.empty();
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    if (currentUser) {
      for (let favs of currentUser.favorites) {
        if (story.storyId === favs.storyId) {
          favClass = 'fas fa-star';
        }
      }
    }
    const $story = generateStoryMarkup(story);
    favClass = 'far fa-star';
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

// Handle the values being submitted when adding a new story

async function addNewStory() {
  let username = currentUser.username
  let story = $('#story-title').val();
  let url = $('#story-url').val();
  await storyList.addStory(username, story, url);
  putStoriesOnPage()
}






