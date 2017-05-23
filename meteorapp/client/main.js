//Meteor.subscribe('posts');

// on the client
//Meteor.subscribe('posts', 'bob-smith');

// on the client
Template.posts.helpers({
  posts: function(){
    return Posts.find({author: 'bob-smith', category: 'JavaScript'});
  }
});