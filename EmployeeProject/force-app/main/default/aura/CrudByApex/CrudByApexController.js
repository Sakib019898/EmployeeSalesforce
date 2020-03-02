({
    doUpdate: function (component, event, helper) {

        var selectedOptionValue = component.find("categoryPicklist").get("v.value");
        //alert(selectedOptionValue);

        //alert(component.get("v.updatedName"));
        var action = component.get("c.updateEmployee");
        action.setParams({
            name: selectedOptionValue,
            newName: component.get("v.updatedName"),
            phn: component.get("v.updatedPhone"),
            email: component.get("v.updatedEmail")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS' || state === 'DRAFT') {
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    title: "Record updated",
                    type: "success",
                    message: selectedOptionValue+" record has been updated"

                });
                showToast.fire();
            }
            else {
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    title: "Unable to update",
                    type: "error"

                });
                showToast.fire();

            }
        }, 'ALL');
        $A.enqueueAction(action);
        var doinit = component.get('c.doInit');
        $A.enqueueAction(doinit);
        var appEvent=$A.get('e.c:EventForUD') ;
        appEvent.fire();




    },
    doSelect: function (component, event, helper) {

        var selectedOptionValue = component.find("categoryPicklist").get("v.value");
        component.set("v.flag", true);
        var action = component.get('c.getEmployeeInfo');
        action.setParams({
            name: selectedOptionValue
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS' || state === 'DRAFT') {
                var returnValue = response.getReturnValue();
                component.set('v.updatedName', returnValue.Name);
                component.set('v.updatedEmail', returnValue.Email__c);
                component.set('v.updatedPhone', returnValue.Phone__c);
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


    },
    doRemove: function (component, event, helper) {
        var selectedOptionValue = component.find("categoryPicklist2").get("v.value");
        alert(selectedOptionValue);

        var action = component.get("c.doDelete");

        action.setParams({
            name: selectedOptionValue
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            var returnValue = response.getReturnValue();
            if (state === 'SUCCESS' || state === 'DRAFT') {
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    'title': 'Record Deleted',
                    'type': 'warning',
                    'message': returnValue + ' has deleted'

                });
                showToast.fire(); 
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
        var doinit = component.get('c.doInit');
        $A.enqueueAction(doinit);
        component.set("v.flag", false);
        var appEvent=$A.get('e.c:EventForUD') ;
        appEvent.fire();

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
                        value: responseValue[i].Name
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


    },
    doSave: function (component, event, helper) {

        var action = component.get("c.insertData");

        action.setParams({
            name: component.get("v.name"),
            phn: component.get("v.phone"),
            email: component.get("v.email")
        });

        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state === 'SUCCESS') {
                var responseValue = response.getReturnValue();
                var showToast = $A.get('e.force:showToast');
                showToast.setParams({
                    'title': 'Record Inserted',
                    'type': 'success',
                    'message': responseValue + ' has been added'

                });
                showToast.fire();
                
                var appEvent= $A.get("e.c:EventForAdd");
                appEvent.setParams({
                    newName:component.get("v.name"),
                    newPhone:component.get("v.phone"),
                    newEmail: component.get("v.email")
                    
                });
                appEvent.fire();

                //alert(responseValue+' has been added');
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
        var doinit = component.get('c.doInit');
        $A.enqueueAction(doinit);

    }
})
