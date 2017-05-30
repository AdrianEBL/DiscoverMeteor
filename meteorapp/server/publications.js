/*
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
*/
Meteor.publish('posts', function(options) {
   check(options, {
     sort: Object,
     limit: Number
   });
   return Posts.find({}, options);
 });

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});


 Meteor.publish('comments', function(postId) {
   check(postId, String);
   return Comments.find({postId: postId});
 });

 Meteor.publish('notifications', function() {
   return Notifications.find({userId: this.userId, read: false});
 });

//tema publicaciones avanzadas
 Meteor.publish('newPosts', function(limit) {
  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

//publicaciones avanzadas
Meteor.publish('topPosts', function(limit) {
  var sub = this, commentHandles = [], postHandle = null;

  // send over the top two comments attached to a single post
  function publishPostComments(postId) {
    var commentsCursor = Comments.find({postId: postId}, {limit: 2});
    commentHandles[postId] =
      Mongo.Collection._publishCursor(commentsCursor, sub, 'comments');
  }

  postHandle = Posts.find({}, {limit: limit}).observeChanges({
    added: function(id, post) {
      publishPostComments(id);
      sub.added('posts', id, post);
    },
    changed: function(id, fields) {
      sub.changed('posts', id, fields);
    },
    removed: function(id) {
      // stop observing changes on the post's comments
      commentHandles[id] && commentHandles[id].stop();
      // delete the post
      sub.removed('posts', id);
    }
  });

  sub.ready();

  // make sure we clean everything up (note `_publishCursor`
  //   does this for us with the comment observers)
  sub.onStop(function() { postHandle.stop(); });
});
