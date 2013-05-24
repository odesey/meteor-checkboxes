Meteor.startup(function () {
  console.log('started server');
  if (checklists.find().count() === 0){
    checklists.insert({title: 'My First Checklist', sub_list:[], completed: false});
    checklists.insert({title: 'My Second Checklist', sub_list:[], completed: true});
    checklists.insert({title: 'My Third Checklist', sub_list:[], completed: false});
    checklists.insert({title: 'My Fourth Checklist', sub_list:[], completed: true});
  }
});
