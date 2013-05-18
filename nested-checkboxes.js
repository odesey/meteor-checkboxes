checklists = new Meteor.Collection('checklists');

if (Meteor.isClient) {

  Template.checklist.items = function(){
    return checklists.find();
  }
  Template.checklist.events({
    'change input[type=checkbox].checkbox' : function () {
      checklists.update({_id: this._id}, {$set: {completed: !this.completed}});
    }
  });
  Template.checklist.checked = function(){
    return this.completed ? 'checked' : ''
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('started server');
    if (checklists.find().count() === 0){
      checklists.insert({title: 'My First Checklist', sub_list:[], completed: false});
      checklists.insert({title: 'My Second Checklist', sub_list:[], completed: true});
      checklists.insert({title: 'My Third Checklist', sub_list:[], completed: false});
      checklists.insert({title: 'My Fourth Checklist', sub_list:[], completed: true});
    }
  });
}
