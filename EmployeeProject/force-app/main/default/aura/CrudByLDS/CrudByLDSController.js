({
    doUpdate: function (component, event, helper) {
        var selectedOptionValue = component.find("categoryPicklist").get("v.value");
     
        var evt = $A.get("e.force:navigateToComponent");
        
        evt.setParams({
            componentDef : "c:ldsUpdate",
           
            componentAttributes: {
                idofuser : selectedOptionValue,
                newName : component.get("v.updatedName"),
                newPhone:component.get("v.updatedPhone"),
                newEmail: component.get("v.updatedEmail")
            }
        });
        evt.fire();



    },
    doSelect: function (component, event, helper) {

        var selectedOptionValue = component.find("categoryPicklist").get("v.value");
        component.set("v.id",selectedOptionValue);
        component.set("v.flag", true);
        component.find('recordViewer').reloadRecord(true);
    
        component.set('v.updatedName', component.get("v.recordFieldsForView.Name"));
        component.set('v.updatedEmail', component.get("v.recordFieldsForView.Email__c"));
        component.set('v.updatedPhone', component.get("v.recordFieldsForView.Phone__c"));


    },
    doRemove: function (component, event, helper) {
        var selectedOptionValue = component.find("categoryPicklist2").get("v.value");
        
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:ldsDeleteRecord",
            componentAttributes: {
                idofuser : selectedOptionValue
            }
        });
        evt.fire();
       
        
    },
    doInit: function (component, event, helper) {
        var action = component.get("c.getName");

        action.setParams({

        });

        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state === 'SUCCESS') {
                var responseValue = response.getReturnValue();
                var opt = [];
                for (var i = 0; i < responseValue.length; i++) {
                    opt.push({
                        label: responseValue[i].Name,
                        value: responseValue[i].Id
                    });
                }

                component.set('v.optionsForUpdate', opt);
                component.set('v.optionsForDelete', opt);
            }
            else {
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    'title': 'Problem',
                    'type': 'error',
                    'message': response.getError() + ' occured'

                });
                showToast.fire();
            }

        }, 'ALL');
        $A.enqueueAction(action);
        component.find('recordCreator').getNewRecord(
            'Employee__c',
            null,
            false,
            $A.getCallback(function () {
                var record = component.get('v.record');
                var error = component.get('v.recordError');
                if (error || (record == null)) {
                    console.log('Error while creating the template', error);
                } else {
                    console.log('Successfully created');
                }


            })


        );
                
    },
    doNav: function (component, event, helper) {
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
         "scope": "Employee__c"
        });
        homeEvt.fire();
    },
    doSave: function (component, event, helper) {

       component.find('recordCreator').saveRecord(function(saveResult){
          if(saveResult.state==='SUCCESS' || saveResult.state==='DRAFT'){
                    alert('Save Done !!!');
          }
           else{
               alert("Problem");
           }
       });
     var donav=component.get('c.doNav');     
     $A.enqueueAction(donav);


    }
})
