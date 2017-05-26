// on the server
//Meteor.publish('posts', function(author) {
  //return Posts.find({flagged: false, author: author});
//});

//Meteor.publish('somePosts', function(){
  //return Posts.find({'author':'Tom'});
//});

//Meteor.publish('allPosts', function(){
  //return Posts.find({}, {fields: {
    //date: false
  //}});
//});


//Meteor.publish('allPosts', function(){
  //return Posts.find({'author':'Tom'}, {fields: {
    //date: false
  //}});
//});

Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});