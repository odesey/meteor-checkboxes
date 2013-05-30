Meteor.publish('checklists', function(userId){
  console.log('The userId is now: ' + userId);
  return checklists.find({owner: userId});
});
Meteor.startup(function () {

});
