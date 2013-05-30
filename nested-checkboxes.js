checklists = new Meteor.Collection('checklists');

function adminUser(userId) {
  var adminUser = Meteor.users.findOne({'emails.address': 'david@example.com'} );
  return (userId && adminUser && userId === adminUser._id);
}

checklists.allow({
  insert: function(userId, doc){
    return userId != null;
  },
  remove: function(userId, doc){
    return (doc.owner === userId || adminUser(userId));
  },
  update: function(userId, doc, fields, modifier) {
    return (doc.owner === userId || adminUser(userId));
  }
});
