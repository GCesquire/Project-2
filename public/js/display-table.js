var url = window.location.search;
var authorId;

// This function grabs posts from the database and updates the view
function getPosts(author) {
  authorId = author || "";
  if (authorId) {
    authorId = "/?author_id=" + authorId;
  }
  $.get("/api/tables" + authorId, function(data) {
    console.log("Posts", data);
    posts = data;
    if (!posts || !posts.length) {
      displayEmpty(author);
    } else {
      initializeRows();
    }
  });
}

if (url.indexOf("?author_id=") !== -1) {
  authorId = url.split("=")[1];
  getPosts(authorId);
}
// If there's no authorId we just get all posts as usual
else {
  getPosts();
}
