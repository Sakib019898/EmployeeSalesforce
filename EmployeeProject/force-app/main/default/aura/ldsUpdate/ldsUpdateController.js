({
    doInit : function(component, event, helper) {
        component.find('recordUpdate').getNewRecord(
            'Employee__c',
            null,
            false,
            $A.getCallback(function () {
                var record = component.get('v.recordForUpdate');
                var error = component.get('v.recordErrorForUpdate');
                if (error || (record == null)) {
                    console.log('Error while creating the template', error);
                } else {
                    console.log('Successfully created');
                    
                }


            })


        );
    },
    recordUpdated: function(component, event, helper) {
        var count=parseInt(component.get('v.counter'));
        if(count==0){
           component.set('v.recordFieldsForUpdate.Name', component.get("v.newName"));
          component.set('v.recordFieldsForUpdate.Email__c', component.get("v.newEmail"));
           component.set('v.recordFieldsForUpdate.Phone__c', component.get("v.newPhone"));
            component.find('recordUpdate').saveRecord(function(saveResult){
                if(saveResult.state==='SUCCESS' || saveResult.state==='DRAFT'){
                          alert('Update Done !!!');
                }
                 else{
                     alert("Problem");
                 }
             });
        count++;
        component.set('v.counter',count)
        }
        if(count==1){
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
         "scope": "Employee__c"
        });
        homeEvt.fire();
    }
    }
})
